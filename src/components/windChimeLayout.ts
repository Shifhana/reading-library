// The photograph's roof cut-back meets the rod canopy from (1258,86) to
// (1356,0). Follow that perspective edge, rather than a rod farther out in the bay.
export function chimeJunctionY(x: number) { return (1356 - x) * 86 / 98 }

type Strand = { x: number; drop: number; length: number; width: number; form: 'tube' | 'blade'; finish: 'brass' | 'bronze' }

// Follow the existing junction almost to the roof cut-back tip at x=1356.
// The narrower gaps let each blade brush a neighbour as the band opens out.
export const chimeStrands = ([
  { x: 1265, drop: 14, length: 40, width: 3.8, form: 'tube', finish: 'brass' },
  { x: 1275.1, drop: 17, length: 51, width: 4.5, form: 'tube', finish: 'bronze' },
  { x: 1281.6, drop: 15, length: 52, width: 7.5, form: 'blade', finish: 'brass' },
  { x: 1293.1, drop: 12, length: 38, width: 3.7, form: 'tube', finish: 'brass' },
  { x: 1303.7, drop: 16, length: 54, width: 4.4, form: 'tube', finish: 'brass' },
  { x: 1309.9, drop: 18, length: 50, width: 7.6, form: 'blade', finish: 'bronze' },
  { x: 1321.4, drop: 12, length: 43, width: 3.8, form: 'tube', finish: 'bronze' },
  { x: 1331.9, drop: 16, length: 49, width: 4.3, form: 'tube', finish: 'bronze' },
  { x: 1338.1, drop: 15, length: 53, width: 7.3, form: 'blade', finish: 'brass' },
  { x: 1350, drop: 11, length: 37, width: 3.7, form: 'tube', finish: 'brass' },
] satisfies Strand[]).map(strand => ({ ...strand, mountY: chimeJunctionY(strand.x), y: chimeJunctionY(strand.x) + 3 }))

// The tube and blade faces are the striking surfaces; the narrower weights
// hang just below them and leave clearance from adjacent strands.
export const chimeBodies = chimeStrands.map(({ x, y, drop, length, width }) => ({
  x, y, top: drop, bottom: drop + length, width,
}))
