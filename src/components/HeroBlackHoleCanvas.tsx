import { useEffect, useRef } from 'react'
import {
  getHeroPaletteIndex,
  getHeroShaderConfig,
  heroFragmentShaderSource,
  heroVertexShaderSource,
} from '../lib/hero-shader'
import {
  getHeroCanvasActivity,
  getHeroCanvasSize,
  getHeroRenderState,
} from '../lib/hero-shader-runtime'
import { getMotionControls, subscribeMotionControls } from '../lib/motion'

const compileShader = (
  gl: WebGLRenderingContext,
  type: number,
  source: string
) => {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create WebGL shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Shader compilation failed'
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

type GravityCenters = {
  firstX: number
  firstY: number
  secondX: number
  secondY: number
}

const defaultGravityCenters: GravityCenters = {
  firstX: 1.08,
  firstY: 0.44,
  secondX: -0.08,
  secondY: 0.86,
}

const getInitialGravityCenters = (): GravityCenters => {
  if (
    typeof window !== 'undefined' &&
    window.matchMedia('(max-width: 480px)').matches
  ) {
    return {
      firstX: 1.08,
      firstY: 0.35,
      secondX: -0.15,
      secondY: 1,
    }
  }

  return defaultGravityCenters
}

export const HeroBlackHoleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const centersRef = useRef(getInitialGravityCenters())
  const motionControlsRef = useRef(getMotionControls())

  useEffect(() => {
    const unsubscribe = subscribeMotionControls((next) => {
      motionControlsRef.current = next
    })
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const config = getHeroShaderConfig(reducedMotion)
    canvas.dataset.active = 'false'
    if (!config.motionEnabled) return

    let frame = 0
    let resizeTimer = 0
    let isVisible = false
    let disposed = false
    let contextLost = false
    let setupFailed = false
    let initialized = false
    let startTime = 0
    let gl: WebGLRenderingContext | null = null
    let program: WebGLProgram | null = null
    let buffer: WebGLBuffer | null = null
    let vertex: WebGLShader | null = null
    let fragment: WebGLShader | null = null
    let timeUniform: WebGLUniformLocation | null = null
    let resolutionUniform: WebGLUniformLocation | null = null
    let centerUniform: WebGLUniformLocation | null = null
    let secondCenterUniform: WebGLUniformLocation | null = null
    let intensityUniform: WebGLUniformLocation | null = null
    let secondIntensityUniform: WebGLUniformLocation | null = null
    let paletteUniform: WebGLUniformLocation | null = null

    const stop = () => {
      window.cancelAnimationFrame(frame)
      frame = 0
    }

    const clear = () => {
      if (!gl || contextLost) return
      gl.clear(gl.COLOR_BUFFER_BIT)
    }

    const deactivate = () => {
      stop()
      canvas.dataset.active = 'false'
      clear()
    }

    const releaseResources = () => {
      if (!gl || contextLost) return
      if (buffer) gl.deleteBuffer(buffer)
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
      if (program) gl.deleteProgram(program)
      buffer = null
      vertex = null
      fragment = null
      program = null
      gl = null
    }

    const resize = () => {
      if (!gl || !resolutionUniform) return
      const bounds = canvas.getBoundingClientRect()
      const size = getHeroCanvasSize(
        bounds.width,
        bounds.height,
        window.devicePixelRatio,
        config
      )
      if (canvas.width !== size.width || canvas.height !== size.height) {
        canvas.width = size.width
        canvas.height = size.height
      }
      gl.viewport(0, 0, size.width, size.height)
      gl.uniform2f(resolutionUniform, size.width, size.height)
    }

    const setup = () => {
      if (initialized || contextLost || disposed || setupFailed) return initialized
      try {
        gl = canvas.getContext('webgl', {
          alpha: true,
          antialias: false,
          depth: false,
          preserveDrawingBuffer: false,
        })
        if (!gl) throw new Error('WebGL is unavailable')

        program = gl.createProgram()
        if (!program) throw new Error('Unable to create WebGL program')
        vertex = compileShader(gl, gl.VERTEX_SHADER, heroVertexShaderSource)
        fragment = compileShader(gl, gl.FRAGMENT_SHADER, heroFragmentShaderSource)
        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw new Error(gl.getProgramInfoLog(program) ?? 'Shader linking failed')
        }

        buffer = gl.createBuffer()
        if (!buffer) throw new Error('Unable to create fullscreen buffer')
        gl.useProgram(program)
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        )
        const position = gl.getAttribLocation(program, 'aPosition')
        if (position < 0) throw new Error('Unable to resolve shader position')
        gl.enableVertexAttribArray(position)
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

        timeUniform = gl.getUniformLocation(program, 'uTime')
        resolutionUniform = gl.getUniformLocation(program, 'uResolution')
        centerUniform = gl.getUniformLocation(program, 'uCenter')
        secondCenterUniform = gl.getUniformLocation(program, 'uSecondCenter')
        intensityUniform = gl.getUniformLocation(program, 'uIntensity')
        secondIntensityUniform = gl.getUniformLocation(
          program,
          'uSecondIntensity'
        )
        paletteUniform = gl.getUniformLocation(program, 'uPalette')
        if (
          !timeUniform ||
          !resolutionUniform ||
          !centerUniform ||
          !secondCenterUniform ||
          !intensityUniform ||
          !secondIntensityUniform ||
          !paletteUniform
        ) {
          throw new Error('Unable to resolve hero shader uniforms')
        }

        gl.clearColor(0, 0, 0, 0)
        gl.uniform1f(intensityUniform, Math.min(1.25, 0.66 * motionControlsRef.current.power))
        gl.uniform1f(secondIntensityUniform, Math.min(0.8, 0.38 * motionControlsRef.current.power))
        gl.uniform1f(paletteUniform, getHeroPaletteIndex(Math.random()))
        resize()
        initialized = true
        canvas.dataset.active = 'true'
        return true
      } catch {
        deactivate()
        releaseResources()
        setupFailed = true
        return false
      }
    }

    const draw = (time: number) => {
      frame = 0
      const state = getHeroRenderState(reducedMotion, isVisible, document.hidden)
      if (
        disposed ||
        contextLost ||
        !state.shouldRender ||
        !gl ||
        !timeUniform ||
        !centerUniform ||
        !secondCenterUniform
      ) {
        deactivate()
        return
      }
      if (!startTime) startTime = time
      const controls = motionControlsRef.current
      const elapsed = (time - startTime) / 1000
      const orbit = elapsed * 0.42
      const gravityBoost = controls.mode === 'overdrive' ? 1 : 0
      gl.uniform2f(
        centerUniform,
        centersRef.current.firstX + Math.sin(orbit) * 0.045 * gravityBoost,
        centersRef.current.firstY + Math.cos(orbit * 0.8) * 0.032 * gravityBoost
      )
      gl.uniform2f(
        secondCenterUniform,
        centersRef.current.secondX - Math.cos(orbit * 0.72) * 0.05 * gravityBoost,
        centersRef.current.secondY + Math.sin(orbit * 0.64) * 0.04 * gravityBoost
      )
      gl.uniform1f(timeUniform, elapsed * (controls.mode === 'overdrive' ? 1.12 : 1))
      gl.uniform1f(intensityUniform, Math.min(1.25, 0.66 * controls.power))
      gl.uniform1f(secondIntensityUniform, Math.min(0.8, 0.38 * controls.power))
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frame = window.requestAnimationFrame(draw)
    }

    const update = () => {
      const state = getHeroRenderState(reducedMotion, isVisible, document.hidden)
      if (!state.shouldRender || contextLost) {
        deactivate()
        return
      }
      if (!setup()) return
      resize()
      canvas.dataset.active = getHeroCanvasActivity(initialized, state)
        ? 'true'
        : 'false'
      if (!frame) frame = window.requestAnimationFrame(draw)
    }

    const scheduleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resizeTimer = 0
        resize()
      }, 260)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting)
        update()
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    const onDocumentVisibilityChange = () => update()
    const onContextLost = (event: Event) => {
      event.preventDefault()
      contextLost = true
      deactivate()
    }
    const onWindowResize = () => {
      if (initialized) scheduleResize()
    }
    document.addEventListener('visibilitychange', onDocumentVisibilityChange)
    window.addEventListener('resize', onWindowResize)
    canvas.addEventListener('webglcontextlost', onContextLost)

    return () => {
      disposed = true
      deactivate()
      window.clearTimeout(resizeTimer)
      observer.disconnect()
      document.removeEventListener('visibilitychange', onDocumentVisibilityChange)
      window.removeEventListener('resize', onWindowResize)
      canvas.removeEventListener('webglcontextlost', onContextLost)
      releaseResources()
      canvas.width = 0
      canvas.height = 0
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="hero-black-hole-canvas"
      data-active="false"
      aria-hidden="true"
    />
  )
}
