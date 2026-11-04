export type BreezeMotion = { x: number; y: number; vx: number; vy: number }
export type BreezePointer = { x: number; y: number; speed: number; active: boolean }

export function breezeForce(x: number, y: number, pointer: BreezePointer, reduced: boolean, radius = 95) {
  const dx = x - pointer.x, dy = y - pointer.y
  const distance = Math.hypot(dx, dy)
  if (!pointer.active || distance >= radius) return { x: 0, y: 0 }
  const falloff = (1 - distance / radius) ** 2
  const strength = (2.5 + Math.min(1, pointer.speed / 850) * 10) * falloff * (reduced ? .12 : 1)
  return { x: dx / Math.max(12, distance) * strength, y: dy / Math.max(12, distance) * strength * .3 }
}

// Semi-implicit spring integration, bounded after stalled/background frames.
export function stepBreeze(state: BreezeMotion, target: { x: number; y: number }, dt: number, index: number, mass = 1): BreezeMotion {
  const step = Math.min(.025, Math.max(0, dt))
  const stiffness = (13 + index % 5) / mass
  const damping = (4.8 + (index % 4) * .35) / Math.sqrt(mass)
  const vx = state.vx + ((target.x - state.x) * stiffness - state.vx * damping) * step
  const vy = state.vy + ((target.y - state.y) * stiffness - state.vy * damping) * step
  return { x: state.x + vx * step, y: state.y + vy * step, vx, vy }
}
