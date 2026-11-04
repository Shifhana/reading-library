// Translations in the existing 2019 × 848 scene map. No shelf/book scaling.
// Rear-to-front seating span: 330 → 252 units (23.6% tighter).
export const compactShelfLayout = {
  rear: { x: 115, y: 48, outline: 'M898 333 H1264 L1279 439 H898Z', cleanup: 'M885 320 H1275 L1295 456 H880Z', contact: 'M900 438 H1275' },
  middle: { x: -65, y: 25, outline: 'M263 437 H1047 L1064 578 H241 V550Z', cleanup: 'M252 425 H1059 L1080 593 H226 V538Z', contact: 'M250 577 H1058' },
  foreground: { x: 10, y: -30, outline: 'M997 565 H1840 L1919 802 H1018Z', cleanup: 'M981 551 H1853 L1935 823 H1004Z', contact: 'M1025 798 H1904' },
} as const

// Reduce the middle unit's exaggerated diagonal at its wide aspect ratio.
// Anchor the adjustment at the floor; the other two approved poses stay fixed.
export function shelfAngleTransform(name: keyof typeof compactShelfLayout) {
  return name === 'middle' ? 'matrix(1 0 -0.09 1 54.27 0)' : undefined
}
