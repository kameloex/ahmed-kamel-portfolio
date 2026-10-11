// src/data/site.ts
// Global site configuration and verified metadata.
// Strictly using confirmed contact details provided by Ahmed Kamel.
// Note: Per user instruction, phone numbers are excluded.

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  headline: string;
  subheadline: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    resumePdf?: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Ahmed Kamel",
  role: "Software Developer",
  location: "Alexandria, Egypt",
  headline: "I build digital systems that connect ideas to real experiences.",
  subheadline:
    "Software developer focused on web experiences, interactive applications, and connected systems.",
  links: {
    email: "ahmeeeeed699@gmail.com",
    github: "https://github.com/kameloex",
    linkedin: "https://www.linkedin.com/in/ahmed-kamel-81062b2a7/",
    resumePdf: undefined, // Pending public CV placement in /public/resume.pdf
  },
  navigation: [
    { label: "Systems Dossier", href: "#work" },
    { label: "Engineering Schema", href: "#capabilities" },
    { label: "Technical Index", href: "#toolkit" },
    { label: "Trajectory", href: "#journey" },
    { label: "Dispatch", href: "#contact" },
  ],
};
