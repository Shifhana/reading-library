import './RoomShell.css'

type Point3D = readonly [x: number, y: number, z: number]
type Face = { vertices: Point3D[]; material: string; layer: number }
type ShelfId = 'rear' | 'middle' | 'foreground'

// Metres in a shared room plan. The camera is at (0, 1.65, 0), close to
// the glazed side of the room, looking slightly right across its long axis.
// Keep this projection shared when placing objects in later explorations.
const camera = { eyeHeight: 1.65, yaw: 0.19, focalLength: 900, horizon: 380 }
const ceilingHeight = 3.3
const leftEdge = -3
const backDepth = 20

function project([x, y, z]: Point3D) {
  const cameraX = x * Math.cos(camera.yaw) - z * Math.sin(camera.yaw)
  const cameraZ = x * Math.sin(camera.yaw) + z * Math.cos(camera.yaw)

  return `${800 + camera.focalLength * cameraX / cameraZ},${
    camera.horizon - camera.focalLength * (y - camera.eyeHeight) / cameraZ
  }`
}

function points(vertices: readonly Point3D[]) {
  return vertices.map(project).join(' ')
}

// A wall face between two plan coordinates, ordered ceiling to floor.
function wall(x1: number, z1: number, x2: number, z2: number): Point3D[] {
  return [
    [x1, ceilingHeight, z1],
    [x2, ceilingHeight, z2],
    [x2, 0, z2],
    [x1, 0, z1],
  ]
}

// The rear enclosure is oblique in plan, so it does not form a centred box.
const backWall = wall(leftEdge, 13, 6, backDepth)
const glazing = wall(leftEdge, 1, leftEdge, 13)

// Eight 1.5 m bays on the existing left plane. Frame widths are also in
// metres, so both panel spacing and mullion thickness diminish with depth.
const glazingFrame = { near: 1, far: 13, bays: 8, width: 0.045, railHeight: 0.035 }
const mullionDepths = Array.from({ length: glazingFrame.bays + 1 }, (_, index) =>
  glazingFrame.near + index * (glazingFrame.far - glazingFrame.near) / glazingFrame.bays,
)

// Broad structural bays only: recessed side faces alternate with wall returns.
// Render back to front so nearer architecture naturally occludes deeper faces.
const rightBays = [
  { near: 15, far: 20 },
  { near: 10, far: 15 },
  { near: 6, far: 10 },
  { near: 2, far: 6 },
]

type DisplayShelf = {
  id: ShelfId
  x: number
  z: number
  width: number
  height: number
  depth: number
  angle: number
}

// A staggered arrangement leaves a generous route beside the glazing and
// between the islands. Positions and dimensions share the room's metre scale.
const displayShelves: DisplayShelf[] = [
  { id: 'rear', x: 4.25, z: 16.5, width: 2.9, height: 0.8, depth: 0.78, angle: -0.08 },
  { id: 'middle', x: -0.05, z: 6.8, width: 4.35, height: 0.8, depth: 1.05, angle: 0.045 },
  { id: 'foreground', x: 2.3, z: 2.95, width: 2.45, height: 0.72, depth: 0.86, angle: -0.16 },
]

type DisplayBook = {
  id: string
  width: number
  height: number
  depth: number
  gapAfter: number
  tone: 'chalk' | 'sand' | 'clay' | 'sage' | 'stone'
}

// Oversized art/folio proportions in metres. Stable display IDs keep each book
// addressable without inventing library records or changing the product data.
const shelfBooks: Record<ShelfId, DisplayBook[]> = {
  middle: [
    { id: 'main-01', width: 0.32, height: 0.47, depth: 0.042, gapAfter: 0.09, tone: 'sand' },
    { id: 'main-02', width: 0.36, height: 0.52, depth: 0.052, gapAfter: 0.18, tone: 'stone' },
    { id: 'main-03', width: 0.30, height: 0.45, depth: 0.035, gapAfter: 0.08, tone: 'chalk' },
    { id: 'main-04', width: 0.34, height: 0.50, depth: 0.046, gapAfter: 0.12, tone: 'clay' },
    { id: 'main-05', width: 0.37, height: 0.53, depth: 0.055, gapAfter: 0.20, tone: 'sand' },
    { id: 'main-06', width: 0.31, height: 0.46, depth: 0.038, gapAfter: 0.09, tone: 'sage' },
    { id: 'main-07', width: 0.34, height: 0.49, depth: 0.048, gapAfter: 0.11, tone: 'chalk' },
    { id: 'main-08', width: 0.32, height: 0.48, depth: 0.043, gapAfter: 0, tone: 'stone' },
  ],
  rear: [
    { id: 'rear-01', width: 0.32, height: 0.46, depth: 0.04, gapAfter: 0.14, tone: 'sand' },
    { id: 'rear-02', width: 0.35, height: 0.49, depth: 0.049, gapAfter: 0.28, tone: 'chalk' },
    { id: 'rear-03', width: 0.30, height: 0.44, depth: 0.036, gapAfter: 0.12, tone: 'sage' },
    { id: 'rear-04', width: 0.33, height: 0.47, depth: 0.044, gapAfter: 0, tone: 'sand' },
  ],
  foreground: [
    { id: 'front-01', width: 0.30, height: 0.44, depth: 0.041, gapAfter: 0.10, tone: 'stone' },
    { id: 'front-02', width: 0.34, height: 0.49, depth: 0.052, gapAfter: 0.16, tone: 'chalk' },
    { id: 'front-03', width: 0.29, height: 0.43, depth: 0.035, gapAfter: 0.08, tone: 'sand' },
    { id: 'front-04', width: 0.35, height: 0.50, depth: 0.055, gapAfter: 0.11, tone: 'sage' },
    { id: 'front-05', width: 0.31, height: 0.46, depth: 0.044, gapAfter: 0, tone: 'clay' },
  ],
}

function visibleFaces(faces: Face[]) {
  const cameraDepth = (vertices: Point3D[]) => vertices.reduce((sum, [px, , pz]) =>
    sum + px * Math.sin(camera.yaw) + pz * Math.cos(camera.yaw), 0) / vertices.length
  return faces.filter(({ vertices: [a, b, c] }) => {
    const ab = b.map((value, i) => value - a[i])
    const ac = c.map((value, i) => value - a[i])
    const normal = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]]
    return normal[0] * -a[0] + normal[1] * (camera.eyeHeight - a[1]) + normal[2] * -a[2] > 0
  }).sort((a, b) => a.layer - b.layer || cameraDepth(b.vertices) - cameraDepth(a.vertices))
}

function ShelfBook({ book, left, lean, baseHeight, toRoom }: {
  book: DisplayBook
  left: number
  lean: number
  baseHeight: number
  toRoom: (point: Point3D) => Point3D
}) {
  const faces: Face[] = []
  const up = Math.cos(lean)
  const back = Math.sin(lean)
  // h runs up the sloped back; d runs outward, perpendicular to the cover.
  // The back cover's lower edge touches the deck at the slope's foot (z=0.16).
  const vertex = (x: number, h: number, d: number): Point3D => toRoom([
    left + x, baseHeight + h * up + d * back, 0.16 + h * back - d * up,
  ])

  function bookBox(x0: number, x1: number, h0: number, h1: number, d0: number, d1: number, material: string) {
    const profile = [[h0, d1], [h1, d1], [h1, d0], [h0, d0]]
    faces.push({ vertices: profile.map(([h, d]) => vertex(x0, h, d)).reverse(), material: `${material} book-edge`, layer: 0 })
    faces.push({ vertices: profile.map(([h, d]) => vertex(x1, h, d)), material: `${material} book-edge`, layer: 0 })
    profile.forEach(([h, d], index) => {
      const [nextH, nextD] = profile[(index + 1) % profile.length]
      faces.push({
        vertices: [vertex(x0, h, d), vertex(x0, nextH, nextD), vertex(x1, nextH, nextD), vertex(x1, h, d)],
        material: `${material}${h === nextH ? ' book-edge' : ''}`,
        layer: 0,
      })
    })
  }

  const cover = 0.003
  const inset = 0.004
  bookBox(0, book.width, 0, book.height, 0, cover, 'book-cover')
  bookBox(inset, book.width - inset, inset, book.height - inset, cover, book.depth - cover, 'book-pages')
  bookBox(0, inset, 0, book.height, cover, book.depth - cover, 'book-cover')
  bookBox(0, book.width, 0, book.height, book.depth - cover, book.depth, 'book-cover')

  // One group owns all faces: a future book-data binding can wrap this in an
  // SVG link to /books/:slug without rebuilding the projected geometry.
  return (
    <g className={`display-book book-tone-${book.tone}`} data-book-id={book.id}>
      {visibleFaces(faces).map(({ vertices, material }, index) => (
        <polygon key={index} className={`book-face ${material}`} points={points(vertices)} />
      ))}
    </g>
  )
}

function Shelf({ shelf }: { shelf: DisplayShelf }) {
  const { x, z, width, height, depth, angle } = shelf
  const halfWidth = width / 2
  const thickness = 0.035
  const deckHeight = 0.2
  const slopeDepth = depth * 0.36
  const toRoom = ([localX, y, localZ]: Point3D): Point3D => [
    x + localX * Math.cos(angle) - localZ * Math.sin(angle),
    y,
    z + localX * Math.sin(angle) + localZ * Math.cos(angle),
  ]
  const faces: Face[] = []

  // Extrude each joinery piece across the shelf. Sorting the resulting faces
  // in camera depth lets both visible ends follow the existing perspective.
  function board(left: number, right: number, profile: readonly (readonly [number, number])[], material: string, layer = 0) {
    faces.push({ vertices: profile.map(([y, d]) => toRoom([left, y, d])).reverse(), material: `${material} shelf-end`, layer })
    faces.push({ vertices: profile.map(([y, d]) => toRoom([right, y, d])), material: `${material} shelf-end`, layer })
    profile.forEach(([y, d], index) => {
      const [nextY, nextD] = profile[(index + 1) % profile.length]
      faces.push({
        vertices: [toRoom([left, y, d]), toRoom([left, nextY, nextD]), toRoom([right, nextY, nextD]), toRoom([right, y, d])],
        material: `${material}${y === nextY ? ' shelf-horizontal' : ''}`,
        layer,
      })
    })
  }

  // Recessed plinth, open display deck, leaning back, and a shallow top cap.
  board(-halfWidth + 0.12, halfWidth - 0.12, [[0.025, 0.12], [0.14, 0.12], [0.14, depth - 0.1], [0.025, depth - 0.1]], 'shelf-plinth')
  board(-halfWidth, halfWidth, [[0.13, 0], [deckHeight, 0], [deckHeight, depth], [0.13, depth]], 'shelf-timber')
  board(-halfWidth + thickness, halfWidth - thickness, [[deckHeight, 0.16], [height, slopeDepth], [height, slopeDepth + thickness], [deckHeight, 0.16 + thickness]], 'shelf-display')
  board(-halfWidth + thickness, halfWidth - thickness, [[deckHeight, depth - 0.12], [height, depth - slopeDepth], [height, depth - slopeDepth + thickness], [deckHeight, depth - 0.12 + thickness]], 'shelf-display')
  board(-halfWidth, halfWidth, [[height - thickness, slopeDepth], [height, slopeDepth], [height, depth - slopeDepth + thickness], [height - thickness, depth - slopeDepth + thickness]], 'shelf-timber')

  // Solid, shaped cheeks express depth; a slender upstand retains face-out books.
  const cheek = [[0.1, 0], [0.3, 0], [height + 0.025, slopeDepth], [height + 0.025, depth - slopeDepth + thickness], [0.3, depth], [0.1, depth]] as const
  board(-halfWidth, -halfWidth + thickness, cheek, 'shelf-timber')
  board(halfWidth - thickness, halfWidth, cheek, 'shelf-timber')
  board(-halfWidth + thickness, halfWidth - thickness, [[deckHeight, 0], [deckHeight + 0.045, 0], [deckHeight + 0.045, thickness], [deckHeight, thickness]], 'shelf-timber', 2)

  const books = shelfBooks[shelf.id]
  const rowWidth = books.reduce((sum, book) => sum + book.width + book.gapAfter, 0)
  const placements = books.map((book, index) => ({
    book,
    left: -rowWidth / 2 + books.slice(0, index).reduce((sum, previous) =>
      sum + previous.width + previous.gapAfter, 0),
  }))
  const lean = Math.atan2(slopeDepth - 0.16, height - deckHeight)
  const shelfFaces = visibleFaces(faces)

  return (
    <g className="display-shelf" data-shelf={shelf.id}>
      <polygon
        className="shelf-shadow"
        points={points(([
          [-halfWidth - 0.03, 0, -0.04], [halfWidth + 0.08, 0, -0.04],
          [halfWidth + 0.28, 0, depth + 0.2], [-halfWidth + 0.12, 0, depth + 0.2],
        ] satisfies Point3D[]).map(toRoom))}
      />
      {shelfFaces.filter(({ layer }) => layer === 0).map(({ vertices, material }, index) => (
        <polygon key={index} className={`shelf-face ${material}`} points={points(vertices)} />
      ))}
      {placements.map(({ book, left }) => (
        <ShelfBook key={book.id} book={book} left={left} lean={lean} baseHeight={deckHeight} toRoom={toRoom} />
      ))}
      {/* Draw the existing ledge last so it naturally masks the books' feet. */}
      {shelfFaces.filter(({ layer }) => layer === 2).map(({ vertices, material }, index) => (
        <polygon key={`ledge-${index}`} className={`shelf-face ${material}`} points={points(vertices)} />
      ))}
    </g>
  )
}

export function RoomShell() {
  return (
    <svg
      className="room-shell"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-labelledby="room-title room-description"
    >
      <title id="room-title">The Reading Garden — perspective study</title>
      <desc id="room-description">
        A wide library interior viewed from an offset eye-level position.
        Glazing recedes on the left toward a distant oblique rear wall. Broad
        wall returns and recesses step into the distance on the right, above
        an open foreground floor. Three low, pale timber display shelves form
        a staggered composition: a quiet rear shelf, a long central island,
        and a shorter foreground shelf to the right. Sloping display faces,
        retaining ledges and shaped end panels give each piece physical depth.
        Face-out books with quiet neutral covers lean against each sloped
        display: eight on the central shelf, four at the rear, and five in
        the foreground. Varied sizes and small groups leave space between books.
      </desc>

      <rect className="room-ceiling" width="1600" height="900" />
      {/* The floor extends beyond the frame; all visible junctions are projected. */}
      <polygon
        className="room-floor"
        points={points([
          [leftEdge, 0, 1], [leftEdge, 0, 13], [6, 0, backDepth],
          [8.4, 0, backDepth], [8.4, 0, 1],
        ])}
      />
      <polygon className="room-back-wall room-edge" points={points(backWall)} />
      <polygon className="room-glass room-edge" points={points(glazing)} />

      <g className="room-glazing-frame">
        {mullionDepths.map((depth) => (
          <polygon
            key={depth}
            points={points(wall(
              leftEdge, Math.max(glazingFrame.near, depth - glazingFrame.width / 2),
              leftEdge, Math.min(glazingFrame.far, depth + glazingFrame.width / 2),
            ))}
          />
        ))}
        {/* Flush head and sill rails follow the same plane, with no raised curb. */}
        {[0, ceilingHeight - glazingFrame.railHeight].map((height) => (
          <polygon
            key={height}
            points={points([
              [leftEdge, height, glazingFrame.near],
              [leftEdge, height, glazingFrame.far],
              [leftEdge, height + glazingFrame.railHeight, glazingFrame.far],
              [leftEdge, height + glazingFrame.railHeight, glazingFrame.near],
            ])}
          />
        ))}
      </g>

      {rightBays.map(({ near, far }) => (
        <g key={near}>
          <polygon
            className="room-recess room-edge"
            points={points(wall(8.4, near, 8.4, far))}
          />
          <polygon
            className="room-return room-edge"
            points={points(wall(6, far, 8.4, far))}
          />
          <polygon
            className="room-side-wall room-edge"
            points={points(wall(6, near, 6, near + 0.8))}
          />
          <polygon
            className="room-return room-edge"
            points={points(wall(6, near + 0.8, 8.4, near + 0.8))}
          />
        </g>
      ))}

      {/* A continuous ceiling edge spans the recessed right-side bays. */}
      <polygon
        className="room-ceiling room-edge"
        points={points([
          [6, ceilingHeight, 1], [6, ceilingHeight, backDepth],
          [8.4, ceilingHeight, backDepth], [8.4, ceilingHeight, 1],
        ])}
      />

      {/* A single transverse ceiling junction establishes the room's width. */}
      <polyline
        className="room-linework room-secondary-line"
        points={points([[leftEdge, ceilingHeight, 6.8], [6, ceilingHeight, 6.8]])}
      />

      {displayShelves.map((shelf) => <Shelf key={shelf.id} shelf={shelf} />)}
    </svg>
  )
}
