"use client";

import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { siteConfig } from "@/data/site";
import { ActionLink } from "@/components/ui/ActionLink";
import { AtlasFallback } from "@/components/atlas/AtlasFallback";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import { Check, Copy } from "lucide-react";

const AtlasExperience = dynamic(
  () => import("@/components/atlas/AtlasExperience"),
  {
    ssr: false,
    loading: () => <AtlasFallback />,
  }
);

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const { prefersReducedMotion, isSimpleView } = useAtlasCapabilities();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const shouldAnimate = !prefersReducedMotion && !isSimpleView;

  // Fluid scroll transforms for depth hand-off to Selected Work
  const yOffset = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const handleCopyEmail = async () => {
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
      ref={heroRef}
      id="hero"
      className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center py-12 lg:py-20 overflow-hidden border-b border-border/80 bg-blueprint-grid"
      aria-label="Introduction"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Top Status & Telemetry Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-border/60 text-xs font-mono text-ink-muted">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#77CFFF]" />
            <span className="font-semibold text-ink">SYSTEMS ENGINE // VOL. 26</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-ink-subtle">
            <span>LOCATION: {siteConfig.location.toUpperCase()}</span>
            <span>·</span>
            <span>STACK: REACT 19 / NEXT.JS / THREE.JS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-7 max-w-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-accent/25 bg-accent-tint12 text-xs font-mono text-accent">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-medium">Ahmed Kamel — Software Developer</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-[1.12]">
                {siteConfig.headline}
              </h1>

              <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-body">
                {siteConfig.subheadline}
              </p>
            </div>

            {/* Recruiter Fast-Action Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <ActionLink href="#work" variant="primary">
                Explore Selected Systems
              </ActionLink>

              <ActionLink href="#contact" variant="secondary">
                Direct Dispatch
              </ActionLink>

              {/* Instant Copy Email button for recruiters */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-3 py-2.5 rounded border border-border bg-surface/80 hover:border-accent hover:text-accent text-ink-muted text-xs font-mono transition-all active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-accent"
                title="Copy email to clipboard"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-accent" />
                    <span className="font-semibold text-ink">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} className="text-ink-muted" />
                    <span>{siteConfig.links.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Technical Calibration Metrics Bar */}
            <div className="pt-6 border-t border-border/60 grid grid-cols-3 gap-4 text-xs font-mono text-ink-subtle">
              <div>
                <span className="block text-ink font-semibold text-sm">3 STATIONS</span>
                <span>SYSTEM ARCHITECTURE</span>
              </div>
              <div>
                <span className="block text-ink font-semibold text-sm">BILINGUAL</span>
                <span>RTL / LTR INTERFACES</span>
              </div>
              <div>
                <span className="block text-ink font-semibold text-sm">TRANSACTION</span>
                <span>STATE WORKFLOWS</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Core with scroll-driven depth */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <motion.div
              style={{
                y: shouldAnimate ? yOffset : 0,
                scale: shouldAnimate ? scale : 1,
                opacity: shouldAnimate ? opacity : 1,
              }}
              className="w-full aspect-square max-w-[460px] lg:max-w-[500px] flex items-center justify-center relative"
            >
              <AtlasExperience />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
