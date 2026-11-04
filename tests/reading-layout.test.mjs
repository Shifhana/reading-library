import test from 'node:test'
import assert from 'node:assert/strict'
import { readingLayout } from '../src/components/readingLayout.ts'

test('desktop spread fills the usable frame without clipping book or controls', () => {
  for (const [width, height] of [[1280, 720], [1366, 768], [1440, 900], [1920, 1080]]) {
    const layout = readingLayout(width, height)
    assert.equal(layout.singlePage, false)
    assert.ok(layout.width >= width * .8 && layout.width <= width * .9)
    assert.ok(layout.left >= 24 && layout.left + layout.width <= width - 24)
    assert.ok(layout.top >= 24 && layout.controlsTop + 36 <= height - 12)
  }
})

test('compact screens use a readable single page; short viewports constrain height', () => {
  for (const [width, height] of [[390, 844], [375, 667], [667, 375], [820, 1180], [1024, 600]]) {
    const layout = readingLayout(width, height)
    assert.equal(layout.singlePage, width < 720)
    assert.ok(layout.left >= 12 && layout.left + layout.width <= width - 12)
    assert.ok(layout.top >= 24 && layout.controlsTop + 36 <= height - 12)
    assert.equal(layout.pageWidth, layout.width / (layout.singlePage ? 1 : 2))
  }
})
