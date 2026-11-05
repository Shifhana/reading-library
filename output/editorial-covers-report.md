# Reading Garden editorial cover system

Implemented for review; acceptance remains with the human reviewer. No commit, push, or new dependencies.

## Summary

All 21 room books now share a live HTML/CSS editorial cover layout with crisp serif titles, understated author names, a small Reading Garden label, and a quiet ruled footer. Seven named room-inspired palettes and 21 original theme-specific SVG marks give each book its own identity. Examples: overlapping emotional circles, discovery loops, atomic modules, an ascending Empowered rhythm, and a restrained Designing Design horizon. These are original designs, not copied publisher artwork.

The cover uses existing book metadata and slug-based art direction. Long titles wrap automatically; configured subtitles retain all words in a smaller secondary hierarchy. The existing four-corner projection attaches this structured content to the same physical cover throughout selection, rotation, closing and return. Spine, pages, bevels, shelf layout, geometry, timing, editing controls and environment are unchanged.

## Files changed in this pass

- Added `src/components/BookCover.tsx`: reusable live typography and vector motif renderer.
- Added `src/components/BookCover.css`: shared typography, margins, layout and physical surface styling.
- Added `src/components/bookCoverDesigns.ts`: named palettes, per-slug art direction, temporary missing-author configuration and subtitle splitting.
- Updated `src/components/CoverArtwork.tsx`: projects structured covers; retains image-only rendering and failure fallback when no book metadata is supplied.
- Updated `src/components/PhysicalBook.tsx`: accepts cover metadata on the existing physical surface.
- Updated `src/components/RoomBookInteractions.tsx`: supplies the same book record in shelf and focused states.
- Updated `src/assets/book-covers/README.md`: current cover editing instructions and retained image asset support.
- Updated `tests/book-covers.test.mjs`: all-book art-direction coverage and lossless title splitting.
- Added this report and `output/editorial-cover-held.png`, `output/editorial-cover-shelves.png` review captures.

## Verification and commands

- `npm run build`: passed.
- `npm run lint`: passed.
- `node --experimental-strip-types --test tests/*.test.mjs`: all 21 tests passed.
- `git diff --check`: passed; existing line-ending notices only.
- Browser inspection confirmed all 21 live covers, with no title/subtitle overlap in their allocated area.
- Visually reviewed the complete shelf family and Emotional Design held cover.
- Exercised Emotional Design (foreground), Lean UX (rear), and The Pocket Universal Principles of Design (middle), including held, open and return states. Long titles/subtitles were preserved; each returned with all 21 shelf covers restored and 20 shelf copies while selected.

## Reviewer steps

Select one book from each shelf and inspect its title, author and motif before automatic opening. Close it and check that the original shelf copy returns. Check Lean UX for subtitle handling and The Pocket Universal Principles of Design for long-title wrapping. Edit a title/author in the existing book record to see it update without rebuilding any cover artwork.

## Assumptions, tradeoffs and follow-ups

- Existing metadata remains authoritative, including any current spelling or attribution issues. Three empty author fields show “Author to be confirmed”; the bundle uses the name already identified in its title, Artiom Dashinsky. Confirm those missing authors later.
- Foreground titles are more recognizable at shelf scale; rear covers still cannot make every word readable at very small viewport sizes without changing approved book dimensions. Full typography is readable when held.
- The current room prioritizes the structured design over legacy SVG image assets. Those assets remain for older image-based views and image-only physical-cover usage; no artwork files were regenerated.
- Visual verification used the current Chromium in-app browser, not all browser engines.
- The cover asset README was updated. No root README, PRODUCT or TICKETS updates are required for this explicitly requested creative pass.
