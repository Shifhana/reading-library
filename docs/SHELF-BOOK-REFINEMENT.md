# Shelf book refinement

The Reading Garden now displays all 21 existing library records once: 5 rear, 10 middle, 6 foreground. The arrangement uses stable book slugs, preserves each book identity, and uses the existing neutral cover palette. No book records were added or edited. Previous room objects were generic display slots, so this pass assigns their selection labels to actual titles.

Shelf height ranges remain close to the approved reduced scale: rear 48–59, middle 60–74, foreground 99–114 SVG units. Fixed spacing, small lean angles and seating offsets create modest groups without overlapping covers. Foreground books remain larger than middle and rear books.

PhysicalBook adds shelf-only paper fore-edges, fine page lines, a subdued spine face and a narrow contact line. Held/open rendering and animation logic are unchanged. Selection still hides the source until return completes.

Verification: build, lint, existing tests and shelf identity/spacing tests. Review all three shelves, select a title, open/turn a page, then return it; the same slot should restore exactly one copy.

The real coverImage records currently reference placeholder artwork. This pass retains the established calm cloth-style cover colours rather than introducing new cover artwork. README, PRODUCT and TICKETS need no scope changes. Human visual acceptance remains pending.

## Previous composition polish

Emotional Design and Continuous Discovery Habits move from foreground to rear so the back shelf can hold seven without duplicating any of the 21 library records. Middle keeps its ten titles. Foreground keeps four, reduced uniformly by 6.5% and arranged as two quiet pairs. Rear and middle heights vary around their established scale, with widths adjusted to preserve each book’s exact held-state aspect ratio. Cover colours and held thickness ratios remain attached to the same slugs.

Middle spacing uses several tighter pairs separated by broader gaps. Tiny seating offsets and restrained lean remain deterministic. Rear shelf thickness is 15% finer visually; focused-book thickness is unchanged. The base contact line is slightly firmer only in the shelf rendering. No animation, selection, opening, closing, or page-turn logic changes.

## Foreground composition follow-up

Foreground now holds six real books at the same .935 scale. Emotional Design and Continuous Discovery Habits return from rear to foreground to keep all 21 identities unique. Remaining rear poses and every middle pose are unchanged. Foreground centres use tighter varied gaps, and the shared .105 shear is removed; lean is limited to -0.2° through +0.25°. Height, width, thickness, page-edge details and groove contact remain restrained. Each book's held aspect ratio and thickness remain unchanged. No room, lighting, shelf geometry or interaction code changes.
