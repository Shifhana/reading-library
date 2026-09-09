import { useState } from 'react'
import type { Book } from '../data/books'
import './BookCard.css'

interface BookCardProps {
  book: Book
  href: string
}

export function BookCard({ book, href }: BookCardProps) {
  const [failedCover, setFailedCover] = useState<string | null>(null)
  const coverIsUnavailable =
    !book.coverImage || failedCover === book.coverImage

  return (
    <article className="book-card">
      <a className="book-card-link" href={href}>
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
              alt={`Cover of ${book.title}`}
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
