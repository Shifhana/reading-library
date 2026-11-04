export type ReadingStatus = 'Unread' | 'Currently reading' | 'Read'

export interface Book {
  slug: string
  title: string
  author: string
  coverImage: string
  status: ReadingStatus
  dateRead?: string
  whatIRemember?: string
  myNotes?: string
  summary: string
  upNext?: boolean
}

export const books: Book[] = [
  {
    slug: 'design-for-how-people-think',
    summary: `Experience happens in the mind, not just on a screen. This book looks at how vision, attention, language, memory, wayfinding, emotion, and decision making work together when someone uses a product. Its practical focus is learning to notice these processes through contextual interviews and observation, rather than relying only on what people say they want. The useful shift is to investigate the whole situation around a task: what someone expects, what they notice, and what makes them uncertain. Better design begins with understanding those mental processes before deciding what an interface should look like.`,
    title: 'Design for how people think',
    author: 'Steve Krug',
    coverImage: new URL('../assets/book-covers/design-for-how-people-think-published.jpg', import.meta.url).href,
    status: 'Currently reading',
  },
  {
    slug: 'user-friendly',
    summary: `This is a history of how design began to take everyday human behaviour seriously. Stories from industry, technology, and public life show how objects and systems become easier to understand when they provide useful feedback and fit people's expectations. Usability is presented as something shaped by social choices and business decisions, rather than a finishing touch applied to an interface. The recurring lesson is to look beyond the person making a mistake and examine the system around them. Making something convenient also creates responsibilities, especially when that convenience hides complexity or influences behaviour.`,
    title: 'User Friendly',
    author: 'Robert Fabricant, Cliff Kuang',
    coverImage: new URL('../assets/book-covers/user-friendly-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'dont-make-me-think-revisited',
    summary: `People usually scan a page, choose something that seems reasonable, and work things out as they go. Krug uses that observation to explain why clear navigation, familiar conventions, concise language, and an obvious visual hierarchy matter. An interface should make the next useful action easy to recognise without asking people to decode how the site works. The book also makes usability testing feel manageable: watch a few people attempt real tasks, notice where they struggle, and fix the most serious problems. The main reminder is to remove avoidable thinking while preserving the substance people came for.`,
    title: "Don't Make Me Think, Revisited",
    author: 'Steve Krug',
    coverImage: new URL('../assets/book-covers/dont-make-me-think-revisited-published.jpg', import.meta.url).href,
    status: 'Read',
    dateRead: '2025-02-19',
  },
  {
    slug: 'lean-ux-applying-lean-principles-to-improve-user-experience',
    summary: `Lean UX treats design as a way to test assumptions together, rather than a sequence of polished documents passed between departments. Teams describe the outcome they hope to achieve, identify what they believe about customers, and run small experiments to learn whether those beliefs hold up. Prototypes and early conversations are useful because they reduce uncertainty before a team invests heavily in building. Designers, engineers, and product colleagues share responsibility for discovery. The central distinction is between delivering features and improving an outcome: making more things is not the same as learning what actually helps.`,
    title: 'Lean UX: Applying Lean Principles to Improve User Experience',
    author: 'Josh Seiden, Jeff Gothelf',
    coverImage: new URL('../assets/book-covers/lean-ux-applying-lean-principles-to-improve-user-experience-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'articulating-design-decisions',
    summary: `Good design work still needs to be understood by the people who influence it. Greever focuses on preparing for design discussions, explaining the reasoning behind a choice, and listening carefully when stakeholders disagree. A useful presentation connects a decision to the user's needs and the project's goals instead of defending it as a matter of taste. Feedback becomes easier to handle when the concern underneath a comment is made explicit. The book is a reminder that communication belongs inside the design process: trust, preparation, and a clear explanation can matter as much as the work being shown.`,
    title: 'Articulating Design Decisions',
    author: 'Tom Greever',
    coverImage: new URL('../assets/book-covers/articulating-design-decisions-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days',
    summary: `A design sprint gives a team a short, structured way to investigate a difficult question before committing to a full product. The sequence moves from understanding the problem and choosing a target to sketching alternatives, deciding on a direction, building a realistic prototype, and testing it with customers. Individual thinking is given space before group decisions, which helps prevent the loudest voice from supplying every answer. The prototype only needs to be convincing enough to produce useful reactions. The value is not a finished solution in five days, but clearer evidence about what deserves further investment.`,
    title:
      'Sprint How to Solve Big Problems and Test New Ideas in Just Five Days',
    author: 'Jake Knap',
    coverImage: new URL('../assets/book-covers/sprint-how-to-solve-big-problems-and-test-new-ideas-in-just-five-days-published.jpg', import.meta.url).href,
    status: 'Read',
    dateRead: '2025-02-06',
  },
  {
    slug: 'art-of-innovation',
    summary: `Innovation is described as a repeatable team practice rather than a rare moment of individual inspiration. Drawing on work at IDEO, the book connects close observation of people with energetic idea generation, quick prototypes, and learning through experiments. Making an idea tangible helps a group discover weaknesses that discussion alone can miss. The surrounding culture matters too: people need room to share unfinished thoughts, combine perspectives, and recover from failed attempts. The useful takeaway is to create conditions for good ideas to develop, then test them early instead of waiting for a supposedly perfect concept.`,
    title: 'art of innovation',
    author: '',
    coverImage: new URL('../assets/book-covers/art-of-innovation-published.jpg', import.meta.url).href,
    status: 'Read',
  },
  {
    slug: 'atomic-design',
    summary: `An interface can be understood as a system of related parts rather than a collection of isolated pages. Frost's model moves between small elements, useful combinations, larger sections, templates, and pages filled with real content. These levels are ways of thinking together, not a rigid production sequence. The book connects this approach to pattern libraries, shared vocabulary, collaboration, and the ongoing care a design system requires. Reuse is valuable when it improves consistency and makes change easier. The reminder is to test components in context, because a tidy library means little if the actual experience does not work.`,
    title: 'Atomic Design',
    author: 'Brad Frost',
    coverImage: new URL('../assets/book-covers/atomic-design-published.svg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'designing-interactions',
    summary: `Moggridge explores interaction design through the people and decisions behind digital products. Interviews and project stories reveal how physical objects, software behaviour, and human expectations became connected as computing entered everyday life. The emphasis is on the experience of using something, rather than its appearance alone. Prototyping, observation, and collaboration recur as ways to understand an unfamiliar problem and try out a response. Seeing the history through individual projects makes the discipline feel less like a fixed set of rules and more like a practice of asking what technology should do for people.`,
    title: 'Designing Interactions',
    author: 'Bill Moggridge',
    coverImage: new URL('../assets/book-covers/designing-interactions-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'about-face-the-essentials-of-interaction-design',
    summary: `Interaction design starts with understanding people's goals and shaping a product around what they are trying to accomplish. About Face develops a goal-directed approach using research, personas, scenarios, and interaction patterns to connect that understanding to design decisions. It pays attention to behaviour over time: how people learn a tool, recover from mistakes, and move through repeated tasks. The interface should support a person's work instead of exposing the software's internal organisation. A useful thread throughout is that reducing friction takes more than simplifying screens; it requires a coherent model of the whole experience.`,
    title: 'About Face: The Essentials of Interaction Design',
    author: '',
    coverImage: new URL('../assets/book-covers/about-face-the-essentials-of-interaction-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'universal-principles-of-ux',
    summary: `This collection brings together principles, practical observations, and tensions that appear throughout user experience work. It moves across understanding people, framing problems, research, design, and validation, with examples that connect a general idea to a concrete situation. Accessibility, language, context, feedback, and responsible influence are treated as parts of the same practice. Some principles pull in different directions, which is a useful reminder that a guideline needs judgement rather than automatic application. The book works as a reference to revisit when a design feels unclear and a better question is needed before choosing a solution.`,
    title: 'Universal Principles of UX',
    author: '',
    coverImage: new URL('../assets/book-covers/universal-principles-of-ux-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'the-pocket-universal-principles-of-design',
    summary: `A compact reference for ideas that help explain why some designs communicate and function better than others. The principles connect perception, learning, decision making, and visual organisation to everyday design choices. Instead of prescribing one style, the book offers concepts that can be used to diagnose a problem or compare alternatives. Familiarity, hierarchy, constraints, and consistency become easier to discuss when there is a shared explanation behind them. The useful habit is to treat each principle as a lens, then check whether it fits the people, task, and context of the particular design.`,
    title: 'The Pocket Universal Principles of Design',
    author: 'William Lidwell',
    coverImage: new URL('../assets/book-covers/the-pocket-universal-principles-of-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'thinking-fast-and-slow',
    summary: `Kahneman describes judgement through two modes of thought: quick, automatic impressions and slower, more deliberate reasoning. Experiments and examples show how confidence, framing, anchoring, and the ease of recalling an example can influence what seems true. The book also examines risk, loss aversion, and the difference between living through an experience and remembering it afterward. The point is not that intuition is always wrong or that careful thought can remove every bias. It is a reminder to notice when a convincing story is standing in for evidence, especially when making important decisions under uncertainty.`,
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: new URL('../assets/book-covers/thinking-fast-and-slow-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'inspired',
    summary: `Product work is organised around discovering solutions that customers value and that a business can support. Cagan distinguishes this from simply receiving a list of features to deliver. Product managers, designers, and engineers need to investigate value, usability, feasibility, and business viability before assuming an idea deserves to be built. Customer contact, prototypes, and other discovery techniques help make that investigation concrete. Delivery still matters, but it should follow a clearer understanding of the problem. The practical reminder is to give teams responsibility for solving meaningful problems, along with the evidence and collaboration needed to do that well.`,
    title: 'Inspired',
    author: 'Marty Cagan',
    coverImage: new URL('../assets/book-covers/inspired-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'empowered',
    summary: `Empowered looks at the leadership and organisational conditions that allow product teams to solve problems rather than merely implement requests. It explores coaching, staffing, product vision, strategy, and the relationship between teams and the wider business. Autonomy is paired with clear context and accountability, so people understand both the outcome they are pursuing and the constraints around it. Leaders have to develop the judgement of their teams instead of making every decision for them. The useful takeaway is that changing a team's label or adopting a process will achieve little without changing how responsibility and trust are distributed.`,
    title: 'Empowered',
    author: 'Marty Cagan',
    coverImage: new URL('../assets/book-covers/empowered-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'emotional-design',
    summary: `Objects affect us through their appearance, the experience of using them, and the meanings we attach to them. Norman describes these as visceral, behavioural, and reflective dimensions of design. Something can work correctly yet feel frustrating, or become meaningful because it connects to identity and memory. Emotion also changes how people approach problems and interpret an experience, so pleasure is not separate from usability. The useful reminder is to consider the whole relationship someone develops with a product: its first impression, its everyday behaviour, and the story that remains after it has been used.`,
    title: 'Emotional Design',
    author: 'Don Norman',
    coverImage: new URL('../assets/book-covers/emotional-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'continuous-discovery-habits',
    summary: `Discovery becomes more useful when it is a regular habit shared by a product trio, rather than a large research phase that happens occasionally. Torres connects frequent customer conversations to a desired outcome, then uses an opportunity solution tree to organise needs, possible responses, and the assumptions worth testing. Teams compare alternatives and look for evidence before becoming attached to a single idea. Small tests help expose uncertainty without building every proposed solution. The main reminder is to keep a visible connection between what customers experience, the opportunities a team chooses, and the outcome it hopes to improve.`,
    title: 'Continuous Discovery Habits',
    author: 'Teresa Torres',
    coverImage: new URL('../assets/book-covers/continuous-discovery-habits-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'business-thinking-for-designers',
    summary: `Design decisions take place inside organisations with their own goals, constraints, and ways of measuring success. Rumsey explains how understanding that context helps designers connect their work to business decisions without abandoning the people they design for. Learning the language of strategy, value, and financial trade-offs makes it easier to ask useful questions and explain why a proposal matters. It also reveals why colleagues may evaluate the same situation differently. The practical reminder is to become a better partner in those conversations, translating between customer needs and organisational realities rather than expecting design arguments to speak for themselves.`,
    title: 'Business Thinking for Designers',
    author: 'Ryan Rumsey',
    coverImage: new URL('../assets/book-covers/business-thinking-for-designers-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'art-of-ux',
    summary: `This book approaches user experience through the practical problems of designing software products, particularly SaaS. Its emphasis is on understanding what people need to accomplish and making the product's experience support that work. Visual polish alone cannot rescue a confusing journey or a solution to the wrong problem. Research, clear flows, and attention to everyday friction help connect design choices to how a product is actually used. The useful reminder is to keep returning to the task and the person behind it, so decisions about an interface serve a coherent experience rather than a collection of attractive screens.`,
    title: 'Art Of UX',
    author: 'Tulasi Krishna Penumarthy',
    coverImage: new URL('../assets/book-covers/art-of-ux-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
  {
    slug: 'designing-design',
    summary: `Hara reflects on design as a way of noticing and reconsidering the ordinary. Through projects, exhibitions, and his work with MUJI, he explores how materials, sensory experience, cultural context, and communication shape meaning. Emptiness is treated as an invitation that leaves room for interpretation, rather than simply an absence of decoration. Reworking familiar objects can reveal assumptions that normally remain invisible. The book encourages a slower kind of attention: ask what an object communicates, how it meets the body, and what possibilities appear when its most familiar features are approached with fresh eyes.`,
    title: 'Designing Design',
    author: 'Kenya Hara',
    coverImage: new URL('../assets/book-covers/designing-design-published.jpg', import.meta.url).href,
    status: 'Unread',
  },
]
