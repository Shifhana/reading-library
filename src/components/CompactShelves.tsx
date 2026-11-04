import cleanPlate from '../assets/reading-garden-clean-plate-v23.png'
import shelfObject from '../assets/shelf-reference-object-v1.png'
import { compactShelfLayout, shelfAngleTransform } from './compactShelfLayout'
import type { TimeName } from '../environment/atmosphere'
import { project, receiver, solarDirections } from '../environment/solarGeometry'

// Existing footprints and book-support heights in the original scene coordinates.
const furniture = {
  rear: { left: 898, top: 333, width: 381, height: 106, seat: 86.5, inset: 5 },
  middle: { left: 241, top: 437, width: 823, height: 141, seat: 111.5, inset: 22 },
  foreground: { left: 997, top: 565, width: 922, height: 237, seat: 184.5, inset: 28 },
} as const

const shelfLabels = { rear: 'UP NEXT', middle: 'FINISHED', foreground: 'NOW READING' } as const

export function ShelfCleanup({ filter }: { filter: string }) {
  return <g aria-hidden="true" pointerEvents="none" style={{ filter }}>
    <defs>
      <filter id="shelf-cleanup-softness"><feGaussianBlur stdDeviation="3" /></filter>
      <mask id="shelf-clean-plate-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="2019" height="848">
        <g fill="white" filter="url(#shelf-cleanup-softness)">
          {Object.values(compactShelfLayout).map((s, i) => <path key={i} d={s.cleanup} />)}
        </g>
      </mask>
    </defs>
    <image href={cleanPlate} width="2019" height="848" preserveAspectRatio="none" mask="url(#shelf-clean-plate-mask)" />
  </g>
}

// One reference-derived physical object, reused at the existing perspective sizes.
// The silhouette clip excludes background remnants outside the canonical furniture.
export function CompactShelves({ filter, time }: { filter: string; time: TimeName }) {
  const sun = solarDirections[time]
  const fromRight = (sun?.[0] ?? 1) > 0
  return <g aria-hidden="true" pointerEvents="none" style={{ filter }}>
    <defs>
      {/* Muted antique brass sits inside the cut, with restrained satin shading.
          The inset edges follow the room light without a bright foil highlight. */}
      <linearGradient id="shelf-engraving-inlay" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop stopColor="#9a8259" /><stop offset=".42" stopColor="#715832" /><stop offset="1" stopColor="#60492b" />
      </linearGradient>
      <filter id="shelf-engraving" x="-5%" y="-20%" width="110%" height="140%" colorInterpolationFilters="sRGB">
        <feOffset in="SourceAlpha" dx={fromRight ? 1 : -1} dy="1.2" result="cut-offset" />
        <feComposite in="SourceAlpha" in2="cut-offset" operator="out" result="cut-edge" />
        <feFlood floodColor="#503c28" floodOpacity=".82" />
        <feComposite in2="cut-edge" operator="in" result="cut-shadow" />
        <feOffset in="SourceAlpha" dx={fromRight ? -1 : 1} dy="-1" result="light-offset" />
        <feComposite in="SourceAlpha" in2="light-offset" operator="out" result="light-edge" />
        <feFlood floodColor="#d5bd94" floodOpacity={sun ? '.5' : '.3'} />
        <feComposite in2="light-edge" operator="in" result="cut-light" />
        <feComponentTransfer in="SourceGraphic" result="recess"><feFuncA type="linear" slope=".94" /></feComponentTransfer>
        <feMerge><feMergeNode in="recess" /><feMergeNode in="cut-shadow" /><feMergeNode in="cut-light" /></feMerge>
      </filter>
      <filter id="furniture-contact" x="-10%" y="-200%" width="120%" height="500%"><feGaussianBlur stdDeviation="3" /></filter>
      <filter id="oak-finish" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
        {/* Preserve the real grain and bevels, easing the orange cast. */}
        <feGaussianBlur stdDeviation="1.6" result="soft-grain" />
        <feComposite in="SourceGraphic" in2="soft-grain" operator="arithmetic" k2="1.24" k3="-.24" />
        <feColorMatrix type="saturate" values=".82" />
        <feComponentTransfer><feFuncR type="linear" slope=".99" /><feFuncB type="linear" slope="1.025" /></feComponentTransfer>
        <feComposite in2="SourceAlpha" operator="in" />
      </filter>
      <filter id="shelf-cast-softness" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="7" /></filter>
      <linearGradient id="shelf-light-wrap" x1={fromRight ? '0%' : '100%'} x2={fromRight ? '100%' : '0%'}>
        <stop stopColor="#574c40" stopOpacity={time === 'night' ? '.06' : '.14'} /><stop offset=".45" stopColor="#e6d4b8" stopOpacity="0" />
        <stop offset="1" stopColor={time === 'night' ? '#e4d2b4' : time === 'evening' ? '#ffddb0' : '#fff1d9'} stopOpacity={sun ? '.18' : '.09'} />
      </linearGradient>
      <linearGradient id="shelf-floor-bounce" x2="0" y2="1">
        <stop offset=".65" stopColor="#ded0bb" stopOpacity="0" /><stop offset="1" stopColor="#ded0bb" stopOpacity=".09" />
      </linearGradient>
      <mask id="shelf-material-alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="2144" height="733" style={{ maskType: 'alpha' }}>
        <image href={shelfObject} width="2144" height="733" />
      </mask>
      <clipPath id="reference-shelf-silhouette">
        <path id="reference-shelf-contour" d="M82 83 Q68 84 66 104 L60 532 Q60 616 82 653 H144 Q150 617 168 611 H1966 Q2001 620 2040 653 H2097 Q2113 652 2114 633 L2114 547 L2040 125 Q2030 84 1980 83 L1927 92 H123 Q115 83 108 83Z" />
      </clipPath>
      {/* Exterior compositing must exclude the same contour as the furniture,
          including the sculpted cheeks, rather than the previous tray outline. */}
      <g id="rendered-shelf-silhouettes">
        {Object.entries(furniture).map(([name, shelf]) => {
          const placement = compactShelfLayout[name as keyof typeof compactShelfLayout]
          return <g key={name} transform={`${shelfAngleTransform(name as keyof typeof compactShelfLayout) ?? ''} translate(${shelf.left + placement.x} ${shelf.top + placement.y}) scale(${shelf.width / 2054} ${shelf.height / 574}) translate(-60 -82)`}>
            <use href="#reference-shelf-contour" />
          </g>
        })}
      </g>
    </defs>
    {Object.entries(furniture).map(([name, shelf]) => {
      const placement = compactShelfLayout[name as keyof typeof compactShelfLayout]
      const x = shelf.left + placement.x, y = shelf.top + placement.y
      const groundY = y + shelf.height - 2
      // Infer height using the room's existing camera and cast away from its sun.
      const ends = [x + shelf.width * .025, x + shelf.width * .975]
      const cast = ends.map(px => {
        const foot = receiver(px, groundY, 'floor')
        if (!foot || !sun) return [px, groundY]
        const height = shelf.height * (1 - .075 * foot[2]) / 111.875
        return project([foot[0] - sun[0] * height / sun[1], 0, foot[2] - sun[2] * height / sun[1]])
      })
      return <g key={name} transform={shelfAngleTransform(name as keyof typeof compactShelfLayout)}>
        {sun && <path d={`M${ends[0]} ${groundY} L${ends[1]} ${groundY} L${cast[1].join(' ')} L${cast[0].join(' ')}Z`}
          fill="#756550" opacity={time === 'evening' ? '.11' : '.13'} filter="url(#shelf-cast-softness)" clipPath="url(#microcement-floor-boundary)" />}
        <g transform={`translate(${x} ${y})`}>
        <defs><filter id={`shelf-ground-${name}`} x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation={shelf.height * .025} /></filter></defs>
        <ellipse cx={shelf.width / 2} cy={shelf.height} rx={shelf.width * .475} ry={shelf.height * .04}
          fill="#70604d" opacity=".19" filter={`url(#shelf-ground-${name})`} />
        <ellipse cx={shelf.width / 2} cy={shelf.height - 2} rx={shelf.width * .49} ry={shelf.height * .018}
          fill="#39281c" opacity=".24" filter="url(#furniture-contact)" />
        <svg width={shelf.width} height={shelf.height} viewBox="60 82 2054 574" preserveAspectRatio="none" overflow="visible">
          <image href={shelfObject} width="2144" height="733" clipPath="url(#reference-shelf-silhouette)" filter="url(#oak-finish)" />
          <g transform={`translate(235 596) scale(${(shelf.height / 574) / (shelf.width / 2054)} 1)`}>
            <text data-shelf-engraving={name} fill="url(#shelf-engraving-inlay)" fontFamily="sans-serif" fontSize={Math.max(32, 10 * 574 / shelf.height)}
              fontWeight="600" letterSpacing="4.5" filter="url(#shelf-engraving)">
              {shelfLabels[name as keyof typeof shelfLabels]}
            </text>
          </g>
          <g clipPath="url(#reference-shelf-silhouette)" mask="url(#shelf-material-alpha)">
            <rect x="60" y="82" width="2054" height="574" fill="url(#shelf-light-wrap)" />
            <rect x="60" y="82" width="2054" height="574" fill="url(#shelf-floor-bounce)" />
          </g>
        </svg>
        </g>
      </g>
    })}
  </g>
}

