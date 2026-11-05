import test from 'node:test'
import assert from 'node:assert/strict'
import { books } from '../src/data/books.ts'
import { loadReadingSections, paginateSections, replaceReadingFragment } from '../src/components/bookReadingContent.ts'
import { saveNoteDraft, deleteNote } from '../src/components/noteStorage.ts'

test('reading defaults never overwrite saved summaries, reflections, notes or deliberate clearing', () => {
  const values = new Map()
  const storage = { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
  const book = books[0]
  saveNoteDraft(storage, book.slug, 'My original summary\n', null, 'summary')
  saveNoteDraft(storage, book.slug, 'A personal reflection', null, 'whatIRemember')
  saveNoteDraft(storage, book.slug, 'Earlier notes', null)
  const before = new Map(values)
  const sections = loadReadingSections(book, storage)
  assert.deepEqual(values, before)
  assert.deepEqual(sections.map(s => s.body), ['My original summary\n', 'A personal reflection', 'Earlier notes', book.takeaways])
  assert.equal(loadReadingSections(books[1], storage)[0].body, books[1].summary)
  deleteNote(storage, book.slug, 'summary')
  assert.equal(loadReadingSections(book, storage)[0].body, '')
  saveNoteDraft(storage, book.slug, 'My own application', null, 'takeaways')
  assert.equal(loadReadingSections(book, storage).at(-1).body, 'My own application')
  assert.equal(loadReadingSections(book, storage).find(s => s.field === 'whatIRemember').body, 'A personal reflection')
})

test('all book sections paginate losslessly, share available space and avoid orphan headings', () => {
  for (const book of books) {
    const sections = loadReadingSections(book, { getItem: () => null })
    const cost = page => page.reduce((n, f) => n + f.body.length + (f.heading ? 50 : 0) + 10, 0)
    for (const capacity of [350, 900, 1800]) {
      const pages = paginateSections(sections, page => cost(page) <= capacity)
      assert.ok(pages.every(page => page.length && cost(page) <= capacity))
      for (const section of sections) {
        const fragments = pages.flat().filter(f => f.field === section.field)
        assert.equal(fragments.map(f => f.body).join(''), section.body)
        assert.equal(fragments.filter(f => f.heading).length, section.heading ? 1 : 0)
        assert.equal(fragments[0].start, 0)
        assert.equal(fragments.at(-1).end, section.body.length)
      }
      assert.equal(pages[0][0].heading, 'Summary')
      assert.equal(pages.flat().filter(f => f.heading).at(-1).heading, 'What I’m taking away')
    }
  }
})

test('editing a continuation preserves the rest of the section including whitespace', () => {
  const body = 'A paragraph.\n\nAnother paragraph.\nThe end.'
  const fragment = { start: 14, end: 32 }
  assert.equal(replaceReadingFragment(body, fragment, 'Edited\n'), body.slice(0, 14) + 'Edited\n' + body.slice(32))
  assert.equal(replaceReadingFragment(body, fragment, ''), body.slice(0, 14) + body.slice(32))
  assert.deepEqual(paginateSections([{ field: 'summary', heading: 'Summary', body: 'abc' }], () => false).flat().map(f => f.body), ['a', 'b', 'c'])
})
