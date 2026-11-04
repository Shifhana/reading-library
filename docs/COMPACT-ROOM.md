# Compact Reading Garden composition

This pass tightens the photographed shelf arrangement without changing the camera, book scale, artwork, reading interactions, or daylight model. Implementation is ready for human visual review, not declared accepted.

## Exact placements

Coordinates use the existing 2019 × 848 scene map, with positive Y down toward the viewer. The camera and outer 1886 × 834 viewBox are unchanged. Shelf and book scale remain 1:1 with their previous presentation.

| Shelf | Horizontal shift | Vertical shift | Book seating baseline before → after |
| --- | ---: | ---: | ---: |
| Rear | +115 right | +48 forward | 419.5 → 467.5 |
| Middle | −65 left | +25 forward | 548.5 → 573.5 |
| Foreground | +10 right | −30 back | 749.5 → 719.5 |

Individual book seating offsets remain unchanged. The rear-to-foreground seating span shrinks from 330 to 252 units: **23.6%**. Rear–middle spacing shrinks 17.8%; middle–foreground spacing shrinks 27.4%. Sideways offsets prevent overlap while keeping the staggered arrangement and existing depth hierarchy. This percentage measures projected composition, not a reduction of real-world room dimensions: the current visible room is a photograph rather than editable 3D architecture.

## Implementation

- `src/components/compactShelfLayout.ts`: shared translations and source shelf footprints.
- `src/components/CompactShelves.tsx`: original shelf pixels and contact shadows are moved intact. A clean image fills only their old footprints with softly blended edges. A tiny timber lip continuation repairs a corner previously hidden by the foreground shelf.
- `src/components/shelfBooks.ts`: applies the same translation to each book and hit target. No sizing, identity, covers or interaction changes.
- `src/components/RoomShell.tsx`: mounts the compact composition with the existing exposure treatment.
- `src/environment/ReadingEnvironment.tsx`: shelf exclusion masks follow the shared translations. Sun direction, strength, softness, timing and receiver calculations are unchanged.
- `src/assets/reading-garden-clean-plate-v23.png`: generated removal-only image, used locally for the vacated shelf footprints and the exterior layer. Original room asset is retained.
- This document and `output/compact-room-desktop.png`: review evidence.

## Image editing

Used the built-in image generation tool, with the original `reading-garden-complete-neutral-v22.png` as edit target. A first shelf-repositioning variant was rejected because it altered shelf geometry and is not used by the app.

Final clean-plate prompt:

> Precise removal-only architectural image edit for compositing. Remove ONLY the three empty freestanding wooden book display shelves AND their immediate contact shadows. Fill their footprints seamlessly with the underlying cream-beige floor; back wall behind rear shelf should continue naturally, retaining plaster texture. KEEP EVERY OTHER PIXEL / GEOMETRY AS CLOSE TO IDENTICAL AS POSSIBLE. Exact same image aspect ratio framing camera roof wall floor glazing garden right terracotta ledge jaali rail canopy material colours and neutral soft daylight. No new objects, furniture, text, books, sun shadows. Do not redesign or crop the room. Deliver an empty floor and intact architecture. This is a clean plate onto which the ORIGINAL shelves will be composited unchanged.

## Validation

- `npm run build`: passed.
- `npm run lint`: passed.
- `node --experimental-strip-types --test tests/*.test.mjs`: all 21 passed.
- `git diff --check`: passed, existing line-ending notices only.
- Visual checks at native viewport and 1440 × 900: all shelves remain visible with front/right margins, distinct spacing, unchanged book scale and artwork.
- Opened and closed Emotional Design, Atomic Design and User Friendly from their new foreground/middle/rear positions. Each reached open state with 20 shelf copies and returned to 21 without duplicates.

## Reviewer steps, assumptions and risks

Compare the room with the previous composition, then select a book from each shelf and close it. Check the floor gaps and foreground margins at your normal viewport. The perceived intimacy remains a visual judgement for human review. The clean plate reconstructs small formerly occluded floor/wall areas, so those texture pixels are newly synthesized; existing visible architecture and shelf pixels are retained. The additional image adds about 2 MB to the app assets. No new dependencies, commit, push or unrelated refactor.

No PRODUCT, TICKETS or root README updates are necessary. No additional features were added.
