"use client";

import React from "react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/data/site";
import { ActionLink } from "@/components/ui/ActionLink";
import { AtlasFallback } from "@/components/atlas/AtlasFallback";

const AtlasExperience = dynamic(
  () => import("@/components/atlas/AtlasExperience"),
  {
    ssr: false,
    loading: () => <AtlasFallback />,
  }
);

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center py-12 lg:py-16 overflow-hidden border-b border-border/60"
      aria-label="Introduction"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Actions */}
        <div className="lg:col-span-6 space-y-6 max-w-xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-border bg-surface text-xs font-mono text-ink-muted">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span>The Interactive Systems Atlas</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ink leading-[1.15]">
            {siteConfig.headline}
          </h1>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-body">
            {siteConfig.subheadline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <ActionLink href="#work" variant="primary">
              Explore selected work
            </ActionLink>
            <ActionLink href="#contact" variant="secondary">
              Get in touch
            </ActionLink>
          </div>

          <div className="pt-4 border-t border-border/40 flex items-center gap-6 text-xs font-mono text-ink-subtle">
            <span>3 FEATURED STATIONS</span>
            <span>·</span>
            <span>SYSTEM ATLAS METAPHOR</span>
          </div>
        </div>

        {/* Right Column: Visual Core (Canvas reserved space) */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="w-full aspect-square max-w-[480px] lg:max-w-[540px] flex items-center justify-center">
            <AtlasExperience />
          </div>
        </div>
      </div>
    </section>
  );
}
