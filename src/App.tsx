import { useState } from 'react'
import './App.css'
import { BookCard } from './components/BookCard'
import { BookDetailPage } from './components/BookDetailPage'
import { books } from './data/books'

type LibraryFilter = 'All' | 'Read' | 'Unread'

const libraryFilters: LibraryFilter[] = ['All', 'Read', 'Unread']

function App() {
  const [selectedFilter, setSelectedFilter] = useState<LibraryFilter>('All')
  const previewStatus = new URLSearchParams(window.location.search).get(
    'preview',
  )
  const previewBook =
    previewStatus === 'read'
      ? books.find((book) => book.status === 'Read')
      : previewStatus === 'unread'
        ? books.find((book) => book.status === 'Unread')
        : undefined

  if (previewBook) {
    return (
      <BookDetailPage
        book={previewBook}
        backHref={window.location.pathname}
      />
    )
  }

  const totalBooks = books.length
  const readBooks = books.filter((book) => book.status === 'Read').length

  // "Currently reading" counts as unread because it has not been completed yet.
  const unreadBooks = books.filter((book) => book.status !== 'Read').length
  const currentBook = books.find((book) => book.status === 'Currently reading')
  const upNextBook = books.find(
    (book) => book.status === 'Unread' && book.upNext,
  )
  const highlightedBook = currentBook ?? upNextBook
  const highlightedBookLabel = currentBook
    ? 'Currently reading'
    : upNextBook
      ? 'Up next'
      : 'Currently reading / Up next'
  const filteredBooks = books.filter((book) => {
    if (selectedFilter === 'All') {
      return true
    }

    if (selectedFilter === 'Read') {
      return book.status === 'Read'
    }

    return book.status !== 'Read'
  })

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-container">
          <h1 className="site-title">My Library</h1>
        </div>
      </header>

      <main className="site-container site-content">
        <section aria-labelledby="library-statistics-heading">
          <h2 id="library-statistics-heading">Library statistics</h2>
          <dl className="library-statistics">
            <div>
              <dt>Total books</dt>
              <dd>{totalBooks}</dd>
            </div>
            <div>
              <dt>Read</dt>
              <dd>{readBooks}</dd>
            </div>
            <div>
              <dt>Unread</dt>
              <dd>{unreadBooks}</dd>
            </div>
          </dl>
        </section>

        <section
          className="reading-highlight"
          aria-labelledby="reading-highlight-heading"
        >
          <h2 id="reading-highlight-heading">{highlightedBookLabel}</h2>
          {highlightedBook ? (
            <div className="reading-highlight-book">
              <h3>{highlightedBook.title}</h3>
              <p>{highlightedBook.author}</p>
            </div>
          ) : (
            <p className="reading-highlight-empty">
              No book is currently selected.
            </p>
          )}
        </section>

        <section
          className="library"
          aria-labelledby="library-heading"
        >
          <div className="library-heading-row">
            <h2 id="library-heading">Library</h2>
            <a className="detail-preview-link" href="?preview=read">
              Preview book detail
            </a>
          </div>
          <div
            className="library-filters"
            role="group"
            aria-label="Filter library"
          >
            {libraryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                className="library-filter"
                aria-pressed={selectedFilter === filter}
                onClick={() => setSelectedFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="library-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={`${book.title}-${book.author}`}
                book={book}
                href="#library-heading"
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
