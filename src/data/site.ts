// src/data/site.ts
// Global site configuration and verified metadata.
// Strictly using confirmed contact details provided by Ahmed Kamel.

export interface SiteConfig {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  links: {
    email: string;
    github: string;
    linkedin: string;
    whatsapp: string;
    whatsappUrl: string;
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
  headline: "I build digital systems that connect ideas to real experiences.",
  subheadline:
    "Software developer focused on web experiences, interactive applications, and connected systems.",
  links: {
    email: "ahmeeeeedd699@gmail.com",
    github: "https://github.com/kameloex",
    linkedin: "https://www.linkedin.com/in/ahmed-kamel-81062b2a7/",
    whatsapp: "+201225197764",
    whatsappUrl: "https://wa.me/201225197764",
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
