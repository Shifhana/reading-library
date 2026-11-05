# Framing and geometry refinement

## Result

Removed the mismatched right-edge image blend and the three separate timber-face
patches. The room now uses one continuous photograph with complete empty shelves;
the existing 21 interactive books are drawn over it. The foreground shelf end,
front lip, foot and contact shadow are part of that same coherent image.

The source's native 1886 × 834 aspect ratio is now preserved. This corrects the
previous approximately 5% horizontal stretch without cropping the foreground
shelf. Its right and bottom clearance remain visible. The existing scene's
logical coordinates are mapped together so books and lighting remain aligned.

## Files changed in this pass

- `src/components/RoomShell.tsx`: continuous background, native aspect ratio;
  removed stitched edge images, feather mask and extra garden strip.
- `src/components/RoomShell.css`: framing comment and quiet dark frame at night.
- `src/components/RoomBookInteractions.tsx`: removed the shelf-face image patches
  and their unused asset/prop. Selection/open/close/return logic is unchanged.
- `src/components/shelfBooks.ts`: align the three book baselines with the new
  coherent shelf grooves: rear 419.5, middle 548.5, foreground 749.5. Book IDs,
  counts, horizontal positions, scale, colors and physical styling are unchanged.
- `src/environment/ReadingEnvironment.tsx`: register exterior/receiver masks to
  the continuous image; exclude shelves from exterior darkening.
- `src/environment/SpatialSunlight.tsx`: extend the existing projection canvas
  through the complete scene width so it has no cutoff at the former image edge.
- `src/assets/reading-garden-complete-neutral-v22.png`: coherent neutral room asset.
- This report and `output/framing-geometry-refined.png`: review artifacts.

## Checks

- `npm run build`: passed.
- `npm run lint`: passed.
- `node --test tests/*.test.mjs`: 11 passed.
- `git diff --check`: passed; existing line-ending warnings only.
- Reviewed Morning, Afternoon, Evening and Night in the local app.
- Reviewed framing at 1280 × 720 and 1440 × 900, then reset the viewport override.
- Selected/returned books on all three shelves; opened/closed the foreground book.
- All 21 book controls remain present with no selected/duplicate copy after return.
- No browser console errors in the final check.
- Reviewed changes; no commit, push, dependencies or unrelated refactoring.

## Review and limitations

Resize the app and inspect the full foreground shelf, especially its right foot
and lip. Select/open/return a book and switch through the four time states.

Assumption: preserving the full photographic frame is preferable to clipping it
to fill a taller viewport. Tall screens retain margins above and below the room.
The background is still a raster scene, not a complete 3D reconstruction. Its
small material details were reconstructed during book removal, so this is not a
claim of pixel-identical preservation of the prior raster. The visible layout,
materials and design remain consistent. Human visual acceptance is pending.

No README, product or roadmap updates are needed. No out-of-scope follow-up was
implemented. Older assets are retained on disk but are no longer bundled by this
rendering path.

## Asset method and prompt

Used built-in imagegen with `reading-garden-right-edge-v1.png` as the edit target.
Saved the resulting asset as `src/assets/reading-garden-complete-neutral-v22.png`.
Final prompt:

> Precise-object-edit for an interactive reading room background. Use this exact complete room image as edit target. ONLY REMOVE THE BOOKS from all three timber display shelves, revealing clean uninterrupted pale oak backing and groove in each shelf. Books are rendered separately by the app. Preserve ALL room pixels and geometries outside the books as closely as possible: same camera, aspect ratio, composition, glazing, foliage, neutral warm plaster, floor, terracotta jaali/ledge, curved metal rods, three shelf positions and shelf sizes, soft neutral diffuse daylight. In particular preserve the COMPLETE foreground shelf's right end panel, its clean join to the front lip, feet and subtle contact shadow on the floor; do not crop it. No added objects, no redesigned shelf, no sun shadows. Retain the exact input dimensions/aspect ratio 1886 by 834; no zooming, no stretching, no rescaling, no expanded canvas. Output one coherent photorealistic room with the same three EMPTY shelves and no books, no seams, no patchwork, no warped geometry.
