import test from 'node:test'
import assert from 'node:assert/strict'
import { afterBookMotion, closeBookPhase, coverPauseMs } from '../src/components/bookInteraction.ts'

test('one physical book lifts, pauses, opens, closes and returns before shelf restoration', () => {
  assert.equal(coverPauseMs, 1000)
  assert.equal(afterBookMotion('lifting', 'held'), 'held')
  assert.equal(afterBookMotion('opening', 'open'), 'open')
  assert.equal(closeBookPhase('open'), 'closing')
  assert.equal(afterBookMotion('closing', 'held'), 'returning')
  assert.equal(afterBookMotion('returning', 'shelf'), null)
})

test('interruptions and stale motion completions cannot reopen or prematurely restore a book', () => {
  assert.equal(closeBookPhase('lifting'), 'returning')
  assert.equal(closeBookPhase('held'), 'returning')
  assert.equal(closeBookPhase('opening'), 'closing')
  assert.equal(closeBookPhase('closing'), 'closing')
  assert.equal(closeBookPhase('returning'), 'returning')
  assert.equal(afterBookMotion('closing', 'open'), 'closing')
  assert.equal(afterBookMotion('returning', 'held'), 'returning')
  assert.equal(afterBookMotion('held', 'shelf'), 'held')
})
