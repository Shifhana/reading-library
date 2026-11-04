import type { BreezeForm } from './readingBreezeLayout'
import type { BreezeMotion } from './readingBreezePhysics'

type Vector = [number, number, number]
export type PanelPose = { u: Vector; v: Vector; origin: Vector; tilt: number }
export type PanelMatrix = [number, number, number, number, number, number]
const radians = (angle: number) => angle * Math.PI / 180
const clamp = (value: number, limit: number) => Math.max(-limit, Math.min(limit, value))

export const breezeResponse = {
  large: { mass: 4.5, gain: .14 }, medium: { mass: 2.3, gain: .28 }, small: { mass: 1.2, gain: .4 },
}

// A rigid woven panel pivots at its concealed centre mount. The same basis drives its
// visible surface and retained ray/plane projection onto the wall.
export function panelPose(p: BreezeForm, motion: BreezeMotion): PanelPose {
  const tilt = clamp(motion.x * .5, 2.3)
  const yaw = radians(p.tilt + tilt)
  const pitch = radians(-.2 + clamp(motion.y * .25, .25))
  const roll = radians(p.rest + clamp(motion.x * .05, .25))
  const cy = Math.cos(yaw), sy = Math.sin(yaw)
  const cx = Math.cos(pitch), sx = Math.sin(pitch)
  const cr = Math.cos(roll), sr = Math.sin(roll)
  const u: Vector = [cr * cy, sr * cy, -sy]
  const v: Vector = [cr * sy * sx - sr * cx, sr * sy * sx + cr * cx, cy * sx]
  // Inferred wall scale: 125 scene units/metre. Keep the whole woven frame
  // clear of the wall, including the shallowest mounts at maximum gust.
  const depth = Math.max(p.depthMm * .125 + Math.abs(tilt) * .06,
    1.4 + Math.abs(u[2]) * p.width / 2 + Math.abs(v[2]) * p.height / 2)
  return { u, v, origin: [p.x, p.y, depth], tilt }
}

export function panelFaceMatrix(pose: PanelPose): PanelMatrix {
  const { u, v, origin: [x, y, z] } = pose
  // Small parallax uses the established room camera's vanishing point.
  const scale = 1 / (1 - .00056 * z)
  return [u[0] * scale, u[1] * scale, v[0] * scale, v[1] * scale,
    800 + (x - 800) * scale, 162 + (y - 162) * scale]
}

export function panelShadowMatrix(pose: PanelPose, sun: Vector | null): PanelMatrix | null {
  if (!sun) return null
  const { u, v, origin: [x, y, z] } = pose
  // The existing sun uses y-up; SVG uses y-down. Rays terminate at z=0.
  const dx = -sun[0] / sun[2], dy = sun[1] / sun[2]
  return [u[0] + dx * u[2], u[1] + dy * u[2], v[0] + dx * v[2], v[1] + dy * v[2], x + dx * z, y + dy * z]
}

// A close, diffuse contact cue rather than a projected mesh. Retain the sun's
// direction, but bound the offset so the mural cannot compete with room shadows.
export function panelContactMatrix(pose: PanelPose, sun: Vector | null): PanelMatrix {
  const face = panelFaceMatrix(pose)
  const projection = panelShadowMatrix(pose, sun)
  const dx = projection ? (projection[4] - face[4]) * .16 : 0
  const dy = projection ? (projection[5] - face[5]) * .16 : .8
  const scale = Math.min(1, 3 / Math.max(.001, Math.hypot(dx, dy)))
  return [face[0], face[1], face[2], face[3], face[4] + dx * scale, face[5] + dy * scale]
}

export const svgMatrix = (m: PanelMatrix) => `matrix(${m.map(n => n.toFixed(4)).join(' ')})`
