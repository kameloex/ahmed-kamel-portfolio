# Ahmed Kamel — Original 3D Portfolio Blueprint

## 1. Goal
Build a distinctive, fast, interactive developer portfolio that uses 3D as part of the storytelling—not a template copy and not a collection of visual effects. It should position Ahmed as a software developer who can build usable digital products across web interfaces, interactive workflows, and software connected to physical systems.

The reference site is inspiration for quality, motion, and confidence only. Do not copy its exact layout, order of sections, typography, compositions, or visual details.

## 2. Original art direction: “The Interactive Systems Atlas”

### Core idea
The site is an explorable digital environment: an abstract 3D systems map that connects Ahmed's work. Rather than a generic hero with a spinning cube followed by standard cards, visitors enter a calm, dark digital space where three distinct “systems” are represented as connected stations. Scrolling and selecting projects changes the visual focus and reveals each case study.

This is a visual metaphor—not a fake claim that the projects share one technical system. Each project remains clearly described as a separate project.

### Three visual stations
- **University Portal / BATU:** abstract architectural layers and organized interface panels. It should suggest a connected information environment without claiming to represent an accurate 3D model of the real campus.
- **Projects Hub:** a constellation/archive of project nodes, boards, and linked information cards, reflecting a platform for presenting student projects and learning resources.
- **PAYNGO Smart Cart Interface:** a product-flow composition with a scanning line, product tiles, a cart/interface panel, and checkout-state transitions. It must read as a web interface for the cart—not falsely imply that the demo connects to a real payment gateway or live scanner hardware.

### Visual rules
- Palette: near-black `#080B10`, surface `#111720`, warm white `#F5F7FA`, muted text `#9AA7B6`, ice-blue `#77CFFF`, deep blue `#15384B`.
- Mood: cinematic, precise, minimal, technical; use whitespace and typography as much as graphics.
- Main visual: a custom abstract “system core” made from fine lines, rings, layered panels, and connected nodes. Avoid a stock-looking planet, generic spinning cube, or cloned Framer template.
- Use one memorable 3D scene in the hero and purposeful 3D/Depth interactions around the featured projects. Keep About, Skills, and Contact easy to read and mostly 2D.
- Use no unlicensed stock screenshots of the user's projects. Use screenshots or recordings from the real demos once supplied/captured.
- Motion should tell the user where to look or show state changes; no motion for motion's sake.

## 3. Recommended experience

### Opening / Hero
- Compact name/monogram and navigation.
- Headline direction: “I build digital systems that connect ideas to real experiences.” This is a draft and can be refined.
- Supporting line: “Software developer focused on web experiences, interactive applications, and connected systems.” Keep claims grounded in the confirmed portfolio.
- Primary CTA: Explore selected work.
- Secondary CTA: Get in touch.
- A deliberate interactive 3D composition that responds gently to pointer movement on desktop. On touch screens, replace pointer movement with a stable, lightweight presentation.

### Scroll narrative
1. **Hero / Enter the Atlas:** establish Ahmed's identity and the original 3D visual.
2. **Selected Systems:** the three featured projects appear as distinct stations, not a standard repeated grid. Each project should still have a clear title, one-line value proposition, role/context, technologies, and a working action.
3. **Case-study view:** focused project page or modal/page transition with overview, problem/context, key workflows, implementation highlights, genuine screenshots, and verified links.
4. **Capabilities:** Web Experiences, Interactive Applications, and Embedded/Connected Systems—only where supported by approved project details.
5. **Technical Toolkit:** grouped skills, distinguishing tools used in projects from skills currently being learned. No fake proficiency percentages.
6. **Journey:** relevant training, freelance experience, and teaching/program experience from the CV, with dates checked before publication.
7. **Contact:** clear email, GitHub, LinkedIn, and an optional approved CV download.

Navigation must remain understandable even if the 3D scene is disabled. Add a visible “Skip to work” path and conventional navigation links.

## 4. Project content — confirmed draft for the initial build

### Project 01 — BATU University Portal
- **Public title:** BATU University Portal
- **Tagline:** A responsive Arabic/English university website with a student services portal, online fee-payment flow, and a Children's University registration system.
- **Card description:** A multi-page website for Burg Al Arab Technological University covering faculties, staff, student projects, news, admissions, and student services, including a simulated fee-payment flow.
- **Long description:** Built for Borg El Arab Technological University, the site brings academic information, admissions, student services, and fee payment into one place. It includes 40+ pages with an RTL-first layout and responsive navigation.
- **Features to highlight:** faculty and department pages; searchable staff directory; filterable graduation-project gallery; data-driven news pages; Children's University registration for six programs and age groups 7–10 and 11–15; seven student-service areas; admissions guidance; and a payment flow with validation, card preview, masked saved-card display, simulated processing, transaction ID, and transaction records.
- **Technical details:** HTML5, Tailwind CSS, Bootstrap 5 RTL, vanilla JavaScript, Alpine.js, Swiper.js, AOS, Font Awesome, Google Fonts, and localStorage.
- **Implementation highlights:** RTL-first UI; reusable/shared navigation behavior; data-driven rendering; form validation; client-side card validation using Luhn; only masked card data stored; IntersectionObserver counter animation.
- **Live demo:** https://kameloex.github.io/BATU/
- **Honesty note:** Describe fee payment as simulated. Do not imply that a real bank/payment gateway processes transactions.

### Project 02 — BATU Projects Hub
- **Public title:** BATU Projects Hub
- **Tagline:** A showcase platform for student embedded-systems projects, with project pages, events, knowledge guides, and team registration.
- **Card description:** A responsive front-end platform for presenting IT Department embedded-systems projects, exhibitions, event registration, project guidelines, and Arduino/ESP32/Raspberry Pi learning resources.
- **Long description:** Built for the university's Information Technology Department to give student embedded-systems projects a shared place for showcasing, documentation, team information, and evaluation. The supplied project brief states that the department had 82+ projects in 2023 and that the first IT exhibition showcased 52 projects.
- **Features to highlight:** project gallery; team-leader add-project flow; team member entry; upload fields for video/poster/book/presentation/images; event registration modals; exhibition pages and feedback; Knowledge section; implementation and board guides; project-book/video/general guidelines; login and change-password screens.
- **Technical details:** HTML5, CSS3, vanilla JavaScript/DOM manipulation.
- **Implementation highlights:** handwritten responsive CSS, 23 media queries, custom image slider, sticky header, slide-out sidebar, click-outside behavior, modals, multi-page information architecture.
- **Live demo:** https://kameloex.github.io/Batu-projects/
- **Positioning:** clearly label this as a front-end showcase/information platform. Do not claim a production backend or real uploads unless confirmed.

### Project 03 — PAYNGO Smart Cart Interface
- **Public title:** PAYNGO Smart Cart Interface
- **Tagline:** The touchscreen interface of a smart shopping cart: scan products, review the cart, pay, and walk out without a checkout line.
- **Card description:** The web interface for a smart shopping cart, with barcode-based cart updates, offers, profile and loyalty coins, a simulated checkout flow, and an admin dashboard.
- **Long description:** The software interface for a smart-shopping-cart project. The customer workflow includes product scanning, cart management, offers, profile, loyalty coins, and checkout. A separate admin experience manages products and categories. The demo uses a local simulated banking layer rather than a real payment gateway.
- **Features to highlight:** barcode reader input for EAN-13; debounced scan input; repeated scans update quantity; per-user cart; customer/admin experiences; category browsing; offers; editable profile; 1 coin per 10 EGP spent; mock card validation and balance deduction; transaction confirmation; admin product/category CRUD; Canvas API sales chart.
- **Technical details:** HTML5, CSS3, JavaScript ES6, Tailwind CSS, Bootstrap 5, Canvas API, localStorage.
- **Repository/demo status:** Not yet published to GitHub according to Ahmed. Do not invent a live URL. Before public launch, publish the project or provide approved screenshots/video. Until then, render no broken demo button and no fake repository link.
- **Required demo note when it is published:** “Demo tip: Sign up with any account to explore the demo.” Place it beside the demo CTA or in the project detail page, not as a distracting warning on the main card.
- **Honesty note:** Payment, balance, rewards, and transaction behaviors are simulated/local demo logic; do not describe them as a real bank integration.

## 5. Project order and launch strategy
1. **BATU University Portal** — lead with the broadest information architecture and the most detailed set of interactive modules.
2. **PAYNGO Smart Cart Interface** — visually distinctive and ideal for the 3D/interactive storytelling, but publish and test the demo first or prepare genuine screenshots/video.
3. **BATU Projects Hub** — demonstrates content architecture, responsive CSS, project/event flows, and educational documentation.

This ordering is provisional. Confirm the clearest individual contribution and best screenshots before final launch. If PAYNGO isn't publicly accessible yet, either keep the card as a genuine case study with screenshots and no demo link, or delay featuring it until the repo/demo is ready.

## 6. Stack
- Next.js App Router + React + TypeScript.
- Tailwind CSS for the design system and responsive layout.
- Motion for React (`motion/react`) for interface transitions and small interactive effects.
- Three.js via React Three Fiber + Drei for the hero scene and a limited number of purposeful 3D interactions.
- Lucide icons sparingly.
- Git/GitHub for version control; Vercel for deployment.
- No database/backend required for the portfolio's first release. Contact actions can use verified mail/profile links unless a real form provider is configured.

Do not add GSAP, physics, external model libraries, or post-processing effects unless a specific, reviewed design need justifies them. Keep 3D lazy-loaded and isolated from the readable content.

## 7. Content rules and CV
- Public name: Ahmed Kamel (confirm exact preferred public name before launch).
- Do not display an expected graduation year; do not imply Ahmed has already graduated.
- Do not invent job titles, years of experience, client names, metrics, awards, testimonials, or outcomes.
- Do not claim every listed technology is an expert-level skill. Separate “Used in projects” and “Currently learning” where useful.
- Keep the portfolio in English by default for professional reach; decide later whether to add an Arabic language toggle. Do not add a bilingual toggle unless content and QA can support both languages properly.
- Do not expose a phone number unless Ahmed explicitly approves it for public display. Default contact options: email, GitHub, LinkedIn.
- Confirm which work was individual vs team work and clearly describe Ahmed's own role.
- Centralize projects in `src/data/projects.ts` rather than hardcoding project copy inside components.

## 8. Suggested structure
```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    work/[slug]/page.tsx
  components/
    layout/Navbar.tsx
    layout/Footer.tsx
    atlas/AtlasExperience.tsx
    atlas/AtlasFallback.tsx
    sections/Hero.tsx
    sections/SelectedWork.tsx
    sections/Capabilities.tsx
    sections/Skills.tsx
    sections/Journey.tsx
    sections/Contact.tsx
    projects/ProjectStation.tsx
    projects/ProjectCaseStudy.tsx
    ui/SectionHeading.tsx
    ui/ActionLink.tsx
  data/
    projects.ts
    skills.ts
    journey.ts
  lib/
    motion.ts
    utils.ts
public/
  images/projects/
  models/
  resume.pdf  # only if approved
```

Adapt to current framework defaults and dependencies. Avoid unnecessary abstraction.

## 9. Performance, accessibility, and quality
- Responsive from approximately 360px mobile width to large desktop.
- Semantic structure, visible keyboard focus, sufficient contrast, meaningful alt text, keyboard-usable navigation.
- Respect `prefers-reduced-motion` and provide a static/2D fallback when WebGL is unavailable or device performance is poor.
- Never make navigation or project details dependent on hover or 3D interaction.
- Dynamic-import/lazy-load the 3D scene; reserve its layout size to prevent layout shift.
- Avoid excessive bloom, particles, heavy 3D models, large videos, and long fake loading screens.
- Test mobile touch interaction, keyboard flow, console errors, hydration, broken links, horizontal overflow, load performance, SEO metadata, and production build.
- No fake statistics, fake project screenshots, placeholder CTA buttons, or misleading live-demo links.

## 10. Antigravity + Codex workflow
- Antigravity is the primary implementation agent: inspect repo, plan, build, launch locally, inspect in browser, and refine.
- Codex is the independent reviewer: inspect the current diff, report findings first, then apply only approved fixes.
- Work from the same local repository if supported, but never let both agents edit the same files simultaneously. Use Git commits/branches as hand-off points.
- Git is the source of truth; no custom direct connection or API bridge between the agents is required for this workflow.
- Do not ask the agents to implement the full design in one giant step. Use the phases below and review after each milestone.

## 11. Implementation phases
1. **Planning only:** inspect this brief and current repo, then create `SITE_PLAN.md` with layout, art direction, section wireframes, animation inventory, verified content, missing assets, accessibility/performance plan. Do not implement the whole site yet.
2. **Foundation:** initialize/configure the app, fonts/tokens, responsive layout, navigation, and content data model. Ensure it works without WebGL.
3. **Visual baseline:** implement the full layout and real project descriptions with static/2D art. Confirm all copy and links.
4. **3D atlas:** implement the custom core and the three project stations. Keep scene complexity low and test mobile/fallback behavior.
5. **Motion polish:** add focused transition/reveal/hover interactions, reduced-motion support, and no unnecessary effects.
6. **Case studies and genuine assets:** add actual screenshots, workflow captures, links, and confirmed role details. Prepare PAYNGO demo before attaching a public demo link.
7. **QA/review:** run locally and inspect desktop, tablet, and mobile; check lint/type checks/build/links/console/accessibility/performance. Codex reviews the diff and gives findings before changing files.
8. **Release:** publish the repository and deploy to Vercel; verify the public site and every link.

## 12. Initial prompt for Antigravity

> Read `portfolio_blueprint.md` fully. Treat it as the approved content and direction. The goal is an original interactive 3D portfolio called “The Interactive Systems Atlas,” not a clone of the reference portfolio. Inspect the current repository and actual project assets first. For now, do Phase 1 only: create `SITE_PLAN.md` with a concrete wireframe, visual system, animations, performance fallbacks, project presentation strategy, component structure, and remaining questions/assets needed. Verify the two live BATU project URLs and keep PAYNGO marked as unpublished. Do not invent assets, statistics, job experience, technology usage, or links. Do not build the whole website until the plan is reviewed.

## 13. Initial prompt for Codex after the first implementation milestone

> Review the current Git diff and running portfolio against `portfolio_blueprint.md` and `SITE_PLAN.md`. Do not edit files yet. Report prioritized issues in: correctness of project content/links, originality of the design, responsiveness, accessibility, 3D fallback/performance, console/runtime errors, and maintainability. Do not suggest fake metrics or unsupported claims. Wait for approval before implementing fixes.
