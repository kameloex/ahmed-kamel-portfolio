"use client";

import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ActionLink } from "@/components/ui/ActionLink";
import { Mail, FileText, Check, Copy, ArrowUpRight } from "lucide-react";

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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.links.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section
      id="contact"
      className="py-20 sm:py-28 border-t border-border/80 bg-bg"
      aria-label="Contact"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Direct Dispatch"
          title="Communications &amp; inquiries"
          description="Direct channels for inquiries regarding web systems, interactive applications, and software engineering opportunities."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left card: Context & Status */}
          <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface framer-card space-y-6">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                DISPATCH // TERMINAL
              </span>
              <h3 className="font-display text-xl font-semibold text-ink mt-1">
                Engineering Collaboration
              </h3>
            </div>

            <p className="text-sm text-ink-muted leading-relaxed font-body">
              Available for technical inquiries, front-end system architecture, .NET and web applications, and interactive digital experiences.
            </p>

            <div className="pt-4 border-t border-border/60 space-y-2 text-xs font-mono text-ink-subtle">
              <div className="flex items-center justify-between">
                <span>Location:</span>
                <span className="text-ink font-medium">Alexandria, Egypt (UTC+2)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Affiliation:</span>
                <span className="text-ink font-medium">Borg El Arab Technological University</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Response Window:</span>
                <span className="text-ink font-medium">Within 24–48 hours</span>
              </div>
            </div>
          </div>

          {/* Right card: Verified Channels */}
          <div className="p-6 sm:p-8 rounded-xl border border-border bg-surface framer-card space-y-6">
            <div>
              <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                VERIFIED CHANNELS
              </span>
              <h3 className="font-display text-xl font-semibold text-ink mt-1">
                Direct Contact Points
              </h3>
            </div>

            <div className="space-y-3">
              {/* Email with copy button */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="flex-1 flex items-center justify-between p-3.5 rounded-lg border border-border bg-surface-alt hover:border-accent hover:text-accent text-sm text-ink transition-all font-mono group"
                >
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-accent" />
                    <span>{siteConfig.links.email}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-ink-subtle group-hover:text-accent transition-colors" />
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-3.5 rounded-lg border border-border bg-surface-alt hover:border-accent hover:text-accent text-ink-muted transition-all active:scale-[0.98]"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check size={18} className="text-accent" />
                  ) : (
                    <Copy size={18} className="text-ink-muted" />
                  )}
                </button>
              </div>

              {/* GitHub */}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-surface-alt hover:border-accent hover:text-accent text-sm text-ink transition-all font-mono group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-[18px] h-[18px] text-accent" />
                  <span>github.com/kameloex</span>
                </div>
                <ArrowUpRight size={16} className="text-ink-subtle group-hover:text-accent transition-colors" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-lg border border-border bg-surface-alt hover:border-accent hover:text-accent text-sm text-ink transition-all font-mono group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-[18px] h-[18px] text-accent" />
                  <span>linkedin.com/in/ahmed-kamel</span>
                </div>
                <ArrowUpRight size={16} className="text-ink-subtle group-hover:text-accent transition-colors" />
              </a>

              {/* Optional CV Download if supplied */}
              {siteConfig.links.resumePdf && (
                <div className="pt-2">
                  <ActionLink
                    href={siteConfig.links.resumePdf}
                    external
                    variant="primary"
                    className="w-full justify-center"
                  >
                    <FileText size={16} className="mr-2 inline" />
                    Download CV (PDF)
                  </ActionLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
