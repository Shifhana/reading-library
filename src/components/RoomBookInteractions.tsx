import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { PhysicalBook } from './PhysicalBook'

// Cover outlines share the registered room render coordinates (1855 × 848).
// These are display positions, not invented library records or navigation targets.
const shelves = [
  {
    name: 'rear',
    timber: '#bb9871',
    colours: ['#917867', '#d3beaf', '#5a594b', '#845759'],
    covers: [
      [[957,359],[999,359],[1003,429],[960,429]],
      [[1018,360],[1060,360],[1066,429],[1023,429]],
      [[1082,359],[1125,359],[1131,429],[1086,429]],
      [[1141,359],[1186,359],[1193,429],[1148,429]],
    ],
  },
  {
    name: 'middle',
    timber: '#c5a17b',
    colours: ['#ac9585', '#4b595d', '#e3d2c7', '#a06f76', '#a1897a', '#6b6a5b', '#decbbf', '#445054'],
    covers: [
      [[389,476],[443,476],[437,562],[380,562]],
      [[461,468],[524,468],[515,562],[452,562]],
      [[546,477],[602,477],[599,562],[538,562]],
      [[619,469],[675,469],[675,562],[613,562]],
      [[695,468],[754,468],[758,562],[691,562]],
      [[785,474],[837,474],[841,562],[778,562]],
      [[854,473],[911,473],[916,562],[852,562]],
      [[928,472],[987,472],[993,562],[926,562]],
    ],
  },
  {
    name: 'foreground',
    timber: '#ba936a',
    colours: ['#455057', '#decbc1', '#9e8677', '#616254', '#926162'],
    covers: [
      [[1068,617],[1160,617],[1174,764],[1073,764]],
      [[1189,611],[1290,611],[1302,764],[1211,764]],
      [[1331,622],[1426,621],[1443,764],[1346,764]],
      [[1455,606],[1564,606],[1589,764],[1470,764]],
      [[1594,614],[1699,614],[1728,764],[1613,764]],
    ],
  },
] as const

const displayBooks = shelves.flatMap((shelf) => shelf.covers.map((corners, index) => {
  const bottom = Math.max(...corners.map(([, y]) => y))
  const top = Math.min(...corners.map(([, y]) => y))
  const left = Math.min(...corners.map(([x]) => x))
  const width = Math.max(...corners.map(([x]) => x)) - left
  const height = bottom - top

  return {
    id: `room-book-${shelf.name}-${index + 1}`,
    shelf: shelf.name,
    corners,
    colour: shelf.colours[index],
    label: `Book ${index + 1} on the ${shelf.name} shelf`,
    returnLabel: `Return book ${index + 1} to the ${shelf.name} shelf`,
    outline: corners.map((point) => point.join(',')).join(' '),
    bottom, top, left, width, height,
    center: corners.reduce((sum, [x]) => sum + x, 0) / 4,
    timber: shelf.timber,
    targetShape: corners.map(([x, y]) =>
      `${(x - left) / width * 100}% ${(y - top) / height * 100}%`,
    ).join(', '),
  }
}))

type DisplayBook = typeof displayBooks[number]
type Selection = {
  book: DisplayBook
  returning: boolean
  startCorners: readonly (readonly [number, number])[]
  shelfCorners: readonly (readonly [number, number])[]
  settled: boolean
  phase: 'held' | 'opening' | 'open' | 'closing'
  spread: number
  turn: number
  closeRequested: boolean
}

const spreadCount = 3

export function RoomBookInteractions({ image, rearImage = image }: { image: string; rearImage?: string }) {
  const svgRef = useRef<SVGSVGElement>(null)
  const returnRef = useRef<HTMLButtonElement>(null)
  const openRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const sourceRef = useRef<HTMLButtonElement | null>(null)
  const [selection, setSelection] = useState<Selection | null>(null)
  const selectedId = selection?.book.id
  const returning = selection?.returning
  const phase = selection?.phase
  const settled = selection?.settled
  const turn = selection?.turn
  const [viewport, setViewport] = useState({ x: 927.5, y: 424, width: 1855, height: 848, scale: 1 })

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const updateViewport = () => {
      const matrix = svg.getScreenCTM()
      if (!matrix) return
      // Invert the actual SVG crop/scale, keeping the destination centered even
      // when the full-screen room is cropped on a narrow or short viewport.
      const center = new DOMPoint(window.innerWidth / 2, window.innerHeight / 2)
        .matrixTransform(matrix.inverse())
      setViewport({
        x: center.x, y: center.y,
        width: window.innerWidth / matrix.a,
        height: window.innerHeight / matrix.d,
        scale: matrix.a,
      })
    }
    updateViewport()
    const observer = new ResizeObserver(updateViewport)
    observer.observe(svg)
    window.addEventListener('resize', updateViewport)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  useEffect(() => {
    if (selectedId) returnRef.current?.focus({ preventScroll: true })
    else sourceRef.current?.focus({ preventScroll: true })
  }, [selectedId])

  useEffect(() => {
    if (phase === 'held' && settled && !returning) openRef.current?.focus({ preventScroll: true })
    if (phase === 'opening') closeRef.current?.focus({ preventScroll: true })
  }, [phase, settled, returning])

  const finishMotion = (pose: 'held' | 'open' | 'shelf') => setSelection((current) => {
    if (!current) return current
    if (pose === 'shelf' && current.returning) return null
    if (pose === 'held' && current.phase === 'closing') {
      return { ...current, phase: 'held', returning: true }
    }
    if (pose === 'open' && current.phase === 'opening') return { ...current, phase: 'open' }
    if (pose === 'held' && current.phase === 'held' && !current.returning) {
      return { ...current, settled: true }
    }
    return current
  })
  const finishTurn = () => setSelection((current) => current?.turn ? {
    ...current, spread: current.spread + current.turn, turn: 0,
    phase: current.closeRequested ? 'closing' : current.phase,
  } : current)

  const returnToShelf = () => setSelection((current) =>
    current ? current.turn ? { ...current, closeRequested: true } : current.phase === 'held'
      ? { ...current, returning: true }
      : { ...current, phase: 'closing', turn: 0 }
      : null,
  )
  const openBook = () => setSelection((current) =>
    current?.settled && !current.returning && current.phase === 'held'
      ? { ...current, phase: 'opening' } : current,
  )
  const turnPage = (direction: number) => setSelection((current) => {
    if (!current || current.phase !== 'open' || current.turn || current.closeRequested ||
      current.spread + direction < 0 || current.spread + direction >= spreadCount) return current
    return { ...current, turn: direction }
  })
  const expanded = phase === 'opening' || phase === 'open'
  const selectedBook = selection?.book
  const selectedHeight = selectedBook
    ? Math.min(viewport.height * 0.48, viewport.width * 0.4 * selectedBook.height / selectedBook.width)
    : 0
  const selectedScale = selectedBook ? selectedHeight / selectedBook.height : 1

  const renderBook = (book: DisplayBook) => {
    const { id, label, outline, bottom, top, left, width, height, center, timber, targetShape } = book
    const picked = selectedBook?.id === id
    return (
      <g
        key={id}
        className="room-book"
        data-picked={picked || undefined}
        data-open={picked && expanded || undefined}
        data-returning={picked && selection?.returning || undefined}
        style={{
          '--book-lift': `${height * 0.025}px`,
          '--book-shadow': `${height * 0.04}px`,
          '--book-origin': `${center}px ${bottom}px`,
        } as CSSProperties}
      >
        <defs>
          <clipPath id={`${id}-clip`}><polygon points={outline} /></clipPath>
        </defs>
        <polygon className="room-book-backing" points={outline} fill={timber} />
        <g
          className="room-book-motion"
          aria-hidden="true"
        >
          <PhysicalBook id={id} image={book.shelf === 'rear' ? rearImage : image} corners={book.corners} colour={book.colour}
            picked={picked} returning={Boolean(picked && returning)} expanded={picked && expanded}
            startCorners={picked ? selection?.startCorners : undefined}
            shelfCorners={picked ? selection?.shelfCorners : undefined}
            destination={{ x: viewport.x, y: viewport.y, width: width * selectedScale, height: selectedHeight }}
            spread={picked ? selection?.spread ?? 0 : 0} turn={picked ? selection?.turn ?? 0 : 0}
            onRest={finishMotion} onTurnRest={finishTurn} />
          <polygon className="room-book-focus" points={outline} />
        </g>
        {/* This target never moves, preserving the exact shelf hit area. */}
        <foreignObject x={left} y={top} width={width} height={height}>
          <button
            type="button"
            className="room-book-target"
            aria-label={label}
            aria-pressed={picked}
            disabled={Boolean(selection)}
            style={{ clipPath: `polygon(${targetShape})` }}
            onClick={(event) => {
              sourceRef.current = event.currentTarget
              const outline = event.currentTarget.closest('.room-book')?.querySelector<SVGPolygonElement>('.room-book-focus')
              // Measure the actual on-screen cover, including its current hover
              // pose and the room's responsive crop, before changing selection.
              const bounds = outline?.getBoundingClientRect()
              const screen = outline?.getScreenCTM()
              const room = svgRef.current?.getScreenCTM()?.inverse()
              const startCorners = bounds && screen && room ? book.corners.map(([x, y]) => {
                const p = new DOMPoint(x, y).matrixTransform(screen).matrixTransform(room)
                return [p.x, p.y] as const
              }) : book.corners
              // The stationary hit target measures the resting rectangle,
              // separately from the lifted hover outline. Convert both to the
              // one SVG coordinate system; never reuse held scale on return.
              const resting = event.currentTarget.getBoundingClientRect()
              const shelfCorners = room ? book.corners.map(([x, y]) => {
                const p = new DOMPoint(
                  resting.x + (x - book.left) / book.width * resting.width,
                  resting.y + (y - book.top) / book.height * resting.height,
                ).matrixTransform(room)
                return [p.x, p.y] as const
              }) : book.corners
              setSelection({
                book,
                returning: false,
                startCorners,
                shelfCorners,
                settled: false,
                phase: 'held',
                spread: 0,
                turn: 0,
                closeRequested: false,
              })
            }}
          />
        </foreignObject>
      </g>
    )
  }

  return (
    <svg
      ref={svgRef}
      width="1855"
      height="848"
      viewBox="0 0 1855 848"
      preserveAspectRatio="xMidYMid slice"
      className="room-book-interactions"
      role="group"
      aria-label="Shelf books"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && selection) {
          event.preventDefault()
          returnToShelf()
        }
        if (phase === 'open' && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
          event.preventDefault()
          if (!event.repeat) turnPage(event.key === 'ArrowRight' ? 1 : -1)
        }
      }}
    >
      {/* The base render retains the resting book as a non-interactive
          placeholder. Never paint a timber patch over the selected slot. */}
      {/* Keyed siblings retain the same cover DOM node as it moves to the front
          of SVG paint order. There is no replacement card or re-created cover. */}
      {[
        ...displayBooks.filter((book) => book.id !== selectedBook?.id).map(renderBook),
        <rect
          key="room-dimmer"
          className="room-selection-dimmer"
          data-visible={Boolean(selection && !selection.returning)}
          x="0" y="0" width="1855" height="848"
          aria-hidden="true"
          onClick={returnToShelf}
        />,
        ...(selectedBook ? [renderBook(selectedBook)] : []),
      ]}
      {selection && phase === 'held' && !returning && (
        <foreignObject
          x={viewport.x - selectedBook!.width * selectedScale / 2}
          y={viewport.y - selectedHeight / 2}
          width={selectedBook!.width * selectedScale} height={selectedHeight}
        >
          <button ref={openRef} type="button" className="room-held-open"
            aria-label={`Open ${selection.book.label.toLowerCase()}`}
            disabled={!settled} onClick={openBook} />
        </foreignObject>
      )}
      {selection && (
        <foreignObject
          x={viewport.x - Math.min(200 / viewport.scale, viewport.width * 0.48)}
          y={viewport.y + selectedHeight / 2 + 24 / viewport.scale}
          width={Math.min(400 / viewport.scale, viewport.width * 0.96)} height={90 / viewport.scale}
        >
          <div className="room-book-controls" data-quiet={!settled || returning || undefined}
            style={{ fontSize: `${13 / viewport.scale}px` }}>
          {phase !== 'held' && <>
            <button type="button" className="room-page-control" aria-label="Previous page"
              aria-disabled={phase !== 'open' || Boolean(turn) || selection.spread === 0}
              onClick={() => turnPage(-1)}>←</button>
            <span className="room-spread-status" role="status" aria-live="polite">
              Spread {selection.spread + 1} of {spreadCount}
            </span>
            <button type="button" className="room-page-control" aria-label="Next page"
              aria-disabled={phase !== 'open' || Boolean(turn) || selection.spread === spreadCount - 1}
              onClick={() => turnPage(1)}>→</button>
          </>}
          <button
            key={phase === 'held' ? 'return' : 'close'}
            ref={phase === 'held' ? returnRef : closeRef}
            type="button"
            className="room-book-return"
            aria-label={phase === 'held' ? selection.book.returnLabel : 'Close book and return to shelf'}
            onClick={returnToShelf}
          >
            {phase === 'held' ? 'Return to shelf' : 'Close book'}
          </button>
          </div>
        </foreignObject>
      )}
    </svg>
  )
}
