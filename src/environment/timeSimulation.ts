import type { TimeName } from './atmosphere'

export type TimeMode = TimeName | 'live'
const modes: readonly TimeMode[] = ['morning', 'afternoon', 'evening', 'night', 'live']
export function nextTimeMode(mode: TimeMode): TimeMode {
  return modes[(modes.indexOf(mode) + 1) % modes.length]
}
