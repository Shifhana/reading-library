import vines from '../assets/right-edge-vines-v2.png'
import type { atmosphereAt } from '../environment/atmosphere'
import { solarDirections } from '../environment/solarGeometry'

// Follow the screen's receding rod spacing. Alternate the direction of the
// side shoots while keeping the existing foreground vine in its approved place.
const climbers = [
  { rod: 1455, base: 288, scale: .66, reverse: false },
  { rod: 1543, base: 296, scale: .74, reverse: true },
  { rod: 1597, base: 300, scale: .52, reverse: false },
  { rod: 1655, base: 304, scale: .84, reverse: false },
  { rod: 1774, base: 314, scale: .91, reverse: true },
  { rod: 1840, base: 319, scale: .94, reverse: false },
  { rod: 1902, base: 333.333, scale: 1, reverse: false },
  { rod: 1948, base: 326, scale: .64, reverse: true },
  { rod: 1994, base: 330, scale: .94, reverse: false },
]

// A few shoots turn over the coping, with unequal lengths and slight sideways
// drift rather than a continuous curtain across the perforated brickwork.
const trailers = [
  { x: 1543, y: 296, scale: .22, angle: -12 },
  { x: 1774, y: 314, scale: .31, angle: 9 },
  { x: 1994, y: 330, scale: .43, angle: -7 },
]

// The stems originate behind the existing coping: a concealed planting strip,
// with no new visible planter or alteration to the terracotta structure.
export function RightEdgePlanting({ atmosphere: a }: { atmosphere: ReturnType<typeof atmosphereAt> }) {
  const sun = solarDirections[a.time]
  const shadowX = sun && sun[0] < 0 ? 3 : -3
  return <g className="right-edge-planting" role="img" aria-label="Delicate vines climbing the right-hand rods, with a few shoots trailing over the terracotta jaali" pointerEvents="none">
    <defs>
      {/* Confine the growth to the screen and brick face, clear of the room. */}
      <clipPath id="right-vines-boundary"><path d="M1353 0H2019V548L1390 396L1388 83H1260Z" /></clipPath>
      {/* Only the existing rod faces and coping receive local attachment shade. */}
      <clipPath id="right-vines-contact-surfaces">
        <path d="M1390 279L2019 329V346L1390 295Z" />
        <path d="M1390 295L2019 346V548L1390 396Z" />
        {climbers.map(({ rod, base, scale }) => <rect key={rod} x={rod - 5 * scale} y="0" width={10 * scale} height={base} />)}
        <rect x="1856" y="0" width="8" height="317" />
      </clipPath>
      <mask id="right-vines-wrap" maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="340">
        <rect width="500" height="340" fill="white" />
        {/* Short rear sections disappear behind the rods as the tendrils turn. */}
        <rect x="465" y="268" width="10" height="2.5" fill="black" />
        <rect x="424" y="74" width="8" height="2" fill="black" />
      </mask>
      <filter id="right-vines-contact" x="-2%" y="-2%" width="104%" height="104%" colorInterpolationFilters="sRGB">
        <feColorMatrix type="matrix" values="0 0 0 0 .25  0 0 0 0 .27  0 0 0 0 .20  0 0 0 .15 0" />
        <feGaussianBlur stdDeviation=".8" />
      </filter>
      <g id="right-vines-climber">
        <image href={vines} width="500" height="333.333" preserveAspectRatio="xMidYMid meet" />
        <g fill="none" stroke="#62694c" strokeWidth="1.1" strokeLinecap="round" mask="url(#right-vines-wrap)">
          <path d="M475 282C460 277 457 271 466 268C474 266 478 272 473 275" />
          <path d="M417 81C423 87 437 82 435 77C434 73 427 73 426 76" />
        </g>
      </g>
      <g id="right-vines-surface">
        {climbers.map(({ rod, base, scale, reverse }) => <use key={rod} href="#right-vines-climber" transform={`translate(${rod - (reverse ? 30 : 470) * scale} ${base - 333.333 * scale}) scale(${scale})${reverse ? ' translate(500 0) scale(-1 1)' : ''}`} />)}
        {trailers.map(({ x, y, scale, angle }) => <use key={x} href="#right-vines-climber" transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale} ${-scale}) translate(-470 -333.333)`} />)}
      </g>
    </defs>
    <g clipPath="url(#right-vines-contact-surfaces)" opacity={sun ? 1 : .22}>
      <use href="#right-vines-surface" transform={`translate(${sun ? shadowX : 0} 1.5)`} filter="url(#right-vines-contact)" />
    </g>
    <g clipPath="url(#right-vines-boundary)" style={{ filter: `brightness(${a.exposure * .76}) contrast(1.04) saturate(.62) sepia(${a.warmth})` }}>
      <use href="#right-vines-surface" />
    </g>
  </g>
}
