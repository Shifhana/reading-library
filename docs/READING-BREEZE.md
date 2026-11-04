# Reading Breeze — quiet woven mural

## Current addition: integrated analog clock

Panel 2, the large warm-parchment `broad` form at (916, 250), now functions as the clock face. Its silhouette, placement, material, overlap order and 15 mm nominal stand-off remain unchanged. There are still exactly nine forms and only one clock. This supersedes the earlier note that the mural is entirely decorative; it now has an accessible image label containing local time. The separate digital clock remains hidden.

Two fine matte dark-bronze hands (#514A38), 24/34 scene units long, share a 2.1-unit pivot. Four faint 2-unit cardinal marks are used; there is no dial, numeral, visible label, seconds hand, extra panel or backing surface. The clock sits inside the existing panel body and exposure group, so it follows the same breeze transform and lighting response. Its mounting angle cancels the panel's resting roll, keeping twelve upright while allowing the existing gentle sway.

The existing `useEnvironment` date and minute timer supply a numeric fractional hour. No timer, time simulation, lighting or physics behavior was changed. Hour-hand rotation includes minutes, and preview states share the same source as the hidden digital clock.

Files changed for this addition: `ReadingBreeze.tsx`, the single ReadingBreeze invocation in `RoomShell.tsx`, the returned clock-hour value in `useEnvironment.ts`, and this document. Review screenshot: `output/reading-breeze-panel-clock.png`.

Verification: `npm run build`, `npm run lint`, and `node --experimental-strip-types --test tests/*.test.mjs` passed (29 tests). Browser checks confirmed 09:00 and 17:00 hand positions, fractional live local-time angles, exactly nine forms/one clock/zero digital clock elements, and no console warnings or errors. No commit or push.

Manual review: select Morning and Evening in the environment preview, then disable simulation to check local time. Inspect the hands at room scale and move across the mural to review the mounting. Assumption: the approved existing time source should govern the clock in both preview and live mode. The intentionally fine hands are less readable on small screens and in the dim night state; final visual acceptance remains with the reviewer. No unrelated follow-ups implemented; README, PRODUCT and TICKETS need no update.

Scope: an art-direction refinement of the existing Reading Breeze installation. The room, shelves, books, camera and sunlight system remain unchanged. No dependencies, commit or deployment.

## Composition and material

- Nine distinct abstract silhouettes replace the previous 22: four large anchors, four medium forms and one small accent. Thirteen redundant forms were removed. The asymmetrical composition occupies the upper/middle plaster wall with broad overlaps and space above the shelves.
- Six forms use parchment/sand cane, two muted sage and one clay. Fine woven detail, subtle fibre-density variation and slim perimeter binding keep the distant view quiet; the current material treatment is documented below.
- No rail, backing rectangle, uplight or visible mounting hardware. Concealed centre mounts and back-to-front paint order are retained.
- Nominal stand-offs are 15, 25, 32 and 45 mm, with only one 45 mm accent. Resting centre depths are approximately 15–45 mm after the existing wall-clearance adjustment. Synthetic extreme gust tests stay below 60 mm at the centre. Millimetres are inferred from the established fixed-camera wall scale, not measured construction dimensions.
- `showClock={false}` remains in RoomShell. Clock logic, placement and time simulation are untouched.

## Motion and contact shading

The existing passive pointer and spring integrator architecture is preserved; `readingBreezePhysics.ts` is unchanged. Large/medium/small mass is now 4.5/2.3/1.2, with force gains .14/.28/.4. Slower, smaller idle oscillation and greater mass produce gentle settling. Dynamic yaw is capped at 2.3 degrees (3 degrees including resting tilt), in-plane motion at .25 degrees and pitch variation at .25 degrees. Concealed mounts continue to keep the entire panel envelope in front of the wall.

The original face and sun-ray projection functions remain intact. The renderer now uses a bounded contact cue derived from that projection: a blurred, solid silhouette, never a copy of the woven mesh. The offset is limited to three scene units and opacity to 12% by day / 5.5% at night. Shadows are painted immediately before their corresponding panel so forward pieces softly shade the forms behind. The existing wall clip and shelf mask remain. Night has only faint ambient contact shading, no sunlight projection.

Reduced motion retains 5% idle sway and 12% cursor force on top of the quieter tuning. The live preference listener, hidden-tab pause, listener cleanup, decorative accessibility treatment and non-intercepting pointer behaviour remain unchanged.

This remains a fixed-camera SVG relief. Close weave, surface response and overlap shading are visual approximations, not a ray-traced material simulation.

## Verification and review

Commands:

- `npm run build`
- `npm run lint`
- `node --experimental-strip-types --test tests/*.test.mjs`
- `git diff --check`

All existing test cases are retained. Composition/depth/angle expectations were updated for this brief; an additional bounded-contact-shadow test brings the suite to 29 tests. Projection consistency, mount clearance, local forces, relative mass response, reduced forces and settling remain covered.

Build and lint pass; all 29 tests pass. Browser review covered all four time states, local pointer response, and opening/returning Emotional Design (foreground), Atomic Design (middle) and User Friendly (rear). A source hash comparison found no changes outside Reading Breeze. The final screenshot is `output/reading-breeze-calm-mural.png`.

Manual review:

1. Open `/?environment=preview` and compare Morning, Afternoon, Evening and Night. The artwork should read as broad colour fields, with faint close contact shadows and no visible clock.
2. Move slowly beside a form, sweep past it and leave the wall. Motion should remain local and restrained; the large anchors barely respond.
3. Open and close a book from each shelf; confirm the original shelf copy returns after the animation.
4. Enable the OS reduced-motion preference and repeat the pointer check. Live OS switching remains a manual review item.

## Botanical contour and edge refinement

The subsequent silhouette-only pass keeps exactly nine forms (4 large / 4 medium / 1 small), the same IDs, depth layers, nominal stand-offs, material assignments and motion settings.

- All nine contours now use broad shoulders, rounded tapering ends and restrained asymmetric notches. The large central form has an elongated, directional silhouette instead of a broad wavy rectangle. No veins, stems or literal botanical illustrations were added.
- The left parchment anchor is narrower and tucks under the adjacent sage panel. The clay connector moves inward from x=650 to x=789 and upward from y=305 to y=291. The right sage anchor is modestly broader; the right parchment connector overlaps it more deliberately. The horizontal wall coverage and negative space remain similar, without mirroring the composition.
- Medium panels have smaller proportions than the anchors; the single small accent is reduced from 95×64 to 82×59 scene units. Depth paint order is unchanged.
- Fine perimeter binding is slightly more defined: 1.35 px shaded edge, .95 px core, .4 px bevel highlight and faint .55 px binding marks. Rounded joins avoid sharp perimeter seams. There are no added surface veins.
- Palette values, surface gradients, weave paths, weave scale/opacity, internal ribs, shadow settings and all animation/projection code were preserved byte-for-byte during this silhouette pass. The later material-only refinement is documented below.

This pass changes only `ReadingBreeze.tsx`, `readingBreezeLayout.ts` and this document, plus its review screenshot. Build, lint and all 29 existing tests pass without test edits. A source-hash check confirms all 99 other source files are unchanged. Review `output/reading-breeze-botanical-refinement.png` and the live afternoon preview for contour, balance, overlap and edge quality.

## Earlier procedural natural-fibre pass (superseded)

This pass changes only `ReadingBreeze.tsx` and this document, with two review artifacts. The approved layout file is unchanged: exactly nine forms, the same silhouettes, positions, sizes, overlap order and 15–45 mm nominal depths. The complete pointer/spring effect is unchanged, as are the projection module and shadow settings. A source-hash comparison confirms all 100 other source files are preserved.

- Fine bowed warp/weft strands vary in spacing and thickness inside a 32-unit repeat. Paired low-contrast light and shade strokes suggest the raised fibres; a few short crossings interrupt perfect regularity. The weave follows each panel's existing orientation.
- The new fine-fibre layer uses 48% opacity; the previous diagonal cane mesh is retained at a quieter 14%. A clipped, static two-octave density filter adds only a few percent of tonal modulation. It affects colour/opacity, never silhouette geometry. No animated noise, image textures or dependencies were added.
- Dyed base tones are warmer parchment `#D1BEA0`, deeper sage `#919D80` and earthy clay `#B78E74`. Related highlights and shadow tones create a broad, low-sheen surface response tied to the existing light direction. There is no gloss or increased colour saturation effect.
- The original slim binding remains, with gently irregular pale wrapping marks and an inward-clipped bevel. Fine internal edge shading and a small turned-edge highlight make thickness readable without thickening the panel's outline or increasing its stand-off.
- Existing soft contact/overlap shadows are unchanged. Material-edge shading improves object separation without new cast, patterned or perforation shadows. The surfaces are softly matte; transparency is not used to expose the hidden contact-shadow fill through a panel.

Build, lint and all 29 existing tests pass without test edits. Review was performed at room scale and in an enlarged vector material study. The latter isolates the actual rendered panel surfaces against a neutral background; it is an inspection artifact, not a new app view or a change to the camera/viewport. Files: `output/reading-breeze-material-refinement.png` and `output/reading-breeze-material-detail.svg`.

Manual review: inspect the live afternoon preview for quiet colour fields and edge separation, then open the material-detail SVG to inspect fibres and binding more closely. Move across the mural to check that material stays attached to each moving panel. Use the developer time control to compare day and night.

README, PRODUCT and the V1 roadmap do not need changes. Human visual acceptance remains pending. The fixed-camera material approximation remains a limitation; no additional features or follow-ups were implemented.

## Photographic cane / earlier craft-language refinement

The current pass preserves the approved nine-form layout exactly (4 large, 4 medium, 1 small). Silhouettes, positions, overlaps, nominal 15–45 mm stand-offs, restrained solid contact shadows, hidden clock and complete pointer/spring effect are unchanged. A hash comparison against the start of the material pass confirms that all 100 other existing source files remain untouched.

- Replaced procedural drawn warp/weft and noise with a generated photographic cane lattice. Realistic-looking strip grain, over-under crossings, small irregularities and native transparent interstices provide the material detail. The earlier coarse square-weave study is retained as an unused asset; only the finer lattice ships in the app.
- The fine lattice repeats at a consistent physical scale across the differently sized panels. Mirrored adjacent tiles eliminate hard texture seams; each panel starts at a different crop offset. The material follows the existing panel transform during movement.
- Three luminance-based dyes retain fibre variation while making warm natural cane, olive sage and clay more distinct. The flat base fill is removed; a 6% directional finish wash preserves the existing broad light response without closing the weave.
- The slim perimeter has a shaded rounded core, a directional edge highlight and fine binding turns. An inward-clipped bevel gives a small rolled edge, without adding stand-off depth. Existing two internal binding ribs are retained; no new veins or structural rails were added.
- Earlier craft-language reference: the saved `output/reading-breeze-woven-relief.png` and user-provided woven installation photos. Only material and fabrication cues are transferred; the older dense composition and patterned shadows are not restored.

Changed implementation: `src/components/ReadingBreeze.tsx`. Added material: `src/assets/reading-breeze/fine-lattice-v2.png`; provenance and exact built-in image generation prompt: `src/assets/reading-breeze/MATERIAL.md`. The earlier unfinished study added `fine-cane-v1.png`. No dependencies, commits or pushes.

Review artifacts: `output/reading-breeze-craft-refinement.png` (actual room screenshot) and `output/reading-breeze-craft-detail.svg` (actual rendered surfaces isolated for enlarged inspection). Inspect the edging and weave in the detail, then compare day/night in the live preview; move across the wall to confirm the texture stays attached to the forms. The room camera is unchanged.

Validation: build, lint, all 29 tests and whitespace checks pass. The live preview has no console errors/warnings. Remaining limitation: this is an SVG relief using a photographic texture, not physically simulated woven geometry. Fine detail naturally averages out in the small full-room viewport. The PNG adds a few megabytes to the asset payload; image delivery optimization is a possible separate follow-up, not part of this material pass. README, PRODUCT and TICKETS need no update. Human visual acceptance remains pending.
