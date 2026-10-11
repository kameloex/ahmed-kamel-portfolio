import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Capability {
  title: string;
  focus: string;
  description: string;
  groundedIn: string;
}

const capabilities: Capability[] = [
  {
    title: "Web experiences",
    focus: "Responsive Information Architecture",
    description:
      "Engineering structured, multi-page platforms with RTL-first layouts, accessible keyboard navigation, and reusable UI components.",
    groundedIn: "Demonstrated across the BATU University Portal and Projects Hub.",
  },
  {
    title: "Interactive applications",
    focus: "State Workflows & Validation",
    description:
      "Building client-side transaction state machines, client Luhn payment validation flows, and debounced input processing.",
    groundedIn: "Demonstrated in the PAYNGO cart pipeline and portal student services.",
  },
  {
    title: "Connected systems interfaces",
    focus: "Hardware Integration & Technical Knowledge",
    description:
      "Creating touchscreen interfaces integrated with hardware barcode readers (EAN-13) and documenting embedded microcontroller systems.",
    groundedIn: "Demonstrated in PAYNGO hardware barcode timing and the Hub microcontroller guides.",
  },
];

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="py-20 sm:py-24 border-t border-border/60 bg-surface/20"
      aria-label="Capabilities"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Focus areas"
          title="Engineering capabilities"
          description="Technical capabilities grounded strictly in delivered projects, covering front-end architecture, interaction design, and hardware-adjacent interfaces."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="p-6 sm:p-8 rounded-sm border border-border bg-surface flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-accent">
                  {cap.focus}
                </span>
                <h3 className="font-display text-xl font-medium text-ink">
                  {cap.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed font-body">
                  {cap.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50 text-xs font-mono text-ink-subtle">
                {cap.groundedIn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
