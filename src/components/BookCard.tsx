import { useState, type MouseEvent } from 'react'
import type { Book } from '../data/books'
import './BookCard.css'

interface BookCardProps {
  book: Book
  href: string
  onNavigate: (event: MouseEvent<HTMLAnchorElement>) => void
}

export function BookCard({ book, href, onNavigate }: BookCardProps) {
  const [failedCover, setFailedCover] = useState<string | null>(null)
  const coverIsUnavailable =
    !book.coverImage || failedCover === book.coverImage

  return (
    <article className="book-card">
      <a
        className="book-card-link"
        href={href}
        aria-label={`View ${book.title} by ${book.author}`}
        onClick={onNavigate}
      >
        <div className="book-card-cover">
          {coverIsUnavailable ? (
            <div
              className="book-card-cover-fallback"
              role="img"
              aria-label={`Cover unavailable for ${book.title}`}
            >
              Cover unavailable
            </div>
          ) : (
            <img
              src={book.coverImage}
              alt={`Book cover for ${book.title} by ${book.author}`}
              onError={() => setFailedCover(book.coverImage)}
            />
          )}
        </div>
        <div className="book-card-details">
          <h3>{book.title}</h3>
          <p className="book-card-author">{book.author}</p>
          <p className="book-card-status">{book.status}</p>
        </div>
      </a>
    </article>
  )
}
