import { useState } from 'react'
import { coverMatrix } from './coverProjection'
import type { Book } from '../data/books'
import { BookCover } from './BookCover'

const loadedCovers = new Set<string>()
const failedCovers = new Set<string>()
type Props = { src: string; book?: Pick<Book, 'slug' | 'title' | 'author'>; corners: readonly (readonly [number, number])[]; aspectRatio?: number }

export function CoverArtwork({ src, book, corners, aspectRatio = 600 / 840 }: Props) {
  const [loaded, setLoaded] = useState(() => loadedCovers.has(src))
  const [failed, setFailed] = useState(() => failedCovers.has(src))
  // The source ratio determines the physical face; the full image maps to it.
  const height = 600 / aspectRatio
  const fallbackScale = Math.min(1, height / 840)
  const matrix = coverMatrix(corners, 600, height)
  if (!matrix || (!book && (!src || failed))) return null
  return <foreignObject x="0" y="0" width="1" height="1" style={{ overflow: 'visible', pointerEvents: 'none' }}>
    <div style={{ position: 'relative', width: 600, height, transformOrigin: '0 0', transform: `matrix3d(${matrix.join(',')})` }}>
      {book && (!loaded || failed || !src) && <div style={{ position: 'absolute', left: (600 - 600 * fallbackScale) / 2, top: (height - 840 * fallbackScale) / 2,
        width: 600, height: 840, transformOrigin: '0 0', transform: `scale(${fallbackScale})` }}><BookCover book={book} /></div>}
      {src && !failed && <img src={src} alt="" draggable={false}
        style={{ position: 'absolute', inset: 0, display: 'block', width: '100%', height: '100%', visibility: loaded ? 'visible' : 'hidden' }}
        onLoad={() => { loadedCovers.add(src); setLoaded(true) }}
        onError={() => { failedCovers.add(src); setFailed(true) }} />}
    </div>
  </foreignObject>
}
