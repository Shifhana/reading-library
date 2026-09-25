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

## Entrance surround refinement — 18 September 2026

Built-in ImageGen edited `reading-garden-intimate-room.webp` using the user's
rounded oak doorway photograph as a geometry/material reference. Saved asset:
`src/assets/reading-garden-entrance-v2.png`. `RoomShell.tsx` clips the output to the
right wall, blends its floor contact edge, and masks out the foreground shelf.
The base image remains unchanged and still supplies every interactive book pixel.

Prompt used:

> Use case: precise-object-edit. Edit image 1, the wide Reading Garden room render. Image 2 is ONLY a reference for the deep doorway surround with softly rounded upper corners. Make ONLY these three localized edits to the RIGHT WALL of image 1: (1) Around the EXISTING stair entrance at x approximately 1175–1280 in the 1672px-wide base, add a refined projecting/deep doorway surround like image 2, with softly rounded upper corners and a calm continuous frame, in warm pale oak harmonizing with the existing shelves. Keep the SAME stair opening location, human scale, stairs and handrail; do not enlarge or relocate the doorway. (2) The horizontal lintel/header strip above that doorway currently reads as a different pale/white colour. Make this header plaster exactly the same warm beige plaster colour and texture as the adjacent right wall, with only natural lighting variations, no contrasting stripe. (3) Completely FILL IN the extra tall empty recessed opening immediately to the RIGHT of the stair doorway (roughly x1370–1468) with continuous solid warm plaster wall, flush to the adjoining wall plane. This must leave ONE stair portal, not a second niche. Preserve the image outside this right-wall intervention exactly: identical camera, framing, full 1672:941 aspect ratio, all three shelves and all 17 books in their exact positions, garden facade, ceiling, main back wall, floor, light and shadows. No new furniture, plants, lighting, skylights or decorations. No text. Photorealistic architectural edit, no redesign. Maintain exact alignment with base image; do not crop, zoom or recompose.

## Material realism and continuous book motion — 18 September 2026

The current room asset is `src/assets/reading-garden-materials-v3.png` (1672 × 941),
created with built-in ImageGen from `reading-garden-entrance-v2.png`. It preserves
the camera, entrance refinement, three shelves and all seventeen cover positions.
The same asset supplies both the static room and the animated cover textures, so
shelf placeholders and moving copies share their colours and surface detail.
Earlier assets remain untouched as source studies. No book records were changed.

Prompt used:

> Use case: precise-object-edit. Refine the photorealistic finish of this EXACT Reading Garden interior. This is a material/lighting realism pass, NOT a redesign. Return the exact same 1672 by 941 composition and camera, pixel-registered to the input. Preserve absolutely all silhouettes and positions: every one of the 17 books and its size, outline, angle and muted cover colour (4 rear,8 middle,5 foreground), all three shelves, the single rounded pale-oak stair entrance and its stairs/handrail, solid right wall, left glazing and mullions, ceiling, floor geometry, trees and landscaping positions. Do not add or remove objects or openings. Make a convincing high-quality architectural photograph: finely grained pale oak shelving with subtle plane-to-plane tone changes, tiny realistic bevel response, soft satin highlights and grounded soft contact shadows under shelf plinths. Warm mineral plaster/limewash walls with delicate natural tonal variation, no blotchy patches. Warm limestone/microcement floor with faint irregularity and restrained diffuse reflection, preserving the exact sunlight and leaf-shadow arrangement and exposure. Improve garden foliage realism with naturally varied leaf shapes, convincing branch detail, layered near/middle/distant planting and subtle atmospheric depth; no extra plants. Book covers should retain their minimal unprinted colours while gaining finely woven cloth/paper texture, subtle edge wear, a believable spine and fine page edges, without changing their measured boundaries or moving books. Soft physically believable bounced daylight, gentle deeper corner occlusion, grounded contact shadows, no dramatic contrast or exposure shift. Avoid fake plastic smoothness, oversharp CGI edges, artificial uniform foliage, coarse textures, grunge, oversaturated colour, new decor, new architecture, words, logos, text. Preserve the quiet minimal warm design and all layout coordinates. The only edits should be photographic material quality and light/shadow fidelity.

Motion verification: browser DOM measurements sampled the returning foreground,
middle and rear covers. Their final x/y/width/height matched their captured resting
rectangles (middle width differed only by 0.00003 CSS px). Sampled return widths
decreased monotonically; every selected motion wrapper had CSS transform `none`.
Completion is now driven by the drawn pose, with a final alignment settling frame,
rather than a timer that can restore the shelf before the geometry arrives.

## Portal removal — 21 September 2026

Built-in ImageGen produced `src/assets/reading-garden-no-portal-v4.png` from the
registered material-refinement render. The complete rounded timber stair portal,
opening, stairs, and handrail were removed and replaced by one uninterrupted
warm mineral-plaster wall. The room composition, shelves, 17 books, glazing,
garden, floor, and lighting remain unchanged. `RoomShell.tsx` now uses this asset.

## Cement reading ledge — 23 September 2026

Built-in ImageGen edited v11 into `src/assets/reading-garden-cement-ledge-v12.png`.
Only the ledge silhouette is composited over the accepted scene, excluding the
foreground shelf and retaining the previous upper boundary. The continuous
cement-toned ledge is visually about 600 mm deep at low sitting height; dimensions
are illustrative. No shelves or interaction coordinates moved.

Prompt used:

> Use case: precise-object-edit. Edit ONLY lower right wall/floor junction in this exact Reading Garden render. Add ONE continuous monolithic built-in reading ledge / low bench running along foot of right jali wall, approximately 600mm deep, sitting height around 400mm. Solid thick clean light grey-beige polished cement/plastered concrete, matte satin mineral surface, crisp edges, grounded contact shadow. No legs, timber, perforations, cushions, upholstery, pillows or objects. It is architecture, not freestanding furniture. Runs from rear right corner beside rear shelf toward foreground/right frame, in front of lowest jali courses, resolves floor-to-jali junction. Keep clean slight clearance to rear shelf; preferably don't move shelf. Foreground shelf naturally occludes ledge where overlapping. Preserve EXACT 1672x941 camera framing room proportions, three timber shelves and all seventeen books pixel-aligned, upper jali masonry pattern, pale coping, pale sage metal screen, curved overhead rails, roof/ceiling, garden, left glazing, central plaster wall, existing floor material, warm soft daylight. Do not redesign jali or alter upper rails or roof AT ALL. Do not add other objects furniture plants doors or decoration. Only new element is calm continuous solid cement reading ledge at right base, highly photorealistic and integrated.

## Perforated masonry and fixing refinement — 23 September 2026

Built-in ImageGen edited v10 into
`src/assets/reading-garden-perforated-boundary-v11.png`. The jali now has deep
through-openings with occasional garden glimpses, rather than shallow relief.
The roof termination line and assembly details were refined using the user's
pasted brief. The existing boundary mask preserves all other room pixels and
book interactions. Construction cues remain illustrative, not engineered details.

Prompt used:

> Use case: precise-object-edit. Refine ONLY right boundary construction in this exact image; locked 1672x941 camera and composition. Preserve every shelf/book (three shelves, 17 books), left glazing/garden, central plaster wall, floor, main ceiling, warm light and planting concept. Make a visibly meaningful DETAIL correction, no redesign. Current jali blocks look like sealed embossed pyramids: replace their CLOSED RECESSES with true DEEP THROUGH-VOIDS in terracotta masonry blocks, dark interior reveals and occasional tiny softly lit garden glimpses proving through-depth. Keep existing low wall height, footprint and modular rhythm; clay should be matte porous mineral with subtle fired colour variation, irregular handmade softened arrises and fine mortar joints, not plastic repetitive stamped tiles. Keep continuous slim pale cement coping, slightly proud, crisp edge with fine underside shadow. Existing rail pedestals are too large: eliminate chunky cylinder bases, replace with small flush sockets / tiny collars neatly seated through coping in consistent rhythm. Make rods clearly finer approximately 25% thinner and slightly denser (about 15% closer), muted pale greenish sage-grey matte metal, not chrome/bright grey/orange. Retain one or two delicate horizontal tie strips behind verticals, tiny neat intersections. Each vertical bends smoothly continuously into short overhead horizontal member. Roof termination MUST show precise recessed slim mounting channel / clean shadow gap, individual rods ending mechanically in sockets, no melted fusion into plaster. Keep roof edge cut back and sky visible between rods, same canopy footprint. Strengthen ONLY narrow wall-foot contact shadow and add fine grounded base joint, no floating edge. Do not overdo dirt, shadows, masonry variation or engineering parts. Quiet highly photorealistic crafted semi-open enclosure, not decorative partition. No added objects doors furniture indoor plants or changes elsewhere.

## Construction realism refinement — 23 September 2026

Built-in ImageGen edited v9 into `src/assets/reading-garden-construction-v10.png`.
This is a restrained detail pass on the existing assembly: clay variation,
slimmer coping and rails, smooth bends, fine supports, roof fixing line and
coping junctions. The existing localized mask preserves the rest of the scene.
These are visual construction cues, not verified engineering details.

Prompt used:

> Use case: precise-object-edit. Subtle construction-realism refinement ONLY to existing RIGHT boundary in this exact Reading Garden render. NO redesign. Preserve exact 1672x941 framing, camera, room geometry, all 3 shelves and 17 books pixel aligned, central plaster wall, left glazing and garden, floor, warm light/shadows, right garden and material colours. Retain current jali brick base pattern, pale coping, sage metal bent-rail canopy and cut-back roof opening. Micro-refinements: jali clay modules with very subtle handmade tonal/dimensional variation, softer fired-clay arrises and convincing recess depth, no damage/grunge/rustic exaggeration. Reduce pale coping thickness approximately 15–20%, crisp polished cement rather than slab, same overall elevation and footprint. Metal rods approximately 15% thinner with marginally denser consistently spaced rhythm, pale warm sage-grey matte powder coat. Existing horizontal supports become fine integrated strips with discreet connections. All vertical-to-horizontal bends use consistent slightly larger smooth continuous radius; no kinks, irregular curves or discontinuities. Horizontal rods must terminate in a precise narrow recessed metal fixing channel/shadow gap along existing cut-back roof edge, with small concealed socket connections and believable support, not simply touching plaster. Tiny restrained flush collars/socket plates where rods meet cement coping, minimal visible scale, no chunky pedestals. Do not change screen dimensions, canopy reach, boundary height, roof cut line, garden foliage arrangement, brick module design or add architectural features. Keep sky visible between exposed canopy rods. No dramatic shadows or contrast change. Only right boundary construction detail refinement, quietly photorealistic. Preserve every pixel outside right wall/canopy region as closely as possible.

## Jali masonry and boundary detailing — 23 September 2026

Built-in ImageGen edited v8 with the same reference into
`src/assets/reading-garden-jali-boundary-v9.png`: recessed burnt-brick modules,
continuous pale mineral coping, fine rail mounts and horizontal supports, warm
off-white sage metal and recessed roof-edge termination. The localized clip
includes the coping projection while preserving all shelf and book pixels.
Dimensions and connections are illustrative rather than construction drawings.

Prompt used:

> Use case: precise-object-edit. IMAGE 1 is the locked Reading Garden edit target. IMAGE 2 reference ONLY for detailed jali masonry, coping and bent slender rail construction. Change ONLY existing right-side boundary, preserve exactly camera 1672x941 framing, all 3 shelves and 17 books pixel aligned, left glass garden facade, central rear plaster wall, floor and main ceiling, light mood. Replace flat clay panels of low right parapet with rich matte burnt reddish-brown BRICK/JALI masonry: small consistent handcrafted modules, fine mortar joints, repeated subtle recessed/perforated brick relief like reference, real depth not flat printed pattern. Same parapet height and footprint. Add distinct continuous smooth pale warm mineral/concrete COPING cap along entire parapet, slim but visibly substantial with crisp edge and small overhang, explaining where rails mount. Above cap: denser finer evenly spaced delicate bent rods/tubes, thinner than current, warm off-white very light sage aluminium powder coat, NO blue/cool grey/orange/bronze/black. Each rises from coping, bends smoothly rounded 90 degrees, continues overhead as one piece, then tucks into a narrow RECESSED fixing/shadow-reveal channel beneath cut-back roof edge. Make roof connection visibly intentional: neat recessed gap and concealed anchoring, no abruptly stuck-on tips. Keep roof opening genuinely exposed, sky and greenery between overhead rods, no solid slab above canopy. Keep canopy narrow at right edge only and roof cut line in same location. Include two extremely slim secondary horizontal support strips following boundary perspective, integrated behind rods, minimal not bulky. Preserve layered planted exterior; restrained shadows no dramatic graphic stripes. No extra doors openings niches furnishings indoor plants or decoration. Highest realism, material-rich yet calm minimal indoor-outdoor threshold. Edit footprint confined right of rear wall corner x1217 and existing overhead canopy x1030 onward; preserve all geometry elsewhere.

## Cut-back roof and sage rail canopy — 23 September 2026

Built-in ImageGen edited v7 using `image 44.jpg` for structural connection logic.
Saved asset: `src/assets/reading-garden-cutback-roof-v8.png`. The narrow roof strip
above the right canopy is cut back, exposing sky and foliage between pale
sage-grey rails that connect into the remaining roof edge. The same localized
clip preserves the central rear wall, shelves, book pixels and camera. Dimensions
are illustrative. README was updated; product definition and roadmap unchanged.

Prompt used:

> Use case: precise-object-edit. IMAGE 1 is locked Reading Garden base; IMAGE 2 is ONLY reference for structural roof-cutback and pale sage-grey curved rail logic. Refine ONLY the right boundary. CRITICAL: CUT BACK the solid roof slab at the right edge. Currently the overhead rails lie under solid plaster; REMOVE THAT NARROW STRIP OF ROOF ABOVE THE RAILS so sky and foliage are visible BETWEEN the overhead horizontal rails. A clear clean continuous cut roof edge runs along the INNER endpoints of the canopy rails (roughly x1040 at rear y137 to x1150 at top y0). Main plaster ceiling stays to LEFT of this edge; OPEN AIR and foliage to RIGHT of this edge above the canopy. Rails terminate neatly INTO the vertical edge/underside of remaining roof slab, not free floating tips or applied ceiling slats. Each slender rail rises from existing low clay parapet, curves smoothly 90 degrees inward, runs horizontally a short distance, and anchors to cut roof edge. Match reference's believable continuous rail/roof relationship. Keep canopy only along right edge, never across whole room. Recolour ALL rails to pale sage-grey / light eucalyptus greenish off-white matte powder-coated metal, slightly cool against warm clay; NO orange bronze black chrome or generic dark grey. Retain low waist/chest-high matte burnt-earth terracotta masonry base with fine module joints. Beyond and above screen, real layered planted garden strip with larger leaf masses and finer foliage, natural density variation, softly distant layers, filtered sky light, not wallpaper. Soft rhythmic linear shadows on base and right floor, overlapping existing warm leaf shadows. Preserve exact 1672x941 camera framing, central rear plaster wall, main ceiling elsewhere, floor material, left full-height garden glazing, warm daylight, THREE timber shelves and all SEVENTEEN books pixel-aligned. Do not move or change any shelf/book. No doorway portal arch furniture decor fixtures. Only transform right boundary and its narrow overhead strip into genuinely exposed pale sage curved-rail pavilion edge. Photorealistic, restrained and architecturally integrated.

## Semi-open garden boundary — 23 September 2026

Built-in ImageGen edited v6 into `src/assets/reading-garden-open-screen-v7.png`.
The plaster backing above the low clay base is removed, revealing garden planting
between muted terracotta-orange rails. The existing localized clip is retained,
so all image pixels outside the right boundary and its canopy remain unchanged.
Book geometry and interaction code are unchanged. Heights remain visual estimates.

Prompt used:

> Use case: precise-object-edit. Edit ONLY the RIGHT-SIDE boundary in this exact render. Preserve exact camera and 1672x941 composition, all three shelves and seventeen books pixel aligned, rear plaster wall, left garden glazing, ceiling elsewhere, floor, warm daylight and leafy shadows. Main correction: COMPLETELY REMOVE the full-height solid plaster backing BEHIND the vertical right-side rails, from top of the low terracotta base upward. This must now be a genuinely SEMI-OPEN garden-facing boundary, not rails decorating a plaster wall. Through every gap between right-side rails show subtle softly focused layered muted garden greenery and filtered exterior daylight, airy gaps, not a dense hedge or busy jungle. Retain the existing continuous waist/chest-height matte earthy terracotta masonry base with refined texture and clean joints. Recolour ALL right-side vertical and curved overhead rails to sophisticated muted warm powder-coated terracotta/orange, low saturation, not bright orange, not grey or black. Keep rails slim, evenly spaced, light and elegant. Smooth continuous inward rounded bends at top into modest partial pergola-like overhead extension at right edge only, same footprint as existing canopy. Open the narrow overhead edge to filtered exterior light as necessary so canopy feels breathable, but preserve broad main ceiling. No heavy framing, doors, portals, thick pipes, clutter, furniture or indoor plants. Keep exact existing boundary footprint: right wall from rear corner approximately x1217,y137 to right edge, base foot x1217,y476 to right edge y648; canopy only existing upper-right region x1030 onwards. Do not extend onto rear wall or across room. Photorealistic, calm, warm, minimal; soft delicate screen shadows. Everything outside this localized right edge must remain unchanged.

## Clay base and curved rail screen — 23 September 2026

Built-in ImageGen edited `reading-garden-level-camera-v5.png` with the user's
`image 44.jpg` as a reference for the right-side architectural edge. Saved as
`src/assets/reading-garden-clay-screen-v6.png`. A localized SVG clip admits only
the right wall and narrow overhead edge, retaining original shelf/book pixels,
camera, garden glazing and existing interaction geometry. No book data changed.
The base wall is visually proportioned to approximately one metre; this is a
render study, not dimensioned construction geometry.

Prompt used:

> Use case: precise-object-edit. Image 1 is the exact Reading Garden render to edit. Image 2 is ONLY a reference for the low earthy clay base plus slender vertical metal rails that curve overhead, not its layout, door, furniture, plants or colour intensity. Edit ONLY the RIGHT WALL plane of image 1 and a narrow adjoining overhead/floor edge. Preserve exact 1672x941 framing, camera, perspective, rear wall, left garden glazing, foliage, warm daylight and leafy shadows. Preserve all THREE timber shelves and all SEVENTEEN books pixel-aligned: 4 rear, 8 middle, 5 foreground, identical shapes, positions, sizes and colours. On the right wall create a continuous LOW SOLID BASE WALL approximately 900–1100mm high (about one third of room height), matte muted deep earthy terracotta/clay brick, subtle handcrafted texture and fine joints, subdued brown-clay not bright red. Above this base create an airy screen of thin evenly spaced vertical rails in matte muted warm-grey/off-white metal. Rails rise from the base then smoothly curve INWARD at the top with a soft continuous radius and extend modestly overhead to a discreet linear support, creating a partial pergola-like side canopy. Confine this architectural system to the right edge only, roughly rightmost quarter of view; overhead projection modest about 600–800mm, never across whole ceiling. Light thin rails, generous calm spacing, no dense fencing, thick pipes, black metal or bulky frame. Preserve warm plaster elsewhere; behind screen a softly daylit quiet neutral background, no added indoor plants or furniture. Right edge feels layered, airy, structurally integrated and tactile. Subtle soft linear shadows on right wall and adjacent floor; preserve primary warm left daylight and existing leafy shadows. Do not add any door, portal, arch, niche, stairs, seating, objects, decorations, fixtures, or clutter. Do not move or redraw any book or shelf. Do not change room proportions, zoom or crop. Highly photorealistic restrained elegant architecture, same exact scene except the specified right-side wall adaptation.

## Level camera correction — 21 September 2026

Built-in ImageGen edited the portal-free render to create
`src/assets/reading-garden-level-camera-v5.png` (1672 × 941). The camera is more
level and slightly more front-facing, with a little more of the uninterrupted
right plaster wall visible. The left garden glazing, three shelves, 17 books,
materials, daylight and leafy shadows remain. The interactive cover polygons
were re-registered to the adjusted shelf positions.

Prompt used:

> Edit this existing architectural interior render with a very subtle camera/viewpoint correction only. Preserve the exact same Reading Garden room, portal-free uninterrupted right plaster wall, materials, shelves, individual books, book colours and counts, left full-height garden glazing, landscaping, warm daylight, leafy shadows, floor, atmosphere, and wide 16:9 composition. Make the camera feel straighter, more level, and slightly more front-facing; correct perceived roll/tilt so verticals and ceiling/wall datums read cleanly; reveal only slightly more of the uninterrupted solid right wall; retain all three low display shelves; keep essentially the same framing and distance. Do not add or restore any doorway, portal, opening, stair, handrail, recess, niche, window, skylight, furniture, object, plant, or decoration. Do not redesign, resize, relocate, add, or remove shelves or books; crop tightly; zoom in; choose another corner; or change the materials, colour palette, light, garden, or shadows. Maintain photorealistic warm architectural visualization quality and the source aspect ratio and resolution.
