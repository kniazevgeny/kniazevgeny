export type HeroShaderConfig = {
  pixelRatioCap: number
  maxWidth: number
  maxHeight: number
  motionEnabled: boolean
}

export const getHeroPaletteIndex = (value: number) =>
  Math.min(3, Math.max(0, Math.floor(value * 4)))

export const getHeroShaderConfig = (
  reducedMotion: boolean
): HeroShaderConfig => ({
  pixelRatioCap: 1.25,
  maxWidth: 1400,
  maxHeight: 900,
  motionEnabled: !reducedMotion,
})

export const heroVertexShaderSource = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`

export const heroFragmentShaderSource = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uCenter;
uniform vec2 uSecondCenter;
uniform float uIntensity;
uniform float uSecondIntensity;
uniform float uPalette;
varying vec2 vUv;

float hash21(vec2 point) {
  point = fract(point * vec2(123.34, 456.21));
  point += dot(point, point + 45.32);
  return fract(point.x * point.y);
}

float noise(vec2 point) {
  vec2 cell = floor(point);
  vec2 local = fract(point);
  local = local * local * (3.0 - 2.0 * local);
  float lower = mix(hash21(cell), hash21(cell + vec2(1.0, 0.0)), local.x);
  float upper = mix(hash21(cell + vec2(0.0, 1.0)), hash21(cell + vec2(1.0)), local.x);
  return mix(lower, upper, local.y);
}

float fbm(vec2 point) {
  float value = 0.0;
  value += noise(point) * 0.55;
  point = point * 2.03 + vec2(17.1, -8.4);
  value += noise(point) * 0.28;
  point = point * 2.01 + vec2(-6.2, 11.7);
  value += noise(point) * 0.12;
  point = point * 2.02 + vec2(4.8, 3.6);
  value += noise(point) * 0.05;
  return value;
}

vec3 chromaticPalette(float value) {
  vec3 first = vec3(0.08, 0.32, 0.78);
  vec3 second = vec3(1.0, 0.38, 0.02);
  vec3 third = vec3(1.0, 0.8, 0.18);
  vec3 fourth = vec3(0.02, 0.72, 0.76);

  if (uPalette < 0.5) {
    return mix(mix(first, second, value), mix(third, fourth, value), value);
  }
  if (uPalette < 1.5) {
    first = vec3(1.0, 0.16, 0.35);
    second = vec3(0.94, 0.42, 0.84);
    third = vec3(0.25, 0.46, 1.0);
    fourth = vec3(0.12, 0.9, 0.95);
  } else if (uPalette < 2.5) {
    first = vec3(0.45, 0.72, 1.0);
    second = vec3(0.58, 0.48, 0.92);
    third = vec3(0.82, 0.9, 0.96);
    fourth = vec3(0.28, 0.72, 0.7);
  } else {
    first = vec3(0.58, 0.18, 1.0);
    second = vec3(0.98, 0.22, 0.62);
    third = vec3(1.0, 0.66, 0.12);
    fourth = vec3(0.2, 0.65, 1.0);
  }

  return mix(mix(first, second, value), mix(third, fourth, value), value);
}

vec4 renderField(vec2 fieldPoint, vec2 center, float phase, float intensity) {
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 point = (fieldPoint - center) * aspect;
  float time = uTime * 0.035 + phase;
  float radius = length(point);
  float angle = atan(point.y, point.x);

  float turbulence = fbm(point * 2.8 + vec2(time * 0.7, -time * 0.4));
  float angularWarp = (turbulence - 0.5) * 0.42 + sin(angle * 3.0 + time) * 0.035;
  float warpedAngle = angle + angularWarp / max(radius, 0.16);
  vec2 anglePosition = vec2(cos(warpedAngle), sin(warpedAngle));
  float radialWarp =
    (fbm(anglePosition * 2.5 + vec2(radius * 3.4, time)) - 0.5) * 0.13;
  float warpedRadius = radius + radialWarp;

  float horizon = 1.0 - smoothstep(0.065, 0.105, warpedRadius);
  float ringRadius = 0.275 + sin(warpedAngle * 2.0 - time * 1.7) * 0.018;
  ringRadius += (turbulence - 0.5) * 0.045;
  float ring = exp(-pow((warpedRadius - ringRadius) * 22.0, 2.0));
  ring += exp(-pow((warpedRadius - ringRadius - 0.034) * 30.0, 2.0)) * 0.34;
  ring += exp(-pow((warpedRadius - ringRadius + 0.044) * 28.0, 2.0)) * 0.28;
  ring += exp(-pow((warpedRadius - ringRadius - 0.078) * 24.0, 2.0)) * 0.2;
  ring += exp(-pow((warpedRadius - ringRadius + 0.09) * 21.0, 2.0)) * 0.16;
  ring += exp(-pow((warpedRadius - ringRadius - 0.15) * 17.0, 2.0)) * 0.11;
  ring += exp(-pow((warpedRadius - ringRadius + 0.17) * 15.0, 2.0)) * 0.08;
  float unevenness = 0.62 + 0.38 * sin(warpedAngle - time * 1.8) * sin(warpedAngle - time * 1.8);
  ring *= unevenness * (0.72 + turbulence * 0.65);

  float outerGlow = exp(-pow((warpedRadius - ringRadius) * 7.0, 2.0)) * 0.1;
  float innerGlow = exp(-pow((warpedRadius - 0.135) * 13.0, 2.0)) * 0.045;
  float field = (ring + outerGlow + innerGlow) * intensity;
  float edgeFade = 1.0 - smoothstep(0.48, 0.96, radius);
  float orbitColor = 0.5 + 0.5 * sin(
    warpedAngle * 2.0 + warpedRadius * 5.2 + turbulence * 3.0 + time * 0.32
  );
  vec3 color = chromaticPalette(orbitColor);
  color *= field;
  color += vec3(0.018, 0.008, 0.025) * outerGlow;
  color *= edgeFade;
  color *= 1.0 - horizon;

  float alpha = clamp((field + outerGlow * 0.5) * edgeFade * (1.0 - horizon), 0.0, 1.0);
  return vec4(color, alpha);
}

void main() {
  vec4 primary = renderField(vUv, uCenter, 0.0, uIntensity);
  vec4 secondary = renderField(vUv, uSecondCenter, 1.8, uSecondIntensity);
  vec2 aspect = vec2(uResolution.x / max(uResolution.y, 1.0), 1.0);
  vec2 flowVector = uSecondCenter - uCenter;
  float flowLength = max(dot(flowVector, flowVector), 0.0001);
  float flowT = clamp(dot(vUv - uCenter, flowVector) / flowLength, 0.0, 1.0);
  vec2 flowPoint = uCenter + flowVector * flowT;
  float flowNoise = fbm(vUv * 3.4 + vec2(uTime * 0.018, -uTime * 0.012));
  vec2 flowNormal = normalize(vec2(-flowVector.y, flowVector.x));
  float flowWobble =
    sin(flowT * 8.0 + uTime * 0.12) * 0.024 + (flowNoise - 0.5) * 0.026;
  flowPoint += flowNormal * flowWobble;
  float flowDistance = length((vUv - flowPoint) * aspect);
  float flowEnvelope = smoothstep(0.0, 0.14, flowT) * (1.0 - smoothstep(0.86, 1.0, flowT));
  float flow = exp(-pow(flowDistance * 38.0, 2.0)) * 0.24;
  flow += exp(-pow((flowDistance - 0.035) * 42.0, 2.0)) * 0.11;
  flow *= flowEnvelope * (0.72 + flowNoise * 0.6);
  vec3 flowColor = chromaticPalette(fract(flowT * 0.9 + flowNoise * 0.32 + uTime * 0.012));
  float flowLuminance = dot(flowColor, vec3(0.299, 0.587, 0.114));
  flowColor = mix(vec3(flowLuminance), flowColor, 2.2);
  vec3 color = primary.rgb + secondary.rgb + flowColor * flow * 2.6;
  float alpha = clamp(
    primary.a + secondary.a * (1.0 - primary.a) + flow * 0.76,
    0.0,
    1.0
  );

  gl_FragColor = vec4(color, alpha);
}
`
