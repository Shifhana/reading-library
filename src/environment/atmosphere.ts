export type WeatherKind = 'sunny' | 'cloudy' | 'rain' | 'fog'
export type TimeName = 'morning' | 'afternoon' | 'evening' | 'night'
export const previewHours: Record<TimeName, number> = { morning: 9, afternoon: 13, evening: 17, night: 22 }
export function timeStateAt(hour: number): TimeName {
  const h = ((hour % 24) + 24) % 24
  return h >= 6 && h < 11 ? 'morning' : h >= 11 && h < 16 ? 'afternoon' : h >= 16 && h < 19 ? 'evening' : 'night'
}
// Ambient exposure stays restrained beneath the separate directional daylight.
// The neutral photograph retains material texture and baked contact shading.
const visuals = {
  morning: { exposure: .97, contrast: 1.05, warmth: .04, exterior: 1.01 },
  afternoon: { exposure: 1.01, contrast: 1.06, warmth: 0, exterior: 1.03 },
  evening: { exposure: .86, contrast: 1.03, warmth: .16, exterior: .72 },
  night: { exposure: .52, contrast: 1.02, warmth: .04, exterior: .18 },
}
export function atmosphereAt(hour: number) {
  const time = timeStateAt(hour)
  // A small amount of interior bounce keeps book forms readable at night.
  return { time, ...visuals[time], bookBrightness: time === 'night' ? .74 : visuals[time].exposure }
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


