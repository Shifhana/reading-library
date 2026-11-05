import { useLayoutEffect, useRef, useState } from 'react'
import type { Book } from '../data/books'
import { loadReadingSections, paginateSections, replaceReadingFragment, type ReadingFragment } from './bookReadingContent'
import { readNote, saveNoteDraft, type ContentField } from './noteStorage'
import './BookReadingPages.css'

type Props = {
  book: Book; spread: number; singlePage: boolean; width: number; height: number
  onPageCount: (count: number) => void; onSaveError: (failed: boolean) => void
}

export function BookReadingPages({ book, spread, singlePage, width, height, onPageCount, onSaveError }: Props) {
  const [loaded] = useState(() => {
    try { return { sections: loadReadingSections(book, localStorage), error: '' } }
    catch { return { sections: [], error: 'Saved writing could not be read. Reload before writing; your stored text has not been changed.' } }
  })
  const [sections, setSections] = useState(loaded.sections)
  const [pages, setPages] = useState<ReadingFragment[][]>([])
  const [error, setError] = useState(loaded.error)
  const measure = useRef<HTMLDivElement>(null)
  const pending = useRef<{ field: ContentField; body: string } | null>(null)
  const failed = useRef(false)
  const [fontVersion, setFontVersion] = useState(0)

  useLayoutEffect(() => {
    let active = true
    void document.fonts.ready.then(() => { if (active) setFontVersion(v => v + 1) })
    const protect = (event: BeforeUnloadEvent) => {
      if (failed.current) { event.preventDefault(); event.returnValue = '' }
    }
    window.addEventListener('beforeunload', protect)
    return () => { active = false; window.removeEventListener('beforeunload', protect) }
  }, [])

  useLayoutEffect(() => {
    const container = measure.current
    if (!container) return
    const next = paginateSections(sections, fragments => {
      container.replaceChildren()
      for (const fragment of fragments) {
        const block = document.createElement('div')
        block.className = 'reading-flow-section'
        if (fragment.heading) {
          const heading = document.createElement('h2')
          heading.textContent = fragment.heading; block.append(heading)
        }
        const body = document.createElement('div')
        body.className = 'reading-flow-text'
        body.textContent = fragment.body || '\u200b'
        block.append(body); container.append(block)
      }
      return container.scrollHeight <= container.clientHeight
    })
    // A spread already exposes two pages: use its right page for the final section
    // when everything fits on one page, without adding an extra page turn.
    if (!singlePage && next.length === 1) {
      const takeaway = next[0].findIndex(fragment => fragment.field === 'takeaways')
      if (takeaway > 0) next.push(next[0].splice(takeaway))
    }
    setPages(next)
    onPageCount(Math.max(1, next.length))
  }, [sections, width, height, singlePage, fontVersion, onPageCount])

  const persist = (field: ContentField, body: string) => {
    pending.current = { field, body }
    try {
      saveNoteDraft(localStorage, book.slug, body, readNote(localStorage, book.slug, field) ?? null, field)
      failed.current = false; setError(''); onSaveError(false)
    } catch {
      failed.current = true; onSaveError(true)
      setError('Could not auto-save. Keep this book open and copy your writing before reloading. Click the writing to retry.')
    }
  }
  const reflow = () => {
    const change = pending.current
    if (!change) return
    // Keep the full edited section in memory even when storage is unavailable.
    setSections(current => current.map(section => section.field === change.field ? { ...section, body: change.body } : section))
    if (!failed.current) pending.current = null
  }
  const first = spread * (singlePage ? 1 : 2)
  return <>
    <section className="reading-page reading-flow-page reading-flow-measure" aria-hidden="true">
      <header className="reading-running-head">{book.title}</header>
      <div ref={measure} className="reading-flow" />
    </section>
    {Array.from({ length: singlePage ? 1 : 2 }, (_, side) => <section key={side}
      className={`reading-page reading-flow-page${side ? ' reading-page-right' : ''}`}
      aria-label={singlePage ? 'Book page' : side ? 'Right book page' : 'Left book page'}>
      <header className="reading-running-head">{book.title}</header>
      <div className="reading-flow">
        {pages[first + side]?.map(fragment => <div className="reading-flow-section" key={`${fragment.field}-${fragment.start}-${fragment.body}`}>
          {fragment.heading && <h2>{fragment.heading}</h2>}
          <div className="reading-flow-text" contentEditable={loaded.error ? false : 'plaintext-only'} suppressContentEditableWarning
            role="textbox" aria-multiline="true" aria-label={`${fragment.field === 'summary' ? 'Summary' : fragment.field === 'takeaways' ? 'Takeaways' : fragment.field === 'myNotes' ? 'My notes' : 'Reflection'} writing`}
            spellCheck tabIndex={0}
            onInput={event => {
              const section = sections.find(section => section.field === fragment.field)!
              persist(fragment.field, replaceReadingFragment(section.body, fragment, event.currentTarget.innerText))
            }}
            onFocus={() => { if (failed.current && pending.current) persist(pending.current.field, pending.current.body) }}
            onBlur={reflow}>{fragment.body}</div>
        </div>)}
      </div>
      {error && side === 0 && <p className="book-writing-error" role="alert">{error}</p>}
    </section>)}
  </>
}
