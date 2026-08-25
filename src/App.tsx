import './App.css'
import { books } from './data/books'

function App() {
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
      </main>
    </div>
  )
}

export default App
