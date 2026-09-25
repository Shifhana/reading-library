import { useLayoutEffect, useRef, useState } from 'react'

type Point = readonly [number, number]
type Props = {
  id: string
  image: string
  corners: readonly Point[]
  colour: string
  picked: boolean
  returning: boolean
  expanded: boolean
  startCorners?: readonly Point[]
  shelfCorners?: readonly Point[]
  destination: { x: number; y: number; width: number; height: number }
  spread: number
  turn: number
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
const paperInset = (q: readonly Point[]) => {
  const paper = inset(q, 0.018)
  const hingeTop = mix(q[0], q[1], 0.003)
  const hingeBottom = mix(q[3], q[2], 0.003)
  paper[0] = mix(hingeTop, hingeBottom, 0.018)
  paper[3] = mix(hingeBottom, hingeTop, 0.018)
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
      const eased = t * t * (3 - 2 * t)
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

// Each triangle retains the original cover pixels. Affine triangle mapping lets
// the shelf's skewed cover gradually straighten without swapping its artwork.
function triangleMatrix(source: readonly Point[], target: readonly Point[]) {
  const [s0, s1, s2] = source
  const [t0, t1, t2] = target
  const sx1 = s1[0] - s0[0], sy1 = s1[1] - s0[1]
  const sx2 = s2[0] - s0[0], sy2 = s2[1] - s0[1]
  const tx1 = t1[0] - t0[0], ty1 = t1[1] - t0[1]
  const tx2 = t2[0] - t0[0], ty2 = t2[1] - t0[1]
  const determinant = sx1 * sy2 - sx2 * sy1
  const a = (tx1 * sy2 - tx2 * sy1) / determinant
  const b = (ty1 * sy2 - ty2 * sy1) / determinant
  const c = (tx2 * sx1 - tx1 * sx2) / determinant
  const d = (ty2 * sx1 - ty1 * sx2) / determinant
  return `matrix(${a} ${b} ${c} ${d} ${t0[0] - a * s0[0] - c * s0[1]} ${t0[1] - b * s0[0] - d * s0[1]})`
}

function fold(q: readonly Point[], angle: number) {
  const cosine = Math.cos(angle)
  const rise = Math.sin(angle) * (q[3][1] - q[0][1]) * 0.035
  return [q[0], [q[0][0] + (q[1][0] - q[0][0]) * cosine, q[1][1] - rise],
    [q[3][0] + (q[2][0] - q[3][0]) * cosine, q[2][1] + rise], q[3]] as Point[]
}

export function PhysicalBook({ id, image, corners, colour, picked, returning, expanded,
  startCorners, shelfCorners, destination: { x, y, width, height }, spread, turn, onRest, onTurnRest }: Props) {
  const held: Point[] = [[x - width / 2, y - height / 2], [x + width / 2, y - height / 2],
    [x + width / 2, y + height / 2], [x - width / 2, y + height / 2]]
  const away = picked && !returning
  const target = [...(away ? held : shelfCorners ?? corners).flat(), away ? 1 : 0, expanded ? 1 : 0]
  const start = picked && startCorners ? [...startCorners.flat(), 0, 0] : undefined
  const pose = usePose(target, picked ? (expanded || returning ? 900 : 820) : 0, start,
    () => { if (picked) onRest?.(returning ? 'shelf' : expanded ? 'open' : 'held') },
    returning ? 120 : away && !expanded ? 150 : 0)
  const [pageTurn] = usePose([turn ? 1 : 0], turn ? 800 : 0, undefined,
    () => { if (turn) onTurnRest?.() })
  const openness = pose[9]
  const depth = pose[8]
  // Shift by half a page while opening so the widening spread remains centered.
  const offset = (pose[2] - pose[0]) * openness / 2
  const q: Point[] = [0, 2, 4, 6].map((i) => [pose[i] + offset, pose[i + 1]])
  const w = Math.hypot(q[1][0] - q[0][0], q[1][1] - q[0][1])
  const thickness = w * 0.025 * depth
  const cover = fold(q, Math.PI * openness)
  const front = openness <= 0.5
  const paper = paperInset(q)
  const turnAngle = Math.PI * (turn > 0 ? pageTurn : 1 - pageTurn)
  const sheet = fold(paper, turnAngle)
  const sheetShadow = Math.sin(Math.PI * pageTurn)
  const triangles = [[0, 1, 2], [0, 2, 3]]

  return <g className="physical-book" aria-hidden="true" data-opening={openness.toFixed(3)}
    style={{ filter: depth ? `drop-shadow(${thickness * 0.3}px ${thickness * 1.1}px ${thickness * 1.8}px rgb(45 35 24 / 25%))` : undefined }}>
    <defs>
      <linearGradient id={`${id}-paper`}>
        <stop offset="0" stopColor="#baad97" /><stop offset="0.06" stopColor="#e5d9c4" />
        <stop offset="0.2" stopColor="#f3ead8" /><stop offset="0.91" stopColor="#f5eddd" />
        <stop offset="1" stopColor="#d6c9b2" />
      </linearGradient>
      <linearGradient id={`${id}-sheet`}>
        <stop offset="0" stopColor="#c7bba5" /><stop offset="0.16" stopColor="#f5eddf" />
        <stop offset="0.9" stopColor="#f6efe2" /><stop offset="1" stopColor="#cfc2ab" />
      </linearGradient>
      <linearGradient id={`${id}-left-paper`} href={`#${id}-paper`} x1="100%" x2="0%" />
    </defs>
    <g opacity={depth} className="physical-book-block">
      <polygon points={points(shift(q, thickness, thickness))} fill={colour} />
      <polygon points={points(shift(paper, thickness * 0.8, thickness * 0.8))} fill="#cec1aa" />
      {[0.25, 0.5, 0.75].map((line) => <path key={line}
        d={`M${q[3][0] + thickness * line},${q[3][1] + thickness * line} L${q[2][0] + thickness * line},${q[2][1] + thickness * line} L${q[1][0] + thickness * line},${q[1][1] + thickness * line}`}
        stroke="#f0e5d1" strokeWidth={w * 0.004} fill="none" />)}
      <polygon points={points(q)} fill={colour} />
      <polygon points={points(paper)} fill={`url(#${id}-paper)`} />
      <path d={`M${q[0].join(',')} L${q[3].join(',')}`} stroke={colour} strokeWidth={thickness * 1.3} />
    </g>
    <g className="physical-book-cover">
      <polygon points={points(cover)} fill={colour} stroke={colour} strokeWidth={depth * w * 0.006} />
      {triangles.map((indices, index) => <g key={index} opacity={front ? 1 : 0}>
        <defs><clipPath id={`${id}-face-${index}`}><polygon points={points(indices.map((i) => cover[i]))} /></clipPath></defs>
        <g clipPath={`url(#${id}-face-${index})`}>
          <image href={image} width="1855" height="848"
            transform={triangleMatrix(indices.map((i) => corners[i]), indices.map((i) => cover[i]))} />
        </g>
      </g>)}
      <g opacity={front ? 0 : depth}>
        <polygon points={points(paperInset(cover))} fill={`url(#${id}-left-paper)`} />
        <path d={`M${cover[1].join(',')} L${cover[2].join(',')} L${cover[3].join(',')}`}
          fill="none" stroke="#d0c2a9" strokeWidth={w * 0.008} />
      </g>
    </g>
    {openness > 0.99 && <g opacity={depth} fill="#8c816f" fontSize={w * 0.028} textAnchor="middle">
      <text x={q[0][0] - w * 0.85} y={q[3][1] - w * 0.06}>{spread * 2 + 1}</text>
      <text x={q[0][0] + w * 0.85} y={q[3][1] - w * 0.06}>{spread * 2 + 2}</text>
    </g>}
    {turn !== 0 && <g className="physical-book-turn">
      <polygon points={points([paper[0], [paper[0][0] + w * 0.2, paper[0][1]],
        [paper[3][0] + w * 0.2, paper[3][1]], paper[3]])} fill="#645440" opacity={sheetShadow * 0.17} />
      <polygon points={points(sheet)} fill={`url(#${id}-sheet)`} stroke="#bfb198" strokeWidth={w * 0.004}
        style={{ filter: `drop-shadow(${Math.cos(turnAngle) * thickness}px 1px ${thickness * (0.5 + sheetShadow)}px rgb(55 42 24 / 22%))` }} />
    </g>}
  </g>
}
