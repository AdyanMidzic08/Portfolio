import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float t; uniform vec2 m; uniform float px;
  varying float h; varying float fade;
  void main() {
    vec3 p = position;
    float d = distance(p.xz, m);
    float w = sin(p.x * .55 + t * .7) * .45 + cos(p.z * .7 + t * .5) * .35 + sin((p.x + p.z) * .25 + t * .3) * .5;
    float bump = exp(-d * d * .16) * 1.9;
    p.y += w + bump;
    h = clamp((w + 1.3) / 2.6 + bump * .45, 0., 1.);
    vec4 mv = modelViewMatrix * vec4(p, 1.);
    fade = smoothstep(26., 8., -mv.z);
    gl_PointSize = (1. + h * 1.8) * px * (11. / -mv.z);
    gl_Position = projectionMatrix * mv;
  }`

// Colors from the CV: pale tint up to the crimson accent #B20337.
const fragmentShader = /* glsl */ `
  varying float h; varying float fade;
  void main() {
    if (length(gl_PointCoord - .5) > .5) discard;
    gl_FragColor = vec4(mix(vec3(.91, .66, .74), vec3(.7, .012, .216), h), fade * (.35 + h * .65));
  }`

const COLS = 190, ROWS = 110
const positions = new Float32Array(COLS * ROWS * 3)
for (let i = 0; i < COLS * ROWS; i++) {
  positions[i * 3] = ((i % COLS) / COLS - 0.5) * 42
  positions[i * 3 + 2] = (Math.floor(i / COLS) / ROWS) * 26 - 19
}
const geometry = new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3))
const uniforms = { t: { value: 0 }, m: { value: new THREE.Vector2(0, 40) }, px: { value: 1 } }
const ray = new THREE.Raycaster()
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 2.6)
const hit = new THREE.Vector3()
const target = new THREE.Vector2()

function Wave() {
  useFrame(({ clock, pointer, camera, viewport }) => {
    uniforms.t.value = clock.elapsedTime
    uniforms.px.value = viewport.dpr
    ray.setFromCamera(pointer, camera)
    if (ray.ray.intersectPlane(plane, hit)) uniforms.m.value.lerp(target.set(hit.x, hit.z), 0.07)
  })
  return (
    <points geometry={geometry} position={[0, -2.6, 0]}>
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} transparent depthWrite={false} />
    </points>
  )
}

export default function Field() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.6, 10], fov: 55 }}
      eventSource={document.body}
      eventPrefix="client"
      gl={{ antialias: false, alpha: true }}
    >
      <Wave />
    </Canvas>
  )
}
