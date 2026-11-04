# Published book covers

Implementation complete for the 20-book collection; human review determines final acceptance.

## Result

All 20 active books now reference their real published front artwork through their own `coverImage`. No title required a placeholder. Existing custom covers remain only as loading/error fallbacks. Covers remain individual surfaces on the coded book, with the existing spine, page block, thickness, shading, hover and motion.

The collection has no edition identifiers in its book model. Covers were matched by title and author, using the closest documented English edition. Existing metadata was preserved, including the previously noted incorrect Steve Krug author entry for Design for How People Think; that cover is the actual John Whalen title. Correcting author metadata remains a separate follow-up.

## Books and editions

| Book | Cover match |
| --- | --- |
| Design for How People Think | O'Reilly, 2019, 9781491985458 |
| User Friendly | FSG hardcover, 2019, 9780374279752 |
| Don't Make Me Think, Revisited | Revisited / third edition, 9780321965516 |
| Lean UX | First edition, original Applying Lean Principles subtitle, 9781449311650 |
| Articulating Design Decisions | First edition, 2015, 9781491921555 |
| Sprint | Original English hardcover, 9781501121746 |
| The Art of Innovation | Tom Kelley / Jonathan Littman, 9780385499842 |
| Atomic Design | Brad Frost's original author-published vector cover |
| Designing Interactions | MIT Press, 9780262134743 |
| About Face | Fourth edition, 9781118766576 |
| Universal Principles of UX | Irene Pereyra, 9780760378045 |
| The Pocket Universal Principles of Design | 150-principle pocket edition, 9781631590405 |
| Thinking, Fast and Slow | FSG paperback, 9780374533557 |
| Inspired | Second edition, 9781119387503 |
| Empowered | Original Wiley edition, 9781119691297 |
| Emotional Design | Basic Books paperback, 9780465051366 |
| Continuous Discovery Habits | Original 2021 edition, 9781736633304 |
| Business Thinking for Designers | Original Design Better / InVision cover, author's current library source |
| Art of UX | Author's Volume 1, SaaS book cover |
| Designing Design | Lars Müller original English jacket, 9783037781050 |

Exact source URLs, ISBNs, dimensions and extraction notes are recorded per slug in `src/assets/book-covers/published-covers.json`. Sources were checked against publisher/author listings and ISBN-linked library metadata, then reviewed visually. No cover was generated, redrawn or re-typeset.

## Fitting and performance

The runtime uses `object-fit: contain` before applying the existing four-corner projection. The artwork canvas now follows each physical book's unturned proportions instead of forcing every cover through a fixed 600×840 canvas. This keeps the original artwork ratio while allowing the existing book perspective and cover swing. Binding-coloured margins can remain around covers whose proportions differ substantially, particularly the square pocket edition.

19 local JPEGs (quality 88, no upscaling, max 800×1000) plus one original vector SVG total 980,777 bytes, approximately 958 KiB. Raster heights range from 400 to 1000 pixels for the current held height below 390 CSS pixels. Browser caching and shared load state preserve identity across shelf/held copies without external runtime image requests.

Art of UX's full front design was extracted from the author's larger promotional graphic, removing the gradient backdrop. Designing Design's publisher photo had its narrow photographed spine excluded; the printed jacket band remains. These preparation crops exclude presentation context, not printed titles or other cover artwork.

## Files changed

- `src/data/books.ts`: 20 coverImage paths only; summaries and all other data unchanged.
- `src/components/CoverArtwork.tsx`: published-image priority, contained fitting and existing custom fallback.
- `src/components/PhysicalBook.tsx`: supplies unturned cover proportions and asset-specific rendering key; motion logic unchanged.
- `src/components/BookCard.css`, `src/components/BookDetailPage.css`: cover images use contain instead of crop.
- `src/assets/book-covers/*-published.jpg`: 19 new optimised covers.
- `src/assets/book-covers/atomic-design-published.svg`: original author vector cover.
- `src/assets/book-covers/published-covers.json`: source/edition/size manifest.
- `src/assets/book-covers/README.md`: active artwork and maintenance instructions.
- `tests/book-covers.test.mjs`: verifies local assets, provenance, size bounds, and proportion-preserving projection.
- `docs/PUBLISHED-COVERS.md`: completion and review notes.
- `output/published-covers-room.png`, `output/published-cover-held.png`, `output/published-cover-square-held.png`: browser review images.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed without diagnostics.
- `node --test tests/*.test.mjs`: 35 passed, 0 failed.
- Browser: all 20 cover images decoded successfully and used contain fitting. Reviewed the full shelf composition and the enlarged Emotional Design cover, including its complete title/artwork and physical page/spine depth. Its automatic opening still showed the existing summary. Rear-shelf User Friendly retained the same image identity on pickup. The middle-shelf square pocket cover retained its complete artwork in the held state and opened with its existing summary. Closing/return was exercised for these books. No browser warnings or errors were reported.
- Source and projected-geometry tests retain all four corners for shelf, held and turning-cover poses; additional checks confirm equal horizontal/vertical scale on unturned covers with different proportions.

Reviewer: hover books from each shelf; pick up, open, close and check return to the same slot. Inspect the square pocket cover and the wider About Face cover for complete contained artwork. Check the existing compact-screen page turn and right-page summary without editing content.

## Preservation / documentation

No changes to shelves, positions, book dimensions, room, lighting, environment, Reading Breeze, clock, foliage, summaries, reflection storage, editor, routing or animation timing. No dependencies, commit or push. The asset README was updated; the product definition and ticket roadmap require no change for this artwork replacement.

## Source examples

- [Atomic Design author cover](https://atomicdesign.bradfrost.com/)
- [Business Thinking for Designers author library](https://books.thecdo.school/)
- [Art of UX author page](https://artofux.com/art-of-ux-book/)
- [Designing Design publisher](https://www.lars-mueller-publishers.com/designing-design-0)
- [About Face publisher edition](https://www.wiley.com/en-us/about-face-the-essentials-of-interaction-design-4th-edition-p-9781118766576)
- [Pocket Universal Principles publisher edition](https://www.quarto.com/books/9781631590405/the-pocket-universal-principles-of-design)

Rights in the original published artwork remain with its respective rights holders.
