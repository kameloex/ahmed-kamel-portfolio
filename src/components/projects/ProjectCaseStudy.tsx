"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { ActionLink } from "@/components/ui/ActionLink";
import { SimulatedBadge } from "@/components/ui/SimulatedBadge";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  const { prefersReducedMotion } = useAtlasCapabilities();

  return (
    <motion.article
      layoutId={prefersReducedMotion ? undefined : `station-frame-${project.slug}`}
      className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16"
    >
      {/* Navigation breadcrumb */}
      <div>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-accent transition-colors font-mono"
        >
          <ArrowLeft size={16} />
          <span>Back to Selected Systems</span>
        </Link>
      </div>

      {/* Hero header */}
      <header className="space-y-6 border-b border-border/80 pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-accent uppercase tracking-wider inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#77CFFF]" />
            {project.specimenNumber || `STATION // ${project.stationType.toUpperCase()}`}
          </span>
          {project.stationType === "cart" && (
            <SimulatedBadge label="Simulated demo logic" />
          )}
        </div>

        <motion.h1
          layoutId={prefersReducedMotion ? undefined : `station-title-${project.slug}`}
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold text-ink tracking-tight"
        >
          {project.title}
        </motion.h1>

        <p className="text-lg sm:text-xl text-ink-muted leading-relaxed font-body">
          {project.tagline}
        </p>

        {/* Links row (strictly guarded) */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.status === "live" && project.demo && (
            <ActionLink href={project.demo.url} external variant="primary">
              Launch live demo
            </ActionLink>
          )}

          {project.status === "unverified" && (
            <span className="text-xs font-mono text-ink-subtle px-3 py-2 border border-border/60 rounded bg-surface/60">
              Live demo link unverified pending test
            </span>
          )}

          {project.status === "unpublished" && (
            <span className="text-xs font-mono font-medium text-accent px-3 py-2 border border-accent/25 rounded bg-accent-tint12">
              Demo Coming Soon
            </span>
          )}

          {project.demoNote && project.status === "live" && (
            <span className="text-xs text-ink-muted">{project.demoNote}</span>
          )}
        </div>
      </header>

      {/* Meta Specs Grid */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl border border-border bg-surface framer-card"
        aria-label="Project specifications"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
            Verification Status
          </span>
          <span className="text-sm font-semibold text-ink capitalize font-mono">
            {project.status === "unpublished" ? "Unpublished (Local)" : project.status}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
            System Classification
          </span>
          <span className="text-sm font-medium text-ink">
            {project.stationType === "portal" && "Multi-Page Web Portal (40+ Pages)"}
            {project.stationType === "cart" && "Touchscreen State-Machine Interface"}
            {project.stationType === "hub" && "Knowledge & Exhibition Showcase Platform"}
          </span>
        </div>

        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
            Key Technologies
          </span>
          <span className="text-sm font-medium text-ink">
            {project.technologies.slice(0, 4).join(", ")}
          </span>
        </div>
      </section>

      {/* Media / Screenshot section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-border/80 pb-3">
          <h2 className="font-display text-xl font-semibold text-ink">
            Verified Interface Captures
          </h2>
          <span className="text-xs font-mono text-ink-subtle">
            {project.media.length} Evidence Records
          </span>
        </div>

        {project.media.length === 0 ? (
          <div className="w-full rounded-xl border border-dashed border-border bg-surface/50 p-8 sm:p-12 text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full border border-border flex items-center justify-center text-accent font-mono text-xs font-semibold">
              AK
            </div>
            <p className="text-sm font-mono text-ink">
              Verified screenshots pending confirmation
            </p>
            <p className="text-xs text-ink-subtle max-w-md mx-auto">
              In accordance with verification guidelines, no stock assets or unconfirmed mockups are rendered. Genuine captures will be displayed once verified.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.media.map((item, idx) => (
              <figure
                key={idx}
                className="group rounded-xl border border-border bg-surface framer-card overflow-hidden p-2.5 space-y-2.5"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-bg border border-border/60">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-300"
                  />
                </div>
                <figcaption className="text-xs font-mono text-ink-muted px-1 leading-relaxed">
                  {item.alt}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* Overview & Context */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Architectural Overview
        </h2>
        <p className="text-base text-ink-muted leading-relaxed font-body">
          {project.longDescription}
        </p>
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Key Features &amp; Modules
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.features.map((feature, idx) => (
            <li
              key={idx}
              className="p-3.5 rounded-lg border border-border/80 bg-surface/60 flex items-start gap-3 text-sm text-ink-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0 shadow-[0_0_6px_#77CFFF]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Implementation Highlights */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Implementation Highlights
        </h2>
        <ul className="space-y-3">
          {project.implementationHighlights.map((highlight, idx) => (
            <li
              key={idx}
              className="p-4 rounded-lg border border-border bg-surface/80 flex items-start gap-3 text-sm text-ink"
            >
              <span className="w-1.5 h-1.5 rounded-sm bg-accent mt-2 shrink-0 shadow-[0_0_6px_#77CFFF]" />
              <span className="text-ink-muted leading-relaxed">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Honesty & Verification Note */}
      <section className="p-6 rounded-xl border border-border bg-surface framer-card space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#77CFFF]" />
          <h3 className="text-sm font-semibold text-ink font-mono uppercase tracking-wide">
            Engineering &amp; Simulation Disclosure
          </h3>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed font-body">
          {project.honestyNote}
        </p>
      </section>

      {/* Next project navigation */}
      {nextProject && (
        <nav
          className="pt-8 border-t border-border/80 flex justify-between items-center"
          aria-label="Next case study"
        >
          <Link
            href="/#work"
            className="text-sm font-medium text-ink-muted hover:text-accent transition-colors font-mono"
          >
            ← All Systems
          </Link>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-end text-right"
          >
            <span className="text-xs font-mono text-ink-subtle">
              Next Station
            </span>
            <span className="text-sm font-semibold text-ink group-hover:text-accent transition-colors inline-flex items-center gap-1">
              {nextProject.title}
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </nav>
      )}
    </motion.article>
  );
}
