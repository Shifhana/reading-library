import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { PhysicalBook } from './PhysicalBook'
import { readingLayout } from './readingLayout'
import { BookNotes } from './BookNotes'
import { BookPageEdge } from './BookPageEdge'
import { afterBookMotion, closeBookPhase, coverPauseMs, type BookPhase } from './bookInteraction'

import { displayBooks } from './shelfBooks'

type DisplayBook = typeof displayBooks[number]
type Point = readonly [number, number]
type Selection = {
  book: DisplayBook; startCorners: readonly Point[];
  phase: BookPhase;
  spread: number; turn: number; closeRequested: boolean;
}

export function RoomBookInteractions() {
  const svgRef = useRef<SVGSVGElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const sourceRef = useRef<HTMLButtonElement | null>(null)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [reflectionSaveError, setReflectionSaveError] = useState(false)
  const [notesSaveError, setNotesSaveError] = useState(false)
  const editingNote = reflectionSaveError || notesSaveError
  const [coverLift, setCoverLift] = useState(false)
  const [turnPreview, setTurnPreview] = useState({ direction: 1, progress: 0 })
  const [viewport, setViewport] = useState({ width: window.innerWidth, height: window.innerHeight, matrix: new DOMMatrix() })
  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const update = () => {
      const matrix = svg.getScreenCTM()
      if (matrix) setViewport({ width: window.innerWidth, height: window.innerHeight, matrix })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(svg)
    window.addEventListener('resize', update)
    return () => { observer.disconnect(); window.removeEventListener('resize', update) }
  }, [])
  const selectedId = selection?.book.id
  const phase = selection?.phase
  const returning = phase === 'returning'
  useEffect(() => {
    if (phase === 'open' && !selection?.turn && document.activeElement === document.body) closeRef.current?.focus({ preventScroll: true })
  }, [phase, selection?.spread, selection?.turn])
  const reading = readingLayout(viewport.width, viewport.height)
  const spreadCount = reading.singlePage ? 2 : 1
  if (selection && selection.spread >= spreadCount) setSelection({ ...selection, spread: spreadCount - 1 })
  useEffect(() => {
    if (selectedId) closeRef.current?.focus({ preventScroll: true })
    else sourceRef.current?.focus({ preventScroll: true })
  }, [selectedId])
  useEffect(() => {
    if (phase !== 'held') return
    const timer = window.setTimeout(() => setSelection(current =>
      current && current.book.id === selectedId && current.phase === 'held' ? { ...current, phase: 'opening' } : current), coverPauseMs)
    return () => window.clearTimeout(timer)
  }, [phase, selectedId])
  const finishMotion = (pose: 'held' | 'open' | 'shelf') => setSelection(current => {
    if (!current) return current
    const next = afterBookMotion(current.phase, pose)
    return next === null ? null : next === current.phase ? current : { ...current, phase: next }
  })
  const finishTurn = () => { setTurnPreview({ direction: 1, progress: 0 }); setSelection(current => current?.turn ? {
    ...current, spread: current.spread + current.turn, turn: 0,
    phase: current.closeRequested ? 'closing' : current.phase,
  } : current) }
  const returnToShelf = () => { if (editingNote) return; setSelection(current => current ? current.turn ? { ...current, closeRequested: true }
    : { ...current, phase: closeBookPhase(current.phase), turn: 0 } : null) }
  const turnPage = (direction: number) => setSelection(current => {
    if (editingNote || !current || current.phase !== 'open' || current.turn || current.closeRequested ||
      current.spread + direction < 0 || current.spread + direction >= spreadCount) return current
    return { ...current, turn: direction }
  })
  const screenCorners = (book: DisplayBook) => book.corners.map(([x,y]) => {
    const point = new DOMPoint(x,y).matrixTransform(viewport.matrix)
    return [point.x, point.y] as const
  })
  const selectedBook = selection?.book
  // Feature the entire held cover at 35% above the previous size, with responsive clearance.
  const selectedHeight = selectedBook ? Math.min(389.8125, viewport.height * .4937625, (viewport.width - 64) * .5457375 / selectedBook.aspectRatio) : 0
  const selectedWidth = selectedBook ? selectedHeight * selectedBook.aspectRatio : 0
  const destination = { x: viewport.width / 2, y: viewport.height * .60, width: selectedWidth, height: selectedHeight }
  const expanded = phase === 'opening' || phase === 'open'
  const previewTurn = (direction: number, progress: number) => setTurnPreview({ direction, progress })

  return <>
    <svg ref={svgRef} width="1855" height="848" viewBox="0 0 1855 848" preserveAspectRatio="xMidYMid slice"
      className="room-book-interactions" role="group" aria-label="Shelf books">
      <defs>
        <filter id="shelf-book-contact" x="-15%" y="-150%" width="130%" height="400%">
          <feGaussianBlur stdDeviation=".65" />
        </filter>
      </defs>
      {displayBooks.map(book => {
        const picked = selectedId === book.id
        const titleBottom = Math.min(...displayBooks.filter(other => other.shelf === book.shelf)
          .map(other => other.top - other.height * .05)) - 10
        return <g key={book.id} className="room-book" data-book-slug={book.slug} data-shelf={book.shelf} data-picked={picked || undefined}
          style={{ '--book-lift': `${book.height * .025}px`, '--book-shadow': `${book.height * .025}px`, '--book-origin': `${book.center}px ${book.bottom}px` } as CSSProperties}>
          {!picked && <ellipse aria-hidden="true" pointerEvents="none" cx={book.center} cy={book.bottom + .45}
            rx={book.width * .47} ry={Math.max(.5, book.height * .009)} fill="#584432" opacity=".23"
            filter="url(#shelf-book-contact)" />}
          {!picked && <g className="room-book-motion" aria-hidden="true">
            <PhysicalBook id={book.id} corners={book.corners} colour={book.colour} thicknessRatio={book.shelfThickness}
              coverImage={book.record.coverImage}
              coverAspectRatio={book.aspectRatio}
              coverBook={book.record}
              picked={false} returning={false} expanded={false} destination={destination} spread={0} turn={0} />
            <polygon className="room-book-focus" points={book.outline} />
          </g>}
          <foreignObject x={book.left} y={book.top} width={book.width} height={book.height}>
            <button type="button" className="room-book-target" aria-label={book.label} aria-pressed={picked}
              disabled={Boolean(selection)} onClick={event => {
                sourceRef.current = event.currentTarget
                const outline = event.currentTarget.closest('.room-book')?.querySelector<SVGPolygonElement>('.room-book-focus')
                const matrix = outline?.getScreenCTM() ?? viewport.matrix
                const startCorners = book.corners.map(([x,y]) => {
                  const p = new DOMPoint(x,y).matrixTransform(matrix)
                  return [p.x,p.y] as const
                })
                setReflectionSaveError(false); setNotesSaveError(false); setCoverLift(false); setTurnPreview({ direction: 1, progress: 0 })
                setSelection(current => current ?? { book, startCorners, phase: 'lifting', spread: 0, turn: 0, closeRequested: false })
              }} />
          </foreignObject>
          <foreignObject className="room-book-tooltip" x={book.center - 130} y={titleBottom - 100}
            width="260" height="100" aria-hidden="true" pointerEvents="none">
            <div className="room-book-tooltip-position">
              <span>{book.record.title}</span>
            </div>
          </foreignObject>
        </g>
      })}
    </svg>
    {selection && createPortal(<div className="focused-book-layer" data-phase={phase} role="dialog" aria-modal="true" aria-label={selection.book.label}
      onKeyDown={event => {
        if (event.key === 'Escape') { event.preventDefault(); returnToShelf() }
        if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) && phase === 'open' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
          event.preventDefault(); if (!event.repeat) turnPage(event.key === 'ArrowRight' ? 1 : -1)
        }
        if (event.key === 'Tab') {
          const buttons = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), textarea:not(:disabled)')].filter(element => element.getClientRects().length > 0)
          const index = buttons.indexOf(document.activeElement as HTMLButtonElement)
          event.preventDefault()
          buttons[(index + (event.shiftKey ? -1 : 1) + buttons.length) % buttons.length]?.focus()
        }
      }}>
      <div className="focused-book-backdrop" data-reading={expanded || undefined} data-returning={returning || undefined} onClick={returnToShelf} />
      <svg className="focused-book-canvas" width={viewport.width} height={viewport.height} viewBox={`0 0 ${viewport.width} ${viewport.height}`}>
        <PhysicalBook id={`${selection.book.id}-focused`} corners={screenCorners(selection.book)} colour={selection.book.colour}
          coverImage={selection.book.record.coverImage}
          coverAspectRatio={selection.book.aspectRatio}
          coverBook={selection.book.record}
          thicknessRatio={selection.book.thickness} picked returning={Boolean(returning)} expanded={expanded}
          startCorners={selection.startCorners} shelfCorners={screenCorners(selection.book)} destination={destination}
          readingDestination={{ x: reading.x, y: reading.y, width: reading.pageWidth, height: reading.height }} singlePage={reading.singlePage}
          coverLift={phase === 'held' && coverLift} turnPreview={turnPreview}
          spread={selection.spread} turn={selection.turn} onRest={finishMotion} onTurnRest={finishTurn} />
      </svg>
      {phase === 'held' && <button className="book-cover-target" aria-label={`Open ${selection.book.record.title}`}
        style={{ left: destination.x - selectedWidth / 2, top: destination.y - selectedHeight / 2, width: selectedWidth, height: selectedHeight }}
        onPointerEnter={() => setCoverLift(true)} onPointerLeave={() => setCoverLift(false)}
        onPointerDown={() => setCoverLift(true)} onFocus={() => setCoverLift(true)} onBlur={() => setCoverLift(false)}
        onClick={() => setSelection(current => current?.phase === 'held' ? { ...current, phase: 'opening' } : current)} />}
      {phase === 'open' && <div className="reading-pages" data-single-page={reading.singlePage || undefined}
        data-turning={Boolean(selection.turn) || undefined}
        style={{ left: reading.left, top: reading.top, width: reading.width, height: reading.height }}>
        <section className="reading-page reading-writing-page" aria-label="Left book page" data-hidden={reading.singlePage && selection.spread % 2 === 1 || undefined}>
          <header className="reading-running-head">{selection.book.record.title}</header>
          <div className="reading-page-content">
            <BookNotes key={`${selection.book.slug}-reflection`} bookId={selection.book.slug} field="whatIRemember" initialBody={selection.book.record.whatIRemember} focusOnOpen={!selection.turn && (!reading.singlePage || selection.spread === 0)} onSaveError={setReflectionSaveError} />
          </div>
        </section>
        <section className="reading-page reading-page-right reading-writing-page" aria-label="Right book page" data-hidden={reading.singlePage && selection.spread % 2 === 0 || undefined}>
          <div className="reading-page-content">
            <BookNotes key={`${selection.book.slug}-summary`} bookId={selection.book.slug} field="summary" initialBody={selection.book.record.summary} focusOnOpen={reading.singlePage && selection.spread === 1 && !selection.turn} onSaveError={setNotesSaveError} />
          </div>
        </section>
        <BookPageEdge direction={-1} width={reading.pageWidth} label={selection.spread === 0 ? 'Close book' : 'Previous page'}
          disabled={editingNote || Boolean(selection.turn)} onPreview={previewTurn}
          onTurn={selection.spread === 0 ? returnToShelf : () => turnPage(-1)} />
        <BookPageEdge direction={1} width={reading.pageWidth} label="Next page"
          disabled={editingNote || Boolean(selection.turn) || selection.spread >= spreadCount - 1} onPreview={previewTurn} onTurn={() => turnPage(1)} />
      </div>}
      <div className="room-book-controls focused-book-controls" data-reading={expanded || undefined}
        style={{ top: expanded ? reading.controlsTop : destination.y + selectedHeight/2 + 24 }}>
        {phase === 'open' && <>
          <span className="book-sr-only" role="status" aria-live="polite">{reading.singlePage ? 'Page' : 'Spread'} {selection.spread + 1} of {spreadCount}</span>
        </>}
        <button ref={closeRef} type="button" className="room-book-return"
          aria-label="Close book" disabled={editingNote || phase === 'closing' || returning} onClick={returnToShelf}>
          ×
        </button>
      </div>
    </div>, document.body)}
  </>
}
