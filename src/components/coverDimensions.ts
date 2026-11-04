// Intrinsic dimensions measured from the selected local assets, not book metadata.
// The SVG uses its intrinsic viewBox, avoiding the browser's rounded default size.
export const coverDimensions: Record<string, readonly [number, number]> = {
  'design-for-how-people-think': [500, 750],
  'user-friendly': [652, 1000],
  'dont-make-me-think-revisited': [311, 400],
  'lean-ux-applying-lean-principles-to-improve-user-experience': [500, 750],
  'articulating-design-decisions': [500, 750],
  'sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days': [331, 499],
  'art-of-innovation': [443, 675],
  'atomic-design': [3000, 4635],
  'designing-interactions': [416, 500],
  'about-face-the-essentials-of-interaction-design': [402, 500],
  'universal-principles-of-ux': [425, 500],
  'the-pocket-universal-principles-of-design': [498, 500],
  'thinking-fast-and-slow': [668, 1000],
  'inspired': [332, 494],
  'empowered': [337, 500],
  'emotional-design': [326, 500],
  'continuous-discovery-habits': [333, 500],
  'business-thinking-for-designers': [396, 604],
  'art-of-ux': [766, 965],
  'designing-design': [641, 1000],
}

export function coverAspectRatio(slug: string) {
  const [width, height] = coverDimensions[slug] ?? [600, 840]
  return width / height
}
