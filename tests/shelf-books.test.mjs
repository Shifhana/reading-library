import test from 'node:test'
import assert from 'node:assert/strict'
import { books } from '../src/data/books.ts'
import { displayBooks } from '../src/components/shelfBooks.ts'
import { coverAspectRatio } from '../src/components/coverDimensions.ts'

test('every displayed book maps to one existing library record without duplicates', () => {
  assert.equal(displayBooks.length, books.length)
  assert.equal(new Set(displayBooks.map(book => book.slug)).size, books.length)
  for (const book of displayBooks) {
    assert.equal(book.record, books.find(record => record.slug === book.slug))
    assert.ok(book.label.includes(book.record.title))
  }
})

test('every physical shelf face uses its source cover ratio, including the wide pocket and UX books', () => {
  for (const book of displayBooks) {
    const faceWidth = book.corners[1][0] - book.corners[0][0]
    assert.ok(Math.abs(faceWidth / book.height - coverAspectRatio(book.slug)) < 1e-10, book.slug)
  }
  const pocket = displayBooks.find(book => book.slug === 'the-pocket-universal-principles-of-design')
  const ux = displayBooks.find(book => book.slug === 'universal-principles-of-ux')
  const narrow = displayBooks.find(book => book.slug === 'lean-ux-applying-lean-principles-to-improve-user-experience')
  assert.ok(pocket.aspectRatio > .99)
  assert.equal(ux.aspectRatio, .85)
  assert.ok(pocket.aspectRatio > ux.aspectRatio && ux.aspectRatio > narrow.aspectRatio)
})
test('shelf books retain distance scale and clear gaps between covers', () => {
  const baselines = { rear: 56, middle: 70, foreground: 108 }
  for (const [shelf, baseline] of Object.entries(baselines)) {
    const row = displayBooks.filter(book => book.shelf === shelf)
    assert.ok(new Set(row.map(book => book.height)).size > 2, 'retain natural height variation')
    for (const [index, book] of row.entries()) {
      assert.ok(book.height >= baseline * .94 - 1e-10 && book.height <= baseline * 1.04 + 1e-10, book.slug)
      if (index) assert.ok(row[index - 1].left + row[index - 1].width + 4 < book.left)
    }
  }
})
