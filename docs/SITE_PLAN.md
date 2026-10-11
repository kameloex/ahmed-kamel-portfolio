# SITE_PLAN.md — The Interactive Systems Atlas

Status: **Phase 1 (planning only). Awaiting review. No site code has been written.**
Source of truth for content and direction: `portfolio_blueprint.md`. Anything not in that file is marked as a question or a missing asset below, never filled in.

---

## 0. Project inspection summary

| Item | Finding |
|---|---|
| Files supplied | `portfolio_blueprint.md` only (read in full) |
| Existing repository / `package.json` / `src/` | None found. This is a greenfield build |
| Screenshots, recordings, logos, OG image, favicon | None supplied |
| CV / résumé PDF | None supplied |
| Fonts, 3D models | None supplied (plan uses no external models) |
| Contact details (email, GitHub, LinkedIn URLs) | Not in the blueprint |

Phase 2 will start from a fresh Next.js App Router project, per the blueprint's stack.

---

## 1. Visual concept

### 1.1 Idea
The site is a calm, dark, explorable map. A **system core** sits at the centre of the opening scene. Three **stations** sit on its outer ring and each stands for one project. The core and stations are a visual metaphor for "one person's work, laid out as a map". They do **not** claim the three projects share a codebase or architecture. Every case study states plainly that the projects are separate.

### 1.2 Where the boldness goes
One memorable element: the **system core** in the hero, drawn from hairline rings, thin layered panels and connected nodes. Everything else (type, spacing, About/Skills/Journey/Contact) stays quiet and readable.

### 1.3 Tokens (palette fixed by the blueprint)
| Token | Hex | Role |
|---|---|---|
| `--bg` | `#080B10` | Page background |
| `--surface` | `#111720` | Panels, station frames |
| `--ink` | `#F5F7FA` | Primary text |
| `--muted` | `#9AA7B6` | Secondary text (check contrast on `--bg` and `--surface` in Phase 2) |
| `--accent` | `#77CFFF` | Lines, focus ring, active states |
| `--deep` | `#15384B` | Filled shapes, hover wash, depth tint |

Rules: ice-blue is used for lines and state, never as a large fill. No gradient washes, no glow/bloom.

### 1.3.1 Typography (proposal, needs your approval)
- **Display:** Bricolage Grotesque (variable; its width and optical-size axes let headlines feel engineered rather than default).
- **Body/UI:** Instrument Sans. Clearly different from the display face, quiet at small sizes.
- Both via `next/font` (self-hosted at build, no runtime request).
- Scale: 1.25 ratio, body 17–18px, line length under 70ch, sentence case everywhere.
- Deliberately avoided: all-caps tracked eyebrow labels over every heading, one-word accent in headlines, middle-dot meta strings, monospace on every small label, `→` on every link, and 01/02/03 numbering on the projects (they are not a sequence; the order is provisional).

### 1.4 Original-ness check against the reference site
The reference is used only as a quality bar. This plan differs in section order, composition, the hero object, the way projects are presented (three bespoke stations, not a repeated card grid), and typography. No layout, copy or visual detail is taken from it.

---

## 2. Page wireframes

### 2.1 Home (desktop, ~1440px)

```
┌──────────────────────────────────────────────────────────────────┐
│ [AK monogram]        Work  Capabilities  Toolkit  Journey  Contact│  sticky, 64px
│ ( Skip to work )  <- visible on keyboard focus                    │
├──────────────────────────────────────────────────────────────────┤
│ HERO (100svh, canvas area reserved)                              │
│                                                                  │
│  I build digital systems that      .  ○ ─── ◯ ─── ○              │
│  connect ideas to real            ╱  ╲     ╱                     │
│  experiences.                    ○ ── [ CORE ] ── ○   <- 3D core │
│                                   ╲  ╱     ╲                     │
│  Software developer focused on…    ○ ─── ◯ ─── ○                 │
│  [Explore selected work] [Get in touch]    three station nodes   │
├──────────────────────────────────────────────────────────────────┤
│ SELECTED SYSTEMS (three stations, each a different composition)  │
│                                                                  │
│  Station A: wide, full-bleed, layered panels left, text right    │
│  Station B: text left, scan-to-checkout flow right               │
│  Station C: constellation spanning the full width, text below    │
│  Each: title · one-line value · role/context · tech · actions    │
├──────────────────────────────────────────────────────────────────┤
│ CAPABILITIES  3 columns, 2D                                      │
│ TOOLKIT       grouped lists: "Used in projects" / "Learning"     │
│ JOURNEY       vertical timeline (real sequence, so ordering is ok)│
│ CONTACT       email · GitHub · LinkedIn · optional CV            │
│ FOOTER                                                           │
└──────────────────────────────────────────────────────────────────┘
```

### 2.2 Case-study page `/work/[slug]`

```
┌──────────────────────────────────────────────────────────────────┐
│ Navbar    ← Back to selected work                                │
│ Title + tagline                 [Live demo]* [Repository]*       │
│ Role · context · technologies   (*only if verified, see §5)      │
│ ── Hero media: real screenshot/recording (never a mock)          │
│ Overview │ Context │ Key workflows │ Implementation highlights   │
│ Screenshot gallery (real captures, with alt text)                │
│ Honesty note (e.g. "Payment flow is simulated")                  │
│ Next project                                                     │
└──────────────────────────────────────────────────────────────────┘
```

**Decision for review:** case studies are real routes, not modals. They are linkable, indexable, work without JS-heavy state, and reuse the shared motion transition (§4). The blueprint allows either.

### 2.3 Mobile (360px)
Single column. Hero shows a static or lightweight core render above the text, CTAs stack. Stations become vertical blocks, each with its own compact visual and the same required information. Nav collapses to a button that opens a full-screen menu with real links.

---

## 3. Station design: three distinct interactive stations

Each station has (a) a **non-3D, fully readable version** that is the default for text, links and facts, and (b) an interactive visual layer. Nothing important depends on hover or 3D.

### Station A — BATU University Portal: "Layered information environment"
- **Visual:** a stack of thin translucent panels along the depth axis, like floors of an organised interface. Not a model of the real campus.
- **Interaction:** pointer or drag tilts the stack; scrolling through the station separates the layers one at a time. Each layer carries a label taken from the blueprint feature list: faculties & staff, student projects & news, admissions, student services, Children's University registration, fee payment (simulated).
- **Keyboard/touch alternative:** a row of buttons ("Academics", "Admissions", "Student services", "Payment (simulated)") highlights the same layers and updates the text beside them.
- **Content shown:** tagline, card description, technologies, features, live-demo action.
- **Motion meaning:** layer separation shows "many areas, one place".

### Station B — PAYNGO Smart Cart Interface: "Scan-to-checkout flow"
- **Visual:** product tiles on a conveyor-like plane, a scanning line, and a cart/interface panel to the right.
- **Interaction:** the scan line sweeps a tile into the cart panel; scanning the same tile again increments its quantity (matching "repeated scans update quantity"). A four-state stepper drives it: Scan → Cart → Pay (simulated) → Confirmed.
- **Keyboard/touch alternative:** a "Step through the flow" button advances the states; the stepper is real buttons.
- **Labelling:** the visual carries a small persistent note "Simulated demo logic". Tiles are generic shapes. **No product names, prices, brand logos or fake totals.** It must read as a touchscreen interface, not as a connection to scanner hardware or a bank.
- **Status:** unpublished (see §5). No demo button, no repo link.

### Station C — BATU Projects Hub: "Archive constellation"
- **Visual:** linked nodes and board-like cards forming a constellation, suggesting an archive of projects and learning resources.
- **Interaction:** focus/hover/tap a node to open its card. Node topics are limited to the blueprint features: project gallery, team-leader add-project flow, event registration, exhibition pages, Knowledge section (implementation and board guides), guidelines, login/change-password.
- **Keyboard/touch alternative:** the same topics as a list of buttons that highlight the node.
- **Positioning text:** "front-end showcase/information platform". No claim of a production backend or real uploads.
- **Statistics:** the 82+ projects (2023) and 52 exhibited projects appear only on the case-study page, attributed to "the supplied project brief", and are shown only if you confirm them.

### Cross-station rules
- Stations have different compositions (layered stack, flow, constellation) so the section never reads as a repeated grid.
- Only one 3D station canvas is mounted at a time (§7).
- Honesty notes are part of the data, not hardcoded in components.

---

## 4. Animation storyboard

| # | Moment | Trigger | What happens | Purpose |
|---|---|---|---|---|
| 1 | Entrance | Page load (once) | Core draws in: rings trace, nodes light one at a time, headline appears. Under 1.5s, no loading screen | The single orchestrated moment |
| 2 | Pointer response | Desktop pointer move | Core tilts a few degrees, nearest node brightens | Signals interactivity |
| 3 | Touch presentation | Touch devices | No pointer tracking; core idles with very slow rotation, or is static | Stable and cheap |
| 4 | Core → stations | Scroll past hero | Camera/scene hand-off: hero canvas pauses and unmounts; Station A mounts | Keeps one active canvas |
| 5 | Station A layers | Scroll within station / layer buttons | Panels separate and label | Shows structure |
| 6 | Station B flow | Scroll into view, or step button | Scan line sweep → tile moves to cart → quantity ticks → state changes | Shows the workflow |
| 7 | Station C nodes | Focus/hover/tap | Links brighten, card opens | Shows relationships |
| 8 | Station → case study | Click "View case study" | Shared-element title and frame transition (Motion `layoutId`) to `/work/[slug]` | Shows where you are going |
| 9 | Reveals | Scroll (Capabilities → Contact) | Minimal: no per-card fade-up on everything. Only the Journey line draws as you scroll | Restraint |
| 10 | State feedback | Buttons, menus | Short opacity/transform feedback on action | Confirms input |

**Reduced motion:** all of 1–9 become instant state changes or simple crossfades; scenes render a single still frame; scroll-linked effects off.
**No motion for its own sake:** no looping particles, no parallax on text, no hover lift on every card.

---

## 5. Live demo and link verification (item 5)

### 5.1 Results

| Project | URL (from blueprint) | Verification result | Plan status |
|---|---|---|---|
| BATU University Portal | https://kameloex.github.io/BATU/ | **Not verified.** DNS resolution failed from the build sandbox (`kameloex.github.io` could not be resolved), the web-fetch tool refused a URL that no search had returned, and web searches for it returned nothing relevant. This does *not* show the site is down | `unverified` |
| BATU Projects Hub | https://kameloex.github.io/Batu-projects/ | **Not verified**, same reasons | `unverified` |
| PAYNGO Smart Cart Interface | none | Not applicable | **`unpublished`** |

### 5.2 What this means for the build
- The two BATU URLs stay in `projects.ts` with `status: "unverified"`. The "Live demo" button will only render when the URL has been confirmed to load. Until then I will not present them as verified in any report.
- **Action for you or the next agent, before Phase 3:** open both URLs in a browser (or run `curl -I` on a machine with normal internet), confirm HTTP 200, and note that GitHub Pages paths are case-sensitive (`/BATU/` vs `/Batu-projects/`). Tell me the result and I will mark them `live`. A link-check script will also be added in the QA phase.
- **PAYNGO stays `unpublished`:** no demo button, no repository link, no placeholder CTA. The case study shows genuine screenshots or recording only once supplied. When it is published, the required note "Demo tip: Sign up with any account to explore the demo." goes beside the demo CTA on the detail page (not on the home card).

### 5.3 Data-model guard
```ts
type ProjectStatus = "live" | "unverified" | "unpublished";

interface ProjectLink { label: string; url: string; verifiedOn: string } // ISO date

interface Project {
  slug: string;
  title: string;
  tagline: string;
  cardDescription: string;
  longDescription: string;
  features: string[];
  technologies: string[];
  implementationHighlights: string[];
  honestyNote: string;
  status: ProjectStatus;
  demo?: ProjectLink;        // absent unless verified
  repo?: ProjectLink;        // absent unless real
  demoNote?: string;         // PAYNGO tip, shown only when demo exists
  role?: string;             // unknown until confirmed
  media: { src: string; alt: string; kind: "screenshot" | "video" }[]; // empty until supplied
}
```
`ActionLink` renders nothing when its URL is undefined, so a broken or fake button cannot appear by accident. Copy lives in `src/data/projects.ts` only.

---

## 6. Component architecture

Adapted from the blueprint structure. No extra abstraction.

```
src/
  app/
    layout.tsx            fonts, metadata, skip link, Navbar/Footer
    page.tsx              composes sections
    globals.css           tokens (CSS variables), focus styles, reduced-motion rules
    work/[slug]/page.tsx  statically generated from projects.ts
    not-found.tsx
  components/
    layout/Navbar.tsx  Footer.tsx
    atlas/
      AtlasExperience.tsx   client; lazy-loaded R3F hero scene (dynamic, ssr:false)
      AtlasFallback.tsx     SVG/CSS static core, server-renderable, same size
      SystemCore.tsx        rings, panels, nodes
      useAtlasCapabilities.ts  decides 3D vs fallback (see §7)
    sections/Hero  SelectedWork  Capabilities  Skills  Journey  Contact
    projects/
      ProjectStation.tsx        shared shell: text, tech, actions, status
      stations/PortalLayers.tsx      Station A visual (3D + fallback)
      stations/CartFlow.tsx          Station B visual (3D + fallback)
      stations/HubConstellation.tsx  Station C visual (3D + fallback)
      ProjectCaseStudy.tsx
    ui/SectionHeading  ActionLink  SimulatedBadge
  data/  projects.ts  skills.ts  journey.ts  site.ts (name, links)
  lib/   motion.ts  utils.ts
public/
  images/projects/   (empty until real captures)
  resume.pdf         only if approved
```

Boundaries:
- Server components by default; `"use client"` only for the scene wrappers, nav menu and stations.
- Every 3D component has a paired 2D fallback that carries all text and links. 3D is decoration plus interaction, never the only path.

---

## 7. Performance strategy and fallbacks

**Loading**
- `next/dynamic` with `ssr: false` for the 3D wrappers; Three.js/R3F/Drei do not enter the initial JS.
- The hero's fallback renders on the server at the same dimensions, so there is no layout shift when the canvas swaps in.
- Mount 3D only after first paint (`requestIdleCallback` with a timeout fallback).

**Rendering**
- Hero canvas pauses (`frameloop="never"`/`"demand"`) and unmounts when off-screen. Only one station canvas is mounted at a time, chosen with IntersectionObserver.
- DPR capped at 1.5 (1 on low-power devices). Antialiasing on desktop only.
- Geometry is procedural: lines, rings and instanced nodes. No downloaded models, no HDR environment, no post-processing, no bloom, no particles.
- Drei used only for helpers actually needed. No GSAP, physics or extra 3D libs (blueprint rule).

**Fallback triggers** (any one → 2D fallback)
- WebGL unavailable or context lost.
- `prefers-reduced-motion: reduce` (still image of the scene, no animation).
- `navigator.connection.saveData` true, very low `hardwareConcurrency`/`deviceMemory` where exposed, or a frame-time probe averaging above the target during the first second.
- A user-visible "Switch to simple view" toggle (persisted in `localStorage` with try/catch).

**Content and assets**
- Images via `next/image`, WebP/AVIF, explicit width/height, lazy below the fold.
- No autoplaying large videos; recordings are optional, poster first, click to play.
- Fonts self-hosted, `display: swap`, two families at most.

**Targets for Phase 7 to measure (not claims):** no layout shift from the canvas; LCP element is the headline/text, not the canvas; no console or hydration errors; production build passes with type-check and lint. Specific Lighthouse numbers will be recorded only after they are measured.

---

## 8. Responsive behavior

| Breakpoint | Behavior |
|---|---|
| 360–599px | Single column. Static or very light hero visual. Stations are stacked blocks with step buttons rather than drag. Menu is full-screen. Tap targets at least 44px |
| 600–1023px | Two-column text/visual where space allows. Hero scene runs only if capability checks pass |
| 1024px+ | Full composition, pointer response, scroll-linked station effects |
| 1920px+ | Content max-width ~1280px; scene may scale up, text stays at readable line length |

Rules: no horizontal overflow at any width (checked at 360, 390, 768, 1024, 1440); visual always follows the text in source order on mobile; no feature depends on hover; touch uses tap/drag, never pointer tracking.

---

## 9. Accessibility and SEO plan
- Semantic landmarks, one `h1`, ordered headings; "Skip to work" link first in tab order, visible on focus; conventional nav links work with 3D disabled.
- Visible focus ring in `--accent`; contrast of `--muted` on `--bg` and `--surface` checked in Phase 2.
- 3D canvases are `aria-hidden` with an adjacent text description; interactive parts have button equivalents.
- Real alt text for every screenshot (written from the actual capture).
- Metadata: title, description, canonical, Open Graph and Twitter cards. OG image requires an approved asset (see §10).
- `lang="en"`. No Arabic toggle in the first release (blueprint rule). Arabic UI inside the BATU demos is described, not reproduced.

---

## 10. Missing assets and content

### Required before launch
| # | Missing item | Needed for |
|---|---|---|
| 1 | Screenshots or short recordings of **each** project (portal, hub, PAYNGO), with permission to show them | Case studies, station media |
| 2 | PAYNGO: published GitHub repo + demo URL, **or** approved screenshots/video and a decision to ship without a demo link | Station B, case study |
| 3 | Confirmed result of opening both BATU demo URLs | Marking links `live` |
| 4 | Ahmed's role on each project, and which parts were individual vs team | Role line, case studies |
| 5 | Email, GitHub profile URL, LinkedIn URL | Contact section |
| 6 | Whether a CV download is approved, and the PDF if so | Contact (optional) |
| 7 | CV details for Journey: training, freelance experience, teaching/program experience, with dates | Journey section |
| 8 | Skills split: "used in projects" vs "currently learning" | Toolkit section |
| 9 | Exact public name spelling and preferred title line | Hero, metadata |
| 10 | Favicon/monogram preference and an OG image (or approval to generate a simple on-brand one) | Metadata |

### Questions to resolve
1. **University name spelling:** the blueprint writes "Burg Al Arab" in Project 01's tagline and "Borg El Arab" in its long description. Which spelling to use publicly? (The university's own site uses "Borg El Arab".)
2. **Project order:** the blueprint order is provisional (Portal, PAYNGO, Hub). With PAYNGO lacking a demo, should it stay second as an honest case study without a demo button, or move to the end/be delayed?
3. **Statistics:** may "82+ projects in 2023" and "52 exhibited projects" be shown, attributed to the supplied project brief? Also "40+ pages" for the portal.
4. **Typography:** approve Bricolage Grotesque + Instrument Sans, or name alternatives.
5. **Case studies as pages** (recommended) vs modals.
6. **"Embedded/Connected Systems" capability:** the blueprint says to include it only where supported by approved project details. The Hub covers Arduino/ESP32/Raspberry Pi learning resources and PAYNGO is a smart-cart *interface*, but neither is shown to involve device firmware written by Ahmed. I will word this carefully, or omit it, unless you confirm hands-on embedded work.

### Not planned (per blueprint)
Graduation year, phone number, job titles, years of experience, client names, metrics, awards, testimonials, proficiency percentages, real payment/bank claims, fake screenshots.

---

## 11. Content guardrails carried into the build
- Fee payment (Portal) and payment/balance/rewards (PAYNGO) are always described as simulated/local demo logic.
- The Hub is described as a front-end showcase platform, with no claim of a production backend or real uploads.
- Station visuals are metaphors, not accurate models, and the "systems atlas" idea never implies the projects are connected.
- Technology lists are copied from the blueprint; none added.

---

## 12. Proposed phase plan after approval

| Phase | Output |
|---|---|
| 2 Foundation | Next.js + TS + Tailwind + Motion setup, tokens, fonts, layout, nav, `projects.ts`/`skills.ts`/`journey.ts`; works with no WebGL |
| 3 Visual baseline | Full layout, real copy, static/2D station art, link states |
| 4 3D atlas | Core + three stations, capability gating, fallbacks |
| 5 Motion polish | Storyboard items 1–10, reduced-motion pass |
| 6 Assets | Real screenshots, confirmed roles, PAYNGO demo state |
| 7 QA/review | Lint, type-check, build, link check, a11y, overflow, console, perf |
| 8 Release | GitHub + Vercel, post-deploy link check |

**Stop point:** nothing proceeds to Phase 2 until you review this plan and answer the questions in §10.
