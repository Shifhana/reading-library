# Directional daylight refinement

## Time-specific direction

Morning keeps the left glazing as its source. Afternoon and evening now use
right-origin foliage fields and reverse the floor skew, with separately clipped
rail/pergola projections. Afternoon is clearer and stronger; evening reaches
farther left with softer rail shadows and golden highlights. Night replaces the
previous warm fill with faint cool blue-grey ambient illumination and has neither
foliage nor rail sunlight shadows. The wall receiver follows the stepped
wall/terracotta boundary, avoiding a rectangular overlap at the right edge.

The existing four time presets remain: the afternoon preset represents the
requested right-lit afternoon mood, rather than an astronomical sun position or
continuous 3–4 pm transition. No room image, interaction, or motion changes.
Files for this pass: ReadingEnvironment.tsx, FoliageProjection.tsx,
sunProjection.ts, tests/sun-projection.test.mjs and this note. No product/roadmap
or README update is required. Review all four options in the existing preview.

## Small lighting polish

Corrected the exterior sill boundary (it previously detoured around the shelf),
aligned wall/floor clips to the photographed glazing, and tightened the middle
shelf exclusion to its silhouette. This removes the exposed triangular lighting
seam without editing the room image.

The three existing foliage layers, crop selections and breeze timings remain.
Canopy blur is now 4.8, mid foliage 1.4, and branch detail 0.35 image units before
time scaling. Shadows are desaturated before compositing. The same floor field
is mixed through complementary near/far masks: sharper near the viewer/glazing,
with an additional 2.4-unit blur toward the back. Stretch increased modestly
while the wall-floor junction remains fixed.

Sunlight screen-blend intensity increased from .17/.20/.18 to .26/.28/.25 for
morning/afternoon/evening. Existing warm patches remain directional and clipped.
Night adds a low-opacity warm radial interior fill, excluding exterior greenery,
plus a small book exposure lift (.36 to .40). No lamps or sunlight were added at
night. This remains approximate compositing; it cannot calculate actual bounced
light or physically correct occlusion from the photographed vegetation.

Scope: environmental lighting only; the neutral room photograph, architecture,
book geometry, camera, data and interaction state machine are unchanged.

`FoliageProjection.tsx` renders three foliage depths: distant canopy, middle
foliage and closer branch detail. Each samples a different crop of the existing
transparent texture with independent size, placement, rotation, opacity and blur.
The wall stays vertical; the floor reverses and stretches/skews the projection
around the shared junction at image y=446. Surface clips and shelf
occlusion masks prevent shadows painting across the room silhouette or shelves.
Warm screen-blended sunlight is restrained and separate from multiply-blended
shadow. Existing photograph texture and contact shading remain visible.
Morning is gentle, afternoon more compact and defined, evening longer and softer;
night omits all sunlight. This is an art-directed 2D approximation, not ray tracing.

`sunProjection.ts` centralizes time configurations and foliage-depth settings.
Source crops feather to zero before their bounds; stationary receiver clips sit
outside moving/blurred layers. Floor opacity falls off toward the distant wall.
The three layers have 29/23/19-second asynchronous CSS motion, roughly 1–3 image
pixels with tiny rotation and opacity changes. `prefers-reduced-motion` disables
the animation entirely. No JavaScript animation loop or dependencies were added.

Validation: build and lint passed; all five Node tests passed, including junction
continuity across time configurations. Daylight previews, night removal and book
select/return were checked in the browser. Reduced-motion CSS was inspected in
the browser stylesheet; the OS preference was not changed. Fine time-of-day
tuning and physical occlusion by individual leaves remain approximations.

`atmosphere.ts` slightly increases daytime contrast to retain contact shading.
`environment.css` applies ambient book brightness to the book's parent group so
the existing inline cast-shadow filter no longer overrides environmental exposure.

New asset: `src/assets/foliage-shadow-v2.png`, generated with built-in image_gen,
transparent background. No base room image was regenerated.

Generation prompt:
> Create a production compositing asset ONLY: a photorealistic cast shadow of a real mature leafy tree, on a genuinely transparent background. Landscape aspect ratio 3:2. No room, no wall, no surface, no coloured foliage, no white background. Only translucent dark neutral brown-grey branch-and-leaf shadows. A coherent asymmetric tree crown enters from the left edge with a few natural tapering branches extending diagonally upward-right; irregular clusters of small broad leaves, overlapping leaves, abundant large gaps of complete transparency occupying at least 55 percent of the image. Mixed penumbra: some leaf edges delicately defined, others softly defocused, varying translucent density, not uniform black silhouettes. Optical shadow realism like sun through a tree, not botanical illustration, not vector leaves, not random detached marks, not dense canopy blanket. Density strongest left-middle with several open branch structures, tapering organically toward right. Fully transparent margins on top right and bottom, no rectangular background or haze. Intended to multiply over an architectural photograph while retaining its material texture.

Review at `/?environment=preview`: switch all four times, inspect wall/floor
texture and continuity, then select/return a book. Final visual acceptance is
the user's. No README, PRODUCT or TICKETS changes required for this refinement.
