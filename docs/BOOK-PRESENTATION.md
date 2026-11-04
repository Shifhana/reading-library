# Book presentation refinement

The neutral room asset still supplies all architecture. An empty-shelf backing is clipped to the three inner timber faces, removing the baked oversized books before separate physical books are drawn. The generated asset is never used outside these shelf-face clips.

Book positions and identities use the existing shelf coordinates/colors. Width scales range .72–.77 and heights .72–.78, anchored at the same bottom center. Thickness varies .031–.046 of cover width. Books share one PhysicalBook renderer with restrained cover grain, crease, bevel, paper block and page separation.

Selecting measures the hovered cover in screen coordinates, hides that shelf renderer, and mounts a single PhysicalBook in a body portal. The fixed viewport canvas is independent of the room's SVG crop. Held height is capped at 231px, 29.26% of viewport height, and an open-spread width budget. Return uses the current screen transformation of the original corners, then unmounts the portal and restores the shelf renderer only on animation completion. One selection state owns pickup, opening, page turns, closing and return. Existing matchMedia reduced-motion behavior skips travel; Tab stays within the selected-book controls and Escape returns focus to the source button.

## Review
- Select one book from each shelf: its slot should be empty while held.
- Click the held cover to open. Use arrows, close, or Escape; the same book should return.
- Resize while selected: the held/open book should remain inside the viewport and return to its source.
- Enable reduced motion in OS/browser and repeat pickup/return.
- Run npm run build, npm run lint, node --test tests/environment.test.mjs, git diff --check.

The shelf backing is generated timber reconstruction; the books are restrained SVG geometry rather than a photographic 3D model. No new book data or content is introduced. README, PRODUCT and TICKETS need no change.

## Asset provenance
Built-in imagegen; saved as src/assets/reading-garden-empty-shelves-v1.png. Input: reading-garden-neutral-v21.png.

Prompt: Use case: precise-object-edit. Edit target: supplied Reading Garden image. Remove ONLY all 17 books from the three wooden low display shelves, revealing the continuous pale oak timber backing behind each book. Three completely empty display shelves. Preserve EXACT image framing, pixel registration, camera, shelf outlines, ledges, shadows, ceiling, wall, floor, glazing, jaali wall, metal rails, greenery, lighting and colors. Do not move or resize any shelf or alter architecture. Inpaint natural horizontal oak grain and soft interior shelf shading only where books were. No new objects, no text. Output same wide aspect ratio. This is a registered empty-shelf backing for code rendered books; all architectural details and positions must match source precisely.

Held-state follow-up: reduced all focused-size limits by 23%, lowered the center from 46% to 54% of viewport height, and replaced the white control panel with a text-only return button. Subtle perspective, a narrow spine face and cover/page separation interpolate with pickup depth; at shelf depth zero the approved shelf appearance is unchanged. No selection state transitions were changed.
