import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Capability {
  title: string;
  focus: string;
  specimenRef: string;
  description: string;
  groundedIn: string;
}

const capabilities: Capability[] = [
  {
    title: "Web Architecture & Portals",
    focus: "Responsive Information Architecture",
    specimenRef: "DISCIPLINE 01",
    description:
      "Engineering structured, multi-page platforms with RTL-first layouts, accessible keyboard navigation, and reusable UI components across 40+ structured pages.",
    groundedIn: "Demonstrated across the BATU University Portal and Projects Hub.",
  },
  {
    title: "Interactive Applications",
    focus: "State Workflows & Client Validation",
    specimenRef: "DISCIPLINE 02",
    description:
      "Building client-side transaction state machines, client Luhn payment validation flows, and debounced input processing for touchscreen interfaces.",
    groundedIn: "Demonstrated in the PAYNGO cart pipeline and portal student services.",
  },
  {
    title: "Connected Systems Interfaces",
    focus: "Hardware Integration & Technical Knowledge",
    specimenRef: "DISCIPLINE 03",
    description:
      "Creating touchscreen interfaces integrated with hardware barcode readers (EAN-13) and documenting embedded microcontroller systems.",
    groundedIn: "Demonstrated in PAYNGO hardware barcode timing and the Hub microcontroller guides.",
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-20 sm:py-28 border-t border-border/80 bg-surface/30"
      aria-label="Capabilities"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Engineering Schema"
          title="Technical disciplines"
          description="Capabilities grounded strictly in delivered projects, covering front-end architecture, transaction workflows, and hardware-adjacent touchscreen interfaces."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 sm:p-8 rounded-xl border border-border bg-surface framer-card flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-accent font-semibold tracking-wider">
                    {cap.specimenRef}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                <h3 className="font-display text-xl font-semibold text-ink">
                  {cap.title}
                </h3>
                <p className="text-xs font-mono text-ink-subtle">
                  Focus: {cap.focus}
                </p>
                <p className="text-sm text-ink-muted leading-relaxed font-body">
                  {cap.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 text-xs font-mono text-ink-subtle">
                {cap.groundedIn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
