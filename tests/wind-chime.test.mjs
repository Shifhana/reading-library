import test from 'node:test'
import assert from 'node:assert/strict'
import { chimeTarget, stepChime, resolveChimeContacts, createChimeBreeze, chimeTimeSettings } from '../src/components/windChimeMotion.ts'
import { chimeBodies } from '../src/components/windChimeLayout.ts'

function seededRandom(seed = 73) {
  return () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 2 ** 32 }
}

test('continuous wind changes strength irregularly without a discontinuity at each join', () => {
  const random = seededRandom()
  let breeze = createChimeBreeze(0, random)
  const durations = [], strengths = []
  for (let i = 0; i < 20; i++) {
    assert.ok(breeze.duration >= 12 && breeze.duration <= 26)
    durations.push(breeze.duration); strengths.push(breeze.nextStrength)
    const next = createChimeBreeze(breeze.nextStart, random, breeze)
    for (let strand = 0; strand < 10; strand++) {
      assert.ok(Math.abs(chimeTarget(breeze.nextStart, strand, breeze) - chimeTarget(breeze.nextStart, strand, next)) < 1e-12)
    }
    breeze = next
  }
  assert.equal(new Set(durations).size, 20)
  assert.equal(new Set(strengths).size, 20)
})

test('independent spring motion stays bounded after stalled frames and settles when forcing stops', () => {
  const breeze = createChimeBreeze(0, seededRandom())
  const angles = []
  for (let i = 0; i < 10; i++) {
    let state = { angle: 0, velocity: 0 }
    for (let n = 0; n < 1800; n++) {
      state = stepChime(state, chimeTarget(n / 60, i, breeze), n === 300 ? 30 : 1 / 60, i)
      assert.ok(Number.isFinite(state.velocity) && Math.abs(state.angle) <= 1.2)
      if (n === 240) angles.push(state.angle)
    }
    for (let n = 0; n < 1200; n++) state = stepChime(state, 0, 1 / 60, i)
    assert.deepEqual(state, { angle: 0, velocity: 0 })
  }
  assert.equal(new Set(angles).size, 10)
})

test('overlapping strips exchange a damped impulse, while separated heights cannot collide', () => {
  const states = [{ angle: -.8, velocity: -1 }, { angle: .8, velocity: 1 }]
  const bodies = [{ x: 0, y: 0, top: 40, bottom: 140, width: 4 }, { x: 6, y: 0, top: 45, bottom: 130, width: 4 }]
  const contacts = resolveChimeContacts(states, bodies)
  assert.ok(contacts.length > 0)
  assert.ok(Math.abs(states[0].velocity) < 1 && Math.abs(states[1].velocity) < 1)
  assert.deepEqual(resolveChimeContacts(states, [bodies[0], { ...bodies[1], top: 150, bottom: 220 }]), [])
})

test('the actual linear band keeps moving in every time state with calmer night contacts', () => {
  const results = {}
  for (const [time, conditions] of Object.entries(chimeTimeSettings)) {
    const random = seededRandom()
    let breeze = createChimeBreeze(0, random), seconds = 0
    let states = chimeBodies.map(() => ({ angle: 0, velocity: 0 }))
    let contacts = 0, moving = 0, energy = 0
    const travel = states.map(() => 0)
    for (let n = 0; n < 14400; n++) {
      seconds += conditions.speed / 60
      if (seconds >= breeze.nextStart) breeze = createChimeBreeze(seconds, random, breeze)
      states = states.map((state, i) => {
        const next = stepChime(state, chimeTarget(seconds, i, breeze) * conditions.motion, 1 / 60, i)
        travel[i] += Math.abs(next.angle - state.angle)
        return next
      })
      contacts += resolveChimeContacts(states, chimeBodies).filter(contact => contact.speed > .07).length
      states.forEach(state => assert.ok(Number.isFinite(state.velocity) && Math.abs(state.angle) <= 1.2 && Math.abs(state.velocity) < 10))
      if (states.some(state => Math.abs(state.angle) > .005)) moving++
      energy += states.reduce((sum, state) => sum + state.angle ** 2, 0)
    }
    assert.ok(contacts > 0, `${time}: contact still possible`)
    assert.ok(moving / 14400 > .99, `${time}: continuously active`)
    assert.ok(travel.every(distance => distance > 10), `${time}: every individual strand keeps swaying`)
    assert.equal(new Set(travel.map(distance => distance.toFixed(3))).size, 10, `${time}: independent rhythms`)
    results[time] = { contacts, energy }
  }
  assert.ok(results.night.contacts < results.evening.contacts && results.evening.contacts < results.morning.contacts)
  assert.ok(results.night.energy < results.evening.energy && results.evening.energy < results.morning.energy)
  assert.ok(results.morning.energy < results.afternoon.energy, 'afternoon is a little more active than morning')
})
