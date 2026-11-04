import type { TimeName } from '../environment/atmosphere'

export type ChimeMotion = { angle: number; velocity: number }
export type ChimeBody = { x: number; y: number; top: number; bottom: number; width: number }
export type ChimeContact = { a: number; b: number; speed: number }

// Resolve overlapping hanging strips at three points along their shared height.
// Angles are degrees; the contact impulse uses horizontal scene units/second.
export function resolveChimeContacts(states: ChimeMotion[], bodies: ChimeBody[]) {
  const contacts: ChimeContact[] = []
  const radians = Math.PI / 180
  for (let a = 0; a < bodies.length - 1; a++) {
    const b = a + 1, left = bodies[a], right = bodies[b]
    const top = Math.max(left.y + left.top, right.y + right.top)
    const bottom = Math.min(left.y + left.bottom, right.y + right.bottom)
    if (bottom <= top) continue
    for (const y of [top, (top + bottom) / 2, bottom]) {
      const armA = y - left.y, armB = y - right.y
      const gap = right.x - Math.tan(states[b].angle * radians) * armB
        - left.x + Math.tan(states[a].angle * radians) * armA
      const overlap = (left.width + right.width) / 2 - gap
      if (overlap <= 0) continue
      const speedA = -states[a].velocity * radians * armA
      const speedB = -states[b].velocity * radians * armB
      const closing = speedA - speedB
      if (closing > 0) {
        const impulse = closing * .56 // low restitution: a brush rather than a bounce
        states[a].velocity += impulse / (armA * radians)
        states[b].velocity -= impulse / (armB * radians)
        contacts.push({ a, b, speed: closing })
      }
      states[a].angle = Math.min(1.2, states[a].angle + overlap / (2 * armA * radians))
      states[b].angle = Math.max(-1.2, states[b].angle - overlap / (2 * armB * radians))
    }
  }
  return contacts
}

export type ChimeBreeze = {
  start: number; duration: number; strength: number; nextStrength: number; phase: number; nextStart: number
}

export const chimeTimeSettings = {
  morning: { motion: .94, speed: .96, volume: .86, minInterval: 1.8, maxInterval: 4.6 },
  afternoon: { motion: 1.04, speed: 1.04, volume: .95, minInterval: 1.5, maxInterval: 4.1 },
  evening: { motion: .76, speed: .88, volume: .66, minInterval: 3.2, maxInterval: 6 },
  night: { motion: .58, speed: .76, volume: .42, minInterval: 5.5, maxInterval: 9 },
} satisfies Record<TimeName, { motion: number; speed: number; volume: number; minInterval: number; maxInterval: number }>

export type ChimeConditions = typeof chimeTimeSettings[TimeName]

// Random, smoothly joined wind-strength changes; the field never switches off.
export function createChimeBreeze(start: number, random = Math.random, previous?: ChimeBreeze): ChimeBreeze {
  const duration = 12 + random() * 14
  return {
    start, duration, strength: previous?.nextStrength ?? .72,
    nextStrength: .55 + random() * .5,
    phase: previous?.phase ?? random() * Math.PI * 2,
    nextStart: start + duration,
  }
}

// Slow phase and amplitude drift keep each strand's sway from settling into
// a fixed rhythm, while the random wind strength joins remain continuous.
export function chimeTarget(seconds: number, index: number, breeze: ChimeBreeze) {
  const progress = Math.max(0, Math.min(1, (seconds - breeze.start) / breeze.duration))
  const blend = progress * progress * (3 - 2 * progress)
  const strength = breeze.strength + (breeze.nextStrength - breeze.strength) * blend
  const drift = Math.sin(seconds * .047 + index * .43 + breeze.phase) * .16
  const wave = Math.sin(seconds * (.71 + index * .031) + index * 1.7 + breeze.phase + drift) * .76
    + Math.sin(seconds * (.193 + index * .007) - index * .83 + drift * .4) * .24
  const amplitude = .94 + .06 * Math.sin(seconds * .041 + index * .79)
  return wave * strength * (.9 + .1 * Math.sin(index * 2.3)) * amplitude
}

export function stepChime(state: ChimeMotion, target: number, dt: number, index: number): ChimeMotion {
  const step = Math.min(.025, Math.max(0, dt))
  const stiffness = 5.2 + index * .27
  const velocity = state.velocity + ((target - state.angle) * stiffness - state.velocity * 2.8) * step
  const angle = Math.max(-1.2, Math.min(1.2, state.angle + velocity * step))
  if (target === 0 && Math.abs(angle) < .002 && Math.abs(velocity) < .004) return { angle: 0, velocity: 0 }
  return { angle, velocity }
}
