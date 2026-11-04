export const coverPalettes = {
  parchment: { paper: '#e8ddc5', ink: '#333e37', accent: '#829079' },
  sage: { paper: '#899781', ink: '#202f29', accent: '#d6dcc3' },
  olive: { paper: '#59654e', ink: '#f1e8d3', accent: '#aeb894' },
  clay: { paper: '#b57962', ink: '#302d27', accent: '#ead4b6' },
  blue: { paper: '#526c76', ink: '#f0e6d2', accent: '#a6bcb6' },
  mauve: { paper: '#99828c', ink: '#302d34', accent: '#e0ccd0' },
  stone: { paper: '#c9c4b4', ink: '#303c3b', accent: '#8a9c90' },
} as const

export type CoverMotif = 'thought' | 'bridge' | 'path' | 'iterate' | 'dialogue' | 'sprint' | 'seed' | 'modules' | 'interaction' | 'faces' | 'principles' | 'pocket' | 'dual' | 'spark' | 'rise' | 'emotion' | 'discovery' | 'practice' | 'framework' | 'flow' | 'horizon'
type Design = { palette: keyof typeof coverPalettes; motif: CoverMotif; subtitleAt?: string; temporaryAuthor?: string }

// Art direction belongs to the book's identity, never its shelf index or colour.
// A subtitle split retains every word of the original metadata title.
export const bookCoverDesigns: Record<string, Design> = {
  'design-for-how-people-think': { palette: 'parchment', motif: 'thought' },
  'user-friendly': { palette: 'clay', motif: 'bridge' },
  'dont-make-me-think-revisited': { palette: 'blue', motif: 'path', subtitleAt: ', Revisited' },
  'lean-ux-applying-lean-principles-to-improve-user-experience': { palette: 'sage', motif: 'iterate', subtitleAt: ': Applying' },
  'articulating-design-decisions': { palette: 'stone', motif: 'dialogue' },
  'sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days': { palette: 'clay', motif: 'sprint', subtitleAt: ' How to' },
  'art-of-innovation': { palette: 'olive', motif: 'seed' },
  'atomic-design': { palette: 'parchment', motif: 'modules' },
  'designing-interactions': { palette: 'blue', motif: 'interaction' },
  'about-face-the-essentials-of-interaction-design': { palette: 'mauve', motif: 'faces', subtitleAt: ': The' },
  'universal-principles-of-ux': { palette: 'stone', motif: 'principles' },
  'the-pocket-universal-principles-of-design': { palette: 'sage', motif: 'pocket' },
  'thinking-fast-and-slow': { palette: 'parchment', motif: 'dual' },
  'inspired': { palette: 'clay', motif: 'spark' },
  'empowered': { palette: 'olive', motif: 'rise' },
  'emotional-design': { palette: 'mauve', motif: 'emotion' },
  'continuous-discovery-habits': { palette: 'blue', motif: 'discovery' },
  'business-thinking-for-designers': { palette: 'sage', motif: 'framework' },
  'art-of-ux': { palette: 'clay', motif: 'flow' },
  'designing-design': { palette: 'parchment', motif: 'horizon' },
}

export function coverTitle(title: string, subtitleAt?: string) {
  const split = subtitleAt ? title.indexOf(subtitleAt) : -1
  return split > 0
    ? { title: title.slice(0, split), subtitle: title.slice(split).replace(/^[,: ]+/, '') }
    : { title, subtitle: '' }
}
