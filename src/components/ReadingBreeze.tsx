import { useEffect, useId, useRef, useState } from 'react'
import { nextTimeMode, type TimeMode } from '../environment/timeSimulation'
import type { atmosphereAt } from '../environment/atmosphere'
import { solarDirections } from '../environment/solarGeometry'
import { breezeForce, stepBreeze, type BreezeMotion, type BreezePointer } from './readingBreezePhysics'
import { botanicalProfiles, breezeModules, type BreezeForm } from './readingBreezeLayout'
import { breezeResponse, panelContactMatrix, panelFaceMatrix, panelPose, svgMatrix } from './readingBreezeProjection'
import caneTexture from '../assets/reading-breeze/fine-lattice-v2.png'

const materials = {
  cane: { fibre: '#d1bea0', edge: '#bfa98a', shade: '#9e8c70', light: '#e6d8bd' },
  sage: { fibre: '#919d80', edge: '#7e8c73', shade: '#68765f', light: '#b0b89a' },
  clay: { fibre: '#b78e74', edge: '#a58067', shade: '#916e5c', light: '#ceb198' },
} as const
const still: BreezeMotion = { x: 0, y: 0, vx: 0, vy: 0 }
// Dye alters the fibre's luminance, retaining photographed grain and crossing
// occlusion. It is not a flat colour layer over the woven surface.
const dyes = { cane: [.13, .06, -.04], sage: [-.10, -.04, -.16], clay: [.11, -.05, -.115] } as const

function PanelDefinition({ p, id }: { p: BreezeForm; id: string }) {
  const material = materials[p.material]
  const shape = botanicalProfiles[p.shape]
  const shapeTransform = `translate(0 ${p.height / 2}) scale(${p.width / 100} ${p.height / 100})`
  const rib = `M0 ${p.height / 2} C${-p.width * .04} ${p.height * .2} ${p.width * .13} ${-p.height * .1} ${-p.width * .1} ${-p.height * .44}`
  return <>
    <path id={`${id}-silhouette-${p.id}`} d={shape} transform={shapeTransform} />
    <clipPath id={`${id}-clip-${p.id}`}><path d={shape} transform={shapeTransform} /></clipPath>
    <g id={`${id}-panel-${p.id}`}>
      <g clipPath={`url(#${id}-clip-${p.id})`}>
        {/* Fine lattice keeps its fabrication scale across differently sized
            forms. Native pinholes reveal the wall or the overlapped piece. */}
        <g transform={`translate(${p.id * 7} ${p.id * 11})`} filter={`url(#${id}-dyed-${p.material})`}>
          <rect x={-300 - p.id * 7} y={-300 - p.id * 11} width="600" height="600" fill={`url(#${id}-lattice)`} />
        </g>
        <use href={`#${id}-silhouette-${p.id}`} fill={`url(#${id}-surface-${p.material})`}
          opacity=".06" style={{ mixBlendMode: 'soft-light' }} />
        {/* An inward-facing turn gives the wrapped perimeter a tiny thickness.
            Clipping keeps both bevel strokes inside the approved contour. */}
        <use href={`#${id}-silhouette-${p.id}`} fill="none" stroke={material.shade}
          strokeWidth="3.6" opacity=".2" />
        <use href={`#${id}-silhouette-${p.id}`} transform="translate(-.45 -.55)" fill="none"
          stroke={material.light} strokeWidth="1.3" opacity=".4" />
      </g>
      {/* Fine wrapped cane edge: rounded binding, a soft bevel and quiet joins. */}
      <g transform={shapeTransform} fill="none" strokeLinejoin="round">
        <path d={shape} stroke={material.shade} strokeWidth="1.9" opacity=".42" />
        <path d={shape} stroke={material.edge} strokeWidth="1.45" />
        <path d={shape} stroke={`url(#${id}-edge-${p.material})`} strokeWidth=".85" />
        <path d={shape} stroke={material.light} strokeWidth=".9" strokeDasharray=".22 1.25 .3 1.4 .25 1.32" strokeLinecap="round" opacity=".4" />
      </g>
      {p.rib && <g fill="none">
        <path d={rib} stroke={material.shade} strokeWidth=".7" opacity=".22" />
        <path d={rib} stroke={material.light} strokeWidth=".35" opacity=".3" />
      </g>}
    </g>
  </>
}

function PanelClock({ hour, restingAngle, preview }: { hour: number; restingAngle: number; preview: boolean }) {
  const hourHand = useRef<SVGPathElement>(null)
  const minuteHand = useRef<SVGPathElement>(null)
  const secondHand = useRef<SVGPathElement>(null)
  useEffect(() => {
    let frame = 0
    const startedAt = Date.now()
    const draw = () => {
      const now = new Date()
      const currentHour = preview ? hour : now.getHours() + now.getMinutes() / 60
        + now.getSeconds() / 3600 + now.getMilliseconds() / 3600000
      hourHand.current?.setAttribute('transform', `rotate(${(currentHour % 12) * 30})`)
      // Keep the minute hand running even while the room previews a fixed hour.
      const minuteHour = preview ? hour + (Date.now() - startedAt) / 3600000 : currentHour
      minuteHand.current?.setAttribute('transform', `rotate(${(minuteHour % 1) * 360})`)
      const seconds = preview ? (Date.now() - startedAt) / 1000 : now.getSeconds() + now.getMilliseconds() / 1000
      secondHand.current?.setAttribute('transform', `rotate(${(seconds % 60) * 6})`)
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }
    const refresh = () => {
      cancelAnimationFrame(frame)
      draw()
    }
    refresh()
    document.addEventListener('visibilitychange', refresh)
    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [hour, preview])
  // Mount upright on the installed panel. The complete assembly still follows
  // its existing breeze transform; only the hands turn with local time.
  return <g data-panel-clock="true" transform={`rotate(${-restingAngle})`}>
    <g fill="#514a38" opacity=".85" fontFamily="Georgia, serif" fontSize="11"
      textAnchor="middle" dominantBaseline="central">
      {Array.from({ length: 12 }, (_, i) => {
        const numeral = i + 1
        const angle = numeral * Math.PI / 6
        return <text key={numeral} x={Math.sin(angle) * 46} y={-Math.cos(angle) * 46}>{numeral}</text>
      })}
    </g>
    <g fill="none" stroke="#514a38" strokeLinecap="round">
      <path ref={hourHand} data-clock-hand="hour" d="M0 3V-24" strokeWidth="1.65" transform={`rotate(${(hour % 12) * 30})`} />
      <path ref={minuteHand} data-clock-hand="minute" d="M0 4V-37" strokeWidth="1.5" transform={`rotate(${(hour % 1) * 360})`} />
      <path ref={secondHand} data-clock-hand="second" d="M0 6V-39" strokeWidth=".8" stroke="#78694e" />
    </g>
    <circle r="2.1" fill="#78694e" />
    <circle r=".8" fill="#b5a17a" />
  </g>
}

export function ReadingBreeze({ atmosphere: a, clockHour, clockLabel, clockPreview, timeMode, onCycleTime }: {
  atmosphere: ReturnType<typeof atmosphereAt>; clockHour: number; clockLabel: string; clockPreview: boolean
  timeMode: TimeMode; onCycleTime: () => TimeMode
}) {
  const [timeNotice, setTimeNotice] = useState<{ mode: TimeMode; sequence: number } | null>(null)
  const cycleTime = () => {
    const mode = onCycleTime()
    setTimeNotice(previous => ({ mode, sequence: (previous?.sequence ?? 0) + 1 }))
  }
  const root = useRef<SVGGElement>(null)
  const bodies = useRef<(SVGGElement | null)[]>([])
  const shadows = useRef<(SVGGElement | null)[]>([])
  const light = useRef(solarDirections[a.time])
  const id = useId().replace(/:/g, '')
  const sun = solarDirections[a.time]
  const night = a.time === 'night'
  const shadowDensity = night ? .055 : .12
  useEffect(() => { light.current = sun }, [sun])

  useEffect(() => {
    const element = root.current
    const svg = element?.ownerSVGElement
    if (!element || !svg) return
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let reduced = media.matches
    const states: BreezeMotion[] = breezeModules.map(() => ({ ...still }))
    let pointer: BreezePointer = { x: 0, y: 0, speed: 0, active: false }
    let lastPointer = 0, lastFrame = 0, elapsed = 0, frame = 0
    const leave = () => { pointer.active = false; pointer.speed = 0 }
    const onMotionChange = () => { reduced = media.matches }
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const matrix = element.getScreenCTM()
      if (!matrix) return
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
      const now = performance.now()
      const delta = Math.max(.008, (now - lastPointer) / 1000)
      const speed = pointer.active && now - lastPointer < 150
        ? Math.hypot(point.x - pointer.x, point.y - pointer.y) / delta : 0
      pointer = { x: point.x, y: point.y, speed: Math.min(1800, speed), active: true }
      lastPointer = now
    }
    const draw = (now: number) => {
      const dt = lastFrame ? Math.min(.025, (now - lastFrame) / 1000) : 1 / 60
      lastFrame = now
      elapsed += dt
      pointer.speed *= Math.exp(-dt * 6)
      breezeModules.forEach((p, i) => {
        const response = breezeResponse[p.size]
        const force = breezeForce(p.x, p.y, pointer, reduced, 125 + p.width * .25)
        const phase = p.id * 2.399
        const idle = (Math.sin(elapsed * (.2 + p.id % 5 * .012) + phase) * .1
          + Math.sin(elapsed * .13 + phase * 1.7) * .04) * (reduced ? .05 : 1)
        const next = stepBreeze(states[i], {
          x: (force.x + idle) * response.gain,
          y: (force.y + idle * .3) * response.gain,
        }, dt, p.id, response.mass)
        states[i] = next
        const pose = panelPose(p, next)
        const face = panelFaceMatrix(pose)
        const shadow = panelContactMatrix(pose, light.current)
        bodies.current[i]?.setAttribute('transform', svgMatrix(face))
        shadows.current[i]?.setAttribute('transform', svgMatrix(shadow))
      })
      frame = requestAnimationFrame(draw)
    }
    const visibility = () => {
      cancelAnimationFrame(frame)
      leave()
      lastFrame = 0
      if (!document.hidden) frame = requestAnimationFrame(draw)
    }
    svg.addEventListener('pointermove', move, { passive: true })
    svg.addEventListener('pointerleave', leave)
    window.addEventListener('blur', leave)
    media.addEventListener('change', onMotionChange)
    document.addEventListener('visibilitychange', visibility)
    if (!document.hidden) frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      svg.removeEventListener('pointermove', move)
      svg.removeEventListener('pointerleave', leave)
      window.removeEventListener('blur', leave)
      media.removeEventListener('change', onMotionChange)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [])

  return <g ref={root} className="reading-breeze" role="group" aria-label={`Reading Breeze woven installation. Local time ${clockLabel}`} pointerEvents="none" data-breeze-time={a.time}>
    <defs>
      {/* Mirrored neighbouring tiles meet without a cut seam. The photographic
          strip grain stays much finer than the panel's perimeter binding. */}
      <pattern id={`${id}-lattice`} width="192" height="192" patternUnits="userSpaceOnUse">
        <image href={caneTexture} width="96" height="96" />
        <image href={caneTexture} width="96" height="96" transform="translate(192 0) scale(-1 1)" />
        <image href={caneTexture} width="96" height="96" transform="translate(0 192) scale(1 -1)" />
        <image href={caneTexture} width="96" height="96" transform="translate(192 192) scale(-1 -1)" />
      </pattern>
      {Object.entries(materials).map(([name, material]) => <g key={name}>
        <linearGradient id={`${id}-surface-${name}`} x1={sun && sun[0] < 0 ? '0%' : '100%'} x2={sun && sun[0] < 0 ? '100%' : '0%'} y1="0%" y2="80%">
          <stop stopColor={material.fibre} />
          <stop offset=".23" stopColor={material.light} />
          <stop offset=".64" stopColor={material.fibre} />
          <stop offset="1" stopColor={material.edge} />
        </linearGradient>
        <filter id={`${id}-dyed-${name}`} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          {/* Local contrast reveals the photographed fibre crossings and pores.
              Preserve their native alpha so the weave stays physically open. */}
          <feGaussianBlur in="SourceGraphic" stdDeviation=".35" result="soft-fibre" />
          <feComposite in="SourceGraphic" in2="soft-fibre" operator="arithmetic" k2="1.28" k3="-.28" />
          <feColorMatrix type="saturate" values="0" result="luminance" />
          <feComponentTransfer in="luminance" result="dyed">
            <feFuncR type="linear" slope=".9" intercept={dyes[name as keyof typeof dyes][0]} />
            <feFuncG type="linear" slope=".9" intercept={dyes[name as keyof typeof dyes][1]} />
            <feFuncB type="linear" slope=".9" intercept={dyes[name as keyof typeof dyes][2]} />
          </feComponentTransfer>
          <feComposite in2="SourceAlpha" operator="in" />
        </filter>
        <linearGradient id={`${id}-edge-${name}`} x1={sun && sun[0] < 0 ? '0%' : '100%'} x2={sun && sun[0] < 0 ? '100%' : '0%'} y2="20%">
          <stop stopColor={night ? '#e3d4b8' : a.time === 'morning' ? '#ecdfbc' : material.light} stopOpacity={night ? '.66' : '.9'} />
          <stop offset="1" stopColor={material.shade} stopOpacity=".3" />
        </linearGradient>
      </g>)}
      {[0, 1, 2, 3].map(layer => <filter key={layer} id={`${id}-shadow-${layer}`} x="-45%" y="-35%" width="190%" height="170%" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation={1.6 + layer * .55} />
      </filter>)}
      <clipPath id={`${id}-wall`}><path d="M334 93H1361L1348 444H334Z" /></clipPath>
      {breezeModules.map(p => <PanelDefinition key={p.id} p={p} id={id} />)}
    </defs>
    {breezeModules.map((p, i) => <g key={p.id}>
      {/* Depth order lets a forward panel cast a soft cue over the panel behind it. */}
      <g clipPath={`url(#${id}-wall)`} mask="url(#sun-receivers)">
        <g data-breeze-contact-shadow={p.id} opacity={shadowDensity} ref={node => { shadows.current[i] = node }}
          transform={svgMatrix(panelContactMatrix(panelPose(p, still), sun))}>
          <use href={`#${id}-silhouette-${p.id}`} fill="#655b4c" filter={`url(#${id}-shadow-${p.layer})`} />
        </g>
      </g>
      <g data-breeze-module={p.id} data-breeze-material={p.material} data-breeze-depth-mm={p.depthMm}
        ref={node => { bodies.current[i] = node }} transform={svgMatrix(panelFaceMatrix(panelPose(p, still)))}>
        <g style={{ filter: `brightness(${night ? .80 : a.exposure}) sepia(${a.warmth})` }}>
          <use href={`#${id}-panel-${p.id}`} />
          {p.id === 2 && <PanelClock hour={clockHour} restingAngle={p.rest} preview={clockPreview} />}
          {p.id === 6 && <g className="breeze-time-control" role="button" tabIndex={0}
            aria-label={`Time simulator: ${timeMode}. Activate for ${nextTimeMode(timeMode)}.`}
            onClick={cycleTime} onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                if (!event.repeat) cycleTime()
              }
            }}>
            <use className="breeze-time-surface" href={`#${id}-silhouette-${p.id}`} pointerEvents="all" />
            <g transform={`rotate(${-p.rest})`} pointerEvents="none" aria-hidden="true">
              {timeNotice && <text key={timeNotice.sequence} className="breeze-time-label" textAnchor="middle" dominantBaseline="middle">
                {timeNotice.mode[0].toUpperCase() + timeNotice.mode.slice(1)}
              </text>}
            </g>
          </g>}
        </g>
      </g>
    </g>)}
  </g>
}
