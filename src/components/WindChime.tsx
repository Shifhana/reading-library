import { useEffect, useId, useRef } from 'react'
import type { atmosphereAt } from '../environment/atmosphere'
import { chimeTarget, stepChime, resolveChimeContacts, createChimeBreeze, chimeTimeSettings, type ChimeMotion } from './windChimeMotion'

import { chimeStrands as strands, chimeBodies as bodies } from './windChimeLayout'
import { createChimeAudio } from './windChimeAudio'

export function WindChime({ atmosphere: a }: { atmosphere: ReturnType<typeof atmosphereAt> }) {
  const id = useId().replace(/:/g, '')
  const lightFromLeft = a.time === 'morning'
  const time = useRef(a.time)
  useEffect(() => { time.current = a.time }, [a.time])
  const installation = useRef<SVGGElement | null>(null)
  const moving = useRef<(SVGGElement | null)[]>([])
  useEffect(() => {
    const audio = createChimeAudio()
    const unlock = () => audio.unlock()
    // Capture also hears gestures handled by book/page controls. Pointer-up
    // retries activation on browsers that only grant audio at touch release.
    window.addEventListener('pointerdown', unlock, { passive: true, capture: true })
    window.addEventListener('pointerup', unlock, { passive: true, capture: true })
    window.addEventListener('keydown', unlock, { capture: true })
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0, last = 0, elapsed = 0
    let breeze = createChimeBreeze(0)
    const conditions = { ...chimeTimeSettings[time.current] }
    let states: ChimeMotion[] = Array.from({ length: strands.length }, () => ({ angle: 0, velocity: 0 }))
    const tick = (now: number) => {
      const dt = last ? Math.min(.025, (now - last) / 1000) : 0
      last = now
      const target = chimeTimeSettings[time.current]
      const blend = 1 - Math.exp(-dt / 2)
      for (const key of ['motion', 'speed', 'volume', 'minInterval', 'maxInterval'] as const) {
        conditions[key] += (target[key] - conditions[key]) * blend
      }
      elapsed += dt * conditions.speed
      if (elapsed >= breeze.nextStart) {
        breeze = createChimeBreeze(elapsed, Math.random, breeze)

      }
      states = states.map((state, i) => {
        const next = stepChime(state, chimeTarget(elapsed, i, breeze) * conditions.motion, dt, i)
        return next
      })
      const contacts = resolveChimeContacts(states, bodies)
      // Continuous motion produces sound only at actual closing contacts.
      contacts.forEach(contact => audio.strike(contact, conditions))
      installation.current?.setAttribute('data-breeze', 'flowing')
      states.forEach((state, i) => moving.current[i]?.setAttribute('transform', `translate(${strands[i].x} ${strands[i].y}) rotate(${state.angle})`))
      frame = requestAnimationFrame(tick)
    }
    const restart = () => {
      cancelAnimationFrame(frame)
      last = 0
      audio.setActive(!media.matches && !document.hidden)
      if (media.matches) {
        states = states.map(() => ({ angle: 0, velocity: 0 }))
        installation.current?.setAttribute('data-breeze', 'rest')
        moving.current.forEach((node, i) => node?.setAttribute('transform', `translate(${strands[i].x} ${strands[i].y})`))
      } else if (!document.hidden) frame = requestAnimationFrame(tick)
    }
    restart()
    media.addEventListener('change', restart)
    document.addEventListener('visibilitychange', restart)
    return () => {
      cancelAnimationFrame(frame)
      audio.dispose()
      window.removeEventListener('pointerdown', unlock, true)
      window.removeEventListener('pointerup', unlock, true)
      window.removeEventListener('keydown', unlock, true)
      media.removeEventListener('change', restart)
      document.removeEventListener('visibilitychange', restart)
    }
  }, [])

  return <g ref={installation} role="img" aria-label="Slender brass and bronze wind chimes suspended from the roof rods" pointerEvents="none"
    className="environment-fade"
    style={{ filter: `brightness(${a.exposure * .93}) sepia(${a.warmth})` }}>
    <defs>
      <linearGradient id={id + '-brass'} x1={lightFromLeft ? '100%' : '0%'} x2={lightFromLeft ? '0%' : '100%'}>
        <stop stopColor="#75634d" /><stop offset=".3" stopColor="#a38c69" />
        <stop offset=".62" stopColor="#baa380" /><stop offset=".82" stopColor="#b09a78" /><stop offset="1" stopColor="#877257" />
      </linearGradient>
      <linearGradient id={id + '-bronze'} x1={lightFromLeft ? '100%' : '0%'} x2={lightFromLeft ? '0%' : '100%'}>
        <stop stopColor="#6c5d4c" /><stop offset=".34" stopColor="#927e63" />
        <stop offset=".66" stopColor="#ad9678" /><stop offset="1" stopColor="#7c6a54" />
      </linearGradient>
      <linearGradient id={id + '-brass-blade'} x2="100%" y2="25%">
        <stop stopColor="#9e8868" /><stop offset=".43" stopColor="#b49d7b" /><stop offset=".75" stopColor="#a48e6d" /><stop offset="1" stopColor="#897455" />
      </linearGradient>
      <linearGradient id={id + '-bronze-blade'} x2="100%" y2="25%">
        <stop stopColor="#8e7b62" /><stop offset=".43" stopColor="#a38d71" /><stop offset=".75" stopColor="#927d63" /><stop offset="1" stopColor="#7b6852" />
      </linearGradient>
      <radialGradient id={id + '-brass-weight'} cx={lightFromLeft ? '34%' : '66%'} cy="30%" r="70%">
        <stop stopColor="#c0a983" /><stop offset="1" stopColor="#806749" />
      </radialGradient>
      <radialGradient id={id + '-bronze-weight'} cx={lightFromLeft ? '34%' : '66%'} cy="30%" r="70%">
        <stop stopColor="#aa9173" /><stop offset="1" stopColor="#6f5a47" />
      </radialGradient>
    </defs>
    {strands.map((strand, i) => {
      const { x, y, mountY, width, length, drop, form, finish } = strand
      const r = width / 2
      const blade = form === 'blade'
      const metal = `url(#${id}-${finish}${blade ? '-blade' : ''})`
      const weightRadius = blade ? 1.9 : width * .44
      const weightNeck = 1.8
      return <g key={x}>
        {/* A flush clasp inside the rod bay, with a fine dark return to the pivot. */}
        <ellipse cx={x + 4.2} cy={mountY + .2} rx=".62" ry=".83" fill="#494a3f" opacity=".64" />
        <path d={`M${x + 4.2} ${mountY + .8}L${x} ${y}`}
          fill="none" stroke="#464a3e" strokeWidth=".17" opacity=".4" />
        <g ref={node => { moving.current[i] = node }} transform={`translate(${x} ${y})`}>
          <path d={`M0 0V${drop}`} stroke="#464a3e" strokeWidth=".17" opacity=".46" fill="none" />
          <g transform={`translate(0 ${drop})`}>
            {blade
              ? <path d={`M${-r + .5} 0H${r - .5}Q${r} 0 ${r} .8V${length - 2.6}L${r - 1.1} ${length}H${-r + .5}L${-r} ${length - 1.5}V.8Q${-r} 0 ${-r + .5} 0Z`} fill={metal} />
              : <>
                <rect x={-r} width={width} height={length} rx=".55" fill={metal} />
                <ellipse cy={length - .48} rx={r - .4} ry=".43" fill="#68543d" opacity=".62" />
                <path d={`M${-r + .45} 1.5H${r - .45}`} stroke="#6f5d48" strokeWidth=".36" opacity=".52" />
              </>}
            <path d={`M${lightFromLeft ? -r + .55 : r - .55} 2.6V${length - 2.8}`} stroke="#dfc9a4"
              strokeOpacity={blade ? .17 : .23} strokeWidth=".32" />
            <path d={`M0 ${length}v${weightNeck + .4}`} stroke="#817054" strokeWidth=".42" />
            <circle cy={length + weightNeck + weightRadius} r={weightRadius} fill={`url(#${id}-${finish}-weight)`} />
          </g>
        </g>
      </g>
    })}
  </g>
}

