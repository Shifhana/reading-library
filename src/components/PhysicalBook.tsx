import { useLayoutEffect, useRef, useState } from 'react'
import { CoverArtwork } from './CoverArtwork'
import { coverFaceCorners } from './coverProjection'
import type { Book } from '../data/books'

type Point = readonly [number, number]
type Props = {
  id: string
  thicknessRatio: number
  corners: readonly Point[]
  colour: string
  coverImage?: string
  coverAspectRatio?: number
  coverBook?: Pick<Book, 'slug' | 'title' | 'author'>
  picked: boolean
  returning: boolean
  expanded: boolean
  startCorners?: readonly Point[]
  shelfCorners?: readonly Point[]
  destination: { x: number; y: number; width: number; height: number }
  readingDestination?: { x: number; y: number; width: number; height: number }
  singlePage?: boolean
  spread: number
  turn: number
  coverLift?: boolean
  turnPreview?: { direction: number; progress: number }
  onRest?: (pose: 'held' | 'open' | 'shelf') => void
  onTurnRest?: () => void
}

const points = (quad: readonly Point[]) => quad.map((p) => p.join(',')).join(' ')
const mix = (a: Point, b: Point, t: number): Point => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
const shift = (quad: readonly Point[], x: number, y: number) => quad.map(([px, py]): Point => [px + x, py + y])
const inset = (q: readonly Point[], amount: number) => {
  const topLeft = mix(q[0], q[1], amount)
  const topRight = mix(q[1], q[0], amount)
  const bottomRight = mix(q[2], q[3], amount)
  const bottomLeft = mix(q[3], q[2], amount)
  return [mix(topLeft, bottomLeft, amount), mix(topRight, bottomRight, amount),
    mix(bottomRight, topRight, amount), mix(bottomLeft, topLeft, amount)]
}
const paperInset = (q: readonly Point[], amount = .018) => {
  const paper = inset(q, amount)
  const hingeTop = mix(q[0], q[1], 0.003)
  const hingeBottom = mix(q[3], q[2], 0.003)
  paper[0] = mix(hingeTop, hingeBottom, amount)
  paper[3] = mix(hingeBottom, hingeTop, amount)
  return paper
}

// A shared pose is interpolated numerically: no CSS transition can be lost when
// the picked SVG node moves to the front of the paint order. Retarget from the
// current frame, including when closing interrupts an opening or pickup.
function usePose(target: number[], duration: number, start?: number[], onRest?: () => void, settle = 0) {
  const [pose, setPose] = useState(target)
  const current = useRef(pose)
  const wasPicked = useRef(false)
  const rest = useRef(onRest)
  useLayoutEffect(() => { rest.current = onRest })
  const signature = target.join(',')
  const initial = start?.join(',')
  useLayoutEffect(() => {
    const to = signature.split(',').map(Number)
    const from = initial && !wasPicked.current ? initial.split(',').map(Number) : current.current
    wasPicked.current = Boolean(initial)
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let timer = 0
    const commit = (value: number[]) => { current.current = value; setPose(value) }
    const notifyRest = () => {
      frame = requestAnimationFrame(() => {
        timer = window.setTimeout(() => rest.current?.(), media.matches ? 0 : settle)
      })
    }
    const finish = () => { cancelAnimationFrame(frame); clearTimeout(timer); commit(to); notifyRest() }
    const began = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / duration)
      // Ease gently into and out of each pose, without a sudden acceleration at rest.
      const eased = t * t * t * (t * (t * 6 - 15) + 10)
      commit(from.map((value, index) => value + (to[index] - value) * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
      else notifyRest()
    }
    if (!duration || media.matches) finish()
    else { commit(from); frame = requestAnimationFrame(tick) }
    media.addEventListener('change', finish)
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); media.removeEventListener('change', finish) }
  }, [signature, initial, duration, settle])
  return pose
}

function fold(q: readonly Point[], angle: number) {
  const cosine = Math.cos(angle)
  const rise = Math.sin(angle) * (q[3][1] - q[0][1]) * 0.035
  return [q[0], [q[0][0] + (q[1][0] - q[0][0]) * cosine, q[1][1] - rise],
    [q[3][0] + (q[2][0] - q[3][0]) * cosine, q[2][1] + rise], q[3]] as Point[]
}

export function PhysicalBook({ id, corners, colour, coverImage, coverAspectRatio, coverBook, thicknessRatio, picked, returning, expanded,
  startCorners, shelfCorners, destination, readingDestination, singlePage = false, spread, turn, coverLift = false, turnPreview, onRest, onTurnRest }: Props) {
  const { x, y, width, height } = expanded && readingDestination ? readingDestination : destination
  const held: Point[] = expanded && readingDestination
    ? [[x - width / 2, y - height / 2], [x + width / 2, y - height / 2],
      [x + width / 2, y + height / 2], [x - width / 2, y + height / 2]]
    : [[x - width / 2, y - height / 2], [x + width * .48, y - height * .49 + width * .028],
    [x + width * .48, y + height * .49 + width * .028], [x - width / 2, y + height / 2]]
  const away = picked && !returning
  const target = [...(away ? held : shelfCorners ?? corners).flat(), away ? 1 : 0, expanded ? 1 : 0]
  const start = picked && startCorners ? [...startCorners.flat(), 0, 0] : undefined
  const pose = usePose(target, picked ? (expanded || returning ? 900 : 820) : 0, start,
    () => { if (picked) onRest?.(returning ? 'shelf' : expanded ? 'open' : 'held') },
    returning ? 120 : away && !expanded ? 150 : 0)
  const [completedTurn, setCompletedTurn] = useState(false)
  if ((turn || turnPreview?.progress) && completedTurn) setCompletedTurn(false)
  const [pageTurn] = usePose([turn ? 1 : turnPreview?.progress ?? 0], turn ? 650 : turnPreview?.progress ? 0 : completedTurn ? 0 : 240, undefined,
    () => { if (turn) { setCompletedTurn(true); onTurnRest?.() } })
  const [coverPeek] = usePose([coverLift ? .14 : 0], 240)
  const openness = pose[9]
  const depth = pose[8]
  // Shift by half a page while opening so the widening spread remains centered.
  const offset = singlePage ? 0 : (pose[2] - pose[0]) * openness / 2
  const q: Point[] = [0, 2, 4, 6].map((i) => [pose[i] + offset, pose[i + 1]])
  const w = Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1])
  const thickness = w * thicknessRatio * (1 + depth * .12) * (1 - openness * .68)
  const coverShape = coverAspectRatio && (singlePage || openness < .5) ? coverFaceCorners(q, coverAspectRatio) : q
  const cover = fold(coverShape, Math.PI * openness * (singlePage ? .5 : 1) + coverPeek * (1 - openness))
  const front = openness <= 0.5
  const paperMargin = .018 - openness * .012
  const paper = paperInset(q, paperMargin)
  const turnDirection = turn || turnPreview?.direction || 1
  const turnAngle = singlePage ? Math.PI * .5 * pageTurn : Math.PI * (turnDirection > 0 ? pageTurn : 1 - pageTurn)
  const sheet = fold(paper, turnAngle)
  const sheetShadow = Math.sin(Math.PI * pageTurn)
  const onShelf = !picked
  // Small, stable differences in paper stock/lamination; artwork is untouched.
  const stock = [...(coverBook?.slug ?? id)].reduce((sum, letter) => sum + letter.charCodeAt(0), 0) % 3
  const sheen = [.035, .055, .075][stock]


  return <g className="physical-book" aria-hidden="true" data-opening={openness.toFixed(3)}
    style={{ filter: `drop-shadow(${thickness * 0.3}px ${thickness * 1.1}px ${thickness * (1.8 + depth * .5)}px rgb(45 35 24 / 25%))` }}>
    <defs>
      <filter id={`${id}-grain`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="8" result="grain" />
        <feColorMatrix in="grain" type="saturate" values="0" />
        <feComponentTransfer><feFuncA type="linear" slope=".065" /></feComponentTransfer>
        <feComposite in2="SourceGraphic" operator="in" />
        <feBlend in2="SourceGraphic" mode="soft-light" />
      </filter>
      <linearGradient id={`${id}-cloth`} x1="0" y1="0" x2="100%" y2="25%">
        <stop offset="0" stopColor="#161510" stopOpacity=".24" />
        <stop offset=".035" stopColor="#fff5dd" stopOpacity=".16" />
        <stop offset=".085" stopColor="#fff5dd" stopOpacity=".025" />
        <stop offset=".58" stopColor="#fff5dd" stopOpacity={sheen} />
        <stop offset=".82" stopColor="#fff5dd" stopOpacity={sheen * .3} />
        <stop offset="1" stopColor="#161510" stopOpacity=".1" />
      </linearGradient>
      <linearGradient id={`${id}-paper`}>
        <stop offset="0" stopColor={openness > .5 ? '#cbbda6' : '#baad97'} /><stop offset={.06 - openness * .02} stopColor="#e5d9c4" />
        <stop offset={.2 - openness * .08} stopColor="#f3ead8" /><stop offset={.91 + openness * .06} stopColor="#f5eddd" />
        <stop offset="1" stopColor={openness > .5 ? '#e8dcc5' : '#d6c9b2'} />
      </linearGradient>
      <linearGradient id={`${id}-sheet`}>
        <stop offset="0" stopColor="#c7bba5" /><stop offset="0.16" stopColor="#f5eddf" />
        <stop offset="0.9" stopColor="#f6efe2" /><stop offset="1" stopColor="#cfc2ab" />
      </linearGradient>
      <linearGradient id={`${id}-left-paper`} href={`#${id}-paper`} x1="100%" x2="0%" />
    </defs>
    <g className="physical-book-block">
      {onShelf && <path d={`M${q[3].join(',')} L${q[2].join(',')}`} fill="none"
        stroke="#372d21" strokeOpacity=".29" strokeWidth={w * .029} strokeLinecap="round" />}
      <polygon points={points(shift(q, thickness, thickness))} fill={colour} />
      <polygon points={points(shift(paper, thickness * 0.8, thickness * 0.8))} fill="#cec1aa" />
      {[.14, .31, .51, .72, .88].map((line, index) => <path key={line}
        d={`M${q[3][0] + thickness * line},${q[3][1] + thickness * line} L${q[2][0] + thickness * line},${q[2][1] + thickness * line} L${q[1][0] + thickness * line},${q[1][1] + thickness * line}`}
        stroke={index % 2 ? '#ad9f89' : '#f0e5d1'} strokeOpacity={index % 2 ? .35 : .75} strokeWidth={w * .0018} fill="none" />)}
      <polygon points={points(q)} fill={colour} />
      <polygon points={points(paper)} fill={`url(#${id}-paper)`} />
      <path d={`M${q[0].join(',')} L${q[3].join(',')}`} stroke={colour} strokeWidth={thickness * (1.3 - openness * .9)} />
      {onShelf && <>
        {/* A narrow fore-edge exposes the paper underneath the cover overhang. */}
        <polygon points={points([q[1], q[2],
          [q[2][0] + thickness * .75, q[2][1] + thickness * .65],
          [q[1][0] + thickness * .75, q[1][1] + thickness * .65]])} fill={`url(#${id}-paper)`} />
        {[.22, .44, .71, .88].map(line => <path key={line}
          d={`M${q[1][0] + thickness * line},${q[1][1] + thickness * line} L${q[2][0] + thickness * line},${q[2][1] + thickness * line}`}
          stroke="#aa9d88" strokeOpacity=".32" strokeWidth={w * .0015} />)}
      </>}
    </g>
    <g className="physical-book-cover" opacity={singlePage ? 1 - openness : 1}>
      <polygon points={points(cover)} fill={colour} filter={openness < .01 ? `url(#${id}-grain)` : undefined} stroke={colour} strokeWidth={w * 0.006} />
      <g opacity={(onShelf ? .55 : depth) * (front ? 1 : 0)}>
        {/* A narrow rounded spine face, revealed only as the book is held. */}
        <polygon points={points([cover[0], cover[3],
          [cover[3][0] - thickness * .45, cover[3][1] + thickness * .25],
          [cover[0][0] - thickness * .45, cover[0][1] + thickness * .25]])}
          fill={colour} stroke="#302b23" strokeOpacity=".18" strokeWidth={w * .004} />
        <path d={`M${cover[1].join(',')} L${cover[2].join(',')} L${cover[3].join(',')}`}
          fill="none" stroke="#302b23" strokeOpacity=".17" strokeWidth={w * .006} />
      </g>
      <g opacity={front ? 1 : 0}>
        {(coverBook || coverImage) && <CoverArtwork key={`${coverBook?.slug ?? ''}-${coverImage}`} src={coverImage ?? ''} book={coverBook} corners={cover}
          aspectRatio={coverAspectRatio ?? w / Math.hypot(q[3][0] - q[0][0], q[3][1] - q[0][1])} />}
        <polygon className="book-cover-surface" points={points(cover)} fill={`url(#${id}-cloth)`} />
        <path d={`M${mix(cover[0],cover[1],.045).join(',')} L${mix(cover[3],cover[2],.045).join(',')}`}
          stroke="#251e17" strokeOpacity=".18" strokeWidth={w*.012} />
        <path d={`M${cover[0].join(',')} L${cover[1].join(',')} L${cover[2].join(',')}`}
          stroke="#fff9eb" strokeOpacity=".22" strokeWidth={w*.004} fill="none" />
      </g>
      <g opacity={front ? 0 : depth}>
        <polygon points={points(paperInset(cover, paperMargin))} fill={`url(#${id}-left-paper)`} />
        <path d={`M${cover[1].join(',')} L${cover[2].join(',')} L${cover[3].join(',')}`}
          fill="none" stroke="#d0c2a9" strokeWidth={w * 0.008} />
      </g>
    </g>
    {openness > 0.99 && <g opacity={depth} fill="#8c816f" fontSize={w * 0.028} textAnchor="middle">
      {!singlePage && <text x={q[0][0] - w * 0.85} y={q[3][1] - w * 0.06}>{spread * 2 + 1}</text>}
      <text x={q[0][0] + w * 0.85} y={q[3][1] - w * 0.06}>{singlePage ? spread + 1 : spread * 2 + 2}</text>
    </g>}
    {!completedTurn && pageTurn > .001 && <g className="physical-book-turn" opacity={singlePage ? 1 - pageTurn : 1}>
      <polygon points={points([paper[0], [paper[0][0] + w * 0.2, paper[0][1]],
        [paper[3][0] + w * 0.2, paper[3][1]], paper[3]])} fill="#645440" opacity={sheetShadow * 0.17} />
      <polygon points={points(sheet)} fill={`url(#${id}-sheet)`} stroke="#bfb198" strokeWidth={w * 0.004}
        style={{ filter: `drop-shadow(${Math.cos(turnAngle) * thickness}px 1px ${thickness * (0.5 + sheetShadow)}px rgb(55 42 24 / 22%))` }} />
    </g>}
  </g>
}
