export type ReadingStatus = 'Unread' | 'Currently reading' | 'Read'

export interface Book {
  slug: string
  title: string
  author: string
  coverImage: string
  status: ReadingStatus
  dateRead?: string
  whatIRemember?: string
  myNotes?: string
  upNext?: boolean
}

export const books: Book[] = [
  {
    slug: 'design-for-how-people-think',
    title: 'Design for how people think',
    author: 'Steve Krug',
    coverImage: '/covers/design-for-how-people-think-placeholder.jpg',
    status: 'Currently reading',
  },
  {
    slug: 'user-friendly',
    title: 'User Friendly',
    author: 'Robert Fabricant, Cliff Kuang',
    coverImage: '/covers/user-friendly-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'dont-make-me-think-revisited',
    title: "Don't Make Me Think, Revisited",
    author: 'Steve Krug',
    coverImage: '/covers/dont-make-me-think-revisited-placeholder.jpg',
    status: 'Read',
    dateRead: '2025-02-19',
  },
  {
    slug: 'lean-ux-applying-lean-principles-to-improve-user-experience',
    title: 'Lean UX: Applying Lean Principles to Improve User Experience',
    author: 'Josh Seiden, Jeff Gothelf',
    coverImage: '/covers/lean-ux-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'articulating-design-decisions',
    title: 'Articulating Design Decisions',
    author: 'Tom Greever',
    coverImage: '/covers/articulating-design-decisions-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days',
    title:
      'Sprint How to Solve Big Problems and Test New Ideas in Just Five Days',
    author: 'Jake Knap',
    coverImage: '/covers/sprint-placeholder.jpg',
    status: 'Read',
    dateRead: '2025-02-06',
  },
  {
    slug: 'art-of-innovation',
    title: 'art of innovation',
    author: '',
    coverImage: '/covers/art-of-innovation-placeholder.jpg',
    status: 'Read',
  },
  {
    slug: 'atomic-design',
    title: 'Atomic Design',
    author: 'Brad Frost',
    coverImage: '/covers/atomic-design-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'designing-interactions',
    title: 'Designing Interactions',
    author: 'Bill Moggridge',
    coverImage: '/covers/designing-interactions-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'about-face-the-essentials-of-interaction-design',
    title: 'About Face: The Essentials of Interaction Design',
    author: '',
    coverImage: '/covers/about-face-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'universal-principles-of-ux',
    title: 'Universal Principles of UX',
    author: '',
    coverImage: '/covers/universal-principles-of-ux-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'the-pocket-universal-principles-of-design',
    title: 'The Pocket Universal Principles of Design',
    author: 'William Lidwell',
    coverImage: '/covers/the-pocket-universal-principles-of-design-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'thinking-fast-and-slow',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: '/covers/thinking-fast-and-slow-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'inspired',
    title: 'Inspired',
    author: 'Marty Cagan',
    coverImage: '/covers/inspired-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'empowered',
    title: 'Empowered',
    author: 'Marty Cagan',
    coverImage: '/covers/empowered-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'emotional-design',
    title: 'Emotional Design',
    author: 'Don Norman',
    coverImage: '/covers/emotional-design-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'continuous-discovery-habits',
    title: 'Continuous Discovery Habits',
    author: 'Teresa Torres',
    coverImage: '/covers/continuous-discovery-habits-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'artiom-dashinsky-bundle',
    title: 'Artiom dashinsky (bundle)',
    author: '',
    coverImage: '/covers/artiom-dashinsky-bundle-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'business-thinking-for-designers',
    title: 'Business Thinking for Designers',
    author: 'Ryan Rumsey',
    coverImage: '/covers/business-thinking-for-designers-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'art-of-ux',
    title: 'Art Of UX',
    author: 'Tulasi Krishna Penumarthy',
    coverImage: '/covers/art-of-ux-placeholder.jpg',
    status: 'Unread',
  },
  {
    slug: 'designing-design',
    title: 'Designing Design',
    author: 'Kenya Hara',
    coverImage: '/covers/designing-design-placeholder.jpg',
    status: 'Unread',
  },
]
