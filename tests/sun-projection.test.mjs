import test from 'node:test'
import assert from 'node:assert/strict'
import { foliageLayers, floorProjection, sunProjection } from '../src/environment/sunProjection.ts'

test('floor projections preserve the wall-floor junction for every sun position', () => {
  for (const sun of Object.values(sunProjection)) {
    const matrix = floorProjection(sun.floorStretch, sun.floorSkew).slice(7, -1).split(' ').map(Number)
    for (const x of [302, 800, 1365]) {
      assert.ok(Math.abs(matrix[0] * x + matrix[2] * 446 + matrix[4] - x) < .00001)
      assert.ok(Math.abs(matrix[1] * x + matrix[3] * 446 + matrix[5] - 446) < .00001)
    }
  }
})

test('foliage depths use different crops and motion periods; night has no solar contribution', () => {
  assert.equal(new Set(foliageLayers.map(layer => layer.crop)).size, 3)
  assert.equal(new Set(foliageLayers.map(layer => layer.duration)).size, 3)
  assert.ok(foliageLayers[0].blur > foliageLayers[1].blur)
  assert.ok(foliageLayers[1].blur > foliageLayers[2].blur)
  assert.equal(sunProjection.night.opacity, 0)
  assert.equal(sunProjection.night.intensity, 0)
})

test('daylight changes sides and night has neither rail nor sun shadows', () => {
  assert.equal(sunProjection.morning.side, 'left')
  for (const time of ['afternoon', 'evening']) {
    assert.equal(sunProjection[time].side, 'right')
    assert.ok(sunProjection[time].floorSkew < 0)
    assert.ok(sunProjection[time].rails > 0)
  }
  assert.equal(sunProjection.night.side, 'none')
  assert.equal(sunProjection.night.rails, 0)
})
