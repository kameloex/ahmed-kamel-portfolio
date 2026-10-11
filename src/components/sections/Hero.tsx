"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/data/site";
import { ActionLink } from "@/components/ui/ActionLink";
import { AtlasFallback } from "@/components/atlas/AtlasFallback";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";

const AtlasExperience = dynamic(
  () => import("@/components/atlas/AtlasExperience"),
  {
    ssr: false,
    loading: () => <AtlasFallback />,
  }
);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const { prefersReducedMotion, isSimpleView } = useAtlasCapabilities();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const shouldAnimate = !prefersReducedMotion && !isSimpleView;

  // Scroll transforms for smooth depth hand-off from Hero to Stations
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 48]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.5]);

  return (
    <section
      ref={heroRef}
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

        {/* Right Column: Visual Core with scroll-driven depth */}
        <div className="lg:col-span-6 flex items-center justify-center">
          <motion.div
            style={{
              y: shouldAnimate ? yOffset : 0,
              scale: shouldAnimate ? scale : 1,
              opacity: shouldAnimate ? opacity : 1,
            }}
            className="w-full aspect-square max-w-[480px] lg:max-w-[540px] flex items-center justify-center"
          >
            <AtlasExperience />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
