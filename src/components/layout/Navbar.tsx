"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { SimpleViewToggle } from "@/components/ui/SimpleViewToggle";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg/85 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Monogram / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3 font-display font-medium text-base tracking-tight text-ink hover:text-accent transition-colors"
        >
          <span className="w-8 h-8 rounded-sm border border-border flex items-center justify-center font-mono text-xs text-accent bg-surface group-hover:border-accent transition-colors">
            AK
          </span>
          <span className="hidden sm:inline font-medium">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-ink-muted"
          aria-label="Main navigation"
        >
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-ink transition-colors py-1 focus-visible:outline-none focus-visible:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side: Simple view toggle & mobile menu trigger */}
        <div className="flex items-center gap-3">
          <SimpleViewToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-sm border border-border text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-surface px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-ink-muted hover:text-ink py-2 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
