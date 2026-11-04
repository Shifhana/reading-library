# Right-page book summaries

Implemented the explicitly requested summary feature. Final product acceptance remains with the reviewer.

## Data and presentation

`Book.summary` is a required string in `src/data/books.ts`. All 20 remaining records contain distinct, original single-paragraph summaries, 93–98 words each. The Artiom Dashinsky bundle was removed at the user's request. Its shelf slot is empty; every remaining book keeps its former position, size, colour and cover. Presentation slots now resolve records by slug so removing a record cannot shift other books into different slots.

The right page passes `record.summary` to the existing direct-writing component with `field="summary"`. Its running header was removed so the page contains only editable prose and the existing physical page number. No CSS, editor interaction, motion, or environmental changes were required. The left reflection editor is unchanged.

## Persistence and backward compatibility

The existing local storage functions now accept `summary` as a content field. Summary edits use `reading-garden:summary:v1:<encoded slug>`, with the same body/timestamps structure and synchronous autosave as other writing. Stored summary edits take precedence over the book-data default, including deliberate empty edits.

When an older installation has no summary key, the existing initial-content fallback displays the default from book data. Nothing is written or migrated on opening. The old `note` and `reflection` keys are neither changed nor deleted. Earlier right-page notes remain stored independently; this requested right-page view now displays summaries. The removed bundle's browser data and unused source cover asset were left intact.

## Files changed in this pass

- src/data/books.ts — summary field/defaults; removed bundle record.
- src/components/noteStorage.ts — independent summary storage key.
- src/components/RoomBookInteractions.tsx — right page reads the summary; removed its header.
- src/components/shelfBooks.ts — stable slug-based slot lookup to preserve remaining placements after removal.
- src/components/bookCoverDesigns.ts — removed the retired bundle's cover configuration.
- src/components/RoomShell.tsx — corrected accessible foreground book count only.
- tests/book-summaries.test.mjs — default coverage/length and storage isolation/backward compatibility.
- docs/PRODUCT.md — documented the newly approved required field.
- docs/BOOK-SUMMARIES.md — implementation and review notes.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed without diagnostics.
- `node --test tests/*.test.mjs`: 34 passed, 0 failed.
- Automated coverage checks every book's nonempty paragraph, requested word range, unique summary, shelf mapping, independent summary edits, preservation of legacy note/reflection values, and no writes when a summary is absent.
- Browser: Emotional Design's default appeared immediately on opening. Edited its summary, blurred, refreshed, reopened and verified the edit persisted. Restored the original text afterward. User Friendly showed its own distinct default with no overflow at desktop size; Atomic Design also showed its own summary. No warnings or errors were reported in the browser console.

Reviewer: open books from each shelf, edit the right paragraph, click the left page, refresh and reopen. Confirm edits remain unique to that book and that the left reflection is unchanged. Existing close/return and compact-screen page navigation remain as before.

## Content checks, assumptions and follow-ups

These are original reading-note-style descriptions, not copied blurbs or claims that the user personally read the book. For entries with incomplete metadata, summaries follow the recognisable title. “art of innovation” is treated as Tom Kelley's book. The existing author for Design for How People Think is inconsistent with the publisher listing (John Whalen); it was left unchanged because metadata correction was outside this task. That mismatch is a follow-up for review.

Author/publisher references used for content checks:

- [Design for How People Think — O'Reilly](https://www.oreilly.com/library/view/design-for-how/9781491985441/)
- [Universal Principles of UX — publisher](https://walterfoster.com/more-quarto-book/universal-principles-of-ux/)
- [The Art of Innovation — publisher](https://www.penguinrandomhouse.com/books/91121/the-art-of-innovation-by-thomas-kelley-with-jonathan-littman/9780307423863/)
- [Atomic Design — author](https://atomicdesign.bradfrost.com/)
- [Don't Make Me Think, Revisited — author contents](https://www.stevekrug.com/downloads/DMMT-Revisited-TableOfContents.pdf)
- [Designing Interactions — MIT Press](https://mitpress.mit.edu/9780262134743/designing-interactions/)
- [Designing Design — publisher](https://www.lars-mueller-publishers.com/designing-design-0)
- [Art of UX — author's description of the earlier SaaS book](https://artofux.com/designing-for-ai-book/)
- [Emotional Design — author](https://jnd.org/emotional-design-people-and-things/)
- [Continuous Discovery Habits — author](https://www.producttalk.org/continuous-discovery-habits/)
- [Inspired and Empowered — author](https://www.svpg.com/inspired-and-empowered/)

No dependency, backend, commit or push. README and the original V1 ticket roadmap were left unchanged; this document records the user-approved follow-on scope. Browser-local persistence has the same device/browser limitation as before.
