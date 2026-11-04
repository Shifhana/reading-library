# Physical reading refinement

Implemented against the supplied physical-book reading brief. Human review remains the final acceptance step.

## Changes

- Quiet title running headers, reflection on the left and notes on the right; compact screens show one page at a time.
- Removed product headings, prominent metadata/status, permanent add/privacy controls, arrow toolbar and large close button.
- Reading is the default. Hover/focus reveals local edit/clear actions; empty sections offer quiet writing invitations. Save/cancel and existing storage remain local to each section.
- Text is measured against available paper space and paginated without reading-mode scrollbars. Editing may scroll locally.
- Outer page edges respond to hover/focus and pointer dragging. Click or drag past 20% of page width completes a turn; shorter drags settle back.
- Held cover responds with an approximately 8-degree lift. Existing automatic opening pause, held scale, artwork, and return path are preserved.
- First left edge closes the book. A small accessible × and Escape remain available. Closing automatically returns to the original shelf slot.
- Arrow keys, focus trapping/restoration, pointer-based touch support, and existing reduced-motion handling remain supported.

## Files in this pass

- src/components/BookNotes.tsx
- src/components/BookPageEdge.tsx (new)
- src/components/readingPagination.ts (new)
- src/components/PhysicalBook.tsx
- src/components/RoomBookInteractions.tsx
- src/components/RoomShell.css
- tests/reading-pagination.test.mjs (new)
- docs/PHYSICAL-READING.md (new)

Existing unrelated working-tree changes were preserved. No dependencies, commits, or pushes.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed without diagnostics.
- `node --test tests/*.test.mjs`: 31 passed, 0 failed.
- Browser: desktop two-page spread and compact single-page layout reviewed. Saved a temporary long reflection, verified seven measured spreads, clicked and dragged page edges, cancelled a short drag, navigated backward by keyboard, cleared the temporary content, and closed via the first left edge. Automatic return restored focus to the original shelf book. Browser reported no warnings or errors during these checks.

## Reviewer steps

1. Pick a book and observe the held cover, automatic opening and first spread.
2. Write a long reflection or note; save, turn pages with the outer edges or arrow keys, then edit/cancel or clear locally.
3. Try a short edge drag and a longer drag. Verify cancellation versus completed turn.
4. On the first spread use the left edge, × or Escape. Check the book returns automatically to its shelf slot.
5. Review on a physical touch device and with the OS reduced-motion preference enabled.

## Assumptions and limits

Reflection and notes retain separate left/right page sequences; a shorter section can leave a quiet blank continuation page. Pagination is presentation only and does not alter the saved content model. Page motion uses the existing SVG physical-book renderer, not a new 3D engine. Physical touchscreen and OS reduced-motion verification remain manual; pointer drags and keyboard navigation were verified in the desktop browser.

## Documentation / follow-ups

No product or roadmap changes were made. README.md, docs/PRODUCT.md and docs/TICKETS.md do not require changes for this scoped refinement. Final visual and touch-device acceptance belongs to the reviewer.
