export type WeatherKind = 'sunny' | 'cloudy' | 'rain' | 'fog'
export type TimeName = 'morning' | 'afternoon' | 'evening' | 'night'
export const previewHours: Record<TimeName, number> = { morning: 9, afternoon: 13, evening: 17, night: 22 }
export function timeStateAt(hour: number): TimeName {
  const h = ((hour % 24) + 24) % 24
  return h >= 6 && h < 11 ? 'morning' : h >= 11 && h < 16 ? 'afternoon' : h >= 16 && h < 19 ? 'evening' : 'night'
}
// Diffuse daylight keeps the photograph's material and contact shading intact.
// No projected foliage graphic or wall/floor overlay is used.
const visuals = {
  morning: { exposure: .98, contrast: 1.02, warmth: .03, exterior: .98 },
  afternoon: { exposure: 1.03, contrast: 1.04, warmth: 0, exterior: 1.02 },
  evening: { exposure: .86, contrast: 1.03, warmth: .16, exterior: .72 },
  night: { exposure: .36, contrast: 1.04, warmth: 0, exterior: .13 },
}
export function atmosphereAt(hour: number) {
  const time = timeStateAt(hour)
  return { time, ...visuals[time], bookBrightness: visuals[time].exposure }
}

export function classifyWeather(code: number): { kind: WeatherKind | null; label: string } {
  if (code === 0 || code === 1) return { kind: 'sunny', label: 'Clear' }
  if (code === 2 || code === 3) return { kind: 'cloudy', label: 'Cloudy' }
  if (code === 45 || code === 48) return { kind: 'fog', label: 'Mist' }
  if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)) return { kind: 'rain', label: code >= 95 ? 'Thunderstorms' : 'Rain' }
  // Honest labels for unsupported visuals; snow uses diffuse cloud lighting.
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { kind: 'cloudy', label: 'Snow' }
  return { kind: null, label: 'Current weather' }
}


