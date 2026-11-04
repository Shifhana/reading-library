import test from 'node:test'
import assert from 'node:assert/strict'
import { books } from '../src/data/books.ts'
import { readNote, saveNoteDraft } from '../src/components/noteStorage.ts'
import { displayBooks } from '../src/components/shelfBooks.ts'

test('every remaining book has a distinct paragraph summary within the requested length', () => {
  assert.equal(books.length, 20)
  assert.ok(!books.some(book => book.slug === 'artiom-dashinsky-bundle'))
  assert.equal(new Set(books.map(book => book.summary)).size, books.length)
  for (const book of books) {
    const words = book.summary.trim().split(/\s+/).length
    assert.ok(words >= 80 && words <= 150, `${book.slug}: ${words} words`)
    assert.ok(!book.summary.includes('\n'), `${book.slug} should be one paragraph`)
    assert.ok(displayBooks.some(display => display.slug === book.slug))
  }
})

test('summary storage coexists with old notes and reflections without migration writes', () => {
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const first = books[0].slug
  const second = books[1].slug
  const notes = saveNoteDraft(storage, first, 'Earlier right-page writing', null)
  const reflection = saveNoteDraft(storage, first, 'Earlier reflection', null, 'whatIRemember')
  const before = new Map(values)
  // Old installations have no summary key: the editor uses the book-data default.
  assert.equal(readNote(storage, first, 'summary'), undefined)
  assert.deepEqual(values, before)
  const summary = saveNoteDraft(storage, first, '  Edited summary\n', null, 'summary')
  const reloaded = { getItem: key => values.get(key) ?? null }
  assert.deepEqual(readNote(reloaded, first, 'summary'), summary)
  assert.equal(readNote(reloaded, second, 'summary'), undefined)
  assert.deepEqual(readNote(reloaded, first), notes)
  assert.deepEqual(readNote(reloaded, first, 'whatIRemember'), reflection)
  // Deliberate clearing also remains a saved edit, rather than restoring defaults.
  saveNoteDraft(storage, first, '', summary, 'summary')
  assert.equal(readNote(reloaded, first, 'summary').body, '')
})
