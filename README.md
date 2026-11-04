# Reading Library

A personal reading library for tracking what I read, capturing what stayed with me, and gradually revisiting what I’ve learned.

## Why this exists

Reading a book is not the same as retaining it.

This project is designed around a simple cycle:

**Collect → Read → Remember → Take notes → Revisit**

Instead of treating books as a list of completed items, the goal is to build an accumulating personal library of ideas, notes, and remembered learning.

## V1

The first version includes:

- Library statistics
  - Total books
  - Read
  - Unread
- Currently reading / Up next
- Visual book library
- All / Read / Unread filters
- Individual book pages
- Reading status
- Date read
- **What I remember**
- **My notes**
- Responsive layout
- Basic accessibility
- Public deployment

## What makes it different

A key part of the product is **What I remember**.

Rather than storing only summaries or detailed notes, each completed book can include a short reflection written from memory about what actually stayed with me after reading.

The longer-term idea is to make reading feel like an accumulating body of knowledge rather than a list of books completed.

## Product principles

> **The library should make reading feel like an accumulating body of knowledge, rather than a list of books completed.**

> **The interface should stay quiet so the books and the ideas inside them become the visual focus.**

## Visual direction

The interface should feel:

- Editorial
- Calm
- Personal
- Clean
- Curated

The design should rely on typography, whitespace, composition, and book covers rather than heavy dashboard UI or unnecessary interaction.

Custom redesigned book covers may be added later as a separate creative layer.

### Current photorealistic room study

The homepage uses `src/assets/reading-garden-level-camera-v5.png` (1672 × 941),
a subtly realigned view of the portal-free room. The level, slightly more
front-facing camera reveals a little more of the continuous plaster right wall
while retaining the left garden facade, all three shelves, all 17 books and the
warm daylight. Earlier assets remain available as source studies; the editable
SVG is a static load fallback.

The right boundary uses a clipped `reading-garden-integrated-terracotta-v13.png` architecture
layer: a recessed jali-brick base, continuous pale mineral coping, and slender
warm off-white sage rails with horizontal supports curving into the recessed
roof edge. Sky and planting remain visible through the exposed canopy.
The original image supplies all shelf/book pixels.
The latest pass adds deep through-voids and refines coping and rail fixing details
without changing the assembly or interaction geometry.
The sitting edge is now a solid terracotta cap over the perforated base, replacing
the separate cement bench. The overhead rail projection is shorter and restrained.

`RoomBookInteractions.tsx` retains the existing hover affordance. Pickup measures
both the resting shelf rectangle and the current hovered outline, then converts
them into the same SVG coordinate system used by the render. `PhysicalBook.tsx`
interpolates the original textured cover's corners to its held pose. Opening and
closing fold that same cover around its spine over a permanent page block, with
coloured binding, edge thickness, paper grain and a soft depth shadow. Three
blank spreads have tiny prototype page numbers and one visibly shaded moving
sheet per turn. Use the arrow controls or Left/Right keys to navigate; Close,
Escape or the backdrop settles a moving page, shuts the book, pauses briefly,
and returns it to the shelf. Keyboard focus returns to the selected shelf book.

The original book remains visible in the base image as a static, non-interactive
placeholder during selection. The timber slot masks are removed. The animated
cover returns to the captured resting geometry; only after its final aligned
frame and a short settling interval is normal shelf interaction restored.
A single numeric pose owns translation, dimensions, orientation and depth;
no additional selected/return CSS scaling is applied. State changes follow
animation completion rather than assuming a fixed timer means it has finished.
Reduced-motion preferences bypass movement, folding and settling delays.
Real content, library-record binding and detail navigation remain deferred.

Browser verification covered foreground, middle and rear books, keyboard open/
page/close controls, retained shelf placeholders and final return dimensions.
Cover outlines remain tied to this registered render.

Rendering method and prompts: [`docs/RENDERING.md`](./docs/RENDERING.md).

## Tech stack

V1 uses:

- React
- TypeScript
- Vite
- Git
- GitHub

Book data is stored locally in the project for V1.

No backend, database, CMS, authentication, or external reading-service integration is required for the first version.

## Project documentation

The project is intentionally documented before implementation.

- [`AGENTS.md`](./AGENTS.md) — persistent implementation rules for AI coding agents
- [`docs/PRODUCT.md`](./docs/PRODUCT.md) — product source of truth
- [`docs/TICKETS.md`](./docs/TICKETS.md) — ticket-by-ticket implementation roadmap

## Build workflow

This project is also an exercise in learning a structured AI-assisted development workflow.

Each feature is built through:

```text
GitHub Issue
↓
Feature branch
↓
Codex implementation
↓
Manual verification
↓
Pull Request
↓
Review
↓
Merge to main
```

Codex implements one scoped ticket at a time.

The human reviewer remains responsible for product decisions, verification, and final acceptance.

## V1 non-goals

V1 intentionally does not include:

- User accounts
- Authentication
- Database
- Notion integration
- Goodreads integration
- Social features
- Ratings
- Reviews
- Recommendations
- AI-generated summaries
- Reading streaks
- Complex statistics
- Search
- Reread/revisit workflows
- Custom-domain setup

These may be considered later only if real usage shows a genuine need.

## Running locally

After the project is initialized:

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

## Reading Garden environment preview

The garden uses four browser-local time states. Weather simulation and location requests are currently disabled.

During `npm run dev`, open `/?environment=preview` for the development time simulator. See [environment implementation and review steps](docs/ENVIRONMENT.md) for data services, caching, reduced motion and the limits of relighting the static reference image. Run focused checks with `node --test tests/environment.test.mjs` (Node 24).

## Deployment

Netlify automatically builds and publishes changes pushed to `main` using the existing `netlify.toml` configuration.

**Live site:** https://merry-tartufo-603f79.netlify.app

## Project status

**Current phase:** Product planning complete. Implementation begins with `T0001 — Project setup`.

## Long-term direction

The Reading Library may eventually become part of a broader personal portfolio website, alongside work, writing, experiments, photography, and other personal projects.

For now, it should remain a small, useful standalone product first.

## Reading Garden notes

Click a shelf book once: it lifts, holds the cover for one second and automatically opens. Close book or Escape closes and returns it to its exact shelf position, without a separate return action. Reduced motion skips the large movements while retaining the cover pause and automatic sequence.

The first spread shows book metadata on the left and editable What I remember / My notes sections on the right. Use Add / Edit, Save, Cancel and Delete directly on the paper. Clear asks for confirmation. Notes retain an optional heading. Previous/next controls retain the dedicated reflection and notes spreads. Book titles, authors, status and date read remain library data.

Notes are stored in localStorage under reading-garden:note:v1:<book-slug>; reflections use reading-garden:reflection:v1:<book-slug>. Existing saved notes remain compatible. Each field is independent. Existing library content is the initial content until a local save or clear. Content stays in this browser and origin; it is not synced, backed up to the repository or shared across devices. Clearing browser storage removes local edits. Save before leaving; navigation/closing within the book is paused during editing and refresh warns about the draft. Arrow keys move the text caret while editing. Cancel returns to reading without saving.

Run note and existing tests with `node --experimental-strip-types --test tests/*.test.mjs`.
