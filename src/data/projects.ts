// src/data/projects.ts
// Source of truth for all project copy, strictly following portfolio_blueprint.md and SITE_PLAN.md.
// No invented data, links, statistics, or metrics.

export type ProjectStatus = "live" | "unverified" | "unpublished";

export interface ProjectMedia {
  src: string;
  alt: string;
  kind: "screenshot" | "video";
}

export interface ProjectLink {
  label: string;
  url: string;
  verifiedOn?: string;
}

export interface Project {
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
  demo?: ProjectLink;
  repo?: ProjectLink;
  demoNote?: string;
  role?: string;
  stationType: "portal" | "cart" | "hub";
  media: ProjectMedia[];
}

export const projects: Project[] = [
  {
    slug: "batu-university-portal",
    title: "BATU University Portal",
    tagline:
      "A responsive Arabic/English university website with a student services portal, online fee-payment flow, and a Children's University registration system.",
    // TODO: Confirm university name spelling with user ("Borg El Arab" is used here per instruction).
    cardDescription:
      "A multi-page website for Borg El Arab Technological University covering faculties, staff, student projects, news, admissions, and student services, including a simulated fee-payment flow.",
    // Note: Statistic "40+ pages" is hidden until user confirms.
    longDescription:
      "Built for Borg El Arab Technological University, the site brings academic information, admissions, student services, and fee payment into one place. It includes an RTL-first layout and responsive navigation.",
    features: [
      "Faculty and department pages",
      "Searchable staff directory",
      "Filterable graduation-project gallery",
      "Data-driven news pages",
      "Children's University registration for six programs and age groups 7–10 and 11–15",
      "Seven student-service areas",
      "Admissions guidance",
      "Payment flow with validation, card preview, masked saved-card display, simulated processing, transaction ID, and transaction records",
    ],
    technologies: [
      "HTML5",
      "Tailwind CSS",
      "Bootstrap 5 RTL",
      "Vanilla JavaScript",
      "Alpine.js",
      "Swiper.js",
      "AOS",
      "Font Awesome",
      "Google Fonts",
      "localStorage",
    ],
    implementationHighlights: [
      "RTL-first UI architecture",
      "Reusable and shared navigation behavior",
      "Data-driven rendering patterns",
      "Robust form validation",
      "Client-side card validation using Luhn algorithm",
      "Only masked card data stored locally",
      "IntersectionObserver counter animation",
    ],
    honestyNote:
      "Simulated demo logic: fee payment is a simulated front-end flow with client-side Luhn validation. It does not process transactions through a live bank or financial payment gateway.",
    status: "unverified", // Will render demo CTA only when verified as "live"
    demo: {
      label: "Live demo",
      url: "https://kameloex.github.io/BATU/",
    },
    stationType: "portal",
    media: [
      {
        src: "/images/projects/batu-university-portal/Screenshot 2025-09-07 133359.png",
        alt: "BATU University Portal primary landing page and header navigation",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-university-portal/Screenshot 2025-09-07 133409.png",
        alt: "Faculties overview and academic department curriculum pages",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-university-portal/Screenshot 2025-09-07 133430.png",
        alt: "Searchable faculty and staff directory interface",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-university-portal/Screenshot 2025-09-07 133447.png",
        alt: "Filterable student graduation project showcase gallery",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-university-portal/Screenshot 2025-09-07 133502.png",
        alt: "Children's University program registration for age groups 7–10 and 11–15",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-university-portal/Screenshot 2025-09-07 133545.png",
        alt: "Simulated fee payment interface with card input and client-side Luhn validation",
        kind: "screenshot",
      },
    ],
  },
  {
    slug: "payngo-smart-cart-interface",
    title: "PAYNGO Smart Cart Interface",
    tagline:
      "The touchscreen interface of a smart shopping cart: scan products, review the cart, pay, and walk out without a checkout line.",
    cardDescription:
      "The web interface for a smart shopping cart, with barcode-based cart updates, offers, profile and loyalty coins, a simulated checkout flow, and an admin dashboard.",
    longDescription:
      "The software interface for a smart-shopping-cart project. The customer workflow includes product scanning, cart management, offers, profile, loyalty coins, and checkout. A separate admin experience manages products and categories. The demo uses a local simulated banking layer rather than a real payment gateway.",
    features: [
      "Barcode reader input for EAN-13",
      "Debounced scan input",
      "Repeated scans update product quantity",
      "Per-user cart state management",
      "Dedicated customer and admin experiences",
      "Category browsing and filtered item discovery",
      "Special offers management",
      "Editable profile configuration",
      "Loyalty rewards program (1 coin per 10 EGP spent)",
      "Mock card validation and balance deduction",
      "Transaction confirmation screen",
      "Admin product and category CRUD operations",
      "Canvas API sales chart visualization",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript ES6",
      "Tailwind CSS",
      "Bootstrap 5",
      "Canvas API",
      "localStorage",
    ],
    implementationHighlights: [
      "Hardware barcode scanner integration handling EAN-13 timing",
      "Debounced scanning mechanism preventing duplicate reads",
      "Custom state transitions across scan-to-checkout pipeline",
      "Client-side transactional state and wallet simulation",
      "Direct HTML5 Canvas charting without heavy third-party libraries",
    ],
    honestyNote:
      "Simulated demo logic: payment, balance deduction, loyalty rewards, and transaction records operate as local client-side simulation. The interface does not communicate with a real banking institution or live payment processor.",
    status: "unpublished", // Unpublished: no demo button, no repo link, no placeholder CTA
    demoNote: "Demo tip: Sign up with any account to explore the demo.",
    stationType: "cart",
    media: [
      {
        src: "/images/projects/payngo/the main photo will appear in ui.jpg",
        alt: "PAYNGO Smart Cart touchscreen dashboard and product grid",
        kind: "screenshot",
      },
      {
        src: "/images/projects/payngo/Screenshot 2026-08-03 124313.png",
        alt: "Product catalog browsing with category filtering",
        kind: "screenshot",
      },
      {
        src: "/images/projects/payngo/Screenshot 2026-08-03 124410.png",
        alt: "Barcode scanning simulation and cart item register",
        kind: "screenshot",
      },
      {
        src: "/images/projects/payngo/Screenshot 2026-08-03 124502.png",
        alt: "Simulated checkout and wallet balance deduction screen",
        kind: "screenshot",
      },
      {
        src: "/images/projects/payngo/Screenshot 2026-08-03 124607.png",
        alt: "Transaction confirmation and loyalty rewards update",
        kind: "screenshot",
      },
      {
        src: "/images/projects/payngo/Screenshot 2026-08-03 125012.png",
        alt: "Admin dashboard product and inventory management",
        kind: "screenshot",
      },
    ],
  },
  {
    slug: "batu-projects-hub",
    title: "BATU Projects Hub",
    tagline:
      "A showcase platform for student embedded-systems projects, with project pages, events, knowledge guides, and team registration.",
    // TODO: Confirm university name spelling with user ("Borg El Arab" is used here per instruction).
    cardDescription:
      "A responsive front-end platform for presenting IT Department embedded-systems projects, exhibitions, event registration, project guidelines, and Arduino/ESP32/Raspberry Pi learning resources.",
    // Note: Department statistics ("82+ projects in 2023", "52 exhibited projects") are hidden until user confirms.
    longDescription:
      "Built for the university's Information Technology Department to give student embedded-systems projects a shared place for showcasing, documentation, team information, and evaluation.",
    features: [
      "Project gallery with department indexing",
      "Team-leader add-project submission flow",
      "Team member entry and credentials",
      "Upload fields for video, poster, book, presentation, and image assets",
      "Event registration modals",
      "Exhibition overview pages and visitor feedback",
      "Knowledge section with curated tutorials",
      "Implementation and microcontroller board guides (Arduino, ESP32, Raspberry Pi)",
      "Project-book, video, and general documentation guidelines",
      "Authentication and change-password screens",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "Vanilla JavaScript",
      "DOM Manipulation",
    ],
    implementationHighlights: [
      "Handwritten responsive CSS layout architecture",
      "23 custom responsive media queries",
      "Vanilla JavaScript slider without external slider packages",
      "Sticky navigation header and slide-out drawer sidebar",
      "Accessible click-outside behavior for modal windows",
      "Structured multi-page information architecture",
    ],
    honestyNote:
      "Front-end showcase platform: designed as a front-end platform for project presentation and documentation. Does not connect to a production backend or execute real server-side file uploads.",
    status: "unverified", // Will render demo CTA only when verified as "live"
    demo: {
      label: "Live demo",
      url: "https://kameloex.github.io/Batu-projects/",
    },
    stationType: "hub",
    media: [
      {
        src: "/images/projects/batu-projects-hub/Screenshot 2025-09-07 101402.png",
        alt: "BATU Projects Hub homepage and department embedded systems gallery",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-projects-hub/Screenshot 2025-09-07 101415.png",
        alt: "Team-leader project submission workflow and asset upload fields",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-projects-hub/Screenshot 2025-09-07 101457.png",
        alt: "Technical knowledge section with Arduino, ESP32, and Raspberry Pi guides",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-projects-hub/Screenshot 2025-09-07 101536.png",
        alt: "Department exhibition overview and event visitor registration modal",
        kind: "screenshot",
      },
      {
        src: "/images/projects/batu-projects-hub/Screenshot 2025-09-07 101600.png",
        alt: "Project book, presentation, and team member credential guidelines",
        kind: "screenshot",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
