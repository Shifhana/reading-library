# Reading Library — Product Definition

**Status:** V1 product direction locked  
**Primary user:** Shifhana  
**Purpose:** Source of truth for product decisions before implementation

---

## 1. Product summary

A personal reading library for tracking what I read, capturing what stayed with me, and gradually revisiting what I’ve learned.

The product is designed around a simple idea:

> Reading a book is not the same as retaining it.

The library should help turn reading from a list of completed books into an accumulating body of knowledge.

---

## 2. Core problem

Books can easily follow this pattern:

**Buy → Read → Finish → Forget**

This product should support a more useful cycle:

**Collect → Read → Remember → Take notes → Revisit**

The goal is not only to track whether a book has been completed. It is to preserve what I actually remember and learn from each book.

---

## 3. Primary user

The primary user is **me**.

This is a personal tool first.

It may be publicly accessible and may later become part of my personal portfolio website, but V1 should not be designed around an external audience.

This means the product does not need social, community, profile, follower, review, or recommendation features.

---

## 4. Core product questions

When I open the site, it should quickly help me answer:

1. **What books do I have?**
2. **What have I read?**
3. **What should I read next?**
4. **What did I actually take away from what I read?**

---

## 5. Product principle

> **The library should make reading feel like an accumulating body of knowledge, rather than a list of books completed.**

A second supporting principle:

> **The interface should stay quiet so the books and the ideas inside them become the visual focus.**

---

## 6. V1 success criteria

When I open the site, within a few seconds I should be able to:

- Understand the current state of my library
- See what I am currently reading or what is up next
- Browse all books
- Identify which books are read and unread
- Open an individual book
- See what I remember from that book
- Access my notes

If the product supports these tasks clearly and reliably, V1 is successful.

---

# 7. Information architecture

V1 has only two main page types.

## 7.1 Home / Library page

The homepage is the main screen and should contain, in this order:

### Library statistics

Show:

- Total books
- Read
- Unread

These statistics should be calculated from the actual book data.

### Currently reading / Up next

A small highlighted section showing either:

- The book I am currently reading, or
- The next unread book I plan to read

### Filters

V1 filters:

- All
- Read
- Unread

### Book library grid

Display all books in a visual grid.

Each book card should show:

- Cover
- Title
- Author
- Reading status

Selecting a book opens its individual detail page.

---

## 7.2 Individual book page

Each book has its own detail page.

The page should contain:

- Book cover
- Title
- Author
- Reading status
- Date read, when applicable
- What I remember
- My notes
- Back to library navigation

### What I remember

This is a key part of the product.

After reading a book, I should be able to write a short reflection based on what I remember without relying on a copied summary.

This section represents what actually stayed with me after reading.

In future versions, this could support comparing what I remembered after the first read with what remained after revisiting the book.

### My notes

This contains my more detailed notes from the book.

---

# 8. Navigation

Navigation should remain minimal in V1.

The site identity can be:

**My Library**

It should also act as a simple way to return to the homepage.

No complex navigation system is required.

---

# 9. Book data model

Every book should support the following fields.

## Required fields

- **Title**
- **Author**
- **Cover image**
- **Status**

### Reading status values

- Unread
- Currently reading
- Read

## Optional fields

- **Date read**
  - Used only when a book has been completed

- **What I remember**
  - Short reflection written from memory

- **My notes**
  - More detailed notes

- **Up next**
  - Simple yes/no value used to identify the next planned unread book

---

## 9.1 Example book record

```text
Title:
Show Your Work

Author:
Austin Kleon

Status:
Read

Date read:
May 2026

What I remember:
A short reflection about what actually stayed with me.

My notes:
More detailed notes from the book.

Up next:
No
```

---

# 10. Visual direction

## Overall character

The product should feel:

- Editorial
- Calm
- Personal
- Clean
- Curated
- More like a personal archive than a dashboard

It should not visually resemble Goodreads, Notion, or a SaaS admin interface.

---

## 10.1 Layout

### Homepage

Use:

- Generous whitespace
- Statistics near the top
- Currently reading / Up next below the statistics
- Simple filter row
- Visual book grid

### Book cards

The visual hierarchy should be:

1. Cover
2. Title
3. Author
4. Status

Avoid unnecessary card chrome or heavy containers.

### Book detail page

Use:

- Strong book-cover presence
- Clear title and author hierarchy
- Reading metadata
- Long-form content below

---

## 10.2 Typography

Use an editorial typography direction:

- An expressive serif for headings and/or book titles
- A clean sans serif for interface text and metadata

Typography should provide character without making the interface visually noisy.

---

## 10.3 Colour

Use a neutral base:

- Warm off-white or similarly quiet background
- Near-black primary text
- Muted grey metadata
- One restrained accent colour

The accent colour may later connect to the wider personal portfolio identity.

---

## 10.4 Book covers

For V1:

- Placeholder covers or simple temporary covers are acceptable

Later:

- Replace temporary covers with custom redesigned book covers
- Preserve a consistent cover aspect ratio so the library grid remains stable

The custom-cover project is a future creative layer, not a V1 blocker.

---

## 10.5 Interaction style

Keep interactions subtle:

- Simple hover treatment on book cards
- Clear selected-filter state
- Visible focus states
- No unnecessary animation
- No complex transitions

Visual quality should come primarily from typography, spacing, composition, and the book covers.

---

# 11. V1 scope

V1 includes:

- Library homepage
- Total / Read / Unread statistics
- Currently reading / Up next
- Book grid
- Book cards
- Read / Unread filtering
- Individual book detail pages
- Reading status
- Date read
- What I remember
- My notes
- Responsive layout
- Basic accessibility
- Real book content
- Public deployment

---

# 12. Explicit V1 non-goals

Do not add the following to V1:

- User accounts
- Authentication
- Database
- Notion integration
- Goodreads integration
- Social features
- Followers
- Likes
- Comments
- Public profiles
- Ratings
- Star scores
- Goodreads-style reviews
- Recommendations
- AI-generated book summaries
- Reading streaks
- Yearly reading graphs
- Genres
- Tags
- Favourite quotes
- ISBN
- Publisher
- Number of pages
- Purchase date
- Reading-time tracking
- Re-read count
- Complex animations
- Complex knowledge-management features

These should not be implemented unless the product scope is intentionally changed later.

---

# 13. Future ideas

These are valid future directions but are not part of V1.

Potential future features include:

- Read + notes state
- Revisit / reread cycle
- Revisit queue
- Completion percentage
- Notes-only view
- Books-without-notes filter
- Reading archive by year
- Richer statistics
- Search
- Custom cover gallery
- Comparison of what I remembered across multiple reads
- Notion or lightweight CMS integration
- Custom domain
- Integration into my future personal portfolio website

Future features should be considered only after real usage identifies a genuine need.

---

# 14. Product iteration principle

> **Real use should decide the next version, not feature ideas that merely sound interesting.**

After V1 is published, the product should be used regularly before adding major functionality.

Observed friction should be collected, reviewed, and converted into V1.1 tickets only when it represents a real problem.

---

# 15. Technical simplicity principle

> **Choose the simplest implementation that supports the current V1, not the architecture we might need someday.**

For V1:

- Book data can live locally inside the project
- No backend is required
- No database is required
- No CMS is required

If managing books manually later becomes a real problem, that becomes evidence for a future integration.

---

# 16. Scope-control rule

If a new feature idea appears during implementation:

1. Do not automatically add it to the current ticket.
2. Decide whether it is required for V1.
3. If not, record it as a future idea.
4. Continue building the locked scope.

The roadmap should control what gets built.

---

# 17. Long-term direction

The Reading Library may eventually become part of a broader personal website, for example:

```text
Portfolio
├── Work
├── Writing
├── Experiments
├── Photography
├── Library
└── About
```

However, V1 should remain a standalone, useful personal product first.

---

# 18. Final V1 definition

V1 is complete when I can:

> Open the site, immediately understand the state of my library, see what I am reading, browse my books, filter them, open a book, and revisit what I remembered and noted from it.

Anything beyond that belongs to a later iteration unless it is required to make this core experience work.
