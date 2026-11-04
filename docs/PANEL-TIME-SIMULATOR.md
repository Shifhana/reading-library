# Reading Breeze time panel

The existing medium cane panel (id 6), just above/right of the clock, now cycles Morning → Afternoon → Evening → Night → Live. Its silhouette, position, depth, weave, and breeze physics are unchanged. A faint surface/edge response provides hover and keyboard focus feedback. The active name appears directly on the panel and fades over 2.4 seconds; there is no additional visible control or container.

The panel supports mouse/touch clicks, Enter, and Space. Its accessible name describes the current and next mode. It calls the existing environment preview state and presets, using existing environment transitions. Live disables preview and immediately refreshes the current date. Simulation is session-only; reload retains the existing default behaviour. The existing development-only preview remains unchanged.

Files changed:
- src/components/ReadingBreeze.tsx
- src/components/RoomShell.tsx (prop wiring only)
- src/environment/useEnvironment.ts
- src/environment/timeSimulation.ts
- src/environment/environment.css
- tests/time-simulation.test.mjs
- docs/PANEL-TIME-SIMULATOR.md

Commands: npm run build; npm run lint; node --test tests/*.test.mjs. Build and lint passed; 38 tests passed. Browser checks exercised all five states with clicks and keyboard activation. Night label opacity was observed during appearance and after fading. Live restored the local clock time; no console warnings/errors were recorded. Browser left in Live.

Manual review: activate the cream panel above/right of the clock five times, checking each room preset and brief name, then Tab to it and use Enter/Space. Confirm it looks like the original woven panel when idle. Physical touch-device testing was not performed. All nine forms remain; books, shelf layout, content, and unrelated interactions were untouched. No dependencies, commit, or push. No blocking issues or unrelated follow-ups; README, PRODUCT, and TICKETS require no update. Final visual acceptance belongs to the reviewer.
