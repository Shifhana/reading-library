import test from 'node:test'
import assert from 'node:assert/strict'
import { project, receiver, solarVisibility, solarDirections, jaaliOpen } from '../src/environment/solarGeometry.ts'

test('one camera round-trips wall, floor and ledge receiver coordinates', () => {
  for (const [surface, p] of [['wall', [3, 1, 0]], ['floor', [3, 0, 5]], ['ledge', [7.7, .45, 3]]]) {
    const screen = project(p)
    const restored = receiver(...screen, surface)
    p.forEach((value, i) => assert.ok(Math.abs(value - restored[i]) < 1e-8))
  }
  assert.deepEqual(receiver(328, 446, 'wall'), receiver(328, 446, 'floor'))
})
test('jaali passes aperture rays, blocks mortar and accounts for reveal depth', () => {
  assert.equal(jaaliOpen(.65, .16), true)
  assert.equal(jaaliOpen(.8, .16), false)
  assert.equal(solarVisibility([7.8, .55, .16], [1, .5, 0]), 1)
  assert.equal(solarVisibility([7.8, .55, .01], [1, .5, 0]), 0)
  assert.equal(solarVisibility([7.8, .55, .16], [1, .9, 0]), 0)
})
test('roof blocks high rays; rods block only their own projected footprint', () => {
  assert.equal(solarVisibility([4, 0, 1], [1, 2, 0]), 0)
  assert.equal(solarVisibility([7, 1.2, .22], [1, .4, 0]), 0)
  assert.equal(solarVisibility([7, 1.2, .11], [1, .4, 0]), 1)
  assert.ok(solarDirections.morning[0] < 0)
  assert.ok(solarDirections.evening[0] > 0)
  assert.ok(solarDirections.afternoon[1] > solarDirections.evening[1])
  assert.equal(solarDirections.night, null)
})
