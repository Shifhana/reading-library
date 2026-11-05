# Book cover artwork support

Implementation is ready for human review. No commit, push, dependencies, or deployment.

## Changes

- `src/data/books.ts`: each of the 21 existing records references its own local asset through its existing slug. No other book data changed.
- `src/assets/book-covers/`: 21 individual slug-named SVG covers and a README explaining artwork replacement. These are temporary original typographic designs, not final supplied cover artwork.
- `src/components/CoverArtwork.tsx`: loaded artwork with full-image contain sizing and colour fallback on missing/failed images.
- `src/components/coverProjection.ts`: maps the artwork onto the existing physical cover's four corners through its rotation.
- `src/components/PhysicalBook.tsx`: renders artwork beneath existing cover shading, leaving spine, page block, bevels and geometry intact.
- `src/components/RoomBookInteractions.tsx`: passes the same record's cover into shelf and focused book instances. Interaction logic is unchanged.
- `tests/book-covers.test.mjs`: validates unique existing assets and projection at all four corners.
- `output/book-cover-held.png`, `output/book-covers-shelf.png`: visual verification captures.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed.
- `node --experimental-strip-types --test tests/*.test.mjs`: 20 passed.
- `git diff --check`: passed; line-ending notices only.
- All 21 shelf artwork images loaded successfully in the app.
- Checked Emotional Design (foreground), Atomic Design (middle), and User Friendly (rear) during pickup/opening/return. The rear book completed the full open-and-close flow with identical source artwork after return.
- Existing physical book edges and page block remain visible; full cover artwork is visible in the held pose.
- Temporarily assigned an invalid artwork URL to Emotional Design: the failed image disappeared and the existing physical colour cover remained on shelf and held book. Restored its correct asset and verified all 21 covers loaded again.
- Selected shelf copy remains hidden, with 20 shelf books during motion and 21 after return.

## Review steps

Select a book from each shelf, observe its held cover and opening, then close it and check its original slot. Replace one SVG or update the corresponding record's coverImage to review final artwork. Missing or empty cover URLs retain the current colour-based physical book.

## Assumptions and limitations

No final custom artwork was supplied, so all books receive distinct temporary typographic designs. Replace these gradually using the asset README. The cover's exterior artwork rotates with the physical cover; once fully open, its paper interior faces the reader. No changes were made to room assets, environment styling, book dimensions, timing, CRUD content, or open-book layout. Visual verification used the current Chromium in-app browser; other browser engines were not manually tested.

## Documentation and follow-ups

Artwork replacement instructions are included in the new asset README. No PRODUCT, TICKETS, or root README changes are necessary for this pass. Final artwork replacement is the only follow-up within this feature.
