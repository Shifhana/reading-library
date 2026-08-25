# Reading Library — Implementation Tickets

**Status:** V1 roadmap locked  
**Purpose:** Implementation roadmap for building the Reading Library one controlled ticket at a time.

---

# How to use this file

Each ticket should be implemented independently.

For every ticket:

1. Create or open the corresponding GitHub Issue.
2. Create a dedicated feature branch.
3. Give Codex only that ticket.
4. Implement only the defined scope.
5. Run the build and relevant checks.
6. Manually verify the acceptance criteria.
7. Review the diff.
8. Open a Pull Request.
9. Merge only after human approval.

Do not combine future-ticket features into the current ticket.

The implementation agent must also follow `AGENTS.md` and `docs/PRODUCT.md`.

---

# Ticket format

Each ticket contains:

- Ticket ID
- Title
- Goal
- Dependencies
- Requirements
- Non-goals
- Acceptance criteria
- Manual verification
- Suggested branch

Later tickets may also define tighter `Allowed areas` and `Do not touch` boundaries where useful.

---

# T0001 — Project setup

## Goal

Create the initial React + TypeScript + Vite project, connect it to Git/GitHub, add the project documentation, and confirm the app runs successfully.

## Dependencies

None.

## Requirements

- Create a React + TypeScript project using Vite.
- Initialize Git if required.
- Connect the local project to the GitHub repository.
- Add:
  - `README.md`
  - `AGENTS.md`
  - `docs/PRODUCT.md`
  - `docs/TICKETS.md`
- Create the initial project folder structure.
- Confirm the development server runs.
- Confirm the production build succeeds.
- Keep the project free of unnecessary dependencies.

## Non-goals

- No book data.
- No book cards.
- No statistics.
- No filters.
- No routing.
- No visual refinement.
- No future-ticket features.

## Acceptance criteria

- The app runs locally.
- The initial page loads without obvious errors.
- Browser console shows no obvious runtime errors on initial load.
- `npm run build` succeeds.
- Required documentation files exist.
- Repository is connected to GitHub.
- No out-of-scope product features have been added.

## Manual verification

1. Run `npm install`.
2. Run `npm run dev`.
3. Open the local URL.
4. Confirm the Vite/React app loads.
5. Open the browser console and check for errors.
6. Run `npm run build`.
7. Confirm the production build succeeds.
8. Confirm all required documentation files are present.

## Suggested branch

`feature/t0001-project-setup`

---

# T0002 — Define book data

## Goal

Create the V1 book data model and add a small set of sample books for later UI tickets.

## Dependencies

- T0001

## Requirements

Create a TypeScript book model that supports:

- Title
- Author
- Cover image
- Status:
  - Unread
  - Currently reading
  - Read
- Date read
- What I remember
- My notes
- Up next

Add a small sample data set using placeholder or temporary cover values where needed.

Store the data locally inside the project.

## Non-goals

- No database.
- No CMS.
- No Notion integration.
- No Goodreads integration.
- No UI rendering.
- No filtering logic.
- No statistics UI.
- No extra book metadata such as genre, rating, ISBN, tags, pages, or quotes.

## Acceptance criteria

- A typed V1 book model exists.
- Sample book data follows the locked model.
- All three reading statuses can be represented.
- Optional fields work without errors.
- No out-of-scope metadata has been added.
- Build succeeds.

## Manual verification

1. Inspect the book type/interface.
2. Confirm all V1 fields exist.
3. Confirm sample books use valid values.
4. Confirm at least one sample can represent each relevant status.
5. Run `npm run build`.
6. Confirm the build succeeds.

## Suggested branch

`feature/t0002-book-data`

---

# T0003 — Build site shell

## Goal

Create the basic site container and minimal page structure that later homepage features will use.

## Dependencies

- T0001
- T0002

## Requirements

- Create the main page shell.
- Add the site identity:
  - `My Library`
- Establish a simple content container.
- Establish the basic page hierarchy.
- Keep layout implementation minimal and reusable.
- Preserve the locked information architecture.

## Non-goals

- No statistics.
- No currently reading section.
- No library grid.
- No filters.
- No book detail page.
- No final typography or visual polish.
- No complex navigation.

## Acceptance criteria

- The app has a clear page shell.
- `My Library` is visible.
- The main content area is ready for later homepage sections.
- No future-ticket UI has been implemented.
- Build succeeds.

## Manual verification

1. Run the app locally.
2. Confirm the site shell loads.
3. Confirm `My Library` is visible.
4. Confirm there are no obvious layout or console errors.
5. Run `npm run build`.

## Suggested branch

`feature/t0003-site-shell`

---

# T0004 — Build statistics section

## Goal

Show the core library statistics on the homepage using the actual book data.

## Dependencies

- T0002
- T0003

## Requirements

Show:

- Total books
- Read
- Unread

Statistics must be calculated from the book data rather than hard-coded display numbers.

Define how `Currently reading` affects these counts consistently with the product model.

## Non-goals

- No extra statistics.
- No completion percentage.
- No reread statistics.
- No notes-completed statistics.
- No yearly chart.
- No visualization library.
- No filtering UI.

## Acceptance criteria

- Total books count is correct.
- Read count is correct.
- Unread count is correct.
- Counts update when sample data changes.
- Values are derived from data.
- No out-of-scope statistics are shown.
- Build succeeds.

## Manual verification

1. Note the sample data counts manually.
2. Open the homepage.
3. Compare displayed totals with the data.
4. Change one sample book status locally if needed.
5. Confirm statistics update correctly.
6. Run `npm run build`.

## Suggested branch

`feature/t0004-library-statistics`

---

# T0005 — Build currently reading / up next

## Goal

Add a small homepage section that helps identify what is being read now or what should be read next.

## Dependencies

- T0002
- T0003

## Requirements

- Show a `Currently reading` book when one exists.
- If no current book exists, support showing an `Up next` book.
- Use the existing V1 book data.
- Keep the section visually simple.
- Handle the absence of both values gracefully.

## Non-goals

- No reading progress percentage.
- No page count.
- No reading timer.
- No reading streak.
- No multiple-book queue.
- No recommendation engine.

## Acceptance criteria

- A current book is shown when status is `Currently reading`.
- An up-next book can be shown when appropriate.
- The section does not break if neither exists.
- No extra reading-management features are added.
- Build succeeds.

## Manual verification

1. Confirm one sample book is currently reading.
2. Verify it appears in the section.
3. Remove/change that status and mark one book as up next.
4. Confirm the fallback behaves correctly.
5. Test the state with neither value present.
6. Run `npm run build`.

## Suggested branch

`feature/t0005-currently-reading`

---

# T0006 — Build book card

## Goal

Create a reusable book card that represents one book in the library.

## Dependencies

- T0002
- T0003

## Requirements

Each card should show:

- Cover
- Title
- Author
- Reading status

The card must support being clickable for later navigation.

Use semantic, accessible interaction patterns.

Keep the visual treatment minimal at this stage.

## Non-goals

- No final visual polish.
- No custom cover redesigns.
- No book detail page implementation.
- No filters.
- No hover animation beyond what is necessary for basic interaction.
- No extra metadata.

## Acceptance criteria

- Card displays cover.
- Card displays title.
- Card displays author.
- Card displays status.
- Card can support navigation/click behavior.
- Keyboard interaction is appropriate.
- No extra metadata appears.
- Build succeeds.

## Manual verification

1. Render a sample card.
2. Confirm all four required pieces are visible.
3. Check keyboard focus/interaction.
4. Resize the browser and confirm the card does not obviously break.
5. Run `npm run build`.

## Suggested branch

`feature/t0006-book-card`

---

# T0007 — Build library grid

## Goal

Render all books on the homepage using the reusable book card.

## Dependencies

- T0002
- T0006

## Requirements

- Render all current book data.
- Use the shared book card component.
- Create a responsive grid.
- Preserve a consistent cover aspect ratio.
- Keep spacing and composition simple.

## Non-goals

- No filtering yet.
- No search.
- No sorting controls.
- No final visual polish.
- No pagination.
- No virtualization.

## Acceptance criteria

- Every sample book appears in the grid.
- Every item uses the shared book card.
- Grid adapts reasonably to smaller widths.
- Book covers remain visually stable.
- No filtering/search features are added.
- Build succeeds.

## Manual verification

1. Count books in the sample data.
2. Confirm the same number appears in the grid.
3. Resize from desktop to narrow/mobile width.
4. Confirm the grid adapts without overlap or clipping.
5. Run `npm run build`.

## Suggested branch

`feature/t0007-library-grid`

---

# T0008 — Add library filters

## Goal

Allow the library grid to switch between All, Read, and Unread.

## Dependencies

- T0004
- T0007

## Requirements

Add three filters:

- All
- Read
- Unread

The selected filter must update the visible library grid.

Keep the selected state clear and accessible.

Define treatment of `Currently reading` consistently with the locked V1 model.

## Non-goals

- No search.
- No genre filters.
- No tags.
- No notes-completed filter.
- No books-without-notes filter.
- No multi-select filtering.
- No sorting.

## Acceptance criteria

- `All` shows the full library.
- `Read` shows only read books.
- `Unread` follows the approved V1 status logic.
- Selected filter is visually clear.
- Filter controls are keyboard accessible.
- No extra filter types are added.
- Build succeeds.

## Manual verification

1. Open the homepage.
2. Select `All` and confirm all books appear.
3. Select `Read` and confirm only relevant books appear.
4. Select `Unread` and confirm only relevant books appear.
5. Test filters using keyboard input.
6. Run `npm run build`.

## Suggested branch

`feature/t0008-library-filters`

---

# T0009 — Build book detail page

## Goal

Create the individual book page that shows the complete V1 information for one book.

## Dependencies

- T0002
- T0006

## Requirements

Show:

- Cover
- Title
- Author
- Reading status
- Date read when applicable
- What I remember
- My notes
- Back to library navigation

Long-form content should remain readable.

Optional fields should be handled gracefully.

## Non-goals

- No editing interface.
- No comments.
- No ratings.
- No quote collection.
- No reread timeline.
- No AI summaries.
- No recommendation content.
- No custom-cover gallery.

## Acceptance criteria

- All required book information can render.
- Date read appears only when appropriate.
- What I remember is readable.
- Notes are readable.
- Missing optional content does not break the page.
- Back-to-library control is present.
- Build succeeds.

## Manual verification

1. Open a sample book detail page.
2. Confirm cover, title, author, and status.
3. Confirm date appears for a completed book.
4. Confirm optional content behaves correctly when absent.
5. Read the What I remember and My notes sections at desktop and mobile widths.
6. Run `npm run build`.

## Suggested branch

`feature/t0009-book-detail`

---

# T0010 — Connect navigation and routes

## Goal

Connect the library cards and individual book pages through stable navigation and URLs.

## Dependencies

- T0007
- T0009

## Requirements

- Clicking/selecting a book opens the correct detail page.
- Each book should have a stable route/URL.
- Back-to-library navigation works.
- Browser back behavior works.
- Direct navigation to a valid book URL works in the local app.
- Handle invalid book routes gracefully.

Use the simplest routing solution appropriate for the current stack.

## Non-goals

- No complex nested navigation.
- No account routes.
- No admin routes.
- No deep-link sharing features beyond working URLs.
- No unrelated architecture refactor.

## Acceptance criteria

- Every book opens its own detail page.
- URLs distinguish individual books.
- Back navigation works.
- Browser back works.
- Invalid route behavior is reasonable.
- Build succeeds.

## Manual verification

1. Click several different book cards.
2. Confirm each opens the correct book.
3. Use Back to library.
4. Use the browser back button.
5. Manually open a known book URL.
6. Test an invalid book URL.
7. Run `npm run build`.

## Suggested branch

`feature/t0010-book-navigation`

---

# T0011 — Visual refinement

## Goal

Apply the locked editorial visual direction to the completed V1 interface.

## Dependencies

- T0003 through T0010

## Requirements

Apply the visual principles in `docs/PRODUCT.md`:

- Editorial
- Calm
- Personal
- Clean
- Curated
- Quiet interface

Refine:

- Typography
- Whitespace
- Layout rhythm
- Neutral palette
- Restrained accent colour
- Status treatment
- Book-card presentation
- Hover states
- Page hierarchy

Use:

- Expressive serif for headings and/or book titles
- Clean sans serif for interface text and metadata

Avoid unnecessary visual decoration.

## Non-goals

- No custom book-cover redesign project.
- No major IA changes.
- No new features.
- No complex animation.
- No dashboard-style visual language.
- No feature-driven redesign.

## Acceptance criteria

- The site reflects the locked visual direction.
- Typography hierarchy is clear.
- Spacing feels consistent.
- Book covers remain the visual focus.
- Interaction states are clear.
- No new product features have been introduced.
- Build succeeds.

## Manual verification

1. Review homepage at desktop size.
2. Review a book detail page.
3. Confirm visual hierarchy is clear.
4. Confirm status treatment is understandable.
5. Confirm hover/focus treatment is visible.
6. Compare against `docs/PRODUCT.md`.
7. Run `npm run build`.

## Suggested branch

`feature/t0011-visual-refinement`

---

# T0012 — Responsive and accessibility pass

## Goal

Check and improve V1 across common viewport sizes and basic accessibility requirements.

## Dependencies

- T0011

## Requirements

Review:

- Large desktop
- Laptop
- Tablet-width layout
- Mobile layout

Check:

- Semantic HTML
- Heading hierarchy
- Keyboard navigation
- Focus visibility
- Text contrast
- Status not communicated by colour alone
- Alternative text for meaningful images
- Readability of long-form notes
- Responsive book grid
- Responsive book detail page

Fix obvious issues within V1 scope.

## Non-goals

- No redesign.
- No new features.
- No advanced automated accessibility program.
- No unrelated refactors.

## Acceptance criteria

- Core pages work at common viewport sizes.
- Keyboard navigation works for main interactive elements.
- Focus states are visible.
- Heading structure is reasonable.
- Meaningful images have appropriate alt text.
- Status remains understandable without relying only on colour.
- No obvious horizontal overflow or clipping.
- Build succeeds.

## Manual verification

1. Test homepage on desktop.
2. Test homepage at tablet width.
3. Test homepage at mobile width.
4. Repeat for a book detail page.
5. Navigate major controls using keyboard only.
6. Check focus states.
7. Check image alt text.
8. Check headings.
9. Run `npm run build`.

## Suggested branch

`feature/t0012-responsive-accessibility`

---

# T0013 — Replace sample content with real books

## Goal

Replace development/sample book content with the first real version of the personal library.

## Dependencies

- T0012

## Requirements

Add real initial book data:

- Correct title
- Correct author
- Correct current status
- Date read where known
- What I remember where available
- My notes where available
- Up next where relevant
- Placeholder/temporary covers where custom covers are not ready

Keep the V1 data model unchanged.

## Non-goals

- No new fields.
- No custom cover redesign requirement.
- No bulk import tool.
- No Notion sync.
- No database.
- No metadata enrichment.

## Acceptance criteria

- Sample content is removed or clearly separated from real content.
- Initial real books appear correctly.
- Statistics match the real data.
- Filters match the real data.
- Book detail pages show the correct content.
- Missing optional fields do not cause errors.
- Build succeeds.

## Manual verification

1. Compare several site entries with the source book list.
2. Confirm titles/authors are correct.
3. Confirm statuses are correct.
4. Confirm statistics reflect the real data.
5. Confirm filters work.
6. Open several book pages.
7. Run `npm run build`.

## Suggested branch

`feature/t0013-real-book-content`

---

# T0014 — Deployment

## Goal

Publish V1 as a live website connected to the GitHub repository.

## Dependencies

- T0013
- Final product-quality pass completed

## Requirements

- Create a production build.
- Connect the repository to the selected hosting platform.
- Deploy from the stable `main` branch.
- Obtain the live URL.
- Verify the production site.
- Add the live URL to `README.md`.
- Confirm future merges to `main` can update production as intended.

## Non-goals

- No custom domain required.
- No portfolio integration required.
- No analytics required.
- No additional product features.
- No V1.1 improvements during deployment.

## Acceptance criteria

- Production build succeeds.
- Live homepage loads.
- Book images/assets load.
- Statistics work.
- Filters work.
- Book detail routes work.
- Browser back works.
- Direct book URLs behave correctly in production.
- Mobile layout works.
- No obvious production console errors.
- `README.md` includes the live URL.

## Manual verification

1. Open the live URL.
2. Test homepage.
3. Test all filters.
4. Open multiple book detail pages.
5. Use browser back.
6. Refresh a detail-page URL.
7. Test at mobile width/device.
8. Check browser console.
9. Confirm `README.md` contains the production URL.

## Suggested branch

`feature/t0014-deployment`

---

# Post-V1 workflow

V1 ends after T0014 and successful deployment.

Do not immediately add new features.

Use the live product regularly and record real-use observations.

Potential future tickets must come from observed friction or intentionally approved V1.1 scope.

Examples may include:

- Read + notes state
- Improved currently-reading prominence
- Books-without-notes filter
- Revisit / reread cycle
- Search
- Notion or CMS integration

These are not approved V1 tickets.

---

# Definition of done for any ticket

A ticket is complete only when:

- The implementation matches the ticket scope.
- Acceptance criteria pass.
- Relevant build/tests pass.
- Manual verification passes.
- The diff has been reviewed.
- No unapproved scope creep has been introduced.
- The Pull Request has been approved by the human reviewer.

> **Codex can declare implementation complete. Only the human reviewer can declare the ticket accepted.**
