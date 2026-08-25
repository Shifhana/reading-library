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

## Deployment

The live site URL will be added here after V1 is deployed.

**Live site:** _Coming after T0014 — Deployment_

## Project status

**Current phase:** Product planning complete. Implementation begins with `T0001 — Project setup`.

## Long-term direction

The Reading Library may eventually become part of a broader personal portfolio website, alongside work, writing, experiments, photography, and other personal projects.

For now, it should remain a small, useful standalone product first.
