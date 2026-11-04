# Clear right-side exterior

Removed the exterior trees behind the right-hand metal screen so the existing interior creepers remain visible. The replacement is restricted to the existing right exterior polygon in ReadingEnvironment.tsx. The left garden, room, furniture, books, mural and live vine asset remain unchanged. Existing exterior exposure and night desaturation are reused; sunlight, shadow and time logic are unchanged.

Files: src/environment/ReadingEnvironment.tsx, src/assets/reading-garden-clear-right-exterior-v1.png, this document, and output/right-exterior-cleared.png.

## Asset provenance
Edited with built-in image generation using src/assets/reading-garden-clean-plate-v23.png. Original output:
C:/Users/HP/.codex/generated_images/01a0ac23-851e-7c81-a317-8695c53fabeb/exec-b5988e5f-44ac-4e16-9553-392891ec785a.png
Copied unchanged into the project.

Prompt:
> Use case: precise-object-edit. Edit target: attached architectural room clean plate. Remove ONLY the dense exterior trees, branches and foliage BEHIND the metal rod/pergola structure on the RIGHT side of this image, including vegetation visible through the gaps in the overhead rods. Replace that outdoor tree background with quiet, softly sunlit pale neutral sky/open air, a subtle warm off-white to very pale blue-grey daylight gradient with no new objects. Preserve EVERY metal bar, curved overhead rod, horizontal brace, base collar and their EXACT existing positions, thicknesses, colors, perspective, highlights and silhouettes. Do not remove or redesign the architectural screen. Preserve the terracotta jaali, bench/coping, cream back wall, ceiling, floor, left glazing and ALL the lush trees on the LEFT absolutely unchanged. Keep the same framing, aspect ratio, original image alignment and neutral daytime lighting. This is background tree removal on the right only. No new plants, no creeping vines (those are separate live assets), no furniture, no people, no clock, no text. Do not recolor or restyle the room. Final result is identical architecture with clear calm open air seen between right-hand rods so separate interior creepers will be visible against it.

## Verification
npm run build passed. npm run lint passed. node --experimental-strip-types --test tests/*.test.mjs passed all 29 tests. Browser reviewed in morning, afternoon and night; no console warnings/errors. Source hashes confirm ReadingEnvironment.tsx is the only modified pre-existing source file, with one added background asset. The vine component and its asset are byte-for-byte preserved.

## Manual review and assumptions
Review the right screen in daylight: the background should be clear, rods continuous, and the existing sparse creepers readable. Check night through the environment preview. This uses the current fixed-camera photographic rendering approach; the generated background is clipped to the right exterior. Final visual acceptance belongs to the user. No dependencies, commits, pushes or unrelated follow-ups. README.md, docs/PRODUCT.md and docs/TICKETS.md need no updates.
