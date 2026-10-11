import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg text-ink-muted text-sm py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-ink font-display font-medium text-base">
            <span className="w-6 h-6 rounded border border-border flex items-center justify-center font-mono text-[10px] font-semibold text-accent bg-surface">
              AK
            </span>
            <span>{siteConfig.name}</span>
          </div>
          <p className="mt-1 text-xs text-ink-subtle">
            Software developer based in Alexandria, Egypt. Web experiences, interactive applications, and connected systems.
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted"
          aria-label="Footer navigation"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a href="#" className="text-accent hover:underline">
            Back to top
          </a>
        </nav>

        <div className="text-xs text-ink-subtle font-mono">
          <span>&copy; {currentYear} Ahmed Kamel // Built with Next.js, Three.js &amp; Motion</span>
        </div>
      </div>
    </footer>
  );
}
