import { useEffect, useRef, useState, type MouseEvent } from 'react'
import './App.css'
import { BookCard } from './components/BookCard'
import { BookDetailPage } from './components/BookDetailPage'
import { books } from './data/books'

type LibraryFilter = 'All' | 'Read' | 'Unread'

const libraryFilters: LibraryFilter[] = ['All', 'Read', 'Unread']

function App() {
  const [selectedFilter, setSelectedFilter] = useState<LibraryFilter>('All')
  const [pathname, setPathname] = useState(window.location.pathname)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    const routeBookSlug = pathname.match(/^\/books\/([^/]+)\/?$/)?.[1]
    const routeBook = books.find((book) => book.slug === routeBookSlug)

    document.title = routeBook
      ? `${routeBook.title} | My Library`
      : pathname === '/'
        ? 'My Library'
        : 'Book not found | My Library'

    if (previousPathname.current === pathname) {
      return
    }

    previousPathname.current = pathname

    const focusFrame = window.requestAnimationFrame(() => {
      document.querySelector<HTMLElement>('main')?.focus()
    })

    return () => window.cancelAnimationFrame(focusFrame)
  }, [pathname])

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }

    const destination = new URL(event.currentTarget.href)

    if (destination.origin !== window.location.origin) {
      return
    }

    event.preventDefault()
    window.history.pushState(null, '', destination)
    setPathname(destination.pathname)
    window.scrollTo({ top: 0 })
  }

  const bookRouteMatch = pathname.match(/^\/books\/([^/]+)\/?$/)
  const selectedBook = bookRouteMatch
    ? books.find((book) => book.slug === bookRouteMatch[1])
    : undefined

  if (selectedBook) {
    return (
      <BookDetailPage
        book={selectedBook}
        backHref="/"
        onNavigate={handleNavigation}
      />
    )
  }

  if (pathname !== '/') {
    return (
      <div className="site-shell">
        <header className="site-header">
          <div className="site-container">
            <a
              className="site-title site-title-link"
              href="/"
              onClick={handleNavigation}
            >
              My Library
            </a>
          </div>
        </header>

        <main className="site-container route-message" tabIndex={-1}>
          <h1>Book not found</h1>
          <p>This book is not in the library.</p>
          <a href="/" onClick={handleNavigation}>
            Back to library
          </a>
        </main>
      </div>
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

      <main className="site-container site-content" tabIndex={-1}>
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
          </div>
          <div
            className="library-filters"
            role="group"
            aria-label="Filter library"
            aria-controls="library-grid"
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
          <div className="library-grid" id="library-grid">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.slug}
                book={book}
                href={`/books/${book.slug}`}
                onNavigate={handleNavigation}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
