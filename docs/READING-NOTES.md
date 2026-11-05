# Expanded personal reading notes

User-requested scope: richer per-book summary and Product/UX Designer takeaways, using the existing physical reading interaction. The subsequent final-release request authorizes committing and publishing this work. Human product acceptance remains with the owner.

## Content and identity

All 20 active books were identified against author/publisher information and the existing cover-edition manifest. Each has two original summary paragraphs and a concise first-person takeaway. These are authored drafts in a personal-note voice, not assertions about the owner's actual reading history. No publisher prose was copied. The reflections apply the ideas to design work; they do not invent project experiences or claim specific results.

The verified author credits for Design for How People Think, Sprint, The Art of Innovation, About Face, Universal Principles of UX and Empowered were corrected/completed. Slugs, titles, covers, status and order are unchanged. No unresolved identities remain. Art of UX is the SaaS volume, not the author's later AI title; Lean UX follows the original Applying Lean Principles edition. The Pocket Universal Principles of Design is the 150-principle pocket edition.

Research references used for identity and concept checks:

| Book | Author/publisher reference |
| --- | --- |
| Design for How People Think | [O'Reilly: John Whalen, contents and Six Minds](https://www.oreilly.com/library/view/design-for-how/9781491985441/01b.Ch1.xhtml) |
| User Friendly | [Macmillan](https://us.macmillan.com/books/9781250758200/userfriendly/) |
| Don't Make Me Think, Revisited | [Steve Krug](https://sensible.com/dont-make-me-think/), [book excerpt on scanning](https://www.oreilly.com/library/view/dont-make-me/0789723107/ch03.html) |
| Lean UX | [O'Reilly, original edition contents](https://www.oreilly.com/library/view/lean-ux/9781449366834/) |
| Articulating Design Decisions | [O'Reilly](https://www.oreilly.com/library/view/articulating-design-decisions/9781491921555/) |
| Sprint | [Authors' sprint guide](https://www.character.vc/sprint) |
| The Art of Innovation | [Penguin Random House](https://www.penguinrandomhouse.com/books/91121/the-art-of-innovation-by-thomas-kelley-with-jonathan-littman/), [IDEO](https://designthinking.ideo.com/resources/the-art-of-innovation) |
| Atomic Design | [Brad Frost, methodology](https://atomicdesign.bradfrost.com/chapter-2/) |
| Designing Interactions | [MIT Press](https://mitpress.mit.edu/9780262134743/designing-interactions/) |
| About Face | [Wiley, fourth edition](https://www.wiley.com/en-us/about-face-the-essentials-of-interaction-design-4th-edition-p-9781118766576) |
| Universal Principles of UX | [Quarto](https://www.quarto.com/books/9780760378045/Universal-Principles-of-UX) |
| The Pocket Universal Principles of Design | [Quarto](https://www.quarto.com/books/9781631590405/pocket-universal-principles-of-design), [contents](https://www.oreilly.com/library/view/the-pocket-universal/9781627883665/) |
| Thinking, Fast and Slow | [Macmillan](https://us.macmillan.com/books/9780374533557/thinkingfastandslow/), [publisher reading guide](https://images.macmillan.com/folio-assets/rgg-guides/9780374533557RGG.pdf) |
| Inspired | [SVPG, second edition](https://www.svpg.com/books/inspired-how-to-create-tech-products-customers-love-2nd-edition/) |
| Empowered | [SVPG](https://www.svpg.com/books/empowered-ordinary-people-extraordinary-products/) |
| Emotional Design | [Don Norman](https://jnd.org/emotional-design-people-and-things/), [NN/g book contents](https://www.nngroup.com/books/emotional-design/) |
| Continuous Discovery Habits | [Teresa Torres](https://www.producttalk.org/continuous-discovery-habits/), [author's habit overview](https://www.producttalk.org/getting-started-with-discovery/) |
| Business Thinking for Designers | [Ryan Rumsey's library](https://books.thecdo.school/), [book text](https://uploads-ssl.webflow.com/609ce44d3dfdab98b5019cf9/6143613a2ebbb44c1e9d1251_BusinessThinkingforDesigners.pdf) |
| Art of UX | [Author's SaaS volume and contents](https://artofux.com/art-of-ux-book/) |
| Designing Design | [Lars Müller Publishers](https://www.lars-mueller-publishers.com/designing-design-0) |

## Storage and reading

- `src/data/bookReadingNotes.ts` supplies `summary` and `takeaways` by existing slug; `books.ts` incorporates them into each typed Book record.
- Existing `summary`, `reflection` and `note` v1 localStorage keys are unchanged. Saved values, including empty strings and deletion tombstones, take precedence. There is no migration write, reset, or bulk storage update.
- Takeaway edits use an independent `reading-garden:takeaways:v1:<slug>` key.
- The first heading is Summary. Any existing reflections/notes follow the summary, and the final named section is What I'm taking away. An empty, unlabelled reflection writing area remains available after it when there is no saved reflection.
- Content is measured with the actual paper typography and available height. Word-boundary fragments carry source offsets; joining fragments reproduces the exact original section. Headings keep a short opening portion with them. Sections share page space where they fit.
- When all content fits on one desktop page, takeaways use the already-visible right page; this adds no extra spread or page turn and avoids an unnecessarily empty half of the book.
- Editing remains direct and autosaves on input. Blur reflows the edited section. Only an actively edited surface can scroll; normal reading uses the existing edge/keyboard page turns. Storage failures keep unsaved text in memory, warn the user and block closing/turning until saved.
- PhysicalBook and BookPageEdge animation implementations are untouched. The parent receives the measured page count rather than assuming one fixed spread. Arrow keys within writing move the caret rather than turn the book.

## Changed files

`src/data/books.ts`, `src/data/bookReadingNotes.ts`, `src/components/BookReadingPages.tsx`, `src/components/BookReadingPages.css`, `src/components/bookReadingContent.ts`, `src/components/noteStorage.ts`, `src/components/RoomBookInteractions.tsx`, `tests/book-reading-content.test.mjs`, `tests/book-summaries.test.mjs`, this document and the Summary/Takeaways field description in `docs/PRODUCT.md`.

## Review

1. Open books from each shelf. Check Summary appears first and the final named section is What I'm taking away.
2. At compact/tablet width, turn through all content using the existing edges. Check text does not clip or scroll during reading; go back to check continuity.
3. Click text, edit a continuation, blur, close and reopen/refresh. Verify the edit and surrounding text survive independently of other books.
4. Check a book with saved summary/reflection/notes. Existing text should be retained, including deliberately cleared content.
5. Close via Escape or the close control and confirm return to the shelf. Check the phone-only screen is unchanged.

No new dependencies. No changes to room, cover assets, shelf geometry, lighting, sound, motion, mobile screen or routing. README and the historical V1 roadmap do not need changes for this scoped request. Content remains editable and should be reviewed for the owner's preferred voice; pagination length varies with viewport and saved writing.

Verification: production build and lint pass; all 50 Node tests pass. Browser checks covered compact page turning, an existing saved Emotional Design summary, new Atomic Design defaults, desktop page fit, inline autosave across refresh (test text restored), and closing/return. No application console warnings/errors were observed. The stylesheet conflict found during compact review was corrected before completion.
