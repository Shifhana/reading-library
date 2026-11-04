# Cover-driven physical book geometry

Implemented the requested geometry correction. Human review remains final acceptance.

## Changes

All 20 physical closed books now derive their width from the intrinsic dimensions of the selected published artwork. Heights, shelf membership, order and upright variation remain controlled by the existing arrangement. No ratio clamp was necessary: the collection spans approximately 0.641–0.996 width/height.

The presentation-only `coverDimensions.ts` records the native JPEG dimensions and Atomic Design SVG viewBox. Tests decode the actual asset dimensions and compare them with these measurements, avoiding both stale manual ratios and a geometry jump while images load. No book data or cover asset was changed.

Shelf width = existing controlled shelf height × source ratio. The held size calculation uses that same source ratio rather than the old reference-book rectangle or its sheared hit-area bounds. Spine, cover edges, page block and shadows continue to derive from the resulting book corners and thickness, so they follow the resized object.

The image fills the matching front face directly. The previous contain-based letterboxing is removed from the physical-book renderer. While opening/closing, the visible outer cover retains its source proportions as the readable page block expands; it meets the existing open spread at the edge-on midpoint. The compact-screen cover retains its proportions throughout its fade. Phase logic, timing, page turning and automatic return are unchanged.

## Shelf clearance

Existing shelf heights and centres were retained wherever possible. Only collisions requiring additional clearance moved a centre to the right:

- Rear Lean UX: +0.885 scene units (1209 → 1209.885).
- Middle Pocket Universal Principles of Design: +6.820 scene units (662 → 668.820).

All other centres remain unchanged. The minimum front-face gap is 7 scene units; shelf grouping and book order are preserved. No shelf geometry or room position changed.

## Files changed

- src/components/coverDimensions.ts — intrinsic image sizes and source-ratio lookup.
- src/components/shelfBooks.ts — cover-driven widths and minimal collision clearance.
- src/components/RoomBookInteractions.tsx — held size uses the same source ratio; passes it to physical books.
- src/components/PhysicalBook.tsx — front-cover geometry retains the individual ratio during transitions.
- src/components/coverProjection.ts — cover-face geometry helper anchored at the spine.
- src/components/CoverArtwork.tsx — edge-to-edge image projection instead of contain.
- tests/book-covers.test.mjs — actual asset dimensions and moving cover geometry checks.
- tests/shelf-books.test.mjs — physical aspect ratios and shelf clearance checks.
- src/assets/book-covers/README.md — current rendering instructions.
- docs/COVER-GEOMETRY.md — implementation/review notes.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed without diagnostics.
- `node --test tests/*.test.mjs`: 37 passed, 0 failed.
- Tests cover every source image's actual dimensions, every shelf face's aspect, controlled heights/gaps, and the front cover retaining its ratio as the readable page block changes size.
- Browser: the pocket book is physically almost square in the held state (measured ratio 0.99602 versus source 0.996). Universal Principles of UX is physically wider than the narrower portrait titles (measured ratio 0.85000 versus source 0.85). Both show complete artwork without added bands, and retain their existing summaries on opening. Pocket opening/closing/return was exercised.
- The compact-screen page turn was verified at 420×800: the existing second page showed the saved/default summary, then closed normally. The temporary viewport override was reset. No writing was edited during verification.

Reviewer: compare the two principles books on the middle shelf, pick each up, inspect the edge-to-edge art and page/spine depth, then close and confirm return to the same slot. Also compare a narrow portrait book and review the existing compact-screen page turn.

## Preservation / assumptions / follow-ups

Existing controlled height variation and physical depth ratios were reused. Small corner shear remains a perspective cue, not an artwork fit adjustment. The open-book reading spread retains its approved size and content. All selected assets, book data, summaries, reflections, storage, room, shelves, mural, clock, foliage, lighting, camera, routing and interaction timing were left unchanged.

Future replacement assets require their measured presentation dimensions to be updated; tests catch mismatches. No new dependencies, commit or push. The asset README is updated; README.md, docs/PRODUCT.md and docs/TICKETS.md need no change for this correction. No unrelated follow-up implemented.
