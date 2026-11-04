import { books } from '../data/books.ts'
import { compactShelfLayout } from './compactShelfLayout.ts'
import { coverAspectRatio } from './coverDimensions.ts'

type Point = readonly [number, number]
// Fixed shelf positions: presentation slot, centre, relative height, lean, seating offset.
// One common physical-height family, projected at each shelf's existing distance.
// Most books are 95–104% of the baseline; the genuine pocket edition is 94%.
// Cover width is always derived separately from its intrinsic image ratio.
const arrangements = [
  { name: 'rear', bottom: 419.5, slope: 0, baselineHeight: 56, slots: [
    [0, 954, .98, .15, 0], [1, 998, 1, -.2, -.6], [2, 1051, .95, .1, 0],
    [3, 1094, .99, -.15, -.5], [4, 1142, 1.03, .2, 0],
  ] },
  { name: 'middle', bottom: 548.5, slope: 0, baselineHeight: 70, slots: [
    [5, 324, .97, -.2, 0], [6, 386, .99, .15, -.6], [7, 461, .96, -.1, 0],
    [8, 519, 1.03, .25, -.8], [9, 594, 1.04, -.15, 0], [10, 666, 1, .1, -.5],
    [11, 727, .94, .2, 0], [12, 800, .98, -.25, -.7], [13, 862, 1, .15, 0],
    [14, 943, 1.02, -.1, -.5],
  ] },
  { name: 'foreground', bottom: 749.5, slope: 0, baselineHeight: 108, slots: [
    [15, 1098, .98, -.2, 0], [16, 1196, 1.02, .15, -.4],
    [17, 1308, 1, -.1, 0], [18, 1410, .99, .25, -.6],
    [19, 1524, 1.04, -.15, 0], [20, 1628, 1.01, .1, -.5],
  ] },
] as const

// Colours stay tied to library identity, including the transferred books.
const colours = ['#917867', '#d3beaf', '#5a594b', '#845759', '#ac9585', '#4b595d', '#e3d2c7', '#a06f76', '#a1897a', '#6b6a5b', '#decbbf', '#445054', '#455057', '#decbc1', '#9e8677', '#616254', '#926162', '#746c5e', '#c0b29d', '#58666a', '#a79482']
// Keep presentation slots stable when a library entry is removed.
const slotSlugs = [
  'design-for-how-people-think', 'user-friendly', 'dont-make-me-think-revisited',
  'lean-ux-applying-lean-principles-to-improve-user-experience', 'articulating-design-decisions',
  'sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days', 'art-of-innovation',
  'atomic-design', 'designing-interactions', 'about-face-the-essentials-of-interaction-design',
  'universal-principles-of-ux', 'the-pocket-universal-principles-of-design', 'thinking-fast-and-slow',
  'inspired', 'empowered', 'emotional-design', 'continuous-discovery-habits', null,
  'business-thinking-for-designers', 'art-of-ux', 'designing-design',
] as const
export const displayBooks = arrangements.flatMap(shelf => {
  let previousRight = -Infinity
  return shelf.slots.flatMap(([index, originalCenter, relativeHeight, lean, offset]) => {
    const placement = compactShelfLayout[shelf.name]
    const record = books.find(book => book.slug === slotSlugs[index])
    const colour = colours[index]
    const thickness = [.038, .046, .031, .042, .035, .051, .033][index % 7]
    if (!record) return []
    const height = shelf.baselineHeight * relativeHeight
    const aspectRatio = coverAspectRatio(record.slug)
    const shear = shelf.slope + Math.tan(lean * Math.PI / 180)
    const width = height * aspectRatio
    const bottom = shelf.bottom + offset + placement.y
    const shift = height * shear
    // Keep approved centres unless the new physical width needs a little clearance.
    const center = Math.max(originalCenter + placement.x, previousRight + 7 + width / 2 - Math.min(0, shift))
    const corners: readonly Point[] = [
      [center - width / 2 + shift, bottom - height], [center + width / 2 + shift, bottom - height],
      [center + width / 2, bottom], [center - width / 2, bottom],
    ]
    const left = Math.min(...corners.map(([x]) => x))
    previousRight = Math.max(...corners.map(([x]) => x))
    return [{
      id: `room-book-${record.slug}`, slug: record.slug, record, shelf: shelf.name,
      corners, colour, thickness, shelfThickness: thickness * (shelf.name === 'rear' ? .85 : 1), bottom, top: bottom - height, left,
      width: previousRight - left, height, center, aspectRatio,
      label: `${record.title} on the ${shelf.name} shelf`,
      returnLabel: `Return ${record.title} to the ${shelf.name} shelf`,
      outline: corners.map(p => p.join(',')).join(' '),
    }]
  })
})
