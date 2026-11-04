# Engraved brass-inlaid shelf labels

Refined only FINISHED on the middle shelf, NOW READING on the foreground shelf, and UP NEXT on the rear shelf. Their existing front-fascia positions, perspective transforms and mapping remain unchanged.

The carved letterforms now have a muted antique-brass / champagne-bronze inlay. A restrained vertical satin gradient runs from #9A8259 through #715832 to #60492B. The fill retains 94% opacity, replacing the previous faint 42% oak-toned recess. Stronger warm inner shading (#503C28) and subdued edge light (#D5BD94) preserve cut depth without bright foil or a flat painted appearance. The inner edge direction still follows the existing sunlight, with reduced highlights at night. Existing shelf exposure, warmth and surface-light overlays remain intact.

Uppercase sans-serif lettering, generous canonical letter spacing (4.5), and the left-offset placement are preserved. Strokes use weight 600 for clearer small letterforms. The minimum label height increases from 8 to 10 original scene units for the rear and middle labels; the foreground retains its existing size. Labels remain visually secondary to the books.

## Files changed

- `src/components/CompactShelves.tsx`: engraving fill, inner shading, restrained highlight and small-text legibility only.
- `docs/SHELF-ENGRAVINGS.md`: completion report.
- `output/shelf-labels-brass-room.png`: full-room browser screenshot.
- `output/shelf-labels-brass-detail.png`: fascia detail screenshot.

Shelf structure, dimensions, positions, wood asset/material, books, room, lighting system, other scene elements, layout and interactions were not changed. No dependencies, commit or push.

## Verification

Commands: `npm run build`; `npm run lint`; `node --test tests/*.test.mjs`.

Build and lint passed; all 47 tests passed after the final styling change. Browser inspection confirmed all three correct labels use the shared metallic inlay and engraving filter. Reviewed the room and each fascia at the normal viewport size; no console warnings or errors appeared.

Manual review: open `http://localhost:5173/`, inspect the three front fascias, and confirm the labels are clearer while retaining a quiet recessed appearance. The foreground should read NOW READING, middle FINISHED and rear UP NEXT. Final visual acceptance belongs to the human reviewer.

Assumption: a small minimum-size increase for the two distant labels and firmer strokes are appropriate within the requested label-only readability pass. No known blocking risks or unrelated follow-ups. README, PRODUCT and TICKETS need no update for this scoped refinement.
