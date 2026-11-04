import test from 'node:test'
import assert from 'node:assert/strict'
import { readNote, saveNote, saveNoteDraft, deleteNote } from '../src/components/noteStorage.ts'

const memory = () => {
  const values = new Map()
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) }
}

test('automatic writing saves exact text and clearing stays empty after reopening', () => {
  const storage = memory()
  const previous = saveNote(storage, 'book', 'Existing heading', 'Before', null)
  const text = '  First line\n\nSecond line  \n'
  const draft = saveNoteDraft(storage, 'book', text, previous)
  assert.equal(readNote(storage, 'book').body, text)
  assert.equal(draft.heading, previous.heading)
  assert.equal(draft.createdAt, previous.createdAt)
  saveNoteDraft(storage, 'book', '', draft)
  assert.equal(readNote(storage, 'book').body, '')
  assert.equal(readNote(storage, 'other'), undefined)
  saveNoteDraft(storage, 'book', 'Left page', null, 'whatIRemember')
  assert.equal(readNote(storage, 'book', 'whatIRemember').body, 'Left page')
  assert.equal(readNote(storage, 'book').body, '')
  assert.throws(() => saveNoteDraft({ setItem: () => { throw new Error('Quota') } }, 'book', 'Draft', draft))
})

test('reflection edits are independent of existing notes and persist a cleared override', () => {
  const storage = memory()
  const notes = saveNote(storage, 'book', 'Existing heading', 'Existing notes', null)
  const reflection = saveNote(storage, 'book', '', 'My memory', null, 'whatIRemember')
  assert.deepEqual(readNote(storage, 'book'), notes)
  assert.deepEqual(readNote(storage, 'book', 'whatIRemember'), reflection)
  deleteNote(storage, 'book', 'whatIRemember')
  assert.equal(readNote(storage, 'book', 'whatIRemember'), null)
  assert.deepEqual(readNote(storage, 'book'), notes)
})

test('notes create, reload, update and delete independently per book', () => {
  const storage = memory()
  assert.equal(readNote(storage, 'first'), undefined)
  const first = saveNote(storage, 'first', ' A thought ', 'Remember this.', null)
  saveNote(storage, 'second', '', 'Another book.', null)
  assert.deepEqual(readNote(storage, 'first'), first)
  const edited = saveNote(storage, 'first', 'Revised', 'New reflection', first)
  assert.equal(edited.createdAt, first.createdAt)
  assert.equal(readNote(storage, 'first').body, 'New reflection')
  deleteNote(storage, 'first')
  assert.equal(readNote(storage, 'first'), null)
  assert.equal(readNote(storage, 'second').body, 'Another book.')
  assert.equal(saveNote(storage, 'first', '', 'Start again', null).body, 'Start again')
})

test('invalid data and storage failures are surfaced; blank saves cannot erase a note', () => {
  const storage = memory()
  const existing = saveNote(storage, 'first', '', 'Keep me', null)
  assert.throws(() => saveNote(storage, 'first', '', '  ', existing))
  assert.deepEqual(readNote(storage, 'first'), existing)
  assert.throws(() => readNote({ getItem: () => '{broken' }, 'first'))
  assert.throws(() => readNote({ getItem: () => '{"body":4}' }, 'first'))
  const blocked = { getItem: () => null, setItem: () => { throw new Error('Quota') } }
  assert.throws(() => saveNote(blocked, 'first', '', 'Draft', null))
  assert.throws(() => deleteNote(blocked, 'first'))
})

