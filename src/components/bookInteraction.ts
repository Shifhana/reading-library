export type BookPhase = 'lifting' | 'held' | 'opening' | 'open' | 'closing' | 'returning'
export const coverPauseMs = 1000

export function afterBookMotion(phase: BookPhase, pose: 'held' | 'open' | 'shelf'): BookPhase | null {
  if (phase === 'lifting' && pose === 'held') return 'held'
  if (phase === 'opening' && pose === 'open') return 'open'
  if (phase === 'closing' && pose === 'held') return 'returning'
  if (phase === 'returning' && pose === 'shelf') return null
  return phase
}

export function closeBookPhase(phase: BookPhase): BookPhase {
  if (phase === 'lifting' || phase === 'held') return 'returning'
  if (phase === 'opening' || phase === 'open') return 'closing'
  return phase
}
