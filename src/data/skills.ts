// src/data/skills.ts
// Structured skill definitions separating confirmed technologies used in projects
// from skills currently being learned. No fake proficiency percentages.

export interface SkillCategory {
  categoryName: string;
  description: string;
  skills: {
    name: string;
    note?: string;
  }[];
}

export interface ToolkitData {
  usedInProjects: SkillCategory[];
  currentlyLearning: SkillCategory[];
}

export const toolkitData: ToolkitData = {
  usedInProjects: [
    {
      categoryName: "Languages & Core Web",
      description: "Fundamental languages and web standards used across confirmed projects.",
      skills: [
        { name: "JavaScript (ES6+)" },
        { name: "HTML5" },
        { name: "CSS3" },
        { name: "DOM Manipulation" },
        { name: "Canvas API" },
      ],
    },
    {
      categoryName: "Styling & UI Architecture",
      description: "CSS frameworks, responsive systems, and RTL layout implementations.",
      skills: [
        { name: "Tailwind CSS" },
        { name: "Bootstrap 5 (LTR/RTL)" },
        { name: "Responsive Media Queries" },
        { name: "CSS Grid & Flexbox" },
      ],
    },
    {
      categoryName: "Client-Side Libraries & Tooling",
      description: "Modular scripting, storage APIs, and client-side interaction utilities.",
      skills: [
        { name: "Alpine.js" },
        { name: "Swiper.js" },
        { name: "AOS (Animate On Scroll)" },
        { name: "Web Storage (localStorage)" },
        { name: "Hardware Barcode Integration (EAN-13)" },
      ],
    },
  ],
  // Empty typed structure awaiting Ahmed's confirmed list of tools currently being learned
  currentlyLearning: [],
};
