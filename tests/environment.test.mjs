import test from 'node:test'
import assert from 'node:assert/strict'
import { atmosphereAt, classifyWeather, previewHours } from '../src/environment/atmosphere.ts'
import { automaticPlace, currentWeather, savePlace, savedPlace, validPlace, WEATHER_TTL, searchCities } from '../src/environment/services.ts'

test('four local time boundaries and daylight exposure', () => {
  for (const [hour, expected] of [[0,'night'],[5.999,'night'],[6,'morning'],[10.999,'morning'],[11,'afternoon'],[15.999,'afternoon'],[16,'evening'],[18.999,'evening'],[19,'night'],[24,'night']]) assert.equal(atmosphereAt(hour).time, expected)
  const states = Object.values(previewHours).map(atmosphereAt)
  assert.ok(states[1].exposure > states[0].exposure)
  assert.ok(states[0].exposure > states[2].exposure)
  assert.ok(states[2].exposure > states[3].exposure)
})

test('weather codes distinguish rain, fog, cloud and unsupported snow honestly', () => {
  assert.equal(classifyWeather(0).kind, 'sunny')
  assert.equal(classifyWeather(3).kind, 'cloudy')
  assert.equal(classifyWeather(48).kind, 'fog')
  assert.equal(classifyWeather(63).kind, 'rain')
  assert.equal(classifyWeather(95).label, 'Thunderstorms')
  assert.equal(classifyWeather(73).label, 'Snow')
  assert.equal(classifyWeather(999).kind, null)
})

test('cache, deduplication, expiry, manual preference, and failure fallbacks', async () => {
  const storage = new Map()
  const originalFetch = globalThis.fetch, originalNow = Date.now
  const storageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  } })
  let now = 1_000_000, calls = 0
  Date.now = () => now
  const city = { name: 'Letterkenny', region: 'Ireland', latitude: 54.95, longitude: -7.73 }
  try {
    globalThis.fetch = async (url) => {
      calls++
      return new Response(JSON.stringify(String(url).includes('ipapi')
        ? { city: city.name, country_name: city.region, latitude: city.latitude, longitude: city.longitude, ip: 'not-stored', timezone: 'ignored' }
        : { current: { temperature_2m: 12, weather_code: 3 } }))
    }
    const places = await Promise.all([automaticPlace(), automaticPlace()])
    assert.deepEqual(places, [city, city]); assert.equal(calls, 1)
    assert.ok(!JSON.stringify([...storage]).includes('not-stored'))
    const weather = await Promise.all([currentWeather(city), currentWeather(city)])
    assert.equal(calls, 2); assert.equal(weather[0].temperature, 12)
    now += WEATHER_TTL - 1
    await currentWeather(city); assert.equal(calls, 2)
    now += 2
    await currentWeather(city); assert.equal(calls, 3)
    savePlace(city); assert.deepEqual(savedPlace(), city)
    savePlace(null); assert.equal(savedPlace(), null)
    assert.equal(validPlace({ ...city, latitude: 91 }), false)
    assert.equal(validPlace({ ...city, longitude: NaN }), false)
    storage.set('reading-garden-place-v1', '{bad json')
    assert.equal(savedPlace(), null)
    globalThis.fetch = async () => { calls++; throw new Error('Offline') }
    now += WEATHER_TTL + 1
    assert.equal(await currentWeather(city), null)
    const afterFailure = calls
    assert.equal(await currentWeather(city), null); assert.equal(calls, afterFailure)
    now += 7 * 60 * 60 * 1000
    assert.equal(await automaticPlace(), null)
    Object.defineProperty(globalThis, 'localStorage', { configurable: true, get() { throw new Error('Storage disabled') } })
    savePlace(city); assert.equal(savedPlace(), null)
    globalThis.fetch = async () => new Response(JSON.stringify({ results: [{ name: 'Bengaluru', country: 'India', latitude: 12.97, longitude: 77.59 }, { name: 'Broken' }] }))
    const matches = await searchCities('Bengaluru', new AbortController().signal)
    assert.equal(matches.length, 1); assert.equal(matches[0].name, 'Bengaluru')
    globalThis.fetch = async () => new Response(JSON.stringify({ current: { temperature_2m: null, weather_code: 0 } }))
    assert.equal(await currentWeather(matches[0]), null)
  } finally {
    globalThis.fetch = originalFetch; Date.now = originalNow
    if (storageDescriptor) Object.defineProperty(globalThis, 'localStorage', storageDescriptor)
    else delete globalThis.localStorage
  }
})

