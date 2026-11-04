export type BreezeMaterial = 'cane' | 'sage' | 'clay'
export type BreezeSize = 'large' | 'medium' | 'small'
export type BreezeForm = {
  id: number; x: number; y: number; width: number; height: number
  size: BreezeSize; material: BreezeMaterial; shape: keyof typeof botanicalProfiles
  layer: 0 | 1 | 2 | 3; depthMm: number; rest: number; tilt: number
  weave: 'cane' | 'triaxial'; rib: boolean
}

// Fabricated panel profiles in a 100-unit envelope, centred by the renderer.
// Broad shoulders taper into rounded tips; shallow asymmetric notches suggest
// folded botanical surfaces without veins, stems or repeated leaf motifs.
export const botanicalProfiles = {
  broad: 'M-8 -2 C-24 -5 -39 -23 -43 -44 C-48 -65 -34 -85 -15 -91 C-4 -95 5 -96 13 -99 C19 -101 24 -94 29 -86 C43 -68 48 -47 35 -29 C31 -23 21 -27 18 -20 C13 -11 2 1 -8 -2Z',
  sweep: 'M-26 -4 C-39 -17 -47 -36 -43 -57 C-39 -79 -20 -96 4 -98 C19 -99 37 -90 43 -78 C48 -67 34 -61 21 -51 C7 -39 1 -24 -10 -11 C-16 -4 -20 1 -26 -4Z',
  paddle: 'M-9 -2 C-24 -9 -33 -24 -37 -43 C-40 -57 -47 -69 -38 -81 C-27 -95 -7 -99 10 -97 C31 -94 44 -78 43 -61 C42 -42 28 -28 15 -13 C6 -3 -2 2 -9 -2Z',
  folded: 'M-17 -3 C-31 -12 -41 -31 -38 -52 C-35 -73 -15 -91 9 -98 C15 -100 19 -95 23 -88 C34 -72 41 -55 34 -39 C29 -31 18 -36 15 -26 C10 -11 -5 3 -17 -3Z',
  fan: 'M-7 -3 C-23 -9 -42 -28 -46 -49 C-50 -68 -37 -89 -19 -94 C-2 -99 16 -88 30 -80 C46 -70 49 -52 39 -36 C25 -15 5 1 -7 -3Z',
  dune: 'M-11 -2 C-29 -11 -45 -34 -43 -57 C-42 -78 -23 -90 -1 -94 C15 -97 29 -92 39 -79 C45 -70 41 -63 32 -61 C25 -59 34 -45 28 -33 C18 -15 0 2 -11 -2Z',
  cove: 'M-18 -3 C-35 -13 -47 -36 -43 -56 C-38 -78 -16 -94 10 -97 C26 -100 43 -84 45 -64 C46 -47 35 -32 24 -23 C17 -18 9 -28 3 -23 C-6 -14 -10 2 -18 -3Z',
  petal: 'M-12 -3 C-32 -15 -43 -40 -38 -61 C-32 -83 -12 -96 14 -98 C23 -99 27 -91 33 -80 C45 -59 38 -37 22 -19 C10 -6 -3 3 -12 -3Z',
  pebble: 'M-14 -5 C-32 -16 -43 -40 -36 -61 C-29 -80 -10 -92 10 -94 C26 -95 41 -79 40 -58 C39 -37 22 -18 3 -6 C-4 -2 -9 -2 -14 -5Z',
} as const

// A single flowing relief, not a baseline or a clock-shaped opening.
// Coordinates are concealed centre mounts; all weave and frame geometry rotates
// around those mounts. Four anchors, four connecting fields and one accent.
const depths = [15, 25, 32, 45] as const
type FormSpec = [number, number, number, number, BreezeSize, BreezeMaterial, keyof typeof botanicalProfiles, 0 | 1 | 2 | 3, number, number, boolean]
const forms: FormSpec[] = [
  // x, y, width, height, size, material, profile, layer, roll, yaw, rib
  [546, 240, 152, 198, 'large', 'cane', 'paddle', 1, -49, .4, false],
  [704, 225, 140, 225, 'large', 'sage', 'sweep', 2, 66, -.7, false],
  [916, 250, 160, 263, 'large', 'cane', 'broad', 0, 66, .2, false],
  [1130, 238, 174, 240, 'large', 'sage', 'cove', 1, 53, -.4, false],
  [448, 212, 104, 136, 'medium', 'cane', 'fan', 0, 38, .3, false],
  [789, 291, 111, 140, 'medium', 'clay', 'dune', 3, -55, -.5, true],
  [1018, 186, 94, 142, 'medium', 'cane', 'folded', 2, 57, .5, false],
  [1237, 280, 102, 151, 'medium', 'cane', 'petal', 1, 36, -.4, true],
  [846, 183, 82, 59, 'small', 'cane', 'pebble', 1, 25, .5, false],
]

// Paint nearest-wall surfaces first so overlaps follow the concealed mount depth.
export const breezeModules = forms.map<BreezeForm>(([x, y, width, height, size, material, shape, layer, rest, tilt, rib], id) => ({
  id, x, y, width, height, size, material, shape, layer, rest, tilt, rib,
  depthMm: depths[layer], weave: material === 'cane' ? 'cane' : 'triaxial',
})).sort((a, b) => a.layer - b.layer)
