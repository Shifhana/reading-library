import { useState } from 'react'
import type { Book } from '../data/books'
import './BookDetailPage.css'

interface BookDetailPageProps {
  book: Book
  backHref: string
}

export function BookDetailPage({ book, backHref }: BookDetailPageProps) {
  const [failedCover, setFailedCover] = useState<string | null>(null)
  const coverIsUnavailable =
    !book.coverImage || failedCover === book.coverImage

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-container">
          <a className="site-title site-title-link" href={backHref}>
            My Library
          </a>
        </div>
      </header>

      <main className="site-container book-detail">
        <a className="book-detail-back" href={backHref}>
          <span aria-hidden="true">&larr;</span> Back to library
        </a>

        <article>
          <div className="book-detail-overview">
            <div className="book-detail-cover">
              {coverIsUnavailable ? (
                <div
                  className="book-detail-cover-fallback"
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

            <header className="book-detail-header">
              <p className="book-detail-status">{book.status}</p>
              <h1>{book.title}</h1>
              <p className="book-detail-author">by {book.author}</p>
              {book.status === 'Read' && book.dateRead ? (
                <p className="book-detail-date">Read {book.dateRead}</p>
              ) : null}
            </header>
          </div>

          <div className="book-detail-content">
            <section aria-labelledby="what-i-remember-heading">
              <h2 id="what-i-remember-heading">What I remember</h2>
              <p>{book.whatIRemember ?? 'Nothing recorded yet.'}</p>
            </section>

            <section aria-labelledby="my-notes-heading">
              <h2 id="my-notes-heading">My notes</h2>
              <p>{book.myNotes ?? 'No notes added yet.'}</p>
            </section>
          </div>
        </article>
      </main>
    </div>
  )
}
