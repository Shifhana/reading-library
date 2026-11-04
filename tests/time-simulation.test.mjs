import test from 'node:test'
import assert from 'node:assert/strict'
import { nextTimeMode } from '../src/environment/timeSimulation.ts'

test('panel simulation cycles every preset and restores live before restarting', () => {
  let mode = 'live'
  const cycle = Array.from({ length: 6 }, () => (mode = nextTimeMode(mode)))
  assert.deepEqual(cycle, ['morning', 'afternoon', 'evening', 'night', 'live', 'morning'])
})
