export type ReadingStatus = 'Unread' | 'Currently reading' | 'Read'

export interface Book {
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
    title: 'Show Your Work!',
    author: 'Austin Kleon',
    coverImage: '/covers/show-your-work-placeholder.jpg',
    status: 'Read',
    dateRead: 'May 2026',
    whatIRemember:
      'Sharing small parts of the process can make creative work more visible and useful to other people.',
    myNotes:
      'Document the work as it develops, explain what influenced it, and share consistently without turning every update into self-promotion.',
  },
  {
    title: 'The Creative Act',
    author: 'Rick Rubin',
    coverImage: '/covers/the-creative-act-placeholder.jpg',
    status: 'Currently reading',
  },
  {
    title: 'Steal Like an Artist',
    author: 'Austin Kleon',
    coverImage: '/covers/steal-like-an-artist-placeholder.jpg',
    status: 'Unread',
    upNext: true,
  },
]
