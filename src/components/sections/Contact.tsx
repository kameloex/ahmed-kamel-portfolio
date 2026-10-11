import React from "react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { Mail, FileText } from "lucide-react";

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  const hasDirectLinks =
    siteConfig.links.email ||
    siteConfig.links.github ||
    siteConfig.links.linkedin;

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-border/60" aria-label="Contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Communication"
          title="Get in touch"
          description="Direct channels for inquiries regarding web systems, interactive applications, and software engineering opportunities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left card: Context */}
          <div className="p-6 sm:p-8 rounded-sm border border-border bg-surface space-y-4">
            <h3 className="font-display text-lg font-medium text-ink">
              Collaboration & Inquiries
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed font-body">
              Open to discussions regarding front-end system development, interactive digital workflows, and engineering collaborations.
            </p>
            <div className="pt-2 text-xs font-mono text-ink-subtle">
              Location: Borg El Arab, Alexandria, Egypt
            </div>
          </div>

          {/* Right card: Channels */}
          <div className="p-6 sm:p-8 rounded-sm border border-border bg-surface space-y-6">
            <h3 className="font-display text-lg font-medium text-ink">
              Verified Channels
            </h3>

            {hasDirectLinks ? (
              <div className="space-y-3">
                {siteConfig.links.email && (
                  <a
                    href={`mailto:${siteConfig.links.email}`}
                    className="flex items-center gap-3 p-3 rounded border border-border hover:border-accent text-sm text-ink transition-colors"
                  >
                    <Mail size={18} className="text-accent" />
                    <span>{siteConfig.links.email}</span>
                  </a>
                )}

                {siteConfig.links.github && (
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded border border-border hover:border-accent text-sm text-ink transition-colors"
                  >
                    <GithubIcon className="w-[18px] h-[18px] text-accent" />
                    <span>GitHub Profile</span>
                  </a>
                )}

                {siteConfig.links.linkedin && (
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded border border-border hover:border-accent text-sm text-ink transition-colors"
                  >
                    <LinkedinIcon className="w-[18px] h-[18px] text-accent" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}

                {siteConfig.links.resumePdf && (
                  <ActionLink
                    href={siteConfig.links.resumePdf}
                    external
                    variant="secondary"
                  >
                    <FileText size={16} className="mr-2 inline" />
                    Download CV (PDF)
                  </ActionLink>
                )}
              </div>
            ) : (
              <div className="p-4 rounded border border-dashed border-border/80 bg-bg/40 text-xs font-mono text-ink-subtle space-y-2">
                <p className="text-ink">
                  Direct channels awaiting link confirmation
                </p>
                <p className="text-ink-muted">
                  Email, GitHub, and LinkedIn profiles will become interactive once primary addresses are provided. No placeholder handles are displayed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
