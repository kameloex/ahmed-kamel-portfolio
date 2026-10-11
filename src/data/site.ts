// src/data/site.ts
// Global site configuration and verified metadata.
// Strict rule: no invented contact links or phone numbers.

export interface SocialLink {
  label: string;
  url?: string; // Optional until supplied by Ahmed
  username?: string;
}

export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  links: {
    email?: string;
    github?: string;
    linkedin?: string;
    resumePdf?: string; // Only if approved and supplied
  };
  navigation: {
    label: string;
    href: string;
  }[];
}

export const siteConfig: SiteConfig = {
  name: "Ahmed Kamel",
  role: "Software Developer",
  headline: "I build digital systems that connect ideas to real experiences.",
  subheadline:
    "Software developer focused on web experiences, interactive applications, and connected systems.",
  links: {
    // Left undefined until Ahmed provides verified links
    email: undefined,
    github: undefined,
    linkedin: undefined,
    resumePdf: undefined,
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Toolkit", href: "#toolkit" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ],
};
