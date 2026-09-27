import { classifyWeather, type WeatherKind } from './atmosphere.ts'

export type Place = { name: string; region: string; latitude: number; longitude: number }
export type Weather = { kind: WeatherKind | null; label: string; temperature: number }
export const WEATHER_TTL = 20 * 60 * 1000
const preferenceKey = 'reading-garden-place-v1'
const memory = new Map<string, { expires: number; value: unknown }>()
const pending = new Map<string, Promise<unknown>>()

function read(key: string): unknown {
  try { return JSON.parse(localStorage.getItem(key) ?? 'null') } catch { return null }
}
function write(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* Private/offline storage is optional. */ }
}
function record(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? value as Record<string, unknown> : {}
}
export function validPlace(value: unknown): value is Place {
  const p = record(value)
  return typeof p.name === 'string' && p.name.length > 0 && p.name.length < 160 && typeof p.region === 'string'
    && typeof p.latitude === 'number' && Number.isFinite(p.latitude) && Math.abs(p.latitude) <= 90
    && typeof p.longitude === 'number' && Number.isFinite(p.longitude) && Math.abs(p.longitude) <= 180
}
export function savedPlace(): Place | null {
  const p = read(preferenceKey)
  return validPlace(p) ? p : null
}
export function savePlace(place: Place | null) { write(preferenceKey, place) }

async function json(url: string, signal?: AbortSignal): Promise<Record<string, unknown>> {
  const timeout = AbortSignal.timeout(8000)
  const response = await fetch(url, { signal: signal ? AbortSignal.any([timeout, signal]) : timeout, credentials: 'omit', referrerPolicy: 'no-referrer' })
  if (!response.ok) throw new Error('Environmental data unavailable')
  return record(await response.json())
}

// Deduplicate StrictMode/concurrent mounts, including failures. Only sanitized
// city/weather fields are cached; the IP response itself is never persisted.
async function cached<T>(key: string, ttl: number, valid: (value: unknown) => value is T, fetcher: () => Promise<T>): Promise<T | null> {
  const stored = memory.get(key) ?? record(read(key))
  if (typeof stored.expires === 'number' && stored.expires > Date.now() && stored.expires <= Date.now() + ttl) {
    if (stored.value === null) return null
    if (valid(stored.value)) return stored.value
  }
  if (pending.has(key)) return pending.get(key) as Promise<T | null>
  const request = (async () => {
    let value: T | null = null
    try { value = await fetcher() } catch { /* The local-time scene remains available. */ }
    const entry = { expires: Date.now() + (value ? ttl : WEATHER_TTL), value }
    memory.set(key, entry)
    write(key, entry)
    return value
  })()
  pending.set(key, request)
  try { return await request } finally { pending.delete(key) }
}

export function automaticPlace(): Promise<Place | null> {
  return cached('reading-garden-ip-v1', 6 * 60 * 60 * 1000, validPlace, async () => {
    const data = await json('https://ipapi.co/json/')
    const place = { name: data.city || data.region, region: data.country_name || '', latitude: data.latitude, longitude: data.longitude }
    if (data.error || !validPlace(place)) throw new Error('No approximate place')
    return place
  })
}

function validWeather(value: unknown): value is Weather {
  const w = record(value)
  return typeof w.temperature === 'number' && Number.isFinite(w.temperature) && w.temperature > -100 && w.temperature < 70
    && typeof w.label === 'string' && [null, 'sunny', 'cloudy', 'rain', 'fog'].includes(w.kind as string | null)
}
export function currentWeather(place: Place): Promise<Weather | null> {
  const coordinates = `${place.latitude.toFixed(2)},${place.longitude.toFixed(2)}`
  return cached(`reading-garden-weather-v1:${coordinates}`, WEATHER_TTL, validWeather, async () => {
    const query = new URLSearchParams({ latitude: String(place.latitude), longitude: String(place.longitude), current: 'temperature_2m,weather_code', temperature_unit: 'celsius' })
    const data = await json(`https://api.open-meteo.com/v1/forecast?${query}`)
    const current = record(data.current)
    if (typeof current.weather_code !== 'number' || typeof current.temperature_2m !== 'number') throw new Error('Invalid current weather')
    const weather = { ...classifyWeather(current.weather_code), temperature: current.temperature_2m }
    if (!validWeather(weather)) throw new Error('Invalid weather')
    return weather
  })
}

export async function searchCities(query: string, signal: AbortSignal): Promise<Place[]> {
  if (query.trim().length < 2) return []
  const params = new URLSearchParams({ name: query.trim(), count: '5', language: 'en', format: 'json' })
  const data = await json(`https://geocoding-api.open-meteo.com/v1/search?${params}`, signal)
  return (Array.isArray(data.results) ? data.results : []).map((entry) => {
    const p = record(entry)
    return { name: p.name, region: [p.admin1, p.country].filter(Boolean).join(', '), latitude: p.latitude, longitude: p.longitude }
  }).filter(validPlace)
}
