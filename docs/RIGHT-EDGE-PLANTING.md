# Right-edge planting refinement

## Jaali trails and coffee-table removal
Removed the ReadingTable import and rendered element from RoomShell.tsx, including the books that were part of that table asset. The underlying floor is revealed without changing its material. The unused table component and asset are retained for a small reversible change.

Increased the screen planting from six to seven climbers, adding a shoot at rod x=1840 (base y=319, scale=.94). Three irregular trailers turn over the coping at (1543,296), (1774,314) and (1994,330), with scales .22, .31 and .43 and angles -12, 9 and -7 degrees. These have different lengths and slight sideways drift. The clip and restrained contact shading extend over the existing brick face, keeping the floor and shelves clear. The existing vine asset, olive treatment and atmosphere response are reused.

Files changed: src/components/RoomShell.tsx, src/components/RightEdgePlanting.tsx and this document. Screenshot: output/jaali-vines-no-table.png. No added dependencies or assets. Source hashes confirm only those two source components changed; architecture, exterior, shelves/books, camera, mural/clock, flooring, lighting and interactions are unchanged.

Verification: npm run build and npm run lint passed; node --experimental-strip-types --test tests/*.test.mjs passed all 29 tests. Browser reviewed in morning, afternoon and night; no console warnings/errors. For manual review, confirm the foreground table is gone, the seven climbers remain airy, and the three short trails sit over the jaali without masking its openings excessively. Final visual acceptance remains with the user. No commit or push. README.md, PRODUCT.md and TICKETS.md need no update. No unrelated follow-ups implemented; the fixed-camera approximation below still applies.

## Screen-wide planting pass
Extended the approved delicate vine across the right metal screen using six climbers at native rod positions x=1455, 1543, 1655, 1774, 1902 and 1994. Scales are .66, .74, .84, .91, 1 and .94 respectively; the existing foreground vine stays at its approved location. Alternate side-shoot directions and different heights preserve open space between the plants. The planting is clipped to the vertical/overhead screen and ends behind the coping, leaving the mural and furniture clear.

Reuses the existing right-edge-vines-v2.png without image edits, additional assets or dependencies. Local contact shading now includes the added rod attachments. Existing exposure, muted olive treatment and night response are retained. Only RightEdgePlanting.tsx and this document changed; source hashes confirm the exterior, architecture, lighting, books, mural, camera and interaction files are unchanged.

Checks: npm run build and npm run lint passed; node --experimental-strip-types --test tests/*.test.mjs passed all 29 tests. Morning, afternoon and night were inspected in the browser with no console warnings/errors. Review capture: output/right-screen-creepers.png. For manual review, inspect the spacing between the six climbers and confirm that the original bare metal screen remains legible through them. The existing fixed-camera asset/contact-shadow limitations below still apply. No commit or push. README.md, PRODUCT.md and TICKETS.md need no changes. No unrelated follow-ups were implemented.

## Earlier material refinement
Refined only the existing interior climbing vines to separate them from the bright exterior trees. Smaller, fewer leaves and long bare stems replace the earlier leafy corner. The replacement asset is 500 native room units wide, versus 650 previously (23% smaller), with a reduced far-right footprint. It sits at x=1432, y=0, height=333.333 and ends behind the existing coping. The mural, shelves, books and circulation remain clear.

Muted olive shading uses the existing atmosphere exposure multiplied by .76, saturation .62 and existing time-dependent warmth. No room lighting values were changed. Two tiny tendril wraps align with existing rod faces; short hidden sections imply the stems passing behind the metal. Faint contact shading is clipped to those rods and the jaali coping, with only minimal ambient attachment shading at night.

The concealed planting strip remains implied behind the coping. No pots, visible planter, new plants or architecture were added.

## Files changed in this pass
- Updated `src/components/RightEdgePlanting.tsx`.
- Added `src/assets/right-edge-vines-v2.png`; the previous version remains unused.
- Updated this document.
- Review capture: `output/right-edge-vines-refined.png`.

## Asset provenance and prompt
The built-in image-generation tool edited the earlier transparent asset, preserving transparency. The generated result was copied unchanged from:
`C:/Users/HP/.codex/generated_images/01a0ac23-851e-7c81-a317-8695c53fabeb/exec-ec357e97-a5a9-4909-b8f5-abc36e2eebd5.png`

Input: `src/assets/right-edge-vines-v1.png`.

Exact prompt:
> Use case: precise-object-edit. Edit target: the supplied transparent climbing-vine asset for an architectural room. Keep actual alpha transparency. Refine ONLY the vine: remove roughly 70% of the leaves, and make the remaining leaves about half their current size. Maximum 28–36 small leaves TOTAL, individual narrow oval pointed jasmine leaves spaced apart in small asymmetric pairs with long bare gaps. Reduce density particularly at the far right, which must have lots of transparent empty space, no dense leafy column. A few very thin, visibly continuous cultivated stems, slightly darker muted olive (#596348 / #667050), softly matte, restrained photographic veins, pale tiny highlights, not bright yellow-green. Stems should be finer, warm grey-olive and clearly visible between leaves. Retain a right-side climbing composition, but make it linear, carefully trained and sparse: two slender upright stems centred around 70% and 88% of image width, rising from bottom, with shallow loose helices/twists as if winding around slim vertical rods (DO NOT render any rods). Connect to one restrained upper stem curving leftward at about 20% image height. Include only two fine, mostly bare inward tendrils. No heavy arched garland. No bush, no flowers, no roots, no pot, no architecture. Entire background including all gaps must be fully transparent. Keep the same landscape 3:2 canvas and photographic botanical realism. Avoid fuzzy atmospheric haze, glow, background trees, bokeh, detached floating leaves or painted graphic branch lines. Soft broad daylight, natural leaf relief, no cast shadows. These are sparse interior cultivated vines, not lush outdoor foliage.

## Verification
- `npm run build`: passed.
- `npm run lint`: passed.
- `node --experimental-strip-types --test tests/*.test.mjs`: all 29 passed.
- Browser inspection in current afternoon, morning and night conditions; no console warnings or errors.
- Source hashes confirm RightEdgePlanting.tsx is the only changed pre-existing source file. The only new source asset is right-edge-vines-v2.png. Exterior imagery, RoomShell, books, furniture, mural/clock, architecture, lighting and interaction systems are unchanged.

## Manual review
Open the local room and inspect the rods above the right jaali: look for small spaced olive leaves, exposed stems, two quiet attachment wraps and a clear outer margin. In `/?environment=preview`, switch Morning, Afternoon and Night to review integration. Final visual acceptance belongs to the human reviewer.

## Assumptions, limits and documentation
This remains a fixed-camera photographic asset, matching the current scene's construction. Rod attachments and local contact shade are approximations, not a 3D botanical simulation. No dependencies were added and no unrelated follow-ups implemented. No commit or push.

README.md, docs/PRODUCT.md and docs/TICKETS.md require no update for this foliage-only refinement.

## Small density increase — 19 October 2026
Added two shorter climbing shoots at rod coordinates 1597 and 1948, with scales .52 and .64 and opposite orientations. Existing seven climbers and three jaali trailers are unchanged. Only RightEdgePlanting.tsx and this note changed; screenshot: output/fuller-creepers.png. Reviewed in afternoon preview with no console errors. Build, lint and all 29 tests passed. Review the right screen for airy gaps and unobstructed shelves/mural. No dependencies or product/roadmap changes; no commit or push.
