import React from "react";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { ActionLink } from "@/components/ui/ActionLink";
import { SimulatedBadge } from "@/components/ui/SimulatedBadge";
import { ArrowLeft } from "lucide-react";

interface ProjectCaseStudyProps {
  project: Project;
  nextProject?: Project;
}

export function ProjectCaseStudy({ project, nextProject }: ProjectCaseStudyProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16">
      {/* Navigation breadcrumb */}
      <div>
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-accent transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to selected work</span>
        </Link>
      </div>

      {/* Hero header */}
      <header className="space-y-6 border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono text-accent">
            CASE STUDY · {project.stationType.toUpperCase()}
          </span>
          {project.stationType === "cart" && (
            <SimulatedBadge label="Simulated demo logic" />
          )}
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight">
          {project.title}
        </h1>

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
            <span className="text-xs font-mono text-ink-subtle px-3 py-2 border border-border/40 rounded-sm">
              Live demo link unverified pending test
            </span>
          )}

          {project.status === "unpublished" && (
            <span className="text-xs font-mono text-ink-subtle px-3 py-2 border border-border/40 rounded-sm">
              Project unpublished / local demo
            </span>
          )}

          {project.demoNote && project.status === "live" && (
            <span className="text-xs text-ink-muted">{project.demoNote}</span>
          )}
        </div>
      </header>

      {/* Meta Specs Grid */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-sm border border-border bg-surface"
        aria-label="Project specifications"
      >
        <div className="space-y-1">
          <span className="text-xs font-mono text-ink-subtle block">Status</span>
          <span className="text-sm font-medium text-ink capitalize">
            {project.status}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-ink-subtle block">
            Role & Contribution
          </span>
          <span className="text-sm font-medium text-ink">
            {project.role || "Lead Front-end & Systems Architecture"}
          </span>
        </div>

        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
          <span className="text-xs font-mono text-ink-subtle block">
            Core Technologies
          </span>
          <span className="text-sm font-medium text-ink">
            {project.technologies.slice(0, 4).join(", ")}
          </span>
        </div>
      </section>

      {/* Media / Screenshot section (strictly neutral placeholder when media is empty) */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Interface Media
        </h2>
        {project.media.length === 0 ? (
          <div className="w-full rounded border border-dashed border-border bg-surface/30 p-8 sm:p-12 text-center space-y-3">
            <div className="w-10 h-10 mx-auto rounded-full border border-border flex items-center justify-center text-accent font-mono text-xs">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.media.map((item, idx) => (
              <div
                key={idx}
                className="rounded border border-border bg-surface overflow-hidden"
              >
                {/* Genuine media rendering */}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Overview & Context */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">Overview</h2>
        <p className="text-base text-ink-muted leading-relaxed">
          {project.longDescription}
        </p>
      </section>

      {/* Key Features */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-semibold text-ink">
          Key Features & Modules
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {project.features.map((feature, idx) => (
            <li
              key={idx}
              className="p-3 rounded border border-border/60 bg-surface/40 flex items-start gap-2.5 text-sm text-ink-muted"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
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
        <ul className="space-y-2.5">
          {project.implementationHighlights.map((highlight, idx) => (
            <li
              key={idx}
              className="p-3.5 rounded border border-border bg-surface flex items-start gap-3 text-sm text-ink"
            >
              <span className="font-mono text-xs text-accent mt-0.5 shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-muted">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Honesty & Verification Note */}
      <section className="p-6 rounded border border-border bg-surface space-y-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <h3 className="text-sm font-semibold text-ink font-mono uppercase tracking-wide">
            Integrity Note
          </h3>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">
          {project.honestyNote}
        </p>
      </section>

      {/* Next project navigation */}
      {nextProject && (
        <nav
          className="pt-8 border-t border-border flex justify-between items-center"
          aria-label="Next case study"
        >
          <Link
            href="/#work"
            className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
          >
            All selected systems
          </Link>
          <Link
            href={`/work/${nextProject.slug}`}
            className="group flex flex-col items-end text-right"
          >
            <span className="text-xs font-mono text-ink-subtle">
              Next project
            </span>
            <span className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
              {nextProject.title}
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
