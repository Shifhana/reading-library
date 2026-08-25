# Reading Library — Agent Instructions

**Purpose:** Persistent implementation rules for AI coding agents working in this repository.

These instructions apply to all implementation work in this project.

---

## 1. Project context

This project is a small personal reading library focused on remembering what I read, not just tracking books as completed.

Before making product, UX, UI, or implementation decisions, read:

- `docs/PRODUCT.md`
- `docs/TICKETS.md`

Treat `docs/PRODUCT.md` as the product source of truth.

Treat `docs/TICKETS.md` as the implementation roadmap.

---

## 2. Core implementation rule

> **Implement one ticket at a time.**

Do not implement future-ticket features.

Do not combine multiple tickets unless explicitly instructed.

If the current ticket does not require a feature, do not add it.

---

## 3. Scope control

For every ticket:

- Follow the ticket goal exactly.
- Follow the listed requirements.
- Respect the non-goals.
- Use the acceptance criteria to define completion.
- Do not expand scope because an extra feature seems useful.
- Do not add “nice to have” improvements without approval.
- Do not silently implement ideas from future sections of `PRODUCT.md`.

If you discover an out-of-scope issue:

1. Do not fix it automatically.
2. Report it as a follow-up.
3. Continue with the current ticket unless the issue blocks completion.

The roadmap controls what gets built next.

---

## 4. Simplicity rule

> **Choose the simplest implementation that supports the current V1, not the architecture we might need someday.**

This is a small personal website, not a production SaaS application.

Avoid:

- Premature abstractions
- Over-engineered architecture
- Unnecessary state-management libraries
- Unnecessary dependencies
- Backend services unless explicitly required
- Database setup unless explicitly required
- CMS integration unless explicitly required
- Authentication unless explicitly required

For V1, prefer local project data where appropriate.

---

## 5. Architecture rule

Do not introduce a new architectural pattern unless the current ticket genuinely requires it.

Do not refactor unrelated systems.

Do not reorganize folders simply for cleanliness unless that is part of the ticket.

Keep components and data structures understandable for a beginner learning the codebase.

Prefer clarity over cleverness.

---

## 6. Technology rules

Use the existing project stack.

Expected V1 stack:

- React
- TypeScript
- Vite
- Git / GitHub

Use TypeScript consistently.

Do not add a package if the same requirement can be met cleanly with the existing stack.

If a new dependency is genuinely required:

1. Explain why.
2. Keep it minimal.
3. Report it clearly in the completion report.

---

## 7. Product rules

The product definition in `docs/PRODUCT.md` is locked for V1 unless explicitly updated.

Do not turn the product into:

- Goodreads
- A social reading platform
- A recommendation engine
- An AI summary tool
- A reading streak app
- A complex knowledge-management system

Do not add V1 non-goals unless explicitly requested.

---

## 8. UI and UX rules

Before implementing UI:

1. Read the relevant section of `docs/PRODUCT.md`.
2. Preserve the locked information architecture.
3. Preserve the locked visual direction.
4. Do not add additional navigation, controls, metadata, or interaction patterns unless required by the ticket.

The visual direction should remain:

- Editorial
- Calm
- Personal
- Clean
- Curated
- Quiet enough for books and ideas to remain the focus

Avoid unnecessary:

- Dashboard-style UI
- Heavy card chrome
- Complex animations
- Decorative interactions
- Visual clutter

---

## 9. Accessibility rule

For relevant UI work:

- Use semantic HTML.
- Use proper heading hierarchy.
- Ensure interactive controls work with keyboard input.
- Keep visible focus states.
- Do not rely on colour alone to communicate status.
- Use appropriate alternative text for meaningful images.
- Maintain readable contrast.

Accessibility fixes outside the current ticket should be reported rather than expanded into unrelated refactors unless they are blocking or severe.

---

## 10. Allowed areas / Do not touch

When a ticket specifies:

### Allowed areas

Only modify the listed files or folders unless another change is strictly necessary to complete the ticket.

### Do not touch

Do not modify those files, folders, or systems.

If a required change conflicts with these boundaries, stop implementation and report the conflict instead of silently expanding scope.

---

## 11. Before coding

Before making changes:

1. Read this `AGENTS.md`.
2. Read `docs/PRODUCT.md`.
3. Read the current ticket in `docs/TICKETS.md`.
4. Confirm the ticket goal.
5. Identify the smallest implementation needed.
6. Note any assumptions.

Do not begin by implementing future features.

---

## 12. During implementation

While working:

- Keep changes small.
- Keep code readable.
- Avoid unrelated cleanup.
- Avoid speculative abstractions.
- Do not refactor working code without a ticket-level reason.
- Do not change product behavior outside the current ticket.
- Do not add future states, routes, filters, data fields, or pages pre-emptively.

If something unexpected appears, report it rather than expanding the task.

---

## 13. Verification

A ticket is not complete only because the code compiles.

Run relevant checks where possible.

At minimum, when applicable:

- Run the development build or local app.
- Run `npm run build`.
- Check for obvious console errors.
- Verify the current ticket’s acceptance criteria.
- Provide practical manual verification steps.

Do not claim a ticket is fully accepted.

You may report implementation complete, but final acceptance belongs to the human reviewer.

---

## 14. Completion report

After every ticket, provide a concise completion report with:

### Summary
What was implemented.

### Files changed
List all modified, added, or removed files.

### Commands run
List relevant commands used.

### Build / test result
State whether the build or relevant tests passed.

### Manual verification
Give clear steps for the reviewer to verify the ticket.

### Assumptions
List any assumptions made.

### Risks
List any known risks or uncertainties.

### Follow-ups
List out-of-scope issues or useful future work without implementing them.

### Documentation
State whether `README.md`, `docs/PRODUCT.md`, or `docs/TICKETS.md` need updating.

---

## 15. Git and ticket discipline

Work should map cleanly to one ticket.

Suggested branch naming:

```text
feature/t0001-project-setup
feature/t0002-book-data
feature/t0003-site-shell
```

Do not work directly on `main` unless explicitly instructed.

Keep the change set small enough to review and verify manually.

---

## 16. V1 data rule

For V1, book data may live locally inside the project.

Do not add:

- Database
- CMS
- Notion integration
- Goodreads integration

unless a later approved ticket explicitly requires it.

The current book model is defined in `docs/PRODUCT.md`.

Do not expand the data model pre-emptively.

---

## 17. Future ideas rule

Future ideas in `docs/PRODUCT.md` are not implementation instructions.

Examples include:

- Revisit / reread cycle
- Read + notes state
- Revisit queue
- Richer statistics
- Search
- Notes-only view
- Custom cover gallery
- Notion or CMS integration

Do not build them in V1 unless the roadmap is explicitly updated.

---

## 18. Human approval rule

> **The agent can declare implementation complete. Only the human reviewer can declare the ticket accepted.**

Do not assume a ticket is approved because:

- The build passed
- The UI renders
- Tests passed
- The implementation matches your interpretation

The human reviewer performs final product, UX, and PR acceptance.

---

## 19. Final principle

The goal of this project is not only to produce a working website.

It is also to keep the build process understandable, controlled, and reviewable while using AI-assisted implementation.

Therefore:

> **Stay within scope, keep changes small, make decisions traceable, and leave product control with the human reviewer.**
