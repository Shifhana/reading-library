import type { TimeName } from './atmosphere'

// Inferred metres, not a surveyed reconstruction. x=east→west, y=up,
// z=back wall→viewer. One camera is shared by every receiving plane.
export type Point = [number, number, number]
export const solarDirections: Record<TimeName, Point | null> = {
  morning: [-1, .72, .55], afternoon: [1, 1.35, .42],
  evening: [1, .38, .65], night: null,
}
export function project([x, y, z]: Point): [number, number] {
  const depth = 1 - .075 * z
  return [800 + (328 + 133.875 * x - 800) / depth, 162 + (284 - 111.875 * y) / depth]
}
export function receiver(px: number, py: number, surface: 'wall' | 'floor' | 'ledge'): Point | null {
  if (surface === 'wall') return [(px - 328) / 133.875, (446 - py) / 111.875, 0]
  const y = surface === 'ledge' ? .45 : 0
  const depth = (284 - 111.875 * y) / (py - 162)
  const z = (1 - depth) / .075
  const x = (800 + (px - 800) * depth - 328) / 133.875
  if (z < 0 || z > 11 || x < 0 || x > 8 || (surface === 'ledge' && x < 7.4)) return null
  return [x, y, z]
}
const modulo = (n: number, period: number) => ((n % period) + period) % period
export function jaaliOpen(y: number, z: number) {
  const inRow = (y > .55 && y < .76) || (y > .85 && y < 1.06)
  const column = modulo(z, .32)
  return inRow && column > .065 && column < .255
}

// Trace toward the sun. The roof, solid lower masonry, finite-depth openings,
// vertical rods and overhead rods all use the same ray, not screen-space lines.
export function solarVisibility(p: Point, direction: Point): number {
  const [dx, dy, dz] = direction
  const side = dx > 0 ? 8 : 0
  const t = (side - p[0]) / dx
  if (t <= 0) return 0
  const y = p[1] + t * dy, z = p[2] + t * dz
  if (z < 0 || z > 12) return 0
  const roofT = (3.2 - p[1]) / dy
  const roofX = p[0] + roofT * dx
  if (roofT < t && roofX < 7.2) return 0
  if (dx < 0) return y < 3.2 ? 1 : 0
  // The continuous 600 mm sitting ledge intercepts low rays first.
  if (p[1] < .45) {
    const ledgeT = (7.4 - p[0]) / dx
    if (ledgeT > 0 && p[1] + ledgeT * dy < .45) return 0
  }
  if (y < 1.1) {
    for (let step = 0; step <= 8; step++) {
      const depth = .02 * step
      if (!jaaliOpen(y + depth * dy / dx, z + depth * dz / dx)) return 0
    }
    return 1
  }
  const rodDistance = (q: number) => Math.min(modulo(q, .22), .22 - modulo(q, .22))
  if (y < 3.02 && rodDistance(z) < .013) return 0
  // Rounded 180 mm bend: sample the continuous tube's x/y centreline.
  for (let i = 0; i <= 8; i++) {
    const angle = i * Math.PI / 16
    const cx = 7.82 + .18 * Math.cos(angle), cy = 3.02 + .18 * Math.sin(angle)
    const rayT = (cx - p[0]) / dx
    if (rayT > 0 && Math.abs(p[1] + rayT * dy - cy) < .025 && rodDistance(p[2] + rayT * dz) < .013) return 0
  }
  if (roofT > 0 && roofX >= 7.2 && roofX <= 7.82 && rodDistance(p[2] + roofT * dz) < .013) return 0
  return 1
}
