"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SimulatedBadge } from "@/components/ui/SimulatedBadge";

interface PortalLayer {
  id: string;
  name: string;
  description: string;
  isSimulated?: boolean;
}

const layers: PortalLayer[] = [
  {
    id: "academics",
    name: "Faculties & Departments",
    description: "Academic degree structures, faculty curriculum, and department overviews across 40+ pages.",
  },
  {
    id: "staff",
    name: "Staff Directory",
    description: "Searchable directory of university faculty, department heads, and academic staff.",
  },
  {
    id: "projects",
    name: "Projects & News",
    description: "Filterable student graduation project showcase and data-driven university news.",
  },
  {
    id: "admissions",
    name: "Admissions Guidance",
    description: "Guidance for prospective students, entrance criteria, and application pathways.",
  },
  {
    id: "services",
    name: "Student Services",
    description: "Seven dedicated service portals supporting student requests and campus affairs.",
  },
  {
    id: "children-uni",
    name: "Children's University",
    description: "Multi-program registration system supporting six programs and age groups 7–10 and 11–15.",
  },
  {
    id: "payment",
    name: "Fee Payment (Simulated)",
    description: "Client-side payment flow with card validation (Luhn), preview, and masked transaction logging.",
    isSimulated: true,
  },
];

export function PortalLayers() {
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const activeLayer = layers[selectedLayerIndex];

  return (
    <div className="w-full rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8 space-y-6 framer-card">
      {/* Header & meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/80">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-wider">
            STATION A // ARCHITECTURAL MATRIX
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mt-0.5">
            Information Architecture Stack (40+ Pages)
          </h3>
        </div>
        <div className="text-xs text-ink-subtle font-mono">
          Layer {selectedLayerIndex + 1} of {layers.length}
        </div>
      </div>

      {/* Visual Layer Stack Representation */}
      <div className="relative h-64 sm:h-72 w-full rounded-lg border border-border/60 bg-bg overflow-hidden flex items-center justify-center p-4 bg-blueprint-grid">
        {/* Stack of Isometric Panels */}
        <div className="relative w-full max-w-sm h-48 flex flex-col justify-center items-center">
          {layers.map((layer, index) => {
            const isActive = index === selectedLayerIndex;
            const separationOffset = isActive ? (index - selectedLayerIndex) * 22 - 12 : (index - 3) * 10;

            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayerIndex(index)}
                style={{
                  transform: `translateY(${separationOffset}px) scale(${isActive ? 1.04 : 0.96 - Math.abs(index - selectedLayerIndex) * 0.03})`,
                  zIndex: isActive ? 20 : 10 - Math.abs(index - selectedLayerIndex),
                }}
                className={cn(
                  "absolute w-4/5 h-10 rounded border transition-all duration-300 cursor-pointer flex items-center justify-between px-4 select-none",
                  isActive
                    ? "bg-deep/80 border-accent text-ink shadow-[0_0_16px_rgba(119,207,255,0.25)]"
                    : "bg-surface/80 border-border text-ink-muted hover:border-accent/40"
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-colors",
                      isActive ? "bg-accent shadow-[0_0_6px_#77CFFF]" : "bg-ink-subtle"
                    )}
                  />
                  <span className="text-xs font-mono tracking-tight truncate max-w-[180px] font-medium">
                    {layer.name}
                  </span>
                </div>
                {layer.isSimulated && (
                  <span className="text-[10px] font-mono text-accent bg-accent-tint12 px-1.5 py-0.5 rounded border border-accent/20">
                    Simulated
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Button-based Layer Controls */}
      <div className="space-y-3">
        <label className="text-xs font-mono text-ink-subtle block uppercase tracking-wider">
          Select layer to inspect:
        </label>
        <div className="flex flex-wrap gap-2">
          {layers.map((layer, index) => (
            <button
              key={layer.id}
              type="button"
              onClick={() => setSelectedLayerIndex(index)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent font-mono",
                index === selectedLayerIndex
                  ? "border-accent text-accent bg-accent-tint12 shadow-[0_0_10px_rgba(119,207,255,0.2)]"
                  : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/50"
              )}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Layer Details Card */}
      <div className="p-4 rounded-lg border border-border/80 bg-bg/80 space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-mono text-accent font-medium uppercase">
            Active Layer Specification
          </span>
          {activeLayer.isSimulated && <SimulatedBadge />}
        </div>
        <h4 className="text-sm font-semibold text-ink">{activeLayer.name}</h4>
        <p className="text-xs text-ink-muted leading-relaxed font-body">
          {activeLayer.description}
        </p>
      </div>
    </div>
  );
}
