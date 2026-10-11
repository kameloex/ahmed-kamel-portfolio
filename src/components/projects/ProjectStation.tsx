"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";
import { ActionLink } from "@/components/ui/ActionLink";
import { PortalLayers3D } from "./stations/PortalLayers3D";
import { CartFlow3D } from "./stations/CartFlow3D";
import { HubConstellation3D } from "./stations/HubConstellation3D";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import { cn } from "@/lib/utils";

interface ProjectStationProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectStation({ project, reversed = false }: ProjectStationProps) {
  const { prefersReducedMotion } = useAtlasCapabilities();

  const renderStationVisual = () => {
    switch (project.stationType) {
      case "portal":
        return <PortalLayers3D />;
      case "cart":
        return <CartFlow3D />;
      case "hub":
        return <HubConstellation3D />;
      default:
        return null;
    }
  };

  const isFullWidthVisual = project.stationType === "hub";

  return (
    <motion.article
      layoutId={prefersReducedMotion ? undefined : `station-frame-${project.slug}`}
      id={`station-${project.slug}`}
      className="py-14 sm:py-20 border-b border-border last:border-b-0"
    >
      <div
        className={cn(
          "grid gap-10 lg:gap-14 items-start",
          isFullWidthVisual
            ? "grid-cols-1"
            : reversed
              ? "grid-cols-1 lg:grid-cols-12 lg:[&>div:first-child]:order-2 lg:[&>div:last-child]:order-1"
              : "grid-cols-1 lg:grid-cols-12"
        )}
      >
        {/* Project Info Block */}
        <div
          className={cn(
            "space-y-6",
            isFullWidthVisual ? "max-w-3xl" : "lg:col-span-5"
          )}
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-semibold text-accent-deep uppercase tracking-wider inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-mid" />
              {project.specimenNumber || `SPECIMEN // ${project.stationType.toUpperCase()}`}
            </span>
            <motion.h3
              layoutId={prefersReducedMotion ? undefined : `station-title-${project.slug}`}
              className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight"
            >
              {project.title}
            </motion.h3>
            <p className="text-base text-ink-muted leading-relaxed font-body">
              {project.tagline}
            </p>
          </div>

          <p className="text-sm text-ink-muted leading-relaxed">
            {project.cardDescription}
          </p>

          {/* Technology badges */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
              Verified Stack:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded border border-border bg-surface text-ink font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Honesty note */}
          <div className="p-3.5 rounded border border-border-strong bg-surface text-xs text-ink-muted space-y-1">
            <div className="font-mono text-[11px] text-accent-deep font-semibold uppercase">
              Engineering Disclosure
            </div>
            <p className="text-[12px] leading-relaxed">{project.honestyNote}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ActionLink
              href={`/work/${project.slug}`}
              variant="primary"
              ariaLabel={`Inspect case study for ${project.title}`}
            >
              Inspect Case Study
            </ActionLink>

            {/* Live demo button: only renders if verified as "live" */}
            {project.status === "live" && project.demo && (
              <ActionLink
                href={project.demo.url}
                external
                variant="secondary"
                ariaLabel={`Open live demo for ${project.title}`}
              >
                {project.demo.label}
              </ActionLink>
            )}

            {project.status === "unverified" && (
              <span className="text-xs font-mono text-ink-subtle px-3 py-2 border border-border rounded bg-surface">
                Demo pending verification
              </span>
            )}

            {project.status === "unpublished" && (
              <span className="text-xs font-mono font-medium text-ink px-3 py-2 border border-border-strong rounded bg-surface">
                Demo Coming Soon
              </span>
            )}
          </div>
        </div>

        {/* Station Visual (3D with full 2D fallback) */}
        <div
          className={cn(
            "w-full space-y-6",
            isFullWidthVisual ? "w-full" : "lg:col-span-7"
          )}
        >
          {renderStationVisual()}

          {/* Architectural Screenshot Preview Strip (First 2 Genuine Captures) */}
          {project.media && project.media.length > 0 && (
            <div className="grid grid-cols-2 gap-3 pt-2">
              {project.media.slice(0, 2).map((item, i) => (
                <div
                  key={i}
                  className="group relative rounded border border-border overflow-hidden bg-surface aspect-[16/10] shadow-sm"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover object-top filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-ink/5 pointer-events-none" />
                  <div className="absolute bottom-1 left-1 right-1 text-[9px] font-mono text-ink bg-white/90 px-1.5 py-0.5 rounded truncate border border-border/80">
                    Capture 0{i + 1} &middot; Interface Evidence
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
