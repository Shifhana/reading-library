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
      [[959.31,356.74],[1005.48,356.74],[1011.63,426.92],[963.41,426.92]],
      [[1027.02,357.72],[1073.19,357.72],[1079.35,426.92],[1031.13,426.92]],
      [[1096.79,356.74],[1145.01,356.74],[1151.17,426.92],[1101.92,426.92]],
      [[1163.48,356.74],[1211.7,356.74],[1218.88,426.92],[1168.61,426.92]],
    ],
  },
  {
    name: 'middle',
    timber: '#c5a17b',
    colours: ['#ac9585', '#4b595d', '#e3d2c7', '#a06f76', '#a1897a', '#6b6a5b', '#decbbf', '#445054'],
    covers: [
      [[329.34,472.74],[392.96,472.74],[386.8,558.51],[321.14,558.51]],
      [[410.4,465.91],[481.19,465.91],[471.96,558.51],[401.16,558.51]],
      [[502.74,474.69],[567.38,474.69],[566.35,558.51],[497.61,558.51]],
      [[583.79,465.91],[647.4,465.91],[649.46,558.51],[580.71,558.51]],
      [[666.9,465.91],[736.66,465.91],[739.74,558.51],[666.9,558.51]],
      [[769.5,470.79],[827.98,470.79],[834.13,558.51],[768.47,558.51]],
      [[844.39,470.79],[910.06,470.79],[915.19,558.51],[846.45,558.51]],
      [[926.47,468.84],[992.14,468.84],[1000.35,558.51],[931.6,558.51]],
    ],
  },
  {
    name: 'foreground',
    timber: '#ba936a',
    colours: ['#455057', '#decbc1', '#9e8677', '#616254', '#926162'],
    covers: [
      [[1082.43,615.04],[1184,615.04],[1196.31,762.23],[1090.63,762.23]],
      [[1213.75,610.17],[1324.56,609.2],[1342,762.23],[1227.09,762.23]],
      [[1371.76,619.92],[1475.38,618.94],[1496.93,762.23],[1384.07,762.23]],
      [[1502.06,602.37],[1625.18,602.37],[1650.83,762.23],[1521.55,762.23]],
      [[1664.16,612.12],[1781.13,611.14],[1805.75,762.23],[1685.71,762.23]],
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
