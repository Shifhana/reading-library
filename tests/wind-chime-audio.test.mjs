import test from 'node:test'
import assert from 'node:assert/strict'
import { createChimeAudio } from '../src/components/windChimeAudio.ts'
import { chimeBodies } from '../src/components/windChimeLayout.ts'
import { createChimeBreeze, chimeTarget, stepChime, resolveChimeContacts, chimeTimeSettings } from '../src/components/windChimeMotion.ts'

function mockAudio() {
  let created = 0, closed = false
  const oscillators = [], gains = [], filters = [], pans = []
  const param = () => ({ value: 0, peak: 0, cancelScheduledValues() {}, setTargetAtTime(value) { this.value = value }, setValueAtTime() {}, linearRampToValueAtTime(value) { this.peak = value }, exponentialRampToValueAtTime() {} })
  const node = () => ({ disconnected: false, connect(target) { return target }, disconnect() { this.disconnected = true } })
  const context = {
    state: 'suspended', currentTime: 0, destination: {},
    resume() { this.state = 'running'; return Promise.resolve() },
    close() { closed = true; this.state = 'closed'; return Promise.resolve() },
    createGain() { const gain = { ...node(), gain: param() }; gains.push(gain); return gain },
    createBiquadFilter() { const filter = { ...node(), frequency: param() }; filters.push(filter); return filter },
    createStereoPanner() { const pan = { ...node(), pan: param() }; pans.push(pan); return pan },
    createOscillator() {
      const oscillator = { ...node(), frequency: param(), start() {}, stop(time) { this.stopAt = time } }
      oscillators.push(oscillator); return oscillator
    },
  }
  const factory = () => { created++; return context }
  return { context, factory, oscillators, gains, filters, pans, get created() { return created }, get closed() { return closed } }
}
const contact = (a = 0, speed = .6) => ({ a, b: a + 1, speed })
function seededRandom(seed = 12) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32)
}

test('audio waits for activation, rejects weak contacts and chatter, limits bursts and varies timbre', async () => {
  const mock = mockAudio()
  const audio = createChimeAudio(seededRandom(), mock.factory)
  assert.equal(audio.strike(contact()), false)
  assert.equal(mock.created, 0)
  audio.unlock()
  await Promise.resolve()
  assert.equal(mock.created, 1)
  assert.equal(audio.strike(contact(0, .01)), false)
  assert.equal(mock.oscillators.length, 0)
  assert.equal(audio.strike(contact()), true)
  assert.equal(audio.strike(contact(1)), false)
  mock.context.currentTime = 2.6
  assert.equal(audio.strike(contact(1)), true)
  mock.context.currentTime = 5.2
  assert.equal(audio.strike(contact(2)), true)
  mock.context.currentTime = 8
  assert.equal(audio.strike(contact(3)), false) // no more than three notes in nine seconds
  mock.context.currentTime = 10
  assert.equal(audio.strike(contact()), true)
  assert.notEqual(mock.oscillators[0].frequency.value, mock.oscillators[9].frequency.value)
  for (const oscillator of mock.oscillators) oscillator.onended()
  assert.ok(mock.filters.every(filter => filter.disconnected))
  assert.ok(mock.pans.every(pan => pan.disconnected))
  assert.ok(mock.oscillators.every(oscillator => oscillator.disconnected))
  audio.dispose()
  audio.unlock()
  assert.ok(mock.closed)
  assert.equal(mock.created, 1)
})

test('reduced motion/hidden state silences tails and prevents playback; disposal closes audio', async () => {
  const mock = mockAudio()
  const audio = createChimeAudio(() => .5, mock.factory)
  audio.setActive(false)
  audio.unlock()
  assert.equal(mock.created, 0)
  audio.setActive(true)
  audio.unlock()
  await Promise.resolve()
  assert.equal(audio.strike(contact()), true)
  audio.setActive(false)
  assert.equal(mock.gains[0].gain.value, 0)
  assert.ok(mock.oscillators.every(oscillator => oscillator.stopAt === .06))
  mock.context.currentTime = 4
  assert.equal(audio.strike(contact(1)), false)
  audio.setActive(true)
  assert.equal(audio.strike(contact(1)), true)
  audio.dispose()
  assert.equal(audio.strike(contact(2)), false)
  assert.ok(mock.closed)
})

test('separate contacts can overlap softly in threes, followed by a quiet gap without scheduled notes', async () => {
  const mock = mockAudio()
  const audio = createChimeAudio(() => .1, mock.factory)
  audio.unlock()
  await Promise.resolve()
  mock.context.currentTime = 30
  assert.equal(mock.oscillators.length, 0, 'activation and elapsed time alone make no sound')
  assert.equal(audio.strike(contact(0, .06)), true)
  mock.context.currentTime = 30.2
  assert.equal(audio.strike(contact(1)), false, 'contacts cannot chatter in the same instant')
  mock.context.currentTime = 30.6
  assert.equal(audio.strike(contact(0)), false, 'one pair cannot retrigger its ringing contact')
  assert.equal(audio.strike(contact(1, .4)), true)
  mock.context.currentTime = 31.2
  assert.equal(audio.strike(contact(2, .8)), true)
  assert.ok(mock.oscillators[0].stopAt > 31.2, 'three separate notes overlap naturally')
  assert.equal(new Set([0, 3, 6].map(i => mock.oscillators[i].frequency.value)).size, 3)
  assert.ok(mock.gains[1].gain.peak < mock.gains[4].gain.peak && mock.gains[4].gain.peak < mock.gains[7].gain.peak)
  assert.ok(mock.gains.every(gain => gain.gain.peak < .02), 'even the stronger contact remains quiet')
  for (const time of [32, 35, 38.9]) {
    mock.context.currentTime = time
    assert.equal(audio.strike(contact(3)), false, 'a small group leaves a real quiet gap')
  }
  assert.equal(mock.oscillators.length, 9)
  mock.context.currentTime = 40
  assert.equal(audio.strike(contact(3)), true)
  mock.context.currentTime = 100
  assert.equal(mock.oscillators.length, 12, 'no loop or timer schedules extra notes')
  audio.dispose()
})

test('blocked activation is retried on a later gesture; unavailable audio is harmless', async () => {
  const mock = mockAudio()
  let resumes = 0
  mock.context.resume = function () {
    if (++resumes === 1) return Promise.reject(new Error('autoplay blocked'))
    this.state = 'running'; return Promise.resolve()
  }
  const audio = createChimeAudio(() => .5, mock.factory)
  audio.unlock()
  await Promise.resolve(); await Promise.resolve()
  assert.equal(audio.strike(contact()), false)
  audio.unlock()
  await Promise.resolve()
  assert.equal(audio.strike(contact()), true)
  audio.dispose()
  const unsupported = createChimeAudio(() => .5, () => { throw new Error('unavailable') })
  assert.doesNotThrow(() => unsupported.unlock())
  assert.equal(unsupported.strike(contact()), false)
  unsupported.dispose()
})

test('real contacts produce quieter, less frequent notes at night while remaining active', async () => {
  const results = {}
  for (const time of ['morning', 'afternoon', 'evening', 'night']) {
    const mock = mockAudio(), conditions = chimeTimeSettings[time]
    const audio = createChimeAudio(seededRandom(), mock.factory)
    audio.unlock()
    await Promise.resolve()
    const random = seededRandom(73)
    let breeze = createChimeBreeze(0, random), seconds = 0
    let states = chimeBodies.map(() => ({ angle: 0, velocity: 0 }))
    const noteTimes = []
    for (let n = 0; n < 14400; n++) {
      mock.context.currentTime = n / 60
      seconds += conditions.speed / 60
      if (seconds >= breeze.nextStart) breeze = createChimeBreeze(seconds, random, breeze)
      states = states.map((state, i) => stepChime(state, chimeTarget(seconds, i, breeze) * conditions.motion, 1 / 60, i))
      for (const hit of resolveChimeContacts(states, chimeBodies)) {
        if (audio.strike(hit, conditions)) noteTimes.push(n / 60)
      }
    }
    assert.ok(noteTimes.length > 0)
    for (let i = 0; i < noteTimes.length; i++) assert.ok(noteTimes.filter(t => t >= noteTimes[i] && t < noteTimes[i] + 9).length <= 3)
    if (time === 'afternoon') {
      assert.ok(noteTimes.some((time, i) => i > 0 && time - noteTimes[i - 1] < 1), 'actual neighbouring contacts can make a delicate group')
      assert.ok(noteTimes.some((time, i) => i > 0 && time - noteTimes[i - 1] > 5), 'contact-driven groups leave quiet gaps')
    }
    results[time] = { notes: noteTimes.length, peak: Math.max(...mock.gains.map(gain => gain.gain.peak)) }
    audio.dispose()
  }
  assert.ok(results.night.notes < results.evening.notes && results.evening.notes < results.afternoon.notes)
  assert.ok(results.night.peak < results.evening.peak && results.evening.peak < results.afternoon.peak)
})
