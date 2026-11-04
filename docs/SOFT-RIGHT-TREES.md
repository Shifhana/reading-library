# Soft right-side exterior trees

## Realism refinement — v2

Replaced the right exterior asset with reading-garden-soft-right-trees-v2.png: clearer tapering branches, varied crown heights, richer olive foliage and sunlit leaf edges. The same exterior clip and time-of-day response are preserved; interior creepers and all other scene components are unchanged. Previous asset retained for comparison. Built-in image generation edited v1; source output: C:/Users/HP/.codex/generated_images/01a0ac23-851e-7c81-a317-8695c53fabeb/exec-b2eb514c-51f2-4a1f-a8c6-94d3fa197cdc.png.

Exact generation prompt:
> Use case: precise-object-edit. Edit target: supplied architectural background plate. Change ONLY the distant trees visible outside the RIGHT metal screen. Make these trees convincingly photographic, not tiny topiary silhouettes or washed-out stippled cutouts. Replace the uniform round crowns with naturally irregular small deciduous garden trees at varied distances, asymmetric branching, fine tapering trunks with subtle bark texture, airy clusters of small olive/sage green leaves with varied orientation, shaded leaf interiors and softly sunlit edges. A few crowns can be taller than currently, but retain abundant pale clear sky: at least half the opening stays open, especially overhead. Subtle natural green rather than beige leaves. Moderate local detail and depth, no heavy dark canopy, no hedge, no dense wall of plants. Trees are several metres OUTSIDE and BEHIND the right bars; they must be quieter and lighter than separately composited interior climbing vines. Preserve all screen bars and overhead curves, collars, architecture, terracotta, entire left garden, wall, floor, camera, perspective and framing exactly. No additional interior plants, vines, furniture, text, people, haze or bloom. Natural architectural photography with realistic foliage detail and soft warm daylight. Output same image framing and aspect ratio.

Review: inspect the right trees behind the vines in daylight; check clear sky gaps and unobstructed creepers. This remains a fixed-camera photographic background. Human visual acceptance is pending. No product/roadmap/README updates needed.

V2 verification: npm run build and npm run lint passed; node --experimental-strip-types --test tests/*.test.mjs passed all 29 tests. Afternoon browser preview inspected with no warning/error logs. Capture: output/right-trees-realism.png. No commit or push.

## Change
Added a few distant, pale olive/sage tree crowns beyond the right screen. Open sky and irregular gaps keep the darker interior creepers readable. The existing right-exterior clip and exposure/night response are reused. The live vines, jaali trails, room, left garden, shelves/books, mural/clock, camera, lighting logic and interactions are untouched.

Files changed: src/environment/ReadingEnvironment.tsx, src/assets/reading-garden-soft-right-trees-v1.png, this document. Review capture: output/soft-right-trees.png.

## Asset provenance
Edited with built-in image generation using src/assets/reading-garden-clear-right-exterior-v1.png. Copied unchanged from:
C:/Users/HP/.codex/generated_images/01a0ac23-851e-7c81-a317-8695c53fabeb/exec-876d8642-f4c7-4b3a-b249-a1819bd35426.png

Exact prompt:
> Use case: precise-object-edit. Edit the supplied architectural clean plate ONLY in the exterior background behind the RIGHT metal rods/pergola. Add a few distant airy garden trees, carefully subordinate to foreground climbing vines which will be composited separately. Trees should be several metres beyond the screen: two or three slender tree trunks with widely spaced, lightly foliated small crowns, pale desaturated sage and silvery olive leaves, softly sunlit and slightly out of focus, low contrast, photographic natural detail. Keep roughly 65–75% of the right-side opening as clear pale daylight sky / open air, especially the upper half. Place sparse tree foliage mainly in the lower half behind the bars with irregular gaps. No dense hedge or continuous wall of vegetation; no dark foliage, heavy canopy, large tropical leaves or branches entering the room. Preserve every metal bar, curved overhead rod, collar, spacing and perspective EXACTLY. Preserve the entire rest of the image including left trees, glazing, ceiling, wall, floor, terracotta jaali and seating absolutely unchanged. Keep original dimensions, framing, alignment and neutral warm daylight. No vines in this image: the approved dark olive creepers are a separate foreground layer and must remain visually dominant over these soft distant trees. No furniture, people, clock, text, fog or glow. Only add restrained exterior trees on the right.

## Verification
npm run build passed. npm run lint passed. node --experimental-strip-types --test tests/*.test.mjs passed all 29 tests. Browser checked in morning, afternoon and night with no console warnings/errors. Source hashes confirm ReadingEnvironment.tsx is the only modified pre-existing source file and one background asset was added. The vine component and asset remain byte-for-byte unchanged.

Manual review: inspect the lower right opening in daylight, confirming that pale tree crowns remain behind the sharp creepers and most of the upper opening stays clear. Review the night state in the environment preview. Final visual acceptance belongs to the reviewer.

Assumption: this continues the existing fixed-camera photographic approach. No dependencies, unrelated follow-ups, commits or pushes. README.md, docs/PRODUCT.md and docs/TICKETS.md need no changes.
