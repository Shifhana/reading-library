import table from '../assets/reading-table-v1.png'
import type { atmosphereAt } from '../environment/atmosphere'
import { solarDirections } from '../environment/solarGeometry'

// One quiet foreground object; crop against the photograph, not the browser's
// letterbox. Native image proportions keep the stone, supports and books intact.
export function ReadingTable({ atmosphere: a }: { atmosphere: ReturnType<typeof atmosphereAt> }) {
  const sun = solarDirections[a.time]
  const fromRight = (sun?.[0] ?? 1) > 0
  return <g className="reading-table" role="img" aria-label="A low limestone and pale-oak reading table with three closed books" pointerEvents="none" clipPath="url(#reading-table-room-frame)">
    <defs>
      <clipPath id="reading-table-room-frame"><rect width="2019" height="848" /></clipPath>
      <mask id="reading-table-alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="640" height="320" style={{ maskType: 'alpha' }}>
        <image href={table} width="640" height="320" preserveAspectRatio="xMidYMid meet" />
      </mask>
      <linearGradient id="reading-table-daylight" x1={fromRight ? '0%' : '100%'} x2={fromRight ? '100%' : '0%'}>
        <stop stopColor="#6c6254" stopOpacity=".08" />
        <stop offset=".5" stopColor="#ece1ce" stopOpacity="0" />
        <stop offset="1" stopColor="#fff1d9" stopOpacity={sun ? '.12' : '0'} />
      </linearGradient>
    </defs>
    <g transform="translate(-65 575)" style={{ filter: `brightness(${a.exposure}) contrast(${a.contrast}) sepia(${a.warmth})` }}>
      <image href={table} width="640" height="320" preserveAspectRatio="xMidYMid meet" />
      <rect width="640" height="320" fill="url(#reading-table-daylight)" mask="url(#reading-table-alpha)" />
    </g>
  </g>
}
