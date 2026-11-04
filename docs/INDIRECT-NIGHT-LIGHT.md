# Night garden and indirect architectural light

Refined only the Night environment. Morning, Afternoon and Evening atmosphere values and rendering remain unchanged. No new fixtures, bitmap assets or dependencies were introduced.

## Night treatment

The right-side sky now uses a continuous deep blue/near-black gradient (#08111F, #1D2B3D, #303B47), rather than only dimming the pale daytime sky. A luminance key separates the existing sky from the original right-side trees and metalwork. Existing tree/branch shapes remain in place as dark, softly differentiated layers. The dense left garden retains its original photographed detail with a darker cool-neutral tone. Creepers continue to render separately in front of the landscape. A faint warm reflected contribution on the existing metalwork improves separation without adding rods or changing their geometry. Shelf silhouettes are excluded from the exterior layers, including where the middle shelf meets the glazing. The exterior treatment fades with the existing environment transition.

Interior ambient exposure is now .52 with .04 material warmth, keeping the room distinct from orange evening light. A restrained warm-white plaster wash, floor bounce and terracotta/jaali wash suggest concealed indirect sources. Faint cool moonlight near the left glazing balances the warm interior. Broad low-opacity reflections remain clipped to the glass and matte floor. Timber catches a little warm indirect edge light, while book covers use a Night-only soft warm/cool surface response. Woven perimeter highlights respond quietly to the indirect light without changing the weave, form count, silhouettes or movement. No luminous shelf strips, visible lamps, hard beams, stars, shiny floor treatment or new cast-shadow system were added.

The existing fixed-camera SVG/photo renderer provides surface-clipped lighting approximations; this is not a calibrated physical light simulation. All room/shelf/book geometry, assets, positions, camera, notes, summaries, clock, wind-chime design/motion/audio, foliage arrangement and interaction logic were preserved.

## Files changed

- `src/environment/atmosphere.ts`: Night exposure, warmth, exterior fallback and book brightness only.
- `src/environment/ReadingEnvironment.tsx`: Night sky separation, landscape tone, restrained architectural washes and material-reflection gradients.
- `src/environment/environment.css`: Night-only book surface response.
- `src/components/PhysicalBook.tsx`: a surface class for Night styling; geometry and interaction code unchanged.
- `src/components/CompactShelves.tsx`: Night-only indirect timber edge response.
- `src/components/ReadingBreeze.tsx`: Night-only material exposure and perimeter-light tone.
- `docs/INDIRECT-NIGHT-LIGHT.md`: this completion report.
- `output/night-garden-refinement.png`: final browser screenshot.

## Verification

Commands: `npm run build`; `npm run lint`; `node --test tests/*.test.mjs`. Build and lint passed; all 47 tests passed after the final implementation. Checked that the three daytime atmosphere records retain their previous values. Browser inspection found no console warnings/errors. Manually verified book pickup, automatic opening, saved summary display, closing and return at Night, then switching to Live and back to Night with the existing mural control. No content was edited. The preview was left on Night for review.

Manual review: use the existing mural time panel to select Night. Inspect sky depth behind the upper-right rods, tree silhouettes, separate interior vines, glass reflections, plaster wash, timber/books and terracotta. Confirm all light remains soft and the room still reads as Night. Cycle to Live or another preset to compare; the normal book interactions remain available. Final visual acceptance belongs to the human reviewer.

Assumption: the approved photographed geometry and foliage should remain the source for the Night silhouettes, rather than introducing new landscape forms. No known blocking risks or unrelated follow-ups. No commit or push. README, PRODUCT and TICKETS need no update for this scoped environment refinement.
