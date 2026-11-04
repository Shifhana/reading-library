# Reading Garden cover artwork

The 20 active books now use their real published covers. Each `coverImage` in `src/data/books.ts` references a local `<slug>-published.jpg` asset, or the author's original vector `<slug>-published.svg` for Atomic Design. These explicit per-book paths are the source of truth.

`published-covers.json` records the source URL, matched ISBN where available, dimensions and preparation notes for each asset. Publisher/author sources and ISBN-matched Open Library images were visually checked. See `docs/PUBLISHED-COVERS.md` for edition choices and verification.

## Rendering

`coverDimensions.ts` records each selected asset's measured intrinsic size (the SVG uses its viewBox). Shelf height is controlled by the existing arrangement; physical width is height × source aspect ratio. The held state uses that same ratio. `CoverArtwork` projects the full image edge to edge onto that matching physical face, without letterboxing, pillarboxing, or runtime cropping. Tests read the actual JPEG/SVG dimensions to keep the layout measurements in sync with the unchanged assets.

Page block, spine, thickness, shadows and the rotating cover remain coded geometry. Opening reveals the existing inner cover/paper surface; closing restores the same published artwork. Local assets load once through normal browser caching; successful/failed source state is shared across shelf and held copies.

The visible outer cover keeps its intrinsic proportions while the page block transitions to the existing readable spread. The edge-on midpoint joins the open cover to the established reading layout. See `docs/COVER-GEOMETRY.md` for the geometry correction and verification.

The existing `BookCover` design remains a clean loading/error fallback. Earlier temporary SVG files are retained but no longer referenced by active book records. No generated imitation of a published cover is used.

## Asset preparation

19 JPEGs are saved at quality 88 without upscaling, with a maximum of 800×1000 pixels. Sources range from 400–1000px in height, sufficient for the current held-book height (under 390 CSS px). Atomic Design remains vector-sharp. Total active cover payload is 980,777 bytes (about 958 KiB).

Art of UX's front artwork was extracted from the author's promotional image, excluding its surrounding gradient backdrop. Designing Design uses the publisher's front-jacket photograph with the narrow photographed spine excluded and the printed promotional band retained. Neither cover was regenerated or re-typeset. Full source details are in the manifest.

To replace an edition later, add its local image, update that book's `coverImage`, and update its provenance entry. Preserve complete front-cover artwork and check the held state before accepting it.
