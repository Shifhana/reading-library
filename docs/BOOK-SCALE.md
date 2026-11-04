# Physical book scale refinement

The shelf presentation now uses explicit height multipliers, independently of cover width. Projected baseline heights are 56 scene units at the rear, 70 in the middle, and 108 in the foreground. These preserve the existing perspective hierarchy. Most books span 95–104% of their baseline; the pocket edition is deliberately 94%. These are visual calibrations, not claimed publisher measurements.

Height = shelf baseline × individual multiplier. Width = height × intrinsic cover aspect ratio. Existing thickness variation, seating offsets, and upright poses remain. The existing clearance calculation accommodates the changed widths without changing order or grouping. Held geometry continues to use the same intrinsic ratio.

Key corrections (scene-unit heights):

- Don't Make Me Think: 48 → 53.2.
- Sprint: 60 → 67.9.
- Atomic Design: 63 → 67.2.
- Universal Principles of UX: 62 → 70.
- Thinking, Fast and Slow: 64 → 68.6.
- About Face: 74 → 72.8; Art of Innovation: 72 → 69.3.
- Pocket Universal Principles of Design: 69 → 65.8, modestly smaller with its square proportions retained.
- Foreground heights now span 105.84–112.32, compared with 102.85–113.135 before.

Files changed for this pass: `src/components/shelfBooks.ts`, `tests/shelf-books.test.mjs`, and this report. No cover assets, content, interaction logic, or environment files changed. No dependencies, commit, or push.

Verification: `npm run build`, `npm run lint`, and `node --test tests/*.test.mjs` passed (37 tests). Tests check source ratios, the controlled height range, natural height variation, and gaps. Browser inspection confirmed balanced shelf heights and complete covers; Universal Principles of UX pickup/open/close/return was checked.

Manual review: compare Sprint, Atomic Design, and the two principles books on the middle shelf; pick one up and close it to confirm its shape and return position. Final visual acceptance belongs to the reviewer. No known blocking risks or additional follow-ups. README, PRODUCT, and TICKETS need no update for this scoped presentation refinement.
