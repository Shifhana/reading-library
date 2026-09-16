# Photorealistic Reading Garden study

The built-in ImageGen tool generated the render; no image-generation API or runtime
dependency is required by the website. The final PNG was encoded as WebP at quality
94 without resizing. The site asset is `src/assets/reading-garden-photorealistic.webp`.

The composition input was a screenshot of the current coded scene. The finish
reference was the user-provided `ChatGPT Image Sep 11, 2026, 11_59_08 AM.png`.
The generated result retains the three-shelf composition with eight main, four
rear and five foreground books, but is not a pixel-exact geometry render.

## Current intimate-room refinement

The built-in ImageGen tool edited the architectural-detail asset to remove all
ceiling tracks/fixtures and shorten the perceived room depth. The selected asset
is `src/assets/reading-garden-intimate-room.webp` (1672 x 941, WebP quality 94,
without resizing). Earlier assets remain available.

The rear wall is closer, the glazing and right-side bay sequence are shorter, and
the rear shelf reads nearer. The three shelves retain their staggered layout and
8/4/5 blank books. Pale oak, warm plaster, stone, exterior greenery and soft left
sunlight remain. This is a generated still-image spatial study, not a measured
geometry change; the older SVG fallback retains its original room depth.

### Intimate-room edit prompt

Use case: precise-object-edit. Edit THIS architectural Reading Garden image, preserving its identity and three-shelf arrangement. Make a visibly smaller, more human-scaled reading room.
REMOVE EVERY CEILING LIGHT: all black tracks, rails, spotlights and fixtures must disappear completely, leaving a clean uninterrupted warm-white plaster ceiling. Do not replace them with recessed lights or other fittings.
SPATIAL CHANGE IS REQUIRED: shorten the apparent room depth by roughly one third, bring the rear plaster wall physically forward behind the shelves, compress the long side-wall/glazing run, and reduce the expanse of empty floor and ceiling. Enclose the shelves more closely with warm architecture, like an intimate premium reading room rather than a vast gallery. Reduce the length/number of repeated right-side bay intervals as needed to express the shorter room, while retaining the same architectural language of thick plaster returns and soft recesses. The room must still be comfortably walkable, elegant and uncluttered, not cramped.
Keep EXACTLY THREE pale oak face-out shelves in the SAME staggered layout: long main shelf left of centre, small rear shelf at the back centre/right, short foreground shelf at the right. Keep their designs, proportions, smooth pale wood, sloped faces and ledges. Keep exactly EIGHT blank books on main, FOUR on rear and FIVE on foreground, same muted palette, no real covers. The rear shelf may sit closer and read a little larger with the shortened room, but do not change the arrangement or add furniture. Maintain the oblique eye-level viewing direction and coherent perspective. Tighter framing/less foreground floor is appropriate only enough to make the room feel human-scaled, not a different composition. Preserve all shelves visibly.
Keep mature outdoor greenery visible through the LEFT floor-to-ceiling glass wall, soft natural sunlight from the left, gentle filtered foliage shadows and realistic warm exposure. No indoor plants or pots. Keep pale smooth oak shelving, light matte limestone/polished concrete floor, warm off-white plaster walls, quiet rear stair/handrail detail if visible. Material finish and color language unchanged. Strengthen intimacy through SPACE, not darker lighting or clutter. High-end photorealistic architectural photography, calm minimal editorial interior. No ceiling lights of any kind, no new furniture, art, decor, people, text or UI. Output the same landscape aspect ratio.

## Architectural detail pass (previous study)

The built-in ImageGen tool edited the composited biophilic screenshot. The current
asset is `src/assets/reading-garden-architectural-detail.webp` (1672 x 941, WebP
quality 94, no resizing). It replaces the previous stacked image layers, whose
source assets remain available. Unused compositing masks were removed.

The indoor tree and planter are removed. Exterior greenery remains, with slim
black ceiling tracks, clearer bay returns/contact shading, and a modest stair
with one handrail inside the existing far rear opening. Pale oak, limestone and
warm plaster remain. The three shelves and 17 blank books retain their arrangement.
This is a generated still-image refinement, not pixel-exact or editable 3D
geometry. The coded scene remains the load-failure fallback. Routes/data are unchanged.

### Architectural detail prompt

Use case: precise-object-edit. Refine this exact existing Reading Garden image with a restrained architectural detail pass. It is the edit target, NOT inspiration for a different composition. Preserve the exact full framing, camera, perspective, room proportions, wall pier positions, glazing mullions, outdoor landscape, floor extent, shelf placement, shelf size/geometry, and all SEVENTEEN books (8 main, 4 distant, 5 foreground) with their exact positions and muted blank covers.
1. Completely REMOVE the single indoor tree and its planter near the far-left glazing. Restore continuous warm plaster and floor where it stood. Retain all outdoor trees, shrubs, landscape depth and greenery through the left glass wall.
2. Add two extremely slim matte-black ceiling lighting tracks aligned with the room's existing perspective, with a small number of tiny discreet cylindrical spot fixtures. Architectural detailing, thin elegant lines, not a dominant lighting installation. Natural left-side daylight remains the illumination; no visible bright lamps, pools of electric light, dramatic beams or changed exposure.
3. Refine right-hand wall bays with subtly clearer wall thickness, crisply joined soffits/side returns, warmer recessed back planes, gentle contact shading, and continuous floor into the bays. Keep the existing bay dimensions, pier rhythm and depth composition. No base glow.
4. Resolve a quiet BACK STAIR/HANDRAIL detail within the farthest right-wall opening immediately behind/to the right of the distant small shelf: a modest partial view of pale stone stair treads receding upward behind the wall, and ONE very slender black wall-mounted handrail following that stair. Confine this detail to the existing rear opening, subordinate to the room. No new large opening, prominent staircase, exposed balcony, railings around the room or room redesign.
5. Enhance subtle physical edge depth and local contact shadows: oak shelf end panels/retaining ledges, book thickness and grounding, wall returns and floor junctions. Remain soft and low contrast, never dark outlines.
Keep smooth PALE OAK shelves without grain striping, light matte limestone/polished concrete floor without veining or gloss, warm off-white plaster, soft natural daylight from LEFT and existing filtered foliage shadows. Minimal, photorealistic, calm, high-end editorial architectural photograph. No indoor plants or pots, new furniture, seating, art, decor, UI, people or clutter. Do NOT change composition, move shelves/books, or make the scene darker. Same output aspect ratio and exact framing as the input.

## Biophilic environment pass (previous study)

The built-in ImageGen tool edited a fresh browser screenshot of the current
composited scene, using the supplied Reading Garden reference for greenery quality
only. The selected result is `src/assets/reading-garden-environment.webp`, encoded
at WebP quality 94 without resizing (1678 x 937).

The input browser capture was 1600 x 894, centered within the scene's 1600 x 900
viewBox. The environment image is registered to that capture. Individual glazing
pane masks retain the original mullions; a feathered region admits the single
interior tree behind the main shelf. The original room image and right-wall edit
remain in place. Shelf/book geometry, camera, materials, and product data are
unchanged. Existing soft leaf shadows remain; near exterior branches and the
interior tree now provide a plausible source. No new lighting system was added.

This is a static environment layer, with the same limitations as the existing
still-image room. Review tree grounding, the glazing edges, and landscape restraint
in the local app before accepting the visual pass.

### Environment edit prompt

Use case: precise-object-edit. Asset: localized biophilic environment layer for an existing architectural website scene.
INPUT 1 is the CURRENT CODED SCREENSHOT and is the locked base composition. INPUT 2 is ONLY the quality reference for natural greenery, restraint and photographic integration; do NOT adopt its room layout or furniture.
Edit input 1 by adding nature ONLY. Preserve EXACT framing/aspect ratio, all architecture, right-hand deep wall bays, ceiling, limestone floor, smooth pale timber materials, camera, perspective, glazing mullion positions, THREE shelves and all SEVENTEEN blank books: 8 main, 4 rear, 5 foreground. Do not shift, resize, recolor or redesign any existing shelf/book. Do not change daylight direction or room exposure.
OUTSIDE LEFT GLAZING: replace the blank outdoor view with a believable spacious temperate landscaped garden. Mature fine-branched trees with warm neutral trunks, airy near foliage, distinct middle-distance trees, low planted ground and softer distant greenery with luminous gaps of sky. Muted olive, sage, dusty deep green; natural variation, no saturation. Real atmospheric depth and distinct overlapping vegetation, not green wallpaper. Preserve crisp existing mullions and gentle glass reflections; exterior is softly sunlit and quieter than the room, without heavy blur. Near tree foliage should plausibly explain the existing filtered leaf shadows; retain these existing gentle shadows, no dramatic new jungle patterns.
ONE INTERIOR TREE: a restrained slender, sculptural small tree with sparse branching and airy olive/sage foliage, at the far end of the left glazing, behind the left portion of the main shelf near the rear-wall/glazing junction. Root it physically on the floor in ONE modest low warm-stone planter, mostly concealed behind the main shelf if necessary. Its airy crown should occupy the quiet area above/behind the left end of that shelf, below the ceiling, and must not occlude any shelf/book or dominate the scene. Think one intentionally placed architectural planting, not a decorative centerpiece. Match existing soft left daylight, delicate contact shadow only at its base.
KEEP EVERYTHING ELSE UNCHANGED. Nature only: no furniture, seating, lamps, art, UI, flowers, tropical plants, vines, many pots, exterior buildings, people, floor redesign or new garden structures. Open, serene, premium contemporary architectural photograph. Output same full composition and exact aspect ratio as input 1, precisely registered to input 1 for compositing.

## Right-wall bay refinement

`src/assets/reading-garden-wall-bays.webp` is a localized ImageGen edit of the
existing render, also 1678 x 937 and encoded at WebP quality 94. `RoomShell.tsx`
clips this layer to the right-wall footprint, excluding the shelves and open
floor. A soft inner mask blends the boundary while the hard clip prevents the
edit from spilling outside that footprint. Both images use the same projection
and crop. This remains a still-image study, not new interactive room geometry.

The bays have warmer recessed plaster, visible side returns and soffits, and
continuous floor without artificial base lighting. A second edit resolves the
farthest bay's wall junction marked during review.

### Bay edit prompt

Use case: precise-object-edit. Edit ONLY the right-side architectural wall recesses in this existing photorealistic Reading Garden image. This is an extremely localized architectural correction, not a new scene. Preserve the exact 1678 x 937 framing, camera, perspective and all pixels outside the right-hand wall/bay region as closely as possible. Keep every shelf, all 17 books, their sizes and positions, left glazing, central/back wall, open floor, ceiling and existing daylight direction unchanged. Do not add objects. The right wall's existing repeated openings should read as REAL DEEP ARCHITECTURAL BAYS, not narrow fake glowing slots or flat applied panels. Within their current opening locations and overall facade rhythm, resolve substantial wall thickness, clear perpendicular side returns, deeper recessed back planes, and clean head/soffit connections into the existing continuous ceiling edge. Retain the existing wall pier locations and outer facade alignment; do not widen openings or redesign the room. Use warm matte plaster continuous with the original walls. Inner back planes and side returns should be slightly darker and warmer than the primary plaster wall, with soft natural ambient occlusion at inside corners, realistic subtle light falloff, no black outlines or exaggerated contrast. The existing limestone floor should continue smoothly at the SAME LEVEL into every bay, with believable perspective and gentle shadow at the back. REMOVE the artificial bright bottom glow, light wedges and uplighting at the bases of all right wall recesses. No LED strips, no light sources within bays, no raised thresholds, no new skirting. Right wall plaster may have fine existing photographic texture but remain minimal and premium. Keep the original soft left-side daylight and foliage shadows elsewhere untouched. Match the original photorealistic material finish. The output should be the same room, with only the existing right-side recess interiors convincingly deepened and their bottom glow removed.

### Marked far-bay correction prompt

Localized architectural realism correction to the FARTHEST RIGHT-WALL BAY only: the small recessed bay immediately behind and to the right of the distant four-book shelf, near the centre of the image. Keep the entire rest of this image unchanged, including the other improved wall bays. In this small bay, resolve the awkward narrow vertical junction where the back wall meets the right-hand bay: no pasted-on thin strip, white outlined rectangle, doubled wall edge or flat panel. Make it one physically coherent plaster wall return with credible thickness, a clearly recessed back plane, a clean continuous header/soffit, and a correctly joined inside corner with soft realistic ambient shadow. Floor is continuous into the bay, no threshold or bright line/uplight at its foot. Use the SAME warm plaster, slightly darker interior tone and soft left daylight as the existing larger bays. Do not enlarge or move the opening or the distant shelf. Preserve the shelf and its FOUR books exactly; preserve both other shelves and all their books, glazing, floor, room geometry, overall composition, image framing and dimensions. High-end architectural photography, subtle premium finish, no outlines, no added objects. Only improve the small far-bay wall junction and physical depth.

## Initial generation prompt

Use case: sketch-to-render. Create ONE photorealistic final architectural interior render for a website by editing IMAGE 1. IMAGE 1 is the LOCKED composition and exact scene to render. IMAGE 2 is ONLY a reference for photographic finish, light quality, pale satin-polished wood quality and architectural elegance; do not copy its layout, objects or decor. Transform the flat vector rendering in image 1 into convincing real architectural photography. Highest priority preserve the exact camera, framing, perspective, architectural silhouette and all object screen positions and sizes from IMAGE 1. Preserve its uninterrupted high pale ceiling, left glass wall with exact mullion rhythm, oblique rear wall and recessed right wall bays. Preserve exactly THREE original low face-out display shelves at their current locations and rotations: main long shelf left of centre with exactly EIGHT books, distant small shelf at back centre with exactly FOUR books, close foreground-right shelf with exactly FIVE books. All books stay in their current positions, proportions, height variations, muted colour sequence and face-out lean behind ledges. Preserve shelf geometry/dimensions, end-cheek shapes, slopes, plinths and ledges precisely. Do not enlarge, move, redesign or duplicate shelves or books. Every book cover remains blank, no artwork or typography. PHOTOREALISM: polished smooth pale natural timber with a premium restrained satin finish, NO visible wood-grain lines or striping, no rustic texture, realistic subtle edge bevel response, contact shadows and delicate diffuse sheen rather than plastic gloss. Light warm-grey limestone floor with very faint natural mineral variation, no tile grid or bold veining, no mirror reflection. Warm off-white soft plaster walls and a cleaner lighter ceiling. Photographic paper and cloth hardcover book surfaces in the existing dusty green, taupe, ivory and restrained clay palette. Natural soft late-morning daylight from the left glazing, physically plausible global illumination, soft penumbrae, delicate shadows behind books and under shelves, gentle foliage shadows only where present in image1, no dramatic beams or high contrast. Window panes luminous diffuse daylight with very faint real glass reflections, no new scenery. Preserve the open space and exposure while adding real material depth and tonal nuance. The result must look like a professional high-end interior photograph, not a drawing, vector diagram, stylized illustration, game render or flat CGI. Remove drawn outlines through realistic edge rendering. NO new trees, plants, furniture, rugs, seating, lamps, exterior scenery, art, UI, text or decor. The composition of IMAGE 1 is mandatory; IMAGE 2 must influence finish only. Wide landscape output matching IMAGE 1 framing and aspect ratio as closely as possible.

## Final correction prompt

Precisely edit this finished photorealistic architectural image with ONE localized correction: remove visible exterior trees, leaves, branches and exterior scenery seen THROUGH the LEFT-SIDE glazing. Replace only the view through those glass panes with luminous diffuse warm-white/very pale neutral outdoor daylight, with subtle glass transparency/reflection, no visible scenery, no recognizable trees/plants. Keep the glass mullions exactly unchanged. PRESERVE the existing soft off-screen foliage cast shadows inside the room on floor and walls: these must remain even though no outdoor tree is visible. Preserve everything else in this input pixel-aligned as far as possible: exact camera, crop, aspect ratio, ceiling, walls/recesses, floor, lighting, THREE shelves with EIGHT main books, FOUR rear books and FIVE foreground books, each position, size, rotation, blank cover and color. Preserve premium photorealistic smooth satin pale timber, no wood grain lines, limestone, plaster and blank paper book finishes. Do not add anything. Do not move or redesign anything. Only remove recognizable exterior greenery through the glass. Keep photograph quality and original composition.
