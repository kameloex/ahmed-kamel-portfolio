// src/data/journey.ts
// Verifiable record of technical experience, specialized training, and academic milestones from Ahmed Kamel's CV.
// Note: Per portfolio blueprint, no expected graduation year is displayed.

export interface JourneyMilestone {
  id: string;
  period: string;
  title: string;
  organization: string;
  summary: string;
  type: "academic" | "experience" | "training" | "initiative";
  verified: boolean;
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "depi-internship",
    period: "Jun 2025 – Present",
    title: ".NET Full-Stack Development Intern",
    organization: "Digital Egypt Pioneers Initiative (DEPI)",
    summary:
      "Selected for intensive national training on full-stack engineering utilizing C#, ASP.NET, database architecture, and modern application development.",
    type: "training",
    verified: true,
  },
  {
    id: "children-university",
    period: "2025 – Present",
    title: "Tech Program Instructor",
    organization: "Children's University (Borg El Arab Technological University)",
    summary:
      "Teaching programming fundamentals and core technology principles to school-aged youth across six programs (age groups 7–10 and 11–15).",
    type: "initiative",
    verified: true,
  },
  {
    id: "alexandria-petroleum",
    period: "Aug 2024",
    title: "Corporate IT Intern",
    organization: "Alexandria Petroleum Company",
    summary:
      "Completed a 2-week internship in corporate enterprise IT infrastructure, earning an Excellent performance evaluation.",
    type: "experience",
    verified: true,
  },
  {
    id: "freelance-developer",
    period: "Jul 2024",
    title: "Freelance Web Developer",
    organization: "Remote Freelance Platforms",
    summary:
      "Designed and deployed web solutions using HTML, CSS, JavaScript, PHP, MySQL, and Vue.js for independent client projects.",
    type: "experience",
    verified: true,
  },
  {
    id: "batu-academics",
    period: "Oct 2023 – Present",
    title: "Faculty of Information and Communication Technology",
    organization: "Borg El Arab Technological University",
    summary:
      "Undergraduate study in ICT, consistently achieving Grade A (Excellent) standing across software engineering, web architecture, databases, and cybersecurity coursework.",
    type: "academic",
    verified: true,
  },
];
