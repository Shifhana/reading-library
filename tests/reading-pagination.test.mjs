import test from 'node:test'
import assert from 'node:assert/strict'
import { paginateText } from '../src/components/readingPagination.ts'

test('pagination preserves content and respects measured page capacity', () => {
  const text = 'A quiet reflection.\n\nAnother paragraph with detail. '.repeat(40)
  const pages = paginateText(text, value => value.length <= 170)
  assert.equal(pages.join(''), text)
  assert.ok(pages.length > 1)
  assert.ok(pages.every(page => page.length <= 170 && page.length > 0))
})
test('pagination handles empty notes, long words and very small pages', () => {
  assert.deepEqual(paginateText('', () => true), [''])
  const text = 'x'.repeat(600)
  assert.equal(paginateText(text, value => value.length <= 9).join(''), text)
  assert.deepEqual(paginateText('abc', () => false), ['a', 'b', 'c'])
})
