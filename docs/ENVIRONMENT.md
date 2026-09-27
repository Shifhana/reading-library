# Reading Garden environment

The active system uses only local device time: morning 06:00–10:59, afternoon 11:00–15:59, evening 16:00–18:59, night 19:00–05:59. Weather requests and weather/location controls are no longer mounted. The old services file remains dormant.

## Sheet regression

ReadingEnvironment.tsx previously painted registered wall and floor images through environment-wall-light and environment-neutral-floor filters. Hard region boundaries and compressed floor contrast severed shelf contact shadows and made the wall appear detached. Large room-depth and tint rectangles compounded this. All those passes, masks and rectangles have been removed. RoomShell now filters the original room image directly, preserving every material pixel and geometry. Only the exterior has a separately clipped image exposure. The procedural ellipse foliage layer has also been removed: it produced the visible floating leaf marks. It is replaced by one fixed connected SVG branch silhouette with attached foliage, no random marks or painted wall surface.

## Four-state rendering

Morning uses soft neutral exposure. Afternoon is brighter. Evening lowers exposure and adds warmth. Night lowers room exposure to .36 and exterior to .13. The same transparent branch silhouette is projected from the left: morning is long and softly blurred; afternoon is shorter, lower and sharper; evening is longer, shifted and softly brown-tinted; night has zero shadow opacity. Only shadow geometry, blur and color vary; room exposure settings and the neutral image are unchanged. Transitions remain 900ms and are disabled for reduced motion. Books retain their existing interaction and follow resting exposure.

## Base image update

The app now uses reading-garden-neutral-v21.png: the approved neutral daylight image with screenshot clock and developer controls removed before integration. The original v19 asset is retained. Book cover coordinates and exterior clipping are registered to the new image. All image passes share the same 1855 × 848 mapping so covers and lighting stay aligned. Strong baked tree shadows are absent; subtle material and contact shading remains.

Preview with npm run dev and /?environment=preview. Check all four options for continuous wall/floor texture and shelf contact. Run npm run build, npm run lint, node --test tests/environment.test.mjs and git diff --check.


## Fuller foliage pass
The sparse repeated sprig is replaced by a fixed connected branching canopy with varied attached leaf outlines. Separate wall and floor projections share the canopy; transparent architectural clips exclude shelves. Morning is higher/lighter, afternoon shorter/sharper, evening lower/longer/softer, and night uses zero shadow opacity. Exposure, warmth, time mapping, book interactions and the v21 base remain unchanged. No window-grid shadow or wall paint overlay is added.

## Reference shadow realism pass
Replaced the recursive SVG silhouette with src/assets/foliage-shadow-v1.png, generated with the built-in imagegen tool. Only its transparent black foliage alpha is projected; the room image remains untouched. A sharp and soft pass share the same registration, plus transparent falloff, to mix edge focus and opacity without painting a wall panel. Existing daylight transforms and zero nighttime opacity are preserved. Prompt: realistic irregular black tree-canopy silhouette on transparency, dense leaf clusters with airy gaps and connected tapered branches entering from upper left; no architecture, surface, grid, fog, text or backdrop.

## Lighting refinement (current)
The v21 room image and foliage-shadow-v1.png are unchanged. ReadingEnvironment remaps the existing transparent alpha with a gentle gamma curve, tints only the foliage, and reduces the co-registered soft pass to 8%. This retains branch structure and varied edges without an opaque surface or a shifted duplicate.

Morning stays close to the original, with .98 exposure and 1.2px shadow softness. Afternoon uses 1.04 exposure, .6px softness and a compact .66-scale projection. Evening uses .88 exposure, .36 warmth, a lower elongated projection with 1.5px softness and reduced vertical coverage; the light is warmer while more wall stays clear. Night has zero foliage opacity, .36 room exposure, 1.04 contrast and .13 exterior exposure, preserving subdued texture and foliage silhouettes.

The floor now folds the same wall projection around y=442, with state-specific depth and shear. Their coordinates coincide at that junction. Removed the independent floor placement and extra floor blur; transparent canopy falloff preserves definition near the glazing and attenuates it inward. An outer floor boundary clip prevents even-odd shelf exclusions from revealing shadows outside the floor. This remains a 2D lighting approximation, not a physical 3D sun simulation; shelf occlusion contours and perspective are approximate.

Verification: switch all four preview options, inspect the wall/floor junction and shelf edges, then select/open/close/return a book. No product or ticket roadmap change is required for this visual-only refinement.

## Diffuse-light treatment (supersedes projected foliage)
The foliage projection was removed after visual review: stretching a flat silhouette across wall and floor still read as a graphic. ReadingEnvironment now renders only the separately exposed exterior. The base photograph, architecture and interactions are unchanged. Morning is gently warm, afternoon brighter and neutral, evening slightly dimmer and warmer, and night subdued with dark exterior foliage. No wall/floor shadow masks, duplicate foliage passes or surface overlays remain. The foliage PNG is retained on disk but no longer imported or bundled. This deliberately uses diffuse daylight, not a simulated directional sun. Local-time boundaries and developer controls remain unchanged.
