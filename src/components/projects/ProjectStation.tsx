"use client";

import React from "react";
import type { Project } from "@/data/projects";
import { ActionLink } from "@/components/ui/ActionLink";
import { PortalLayers3D } from "./stations/PortalLayers3D";
import { CartFlow3D } from "./stations/CartFlow3D";
import { HubConstellation3D } from "./stations/HubConstellation3D";
import { cn } from "@/lib/utils";

interface ProjectStationProps {
  project: Project;
  reversed?: boolean;
}

export function ProjectStation({ project, reversed = false }: ProjectStationProps) {
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
    <article
      id={`station-${project.slug}`}
      className="py-12 sm:py-16 border-b border-border/80 last:border-b-0"
    >
      <div
        className={cn(
          "grid gap-8 lg:gap-12 items-start",
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
            <span className="text-xs font-mono text-accent">
              Station · {project.stationType.toUpperCase()}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ink tracking-tight">
              {project.title}
            </h3>
            <p className="text-base text-ink-muted leading-relaxed font-body">
              {project.tagline}
            </p>
          </div>

          <p className="text-sm text-ink-subtle leading-relaxed">
            {project.cardDescription}
          </p>

          {/* Technology badges */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-ink-subtle block">
              Technologies used:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-sm border border-border bg-surface text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Honesty note */}
          <div className="p-3 rounded-sm border border-border/70 bg-surface/40 text-xs text-ink-muted space-y-1">
            <div className="font-mono text-[11px] text-accent font-medium">
              Systems note
            </div>
            <p className="text-[12px] leading-relaxed">{project.honestyNote}</p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <ActionLink
              href={`/work/${project.slug}`}
              variant="primary"
              ariaLabel={`View case study for ${project.title}`}
            >
              View case study
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
              <span className="text-xs font-mono text-ink-subtle px-3 py-2 border border-border/40 rounded-sm">
                Live demo pending verification
              </span>
            )}

            {project.status === "unpublished" && (
              <span className="text-xs font-mono text-ink-subtle px-3 py-2 border border-border/40 rounded-sm">
                Local project / unpublished
              </span>
            )}
          </div>
        </div>

        {/* Station Visual (3D with full 2D fallback) */}
        <div
          className={cn(
            "w-full",
            isFullWidthVisual ? "w-full" : "lg:col-span-7"
          )}
        >
          {renderStationVisual()}
        </div>
      </div>
    </article>
  );
}
