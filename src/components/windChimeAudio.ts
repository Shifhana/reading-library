import { chimeTimeSettings, type ChimeConditions, type ChimeContact } from './windChimeMotion.ts'

// No context or audio is created before a trusted interaction in the room.
export function createChimeAudio(random = Math.random, makeContext = () => new AudioContext()) {
  let context: AudioContext | undefined
  let output: GainNode | undefined
  let active = true, disposed = false, unlocked = false
  let nextNote = -Infinity
  let recentNotes: number[] = []
  const pairTimes = new Map<string, number>()
  const voices = new Set<OscillatorNode>()

  const unlock = () => {
    if (disposed || !active || context?.state === 'running') return
    try {
      if (!context) {
        context = makeContext()
        output = context.createGain()
        output.gain.value = .7
        output.connect(context.destination)
      }
      void context.resume().then(() => { unlocked = true }).catch(() => {})
    } catch { /* Audio unavailable: keep the visual chime working. */ }
  }

  return {
    unlock,
    setActive(value: boolean) {
      active = value
      if (!context || !output) return
      const now = context.currentTime
      output.gain.cancelScheduledValues(now)
      output.gain.setTargetAtTime(value ? .7 : 0, now, .015)
      if (!value) voices.forEach(voice => voice.stop(now + .06))
      else if (unlocked && context.state === 'suspended') void context.resume().catch(() => {})
    },
    strike(contact: ChimeContact, conditions: ChimeConditions = chimeTimeSettings.afternoon) {
      if (disposed || !active || !unlocked || !context || !output || context.state !== 'running' || contact.speed < .05) return false
      const now = context.currentTime
      const pair = `${contact.a}:${contact.b}`
      recentNotes = recentNotes.filter(time => now - time < 9)
      if (recentNotes.length >= 3 || now < nextNote || now - (pairTimes.get(pair) ?? -Infinity) < conditions.minInterval * 1.8) return false
      pairTimes.set(pair, now)
      // Only a new physical contact can add a note. Sometimes admit a nearby
      // different pair sooner, so 2–3 tails can overlap before the quiet gap.
      const scatteredContact = random() < .5 * conditions.volume
      nextNote = now + (scatteredContact ? .28 + random() * .72
        : conditions.minInterval + random() * (conditions.maxInterval - conditions.minInterval))
      recentNotes.push(now)
      // Inharmonic metal modes, varied by the physical piece and each impact.
      const piece = random() < .5 ? contact.a : contact.b
      const frequency = [659.25, 783.99, 880, 587.33, 659.25, 1046.5, 587.33, 783.99, 880, 659.25][piece % 10]
        * (1 + (random() - .5) * .01)
      const volume = Math.min(.0145, .0031 + contact.speed * .0068) * conditions.volume * (.9 + random() * .15)
      const filter = context.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 2250 + random() * 350
      const pan = context.createStereoPanner()
      pan.pan.value = (contact.a / 9 - .5) * .25
      filter.connect(pan).connect(output)
      const tail = 3.5 + (piece % 4) * .19 + random() * .65
      const attack = .018 + random() * .009
      let remaining = 3
      for (const [ratio, level, decay] of [[1, 1, tail], [2.756, .14, 1.45], [5.404, .018, .52]]) {
        const oscillator = context.createOscillator()
        const gain = context.createGain()
        oscillator.frequency.value = frequency * ratio
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(volume * level, now + attack)
        gain.gain.exponentialRampToValueAtTime(.00001, now + decay)
        oscillator.connect(gain).connect(filter)
        voices.add(oscillator)
        oscillator.onended = () => {
          voices.delete(oscillator)
          oscillator.disconnect()
          gain.disconnect()
          if (--remaining === 0) { filter.disconnect(); pan.disconnect() }
        }
        oscillator.start(now)
        oscillator.stop(now + decay + .05)
      }
      return true
    },
    dispose() {
      disposed = true
      if (context) void context.close().catch(() => {})
      voices.clear()
    },
  }
}
