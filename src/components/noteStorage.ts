export type BookNote = { bookId: string; heading: string; body: string; createdAt: string; updatedAt: string }
type NoteStorage = Pick<Storage, 'getItem' | 'setItem'>
export type ContentField = 'myNotes' | 'whatIRemember' | 'summary' | 'takeaways'
// Keep the existing notes key so earlier saved notes need no migration.
const key = (bookId: string, field: ContentField) => `reading-garden:${field === 'myNotes' ? 'note' : field === 'whatIRemember' ? 'reflection' : field}:v1:${encodeURIComponent(bookId)}`

export function readNote(storage: Pick<Storage, 'getItem'>, bookId: string, field: ContentField = 'myNotes'): BookNote | null | undefined {
  const raw = storage.getItem(key(bookId, field))
  if (raw === null) return undefined
  const note: unknown = JSON.parse(raw)
  // A tombstone keeps deletion from restoring the original library note.
  if (note === null) return null
  if (typeof note !== 'object' || !note || !('bookId' in note) || note.bookId !== bookId ||
      !['heading', 'body', 'createdAt', 'updatedAt'].every(field => typeof (note as Record<string, unknown>)[field] === 'string')) {
    throw new Error('Invalid saved note')
  }
  return note as BookNote
}

export function saveNote(storage: NoteStorage, bookId: string, heading: string, body: string, previous: BookNote | null, field: ContentField = 'myNotes'): BookNote {
  if (!body.trim()) throw new Error('Write a note before saving.')
  const now = new Date().toISOString()
  const note = { bookId, heading: heading.trim(), body: body.trim(), createdAt: previous?.createdAt || now, updatedAt: now }
  storage.setItem(key(bookId, field), JSON.stringify(note))
  return note
}

export function deleteNote(storage: NoteStorage, bookId: string, field: ContentField = 'myNotes') {
  storage.setItem(key(bookId, field), 'null')
}

// Direct writing preserves whitespace and empty pages, including after clearing all text.
export function saveNoteDraft(storage: NoteStorage, bookId: string, body: string, previous: BookNote | null, field: ContentField = 'myNotes'): BookNote {
  const now = new Date().toISOString()
  const note = { bookId, heading: previous?.heading ?? '', body, createdAt: previous?.createdAt || now, updatedAt: now }
  storage.setItem(key(bookId, field), JSON.stringify(note))
  return note
}
