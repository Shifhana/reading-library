import test from 'node:test'
import assert from 'node:assert/strict'
import { breezeForce, stepBreeze } from '../src/components/readingBreezePhysics.ts'
import { breezeModules } from '../src/components/readingBreezeLayout.ts'
import { breezeResponse, panelPose, panelFaceMatrix, panelShadowMatrix, panelContactMatrix } from '../src/components/readingBreezeProjection.ts'
import { solarDirections } from '../src/environment/solarGeometry.ts'

const rest = { x: 0, y: 0, vx: 0, vy: 0 }
const apply = (m, x, y) => [m[0] * x + m[2] * y + m[4], m[1] * x + m[3] * y + m[5]]

test('the floating relief spans the wall with scale variation and no shared baseline', () => {
  assert.ok(breezeModules.length >= 8 && breezeModules.length <= 12)
  assert.equal(new Set(breezeModules.map(p => p.id)).size, breezeModules.length)
  const largeCount = breezeModules.filter(p => p.size === 'large').length
  const mediumCount = breezeModules.filter(p => p.size === 'medium').length
  assert.ok(largeCount >= 3 && largeCount <= 4)
  assert.ok(mediumCount >= 3 && mediumCount <= 5)
  assert.ok(new Set(breezeModules.map(p => p.y)).size > 5)
  assert.ok(new Set(breezeModules.map(p => p.depthMm)).size >= 3)
  for (const p of breezeModules) {
    assert.ok(p.depthMm >= 10 && p.depthMm <= 60)
    const matrix = panelFaceMatrix(panelPose(p, rest))
    for (const [u, v] of [[-.5, -.5], [.5, -.5], [-.5, .5], [.5, .5]]) {
      const [x, y] = apply(matrix, u * p.width, v * p.height)
      assert.ok(x > 333 && x < 1360 && y > 96 && y < 401, 'frame stays on plaster with breathing room')
    }
  }
  assert.ok(breezeModules.some(p => p.size === 'large' && p.x > 790 && p.x < 970), 'former clock area is part of the composition')
  const area = p => p.width * p.height
  const centre = breezeModules.reduce((sum, p) => sum + p.y * area(p), 0) / breezeModules.reduce((sum, p) => sum + area(p), 0)
  assert.ok(centre < 260, 'visual weight remains above the shelf zone')
})

test('woven shadow points lie on the same sun ray as their moving strands', () => {
  for (const p of breezeModules) {
    const pose = panelPose(p, { x: 3, y: -.8, vx: 0, vy: 0 })
    const [u, v] = [p.width * .2, -p.height * .3]
    const world = pose.origin.map((n, axis) => n + u * pose.u[axis] + v * pose.v[axis])
    for (const sun of [solarDirections.morning, solarDirections.afternoon, solarDirections.evening]) {
      const shadow = apply(panelShadowMatrix(pose, sun), u, v)
      const t = world[2] / sun[2]
      assert.ok(Math.abs(shadow[0] - (world[0] - sun[0] * t)) < 1e-8)
      assert.ok(Math.abs(shadow[1] - (world[1] + sun[1] * t)) < 1e-8)
    }
    assert.equal(panelShadowMatrix(pose, solarDirections.night), null)
  }
})

test('gust angles are bounded and the concealed mounts keep every panel off the wall', () => {
  for (const p of breezeModules) {
    for (const x of [-100, 0, 100]) {
      const pose = panelPose(p, { x, y: x, vx: 0, vy: 0 })
      assert.ok(Math.abs(pose.tilt) <= 3)
      assert.ok(Math.abs(p.tilt + pose.tilt) <= 3, 'total yaw stays within three degrees')
      assert.ok(pose.origin[2] / .125 <= 60, 'clearance adjustment keeps the relief shallow')
      const nearest = pose.origin[2] - Math.abs(pose.u[2]) * p.width / 2 - Math.abs(pose.v[2]) * p.height / 2
      assert.ok(nearest >= 1.39)
    }
  }
})

test('contact cues stay close to the panels, including ambient-only night shading', () => {
  for (const p of breezeModules) {
    const pose = panelPose(p, { x: 100, y: -100, vx: 0, vy: 0 })
    const face = panelFaceMatrix(pose)
    for (const sun of Object.values(solarDirections)) {
      const contact = panelContactMatrix(pose, sun)
      assert.deepEqual(contact.slice(0, 4), face.slice(0, 4), 'no patterned projection distortion')
      assert.ok(Math.hypot(contact[4] - face[4], contact[5] - face[5]) <= 3.00001)
    }
  }
})

test('large woven panels respond more slowly and less strongly than small accents', () => {
  const responses = Object.fromEntries(Object.entries(breezeResponse).map(([size, response]) => {
    let state = { ...rest }
    for (let i = 0; i < 20; i++) state = stepBreeze(state, { x: 7 * response.gain, y: 0 }, 1 / 60, 0, response.mass)
    return [size, state.x]
  }))
  assert.ok(responses.large < responses.medium && responses.medium < responses.small)
})

test('breeze is local, repels away from the pointer and responds to speed', () => {
  const pointer = { x: 0, y: 0, active: true, speed: 20 }
  const slow = breezeForce(25, 10, pointer, false)
  const fast = breezeForce(25, 10, { ...pointer, speed: 1100 }, false)
  assert.ok(slow.x > 0 && slow.y > 0)
  assert.ok(fast.x > slow.x * 3)
  assert.deepEqual(breezeForce(100, 0, pointer, false), { x: 0, y: 0 })
  assert.deepEqual(breezeForce(25, 10, { ...pointer, active: false }, false), { x: 0, y: 0 })
  assert.ok(breezeForce(25, 10, pointer, true).x < slow.x * .15)
})

test('pieces retain momentum after a gust, then settle without snapping', () => {
  let state = { x: 0, y: 0, vx: 0, vy: 0 }
  for (let i = 0; i < 30; i++) state = stepBreeze(state, { x: 9, y: 2 }, 1 / 60, 3)
  const next = stepBreeze(state, { x: 0, y: 0 }, 1 / 60, 3)
  assert.ok(Math.abs(next.x) > 1)
  assert.ok(Math.abs(next.x - state.x) < 1)
  for (let i = 0; i < 900; i++) state = stepBreeze(state, { x: 0, y: 0 }, 1 / 60, 3)
  assert.ok(Math.abs(state.x) < .001 && Math.abs(state.vx) < .001)
})

test('large frame gaps stay bounded and pointer coincidence stays finite', () => {
  const force = breezeForce(0, 0, { x: 0, y: 0, active: true, speed: 99999 }, false)
  let state = { x: 0, y: 0, vx: 0, vy: 0 }
  for (let i = 0; i < 600; i++) state = stepBreeze(state, { x: 12, y: 3 }, 50, 0)
  assert.ok(Object.values(force).every(Number.isFinite))
  assert.ok(Object.values(state).every(Number.isFinite))
  assert.ok(Math.abs(state.x) < 14)
})
