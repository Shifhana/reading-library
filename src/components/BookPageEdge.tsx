import { useRef } from 'react'

type Props = {
  direction: number; label: string; disabled: boolean; width: number
  onPreview: (direction: number, progress: number) => void
  onTurn: () => void
}

export function BookPageEdge({ direction, label, disabled, width, onPreview, onTurn }: Props) {
  const drag = useRef<{ x: number; distance: number } | null>(null)
  const suppressClick = useRef(false)
  return <button className={`book-page-edge ${direction < 0 ? 'book-page-edge-left' : 'book-page-edge-right'}`}
    type="button" aria-label={label} disabled={disabled}
    onPointerEnter={() => { if (!disabled && !drag.current) onPreview(direction, .025) }}
    onPointerLeave={() => { if (!drag.current) onPreview(direction, 0) }}
    onFocus={() => { if (!disabled) onPreview(direction, .025) }}
    onBlur={() => { if (!drag.current) onPreview(direction, 0) }}
    onPointerDown={event => {
      if (disabled || event.button !== 0) return
      event.currentTarget.setPointerCapture(event.pointerId)
      drag.current = { x: event.clientX, distance: 0 }
      onPreview(direction, .025)
    }}
    onPointerMove={event => {
      if (!drag.current) return
      drag.current.distance = (drag.current.x - event.clientX) * direction
      onPreview(direction, Math.min(.45, Math.max(.025, drag.current.distance / width)))
    }}
    onPointerUp={event => {
      if (!drag.current) return
      const distance = drag.current.distance
      drag.current = null
      suppressClick.current = true
      event.currentTarget.releasePointerCapture(event.pointerId)
      if (Math.abs(distance) < 8 || distance > width * .20) onTurn()
      onPreview(direction, 0)
    }}
    onPointerCancel={() => { drag.current = null; onPreview(direction, 0) }}
    onLostPointerCapture={() => { if (drag.current) { drag.current = null; onPreview(direction, 0) } }}
    onClick={event => {
      if (event.detail > 0 && suppressClick.current) { suppressClick.current = false; return }
      onTurn(); onPreview(direction, 0)
    }}><span aria-hidden="true" /></button>
}
