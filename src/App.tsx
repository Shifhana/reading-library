import './App.css'
import { books } from './data/books'

function App() {
  const totalBooks = books.length
  const readBooks = books.filter((book) => book.status === 'Read').length

  // "Currently reading" counts as unread because it has not been completed yet.
  const unreadBooks = books.filter((book) => book.status !== 'Read').length

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
      </main>
    </div>
  )
}

export default App
