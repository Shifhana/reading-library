import { useState } from 'react'
import photorealisticRoom from '../assets/reading-garden-intimate-room.webp'
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
const floor: Point3D[] = [
  [leftEdge, 0, 1], [leftEdge, 0, 13], [6, 0, backDepth],
  [8.4, 0, backDepth], [8.4, 0, 1],
]

// A shared daylight direction: from the left glazing, down and into the room.
// Projecting along this ray keeps floor and book shadows in the room's scale.
const daylight = { x: 0.85, y: -1, z: 0.35 }
function floorShadow([x, y, z]: Point3D): Point3D {
  return [x + daylight.x * y, 0, z + daylight.z * y]
}

function SurfaceLight({ vertices }: { vertices: Point3D[] }) {
  const [a, b, c] = vertices
  const ab = b.map((value, i) => value - a[i])
  const ac = c.map((value, i) => value - a[i])
  const normal = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]]
  const facing = normal[0] * -a[0] + normal[1] * (camera.eyeHeight - a[1]) + normal[2] * -a[2] > 0 ? 1 : -1
  const incidence = -facing * (normal[0] * daylight.x + normal[1] * daylight.y + normal[2] * daylight.z)
    / (Math.hypot(...normal) * Math.hypot(daylight.x, daylight.y, daylight.z))
  const centreX = vertices.reduce((sum, [x]) => sum + x, 0) / vertices.length
  const centreZ = vertices.reduce((sum, [, , z]) => sum + z, 0) / vertices.length
  const falloff = Math.max(0.45, 1 - (centreX - leftEdge) * 0.045)
  const air = Math.max(0, Math.min(0.045, (centreZ - 8) * 0.004))

  return (
    <g className="surface-light" aria-hidden="true">
      <polygon points={points(vertices)} fill="#777566" opacity={Math.max(0, 0.35 - incidence) * 0.12} />
      <polygon points={points(vertices)} fill="url(#surface-daylight)" opacity={Math.max(0, incidence) * 0.3 * falloff + air} />
    </g>
  )
}

// Only the shadows of off-scene foliage: sparse branching clusters, with fixed
// irregular spacing. Each silhouette is projected onto its receiving plane.
function FoliageShadow({ onPlane }: { onPlane: (u: number, v: number) => Point3D }) {
  const branches = [
    { u: 0, v: 0, angle: 0.3, length: 2.1 },
    { u: 0.65, v: 0.18, angle: 1.1, length: 1.35 },
    { u: 1.3, v: 0.36, angle: -0.55, length: 1.15 },
  ]
  return (
    <g className="foliage-shadow" aria-hidden="true">
      {branches.map(({ u, v, angle, length }, branch) => (
        <g key={branch}>
          <polyline className="foliage-twig" points={points(Array.from({ length: 5 }, (_, i) => {
            const t = i / 4
            return onPlane(u + Math.cos(angle) * length * t, v + Math.sin(angle) * length * t + 0.06 * Math.sin(t * 3))
          }))} />
          {Array.from({ length: 14 }, (_, i) => {
            const t = (i + 1) / 15
            const side = i % 2 ? 1 : -1
            const leafAngle = angle + side * (0.65 + 0.2 * Math.sin(i * 2.3 + branch))
            const radius = 0.10 + 0.045 * (1 + Math.sin(i * 1.7 + branch))
            const leafU = u + Math.cos(angle) * length * t + Math.cos(leafAngle) * radius
            const leafV = v + Math.sin(angle) * length * t + Math.sin(leafAngle) * radius + 0.06 * Math.sin(t * 3)
            return (
              <polygon key={i} points={points(Array.from({ length: 12 }, (_, edge) => {
                const theta = edge * Math.PI / 6
                const along = Math.cos(theta) * radius
                const across = Math.sin(theta) * radius * 0.38
                return onPlane(leafU + along * Math.cos(leafAngle) - across * Math.sin(leafAngle), leafV + along * Math.sin(leafAngle) + across * Math.cos(leafAngle))
              }))} />
            )
          })}
        </g>
      ))}
    </g>
  )
}

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

function ShelfBook({ book, left, lean, baseHeight, shelfAngle, toRoom }: {
  book: DisplayBook
  left: number
  lean: number
  baseHeight: number
  shelfAngle: number
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
  const rayX = daylight.x * Math.cos(shelfAngle) + daylight.z * Math.sin(shelfAngle)
  const rayZ = -daylight.x * Math.sin(shelfAngle) + daylight.z * Math.cos(shelfAngle)
  const travel = book.depth / (back + rayZ * up)
  const shadowX = travel * rayX
  const shadowH = travel * (-up + rayZ * back)

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
      <polygon className="book-contact-shadow" style={{ filter: `blur(${Math.max(0.35, 5 / toRoom([left, 0, 0])[2])}px)` }} points={points([
        vertex(shadowX, 0, 0), vertex(book.width + shadowX, 0, 0),
        vertex(book.width + shadowX, book.height + shadowH, 0), vertex(shadowX, book.height + shadowH, 0),
      ])} />
      {visibleFaces(faces).map(({ vertices, material }, index) => (
        <g key={index}>
          <polygon className={`book-face ${material}`} points={points(vertices)} />
          <SurfaceLight vertices={vertices} />
        </g>
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
      <polygon className="shelf-cast-shadow" style={{ filter: `blur(${18 / z}px)` }} points={points(([
        [-halfWidth, 0, 0], [halfWidth, 0, 0], [halfWidth, height, 0],
        [halfWidth, height, depth], [-halfWidth, height, depth], [-halfWidth, 0, depth],
      ] satisfies Point3D[]).map(toRoom).map(floorShadow))} />
      <polygon
        className="shelf-shadow"
        points={points(([
          [-halfWidth - 0.03, 0, -0.04], [halfWidth + 0.08, 0, -0.04],
          [halfWidth + 0.28, 0, depth + 0.2], [-halfWidth + 0.12, 0, depth + 0.2],
        ] satisfies Point3D[]).map(toRoom))}
      />
      {shelfFaces.filter(({ layer }) => layer === 0).map(({ vertices, material }, index) => (
        <g key={index}>
          <polygon className={`shelf-face ${material}`} points={points(vertices)} />
          <SurfaceLight vertices={vertices} />
        </g>
      ))}
      <polygon className="shelf-panel-shadow" points={points(([
        [-halfWidth + thickness, deckHeight, 0.16], [-halfWidth + thickness + 0.10, deckHeight, 0.16],
        [-halfWidth + thickness + 0.04, height, slopeDepth], [-halfWidth + thickness, height, slopeDepth],
      ] satisfies Point3D[]).map(toRoom))} />
      {placements.map(({ book, left }) => (
        <ShelfBook key={book.id} book={book} left={left} lean={lean} baseHeight={deckHeight} shelfAngle={angle} toRoom={toRoom} />
      ))}
      {/* Draw the existing ledge last so it naturally masks the books' feet. */}
      {shelfFaces.filter(({ layer }) => layer === 2).map(({ vertices, material }, index) => (
        <g key={`ledge-${index}`}>
          <polygon className={`shelf-face ${material}`} points={points(vertices)} />
          <SurfaceLight vertices={vertices} />
        </g>
      ))}
    </g>
  )
}

export function RoomShell() {
  const [renderLoaded, setRenderLoaded] = useState(false)

  return (
    <svg
      className="room-shell"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-labelledby="room-title room-description"
    >
      <title id="room-title">The Reading Garden</title>
      <desc id="room-description">
        An intimate library interior viewed from an offset eye-level position.
        A shorter glazed wall on the left meets a closer warm plaster rear wall.
        Broad wall returns and recesses enclose the shelves on the right, with
        restrained open floor space. Three low, pale timber display shelves form
        a staggered composition: a quiet rear shelf, a long central island,
        and a shorter foreground shelf to the right. Sloping display faces,
        retaining ledges and shaped end panels give each piece physical depth.
        Face-out books with quiet neutral covers lean against each sloped
        display: eight on the central shelf, four at the rear, and five in
        the foreground. Varied sizes and small groups leave space between books.
        Soft daylight enters from the left glazing, with diffuse foliage shadows
        and gentle contact shadows grounding the shelves and books.
        Beyond the glass, layered mature trees and muted planting open onto a
        calm landscape. A clean ceiling without light fittings and a discreet
        rear stair with a slender handrail complete the warm plaster architecture.
      </desc>

      {/* Accepted material finishes stay separate from the daylight layers.
          Seeded grain is still; neither materials nor light displace geometry. */}
        <defs>
        {/* Smooth satin timber: broad tonal transitions, without visible grain. */}
        <linearGradient id="oak-display" x1="0.05" y1="0" x2="0.95" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#e2d5c1" />
          <stop offset="0.35" stopColor="#dacbb5" />
          <stop offset="1" stopColor="#d3c1a7" />
        </linearGradient>
        <linearGradient id="oak-edge" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#e5d8c4" />
          <stop offset="0.4" stopColor="#d8c7af" />
          <stop offset="1" stopColor="#cbb79c" />
        </linearGradient>
        <linearGradient id="oak-side" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#d8c9b3" />
          <stop offset="1" stopColor="#cbb79f" />
        </linearGradient>
        <filter id="limestone-grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves="3" seed="23" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.48  0 0 0 0 0.47  0 0 0 0 0.42  0.05 0 0 0 -0.012" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feBlend in2="SourceGraphic" mode="multiply" />
        </filter>
        <filter id="plaster-grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="8" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.6  0 0 0 0 0.56  0 0 0 0 0.49  0.035 0 0 0 -0.008" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feBlend in2="SourceGraphic" mode="multiply" />
        </filter>
        <filter id="paper-grain" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="1" seed="5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.43  0 0 0 0 0.38  0.11 0 0 0 -0.025" />
          <feComposite in2="SourceAlpha" operator="in" />
          <feBlend in2="SourceGraphic" mode="multiply" />
        </filter>
        <clipPath id="floor-light-clip"><polygon points={points(floor)} /></clipPath>
        <clipPath id="back-wall-light-clip"><polygon points={points(backWall)} /></clipPath>
        <radialGradient id="floor-daylight" gradientUnits="userSpaceOnUse" cx="170" cy="760" r="1050" gradientTransform="translate(0 304) scale(1 0.6)">
          <stop offset="0" stopColor="#fff9e9" stopOpacity="0.62" />
          <stop offset="0.5" stopColor="#fff9e9" stopOpacity="0.3" />
          <stop offset="1" stopColor="#fff9e9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="surface-daylight" gradientUnits="userSpaceOnUse" x1="180" y1="320" x2="1500" y2="620">
          <stop offset="0" stopColor="#fff9e9" stopOpacity="1" />
          <stop offset="1" stopColor="#fff9e9" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id="wall-daylight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff9e9" stopOpacity="0.42" />
          <stop offset="0.65" stopColor="#fff9e9" stopOpacity="0.06" />
          <stop offset="1" stopColor="#fff9e9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="recess-shade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#777568" stopOpacity="0.15" />
          <stop offset="0.35" stopColor="#777568" stopOpacity="0.045" />
          <stop offset="1" stopColor="#777568" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Retain the editable scene as an asset-load fallback and as the source
          for future book interaction work. The render itself is a still image. */}
      <g visibility={renderLoaded ? 'hidden' : undefined} aria-hidden={renderLoaded || undefined}>
      <rect className="room-ceiling" width="1600" height="900" />
      {/* The floor extends beyond the frame; all visible junctions are projected. */}
      <polygon
        className="room-floor"
        points={points(floor)}
      />
      <g className="floor-lighting" clipPath="url(#floor-light-clip)" aria-hidden="true">
        <polygon points={points(floor)} fill="url(#floor-daylight)" />
        <g className="glazing-floor-shadow">
          {mullionDepths.map((depth) => (
            <polygon key={depth} points={points([
              [leftEdge, 0, depth - 0.035], floorShadow([leftEdge, ceilingHeight, depth - 0.035]),
              floorShadow([leftEdge, ceilingHeight, depth + 0.035]), [leftEdge, 0, depth + 0.035],
            ])} />
          ))}
        </g>
        <FoliageShadow onPlane={(u, v) => [-3.1 + u * 1.25, 0, 2.1 + v * 1.15]} />
        <FoliageShadow onPlane={(u, v) => [-2.4 + u * 1.1, 0, 5.9 + v * 1.3]} />
      </g>
      <polygon className="room-back-wall room-edge" points={points(backWall)} />
      <polygon points={points(backWall)} fill="url(#wall-daylight)" className="surface-light" />
      <g clipPath="url(#back-wall-light-clip)" className="wall-foliage-lighting">
        <FoliageShadow onPlane={(u, v) => [-2.8 + u, 0.8 + v, 13 + (0.2 + u) * 7 / 9]} />
      </g>
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
          <SurfaceLight vertices={wall(8.4, near, 8.4, far)} />
          <polygon className="recess-lighting" points={points(wall(8.4, near, 8.4, far))} fill="url(#recess-shade)" />
          <polygon
            className="room-return room-edge"
            points={points(wall(6, far, 8.4, far))}
          />
          <SurfaceLight vertices={wall(6, far, 8.4, far)} />
          <polygon
            className="room-side-wall room-edge"
            points={points(wall(6, near, 6, near + 0.8))}
          />
          <polygon className="surface-light" points={points(wall(6, near, 6, near + 0.8))} fill="url(#wall-daylight)" />
          <polygon
            className="room-return room-edge"
            points={points(wall(6, near + 0.8, 8.4, near + 0.8))}
          />
          <SurfaceLight vertices={wall(6, near + 0.8, 8.4, near + 0.8)} />
          <polyline className="wall-contact-shadow" points={points([[8.4, 0, near], [8.4, 0, far]])} />
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
      </g>
      <image
        href={photorealisticRoom}
        width="1600"
        height="900"
        preserveAspectRatio="xMidYMid slice"
        onLoad={() => setRenderLoaded(true)}
        onError={() => setRenderLoaded(false)}
      />
    </svg>
  )
}
