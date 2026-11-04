# Shelf title interaction

Added a title-only paper tooltip above each shelf row on mouse hover or keyboard-visible focus. The row's tallest cover sets the tooltip's lower boundary, keeping it off neighbouring books. The tooltip ignores pointer input and is hidden while books are disabled during pickup/reading. Accessible button names already contain the title, so the visual duplicate is hidden from screen readers.

Retained the existing subtle 2.5% pull/lift and restored its 240ms eased transform transition, which the environment brightness rule had overridden. Reduced motion disables the lift and transitions. Touch retains the existing click/pickup path; no new pointer handlers or click interception were added.

Files changed: `src/components/RoomBookInteractions.tsx`, `src/components/RoomShell.css`, `src/environment/environment.css`, and this report. Environment brightness and all other lighting values remain unchanged. No book geometry, assets, content, phase logic, or scene placement changed.

Verification: build, lint, and all 37 existing tests passed. Browser keyboard focus displayed the title above Designing Interactions; the computed lift used the 240ms transition. Enter picked up the book and its existing automatic opening displayed the summary. Closing returned it to the shelf. No content was edited.

Manual review: hover books on each row, move away, Tab between books, and press Enter to open. On touch, tap once to pick up. Physical-device touch was not separately tested; the original click handlers are unchanged. No new dependency, commit, or push. README, PRODUCT, and TICKETS need no update. No additional follow-ups implemented; final visual acceptance remains with the reviewer.
