# Open-book reading canvas — implementation report

## Summary
Refined only the open-book reading canvas. Desktop uses a two-page spread at 86% viewport width, capped by available height. At 1280 x 720 the spread is approximately 1101 x 608. Below 720px width it becomes a single page at up to 88% width. Short screens are height-constrained so controls remain inside the viewport.

Paper now has a restrained cover edge, central gutter, page thickness, quiet page numbers, running headers and generous content margins. The three existing spreads provide Book information, What I remember and My notes headings; no editor or real note content was added. The room remains visible with a restrained 22% warm charcoal dimming treatment while reading.

## Files changed for this pass
- src/components/PhysicalBook.tsx
- src/components/RoomBookInteractions.tsx
- src/components/RoomShell.css
- src/components/readingLayout.ts (new)
- tests/reading-layout.test.mjs (new)
- output/open-book-desktop.png (review screenshot)
- output/open-book-reading-notes.md (this report)

Other existing workspace changes predate this pass and were preserved.

## Interaction
Close now finishes in the held state rather than automatically returning to the shelf. Return remains a separate action. The source shelf copy stays hidden until return completes. Book identity and shelf positions are unchanged. Arrow keys turn sections; Escape closes. Existing reduced-motion handling is retained.

## Verification
- npm run build: passed.
- npm run lint: passed.
- node --experimental-strip-types --test tests/*.test.mjs: 13 passed.
- git diff --check: passed; only Windows line-ending warnings.
- npm test: no script is configured; tests were run directly with Node as above.
- Browser: opened foreground Emotional Design, middle Atomic Design and rear User Friendly. Verified close-to-held and explicit return; no duplicate shelf copies.
- Desktop and 390 x 844 mobile checked visually. Layout tests cover common desktop, tablet and short viewport dimensions.
- Arrow navigation and Escape verified. Browser error log empty.
- No commit, push, PR or new dependency.

## Manual review
Select a book on each shelf, open it, use Previous/Next or arrow keys, then Close/Escape. Confirm it stops in the held state. Return it and confirm the original slot is restored. Resize below 720px to review the single-page reading layout.

## Assumptions and limitations
Single-page mobile mode shows one page per section, omitting the blank facing page. This pass prepares content areas only. Reduced-motion code was retained and inspected, but the OS setting was not manually toggled. Final visual acceptance belongs to the reviewer.

## Documentation and follow-ups
No README, PRODUCT or TICKETS changes are needed for this scoped visual refinement. No unrelated follow-ups were implemented.
