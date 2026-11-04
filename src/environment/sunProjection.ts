import type { TimeName } from './atmosphere'

// Coordinates are in the unchanged photograph's 1855 × 848 viewBox.
export const foliageLayers = [
  { id: 'canopy', crop: '0 80 1050 750', x: 170, y: 30, width: 1080, height: 690, rotation: -7, opacity: .085, blur: 4.8, duration: 29, delay: -11 },
  { id: 'middle', crop: '340 160 1050 650', x: 310, y: 100, width: 900, height: 570, rotation: 5, opacity: .16, blur: 1.4, duration: 23, delay: -7 },
  { id: 'branch', crop: '100 310 980 580', x: 230, y: 190, width: 760, height: 390, rotation: -13, opacity: .105, blur: .35, duration: 19, delay: -3 },
] as const

export const sunProjection = {
  morning: { side: 'left', rails: 0, x: 0, y: -40, scale: 1, rotation: -3, skew: -4, floorStretch: 1.3, floorSkew: .7, blur: 1, opacity: 1, warmth: '#ffe6b8', intensity: .26 },
  afternoon: { side: 'right', rails: .10, x: 95, y: 20, scale: .82, rotation: 4, skew: 1, floorStretch: .94, floorSkew: -.55, blur: .75, opacity: 1.1, warmth: '#fff0d6', intensity: .34 },
  evening: { side: 'right', rails: .075, x: -45, y: 45, scale: 1.12, rotation: -9, skew: -8, floorStretch: 1.55, floorSkew: -.95, blur: 1.35, opacity: .95, warmth: '#ffcd88', intensity: .34 },
  night: { side: 'none', rails: 0, x: 0, y: 0, scale: 1, rotation: 0, skew: 0, floorStretch: 1, floorSkew: 0, blur: 1, opacity: 0, warmth: '#fff0d6', intensity: 0 },
} satisfies Record<TimeName, object>

export function floorProjection(stretch: number, skew: number) {
  // All points on the wall/floor junction stay fixed, while the horizontal
  // receiver reverses vertical direction and stretches along the sun vector.
  return `matrix(1 0 ${skew} ${-stretch} ${-446 * skew} ${446 * (1 + stretch)})`
}
