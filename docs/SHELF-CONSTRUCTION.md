# Reference shelf object

The latest user-supplied close-up is the furniture source of truth. Replaced the previous flat SVG surface construction with one reference-derived, empty physical furniture cutout, shared by all three shelves. Rounded end cheeks, inset continuous back, narrow ledge, dowel-like rail and integrated recessed base are part of that one object.

Changed:
- src/components/CompactShelves.tsx: reusable whole-object renderer and silhouette boundary, replacing separate face geometry.
- src/assets/shelf-reference-object-v1.png: canonical empty shelf derived with imagegen from the user's close-up.
- docs/SHELF-CONSTRUCTION.md: current implementation report.
- output/reference-shelf-object.png: visual review.

Existing footprint translations and display-book data are unchanged. RoomShell, floor, camera, architecture, lighting logic, book interactions and CRUD were not edited in this pass. The furniture continues to receive the existing environment filter. Existing soft contact shading remains beneath each shelf.

Built-in imagegen edit: preserve exact reference furniture and perspective, remove all books and background, retain thick sculpted oak cheeks, continuous back panel, slim rail, recessed base and concealed joins. An SVG silhouette excludes residual background pixels outside the object; there are no interior corner repair patches.

Limitation: this is a fixed-camera photographic furniture asset, not a ray-traced 3D model. Apparent width and height follow the approved scene footprints, so their existing distance proportions are preserved.

Verification: build, lint, 21 tests, diff check. Visually compared reference and scene at full scene size. Human review remains the final visual acceptance.
Manual review: inspect all three shelf silhouettes and book contact, open a book and return it.
No dependencies, commits or pushes. README/PRODUCT/TICKETS do not require changes.

## Room-light integration refinement

The subsequent integration pass changes only `CompactShelves.tsx` and the time prop supplied by `RoomShell.tsx`. The same furniture asset, silhouette, footprints, books and room remain intact.

- Alpha-masked timber shading follows the existing sun side, with restrained warm highlights and pale-floor bounce.
- A broad soft contact shadow supplements the tight base contact. Directional floor shadows use the existing camera projection and sun directions, with shelf heights inferred from the fixed image.
- Night disables the added solar highlight and cast shadow; the existing environment filter still controls exposure.
- Visual checks covered afternoon and night. Build, lint, all 21 tests and diff checks passed; no browser console errors were observed. Review image: `output/shelf-light-integration.png`.

The lighting remains an approximation for the fixed-camera asset, not a physically surveyed or ray-traced furniture model. Review all three shelf bases and the right-lit timber in the app; switch to night to verify solar shading disappears. No product or roadmap documentation changes are needed.
