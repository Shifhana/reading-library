import { useEffect, useRef, useState } from 'react'
import { readNote, saveNoteDraft, type BookNote, type ContentField } from './noteStorage'

type Props = {
  bookId: string; field?: ContentField; initialBody?: string
  focusOnOpen: boolean; onSaveError: (failed: boolean) => void
}

export function BookNotes({ bookId, field = 'myNotes', initialBody, focusOnOpen, onSaveError }: Props) {
  const [loaded] = useState(() => {
    try {
      const stored = readNote(localStorage, bookId, field)
      const fallback: BookNote | null = initialBody ? { bookId, heading: '', body: initialBody, createdAt: '', updatedAt: '' } : null
      return { note: stored === undefined ? fallback : stored, error: '' }
    } catch {
      return { note: null, error: 'Saved writing could not be read. Reload before writing; your stored text has not been changed.' }
    }
  })
  const [body, setBody] = useState(loaded.note?.body ?? '')
  const [error, setError] = useState(loaded.error)
  const saved = useRef(loaded.note)
  const editor = useRef<HTMLTextAreaElement>(null)
  const unsaved = useRef(false)

  useEffect(() => {
    if (focusOnOpen && !loaded.error) editor.current?.focus({ preventScroll: true })
  }, [focusOnOpen, loaded.error])
  useEffect(() => {
    const protectWriting = (event: BeforeUnloadEvent) => {
      if (unsaved.current) { event.preventDefault(); event.returnValue = '' }
    }
    window.addEventListener('beforeunload', protectWriting)
    return () => window.removeEventListener('beforeunload', protectWriting)
  }, [])

  const persist = (text: string) => {
    if (loaded.error) return
    try {
      saved.current = saveNoteDraft(localStorage, bookId, text, saved.current, field)
      unsaved.current = false
      setError('')
      onSaveError(false)
    } catch {
      unsaved.current = true
      setError('Could not auto-save. Keep this book open and copy your writing before reloading. Click the page to retry.')
      onSaveError(true)
    }
  }

  return <div className="book-writing">
    <textarea ref={editor} className="book-writing-surface"
      aria-label={field === 'whatIRemember' ? 'Left page writing' : 'Right page writing'}
      aria-invalid={Boolean(error) || undefined} readOnly={Boolean(loaded.error)}
      spellCheck value={body}
      onChange={event => { const text = event.target.value; setBody(text); persist(text) }}
      onFocus={() => { if (unsaved.current) persist(body) }}
      onBlur={() => { if (unsaved.current) persist(body) }} />
    {error && <p className="book-writing-error" role="alert">{error}</p>}
  </div>
}
