import { bookReadingNotes } from './bookReadingNotes.ts'

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
  summary: string
  takeaways: string
  upNext?: boolean
}

export const books: Book[] = [
  {
    slug: 'design-for-how-people-think',
    ...bookReadingNotes['design-for-how-people-think'],
    title: 'Design for how people think',
    author: 'John Whalen',
    coverImage: new URL('../assets/book-covers/design-for-how-people-think-published.jpg', import.meta.url).href,
    status: 'Currently reading',
  },
  {
    slug: 'user-friendly',
    ...bookReadingNotes['user-friendly'],
    title: 'User Friendly',
    author: 'Robert Fabricant, Cliff Kuang',
    coverImage: new URL('../assets/book-covers/user-friendly-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'dont-make-me-think-revisited',
    ...bookReadingNotes['dont-make-me-think-revisited'],
    title: "Don't Make Me Think, Revisited",
    author: 'Steve Krug',
    coverImage: new URL('../assets/book-covers/dont-make-me-think-revisited-published.jpg', import.meta.url).href,
    status: 'Read',
    dateRead: '2025-02-19',
  },
  {
    slug: 'lean-ux-applying-lean-principles-to-improve-user-experience',
    ...bookReadingNotes['lean-ux-applying-lean-principles-to-improve-user-experience'],
    title: 'Lean UX: Applying Lean Principles to Improve User Experience',
    author: 'Josh Seiden, Jeff Gothelf',
    coverImage: new URL('../assets/book-covers/lean-ux-applying-lean-principles-to-improve-user-experience-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'articulating-design-decisions',
    ...bookReadingNotes['articulating-design-decisions'],
    title: 'Articulating Design Decisions',
    author: 'Tom Greever',
    coverImage: new URL('../assets/book-covers/articulating-design-decisions-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days',
    ...bookReadingNotes['sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days'],
    title:
      'Sprint How to Solve Big Problems and Test New Ideas in Just Five Days',
    author: 'Jake Knapp, John Zeratsky, Braden Kowitz',
    coverImage: new URL('../assets/book-covers/sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days-published.jpg', import.meta.url).href,
    status: 'Read',
    dateRead: '2025-02-06',
  },
  {
    slug: 'art-of-innovation',
    ...bookReadingNotes['art-of-innovation'],
    title: 'art of innovation',
    author: 'Tom Kelley with Jonathan Littman',
    coverImage: new URL('../assets/book-covers/art-of-innovation-published.jpg', import.meta.url).href,
    status: 'Read',
  },
  {
    slug: 'atomic-design',
    ...bookReadingNotes['atomic-design'],
    title: 'Atomic Design',
    author: 'Brad Frost',
    coverImage: new URL('../assets/book-covers/atomic-design-published.svg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'designing-interactions',
    ...bookReadingNotes['designing-interactions'],
    title: 'Designing Interactions',
    author: 'Bill Moggridge',
    coverImage: new URL('../assets/book-covers/designing-interactions-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'about-face-the-essentials-of-interaction-design',
    ...bookReadingNotes['about-face-the-essentials-of-interaction-design'],
    title: 'About Face: The Essentials of Interaction Design',
    author: 'Alan Cooper, Robert Reimann, David Cronin, Christopher Noessel',
    coverImage: new URL('../assets/book-covers/about-face-the-essentials-of-interaction-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'universal-principles-of-ux',
    ...bookReadingNotes['universal-principles-of-ux'],
    title: 'Universal Principles of UX',
    author: 'Irene Pereyra',
    coverImage: new URL('../assets/book-covers/universal-principles-of-ux-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'the-pocket-universal-principles-of-design',
    ...bookReadingNotes['the-pocket-universal-principles-of-design'],
    title: 'The Pocket Universal Principles of Design',
    author: 'William Lidwell',
    coverImage: new URL('../assets/book-covers/the-pocket-universal-principles-of-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'thinking-fast-and-slow',
    ...bookReadingNotes['thinking-fast-and-slow'],
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: new URL('../assets/book-covers/thinking-fast-and-slow-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'inspired',
    ...bookReadingNotes['inspired'],
    title: 'Inspired',
    author: 'Marty Cagan',
    coverImage: new URL('../assets/book-covers/inspired-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'empowered',
    ...bookReadingNotes['empowered'],
    title: 'Empowered',
    author: 'Marty Cagan, Chris Jones',
    coverImage: new URL('../assets/book-covers/empowered-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'emotional-design',
    ...bookReadingNotes['emotional-design'],
    title: 'Emotional Design',
    author: 'Don Norman',
    coverImage: new URL('../assets/book-covers/emotional-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'continuous-discovery-habits',
    ...bookReadingNotes['continuous-discovery-habits'],
    title: 'Continuous Discovery Habits',
    author: 'Teresa Torres',
    coverImage: new URL('../assets/book-covers/continuous-discovery-habits-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'business-thinking-for-designers',
    ...bookReadingNotes['business-thinking-for-designers'],
    title: 'Business Thinking for Designers',
    author: 'Ryan Rumsey',
    coverImage: new URL('../assets/book-covers/business-thinking-for-designers-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'art-of-ux',
    ...bookReadingNotes['art-of-ux'],
    title: 'Art Of UX',
    author: 'Tulasi Krishna Penumarthy',
    coverImage: new URL('../assets/book-covers/art-of-ux-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'designing-design',
    ...bookReadingNotes['designing-design'],
    title: 'Designing Design',
    author: 'Kenya Hara',
    coverImage: new URL('../assets/book-covers/designing-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
]
