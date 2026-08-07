import { useEffect, useRef } from 'react'
import type { EffectProfile } from '../lib/effects'
import { revealDurationMs } from '../lib/effects'
import { getMotionControls, getMotionDurationMs } from '../lib/motion'
import type { ProjectMediaElement } from './ProjectMedia'

type MediaEffectCanvasProps = {
  source: ProjectMediaElement | null
  profile: EffectProfile
  playToken: number
  reducedMotion: boolean
}

const vertexShaderSource = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * .5 + .5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`

const fragmentShaderSource = `
precision mediump float;
uniform sampler2D uTexture;
uniform vec2 uOffset;
uniform float uStrength;
uniform float uPower;
uniform float uProgress;
uniform float uTime;
uniform float uNoiseEnabled;
varying vec2 vUv;

float hash(vec2 point) {
  return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  float grain = hash(floor(vUv * vec2(180.0, 120.0) + uTime * vec2(2.0, -1.5)));
  float fineGrain = hash(floor(vUv * vec2(420.0, 280.0) - uTime * vec2(1.5, 2.0)));
  float fleck = smoothstep(0.84, 1.0, grain) * smoothstep(0.75, 0.15, fineGrain);
  float noiseMix = uNoiseEnabled * smoothstep(0.04, 0.2, uProgress);
  vec2 jitter = (grain - 0.5) * vec2(0.012, 0.008) * noiseMix;
  vec4 base = texture2D(uTexture, vUv + jitter);
  float effectStrength = uStrength * uPower;
  float red = texture2D(uTexture, vUv + jitter + uOffset * effectStrength).r;
  float green = texture2D(uTexture, vUv + jitter).g;
  float blue = texture2D(uTexture, vUv + jitter - uOffset * effectStrength).b;
  vec3 split = vec3(red, green, blue);
  split += (grain - 0.5) * 0.16 * noiseMix;
  split += fleck * vec3(0.18, 0.08, 0.2) * noiseMix;
  float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
  float boundary = 1.0 - smoothstep(0.0, .28, edgeDistance);
  float pixelEdge = clamp(length(split - base.rgb) * 4.4, 0.0, 1.0);
  float alpha = boundary * (.5 + pixelEdge * 1.1) * effectStrength;
  float grainAlpha = (0.045 + fleck * 0.24) * noiseMix * effectStrength;
  alpha = max(alpha, grainAlpha);
  gl_FragColor = vec4(split, min(1.0, alpha));
}`

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

export const MediaEffectCanvas = ({
  source,
  profile,
  playToken,
  reducedMotion,
}: MediaEffectCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (
      !canvas ||
      !source ||
      reducedMotion ||
      profile.accent !== 'chromatic' ||
      playToken === 0
    ) {
      return
    }

    let frame = 0
    let disposed = false
    let started = false
    let startTime = 0
    let gl: WebGLRenderingContext | null = null

    const hide = () => {
      window.cancelAnimationFrame(frame)
      canvas.dataset.active = 'false'
      const context = gl
      if (context) context.clear(context.COLOR_BUFFER_BIT)
    }

    const run = () => {
      if (disposed || started) return

      const isVideo = source instanceof HTMLVideoElement
      const ready = isVideo ? source.readyState >= 2 : source.complete
      if (!ready) return
      started = true

      try {
        gl = canvas.getContext('webgl', {
          alpha: true,
          antialias: false,
          depth: false,
          preserveDrawingBuffer: false,
        })
        if (!gl) return

        const ratio = Math.min(window.devicePixelRatio || 1, 1.25)
        canvas.width = Math.max(1, Math.round(source.clientWidth * ratio))
        canvas.height = Math.max(1, Math.round(source.clientHeight * ratio))
        gl.viewport(0, 0, canvas.width, canvas.height)

        const program = gl.createProgram()
        if (!program) return
        const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
        const fragment = compileShader(
          gl,
          gl.FRAGMENT_SHADER,
          fragmentShaderSource
        )
        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
        gl.useProgram(program)

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
          gl.ARRAY_BUFFER,
          new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
          gl.STATIC_DRAW
        )
        const position = gl.getAttribLocation(program, 'aPosition')
        gl.enableVertexAttribArray(position)
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

        const texture = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, texture)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

        const offset = gl.getUniformLocation(program, 'uOffset')
        const strength = gl.getUniformLocation(program, 'uStrength')
        const power = gl.getUniformLocation(program, 'uPower')
        const progressUniform = gl.getUniformLocation(program, 'uProgress')
        const timeUniform = gl.getUniformLocation(program, 'uTime')
        const noiseUniform = gl.getUniformLocation(program, 'uNoiseEnabled')
        if (!offset || !strength || !power || !progressUniform || !timeUniform || !noiseUniform) {
          hide()
          return
        }
        gl.uniform2f(offset, 9 / canvas.width, 4 / canvas.height)
        gl.uniform1f(power, getMotionControls().power)
        gl.uniform1f(noiseUniform, profile.major === 'iris-gate' ? 1 : 0)

        if (!isVideo) {
          gl.bindTexture(gl.TEXTURE_2D, texture)
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            source
          )
        }

        canvas.dataset.active = 'true'

        const draw = (time: number) => {
          if (disposed || document.hidden || !gl) {
            hide()
            return
          }
          if (!startTime) startTime = time
          // Keep the chromatic envelope aligned with the anamorphic media
          // reveal so the canvas does not disappear while the image is still
          // settling into its final brightness/scale.
          const progress = Math.min(
            (time - startTime) / getMotionDurationMs(revealDurationMs),
            1
          )
          // The CSS reveals need a quiet handoff into the stationary image.
          // Fade their WebGL layer out before the reveal reaches 100% so
          // clearing the transparent canvas cannot create a final blink.
          const effectProgress =
            profile.major === 'iris-gate'
              ? Math.min(progress / 0.86, 1)
              : profile.major === 'anamorphic'
                ? Math.min(progress / 0.9, 1)
                : progress
          const envelope = Math.sin(effectProgress * Math.PI)

          if (!isVideo || source.readyState >= 2) {
            if (isVideo) {
              gl.bindTexture(gl.TEXTURE_2D, texture)
              gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
              gl.texImage2D(
                gl.TEXTURE_2D,
                0,
                gl.RGBA,
                gl.RGBA,
                gl.UNSIGNED_BYTE,
                source
              )
            }
            gl.uniform1f(strength, envelope)
            gl.uniform1f(progressUniform, progress)
            gl.uniform1f(timeUniform, time * 0.001)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
          }

          if (progress < 1) frame = window.requestAnimationFrame(draw)
          else hide()
        }

        frame = window.requestAnimationFrame(draw)
      } catch (error) {
        hide()
      }
    }

    const readyEvent =
      source instanceof HTMLVideoElement ? 'loadeddata' : 'load'
    source.addEventListener(readyEvent, run, { once: true })
    run()

    return () => {
      disposed = true
      source.removeEventListener(readyEvent, run)
      hide()
    }
  }, [playToken, profile.accent, reducedMotion, source])

  return (
    <canvas
      ref={canvasRef}
      className="media-effect-canvas"
      data-active="false"
      aria-hidden="true"
    />
  )
}
