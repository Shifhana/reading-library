# Continuous wind-chime motion and ambient sound

Refined only the existing breeze, contact-driven audio and audio activation. The rendered wind-chime geometry and complete layout data were verified unchanged with SHA-256 comparisons before and after implementation. All attachment positions, concealed suspension, caps, spacers, tube/blade forms and finishes remain as approved. No room, books, shelves, mural, clock, foliage, lighting, camera or unrelated interaction code changed.

## Motion

The independent spring/damping system now includes slow phase and amplitude drift for each strand, combined with the existing irregular, smoothly joined random wind-strength changes. Motion stays low-amplitude and bounded. Morning is light, afternoon slightly stronger/faster, evening calmer, and night very gentle but continuously active. Existing smooth time-state blending is preserved. Reduced-motion preference stops the animation and sound; hidden tabs remain paused/muted.

## Sound

Every sound still requires an actual closing contact between neighbouring chimes. Light brushes now admit quieter notes. Contact timing can occasionally admit a different pair sooner, allowing two or three delicate tails to overlap. The rolling maximum of three notes in nine seconds and per-pair cooldown prevent chatter and preserve quiet gaps. No loop, music, autonomous note timer or queued catch-up sounds were introduced.

Ten piece-associated pitches, slight impact variation, soft attacks, longer natural decays and restrained upper partials create a quiet metallic character. Intensity follows contact speed; evening and night are softer and less frequent. Audio is created only after a normal user interaction. Captured pointer/keyboard listeners also receive interactions handled by book controls, and pointer release retries activation on browsers that require touch release. No dedicated sound control or other UI was added.

## Files changed

- `src/components/windChimeMotion.ts`: slow independent drift and morning/afternoon/evening/night tuning.
- `src/components/windChimeAudio.ts`: quiet contact clusters, pitch/timbre/decay variation and successful-activation guard.
- `src/components/WindChime.tsx`: audio activation listeners and cleanup only; rendering unchanged.
- `tests/wind-chime.test.mjs`: individual movement in every state and afternoon/morning comparison.
- `tests/wind-chime-audio.test.mjs`: overlapping contact notes, quiet gaps, no timer-driven notes and actual-layout contact coverage in all four states.
- `docs/WIND-CHIME.md`: this completion report.
- `output/wind-chime-motion-sound.png` and `output/wind-chime-motion-sound-room.png`: browser verification screenshots.

## Verification

Commands: `node --test tests/wind-chime*.test.mjs`; `node --test tests/wind-chime-audio.test.mjs`; `npm run build`; `npm run lint`; `node --test tests/*.test.mjs`.

Build and lint passed. All 47 tests passed. Tests cover continuous independent movement, bounded spring/contact response, contact-only audio, overlapping notes with quiet gaps, day/night differences, autoplay rejection/retry, unavailable audio, reduced-motion/hidden-state muting and disposal. Browser inspection confirmed changing independent rotation poses, unchanged placement/design and no console warnings/errors after a normal pointer interaction.

Manual review: open `http://localhost:5173/` and observe the chimes before interacting; their gentle sway should already be active. Interact normally anywhere, then listen for quiet irregular contact notes and occasional overlapping tails. Use the existing artwork time simulator to compare morning, afternoon, evening and night, then return to Live. Check reduced-motion preference if desired. The browser was left on Live. Subjective listening quality and final acceptance remain for human review on speakers/headphones.

Assumption: a continuous ambient experience means continuous gentle breeze with intermittent contact notes and quiet gaps. Browser autoplay restrictions remain respected. No known blocking risks or unrelated follow-ups. No dependencies, commit or push. README, PRODUCT and TICKETS need no update for this scoped refinement.
