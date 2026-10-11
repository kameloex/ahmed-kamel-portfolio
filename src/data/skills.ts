// src/data/skills.ts
// Structured skill definitions separating verified technologies used in projects and CV
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
      categoryName: "Languages & Core Systems",
      description: "Core languages applied across web applications, system software, and desktop tools.",
      skills: [
        { name: "JavaScript (ES6+)", note: "Web applications & UI" },
        { name: "C# / .NET (DEPI)", note: "Full-stack development" },
        { name: "C & C++", note: "System & algorithm coursework" },
        { name: "Java", note: "Desktop LMS application" },
        { name: "Python", note: "Scripting & algorithms" },
        { name: "PHP", note: "Web backend development" },
        { name: "Dart (Flutter)", note: "Mobile app interfaces" },
        { name: "SQL", note: "Relational database queries" },
      ],
    },
    {
      categoryName: "Frontend & UI Engineering",
      description: "Interface architecture, responsive layouts, RTL-first design, and UI prototypes.",
      skills: [
        { name: "HTML5 & CSS3", note: "Semantic standards" },
        { name: "Tailwind CSS", note: "Modern utility styling" },
        { name: "Bootstrap 5 (RTL & LTR)", note: "Grid & components" },
        { name: "Vue.js", note: "Client-side reactivity" },
        { name: "Canvas API", note: "Custom charts" },
        { name: "Figma", note: "Interface design & wireframes" },
      ],
    },
    {
      categoryName: "Databases, Hardware & Tooling",
      description: "Database management, embedded hardware integration, and version control.",
      skills: [
        { name: "MySQL & SQL Server", note: "Secure queries & injection defense" },
        { name: "Raspberry Pi & Arduino", note: "Hardware integration & smart cart" },
        { name: "Hardware Barcode Integration", note: "EAN-13 timing & debounce" },
        { name: "Git & GitHub", note: "Version control & collaboration" },
        { name: "VS Code & Visual Studio", note: "Development environments" },
        { name: "NetBeans & XAMPP", note: "Java & server stack" },
      ],
    },
  ],
  currentlyLearning: [
    {
      categoryName: "Next-Phase Frameworks & Tooling",
      description: "Modern frameworks and server environments currently being actively learned.",
      skills: [
        { name: "React", note: "Component ecosystems & modern state" },
        { name: "Node.js", note: "Server-side JavaScript runtimes" },
        { name: "Laravel", note: "PHP full-stack framework" },
      ],
    },
  ],
};
