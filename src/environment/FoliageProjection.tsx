import type { CSSProperties } from 'react'
import type { TimeName } from './atmosphere'
import foliage from '../assets/foliage-shadow-v2.png'
import { foliageLayers, floorProjection, sunProjection } from './sunProjection'

function ShadowLayer({ layer, time, surface }: { layer: typeof foliageLayers[number]; time: TimeName; surface: 'wall' | 'floor' }) {
  const sun = sunProjection[time]
  const id = `foliage-${surface}-${layer.id}`
  return <g className="foliage-drift" style={{ '--sway-duration': `${layer.duration}s`, '--sway-delay': `${layer.delay}s` } as CSSProperties}>
    <defs>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feColorMatrix type="saturate" values="0" />
        <feGaussianBlur stdDeviation={layer.blur * sun.blur} />
      </filter>
    </defs>
    <g transform={`translate(${sun.x} ${sun.y}) rotate(${sun.rotation} 300 446) skewX(${sun.skew}) scale(${sun.scale})`}>
      <g transform={`rotate(${layer.rotation} ${layer.x} ${layer.y})`} opacity={layer.opacity * sun.opacity} filter={`url(#${id})`}>
        <svg x={layer.x} y={layer.y} width={layer.width} height={layer.height} viewBox="0 0 1000 700" preserveAspectRatio="none" overflow="hidden">
          <g mask="url(#foliage-crop-feather)">
            <svg width="1000" height="700" viewBox={layer.crop} preserveAspectRatio="none">
              <image href={foliage} width="1536" height="1024" />
            </svg>
          </g>
        </svg>
      </g>
    </g>
  </g>
}

export function FoliageProjection({ time }: { time: TimeName }) {
  const sun = sunProjection[time]
  if (time !== 'morning') return null
  return <g aria-hidden="true" pointerEvents="none" mask="url(#sun-receivers)" style={{ mixBlendMode: 'multiply' }}>
    <defs>
      {/* Crop edges fade inside the source viewport, before blur/projection.
          Receiver clips are outside every transform and filter. */}
      <radialGradient id="foliage-feather"><stop offset="0" stopColor="white" /><stop offset=".55" stopColor="white" /><stop offset="1" stopColor="black" /></radialGradient>
      <mask id="foliage-crop-feather" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="700"><ellipse cx="500" cy="350" rx="500" ry="350" fill="url(#foliage-feather)" /></mask>
      <linearGradient id="foliage-floor-depth" x1="0" y1="446" x2="0" y2="848" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity=".45" /><stop offset=".6" stopColor="white" stopOpacity=".85" /><stop offset="1" stopColor="white" /></linearGradient>
      <mask id="foliage-floor-falloff" maskUnits="userSpaceOnUse" x="0" y="446" width="1855" height="402"><rect y="446" width="1855" height="402" fill="url(#foliage-floor-depth)" /></mask>
      <linearGradient id="floor-focus" x1="0" y1="446" x2="0" y2="760" gradientUnits="userSpaceOnUse"><stop stopColor="black" /><stop offset="1" stopColor="white" /></linearGradient>
      <linearGradient id="floor-defocus" x1="0" y1="446" x2="0" y2="760" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="black" /></linearGradient>
      <mask id="floor-near-focus" maskUnits="userSpaceOnUse" x="0" y="446" width="1855" height="402"><rect y="446" width="1855" height="402" fill="url(#floor-focus)" /></mask>
      <mask id="floor-far-focus" maskUnits="userSpaceOnUse" x="0" y="446" width="1855" height="402"><rect y="446" width="1855" height="402" fill="url(#floor-defocus)" /></mask>
      <filter id="floor-distance-blur"><feGaussianBlur stdDeviation="2.4" /></filter>
      <g id="floor-foliage-field" transform={floorProjection(sun.floorStretch, sun.floorSkew)}>
        <g transform={sun.side === 'right' ? 'translate(1736 0) scale(-1 1)' : undefined}>
          {foliageLayers.map(layer => <ShadowLayer key={layer.id} layer={layer} time={time} surface="floor" />)}
        </g>
      </g>
    </defs>
    <g clipPath="url(#sun-wall)" data-shadow-surface="wall">
      <g transform={sun.side === 'right' ? 'translate(1736 0) scale(-1 1)' : undefined}>
        {foliageLayers.map(layer => <ShadowLayer key={layer.id} layer={layer} time={time} surface="wall" />)}
      </g>
    </g>
    <g clipPath="url(#sun-floor)" mask="url(#foliage-floor-falloff)" data-shadow-surface="floor">
      {/* Complementary masks mix focus, without doubling the shadow density. */}
      <use href="#floor-foliage-field" mask="url(#floor-near-focus)" />
      <g mask="url(#floor-far-focus)"><use href="#floor-foliage-field" filter="url(#floor-distance-blur)" /></g>
    </g>
  </g>
}
