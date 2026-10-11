"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { journeyMilestones } from "@/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion } = useAtlasCapabilities();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="py-20 sm:py-28 border-t border-border bg-surface"
      aria-label="Journey"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Trajectory Log"
          title="Experience &amp; verified milestones"
          description="A verifiable record of technical experience, specialized training programs, and academic initiatives."
        />

        {journeyMilestones.length > 0 ? (
          <div className="relative ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-10">
            {/* Background static line */}
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-border-strong" />

            {/* Scroll-driven drawing line */}
            {!prefersReducedMotion && (
              <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent-deep"
              />
            )}

            {journeyMilestones.map((item) => (
              <div key={item.id} className="relative space-y-2">
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3 h-3 rounded-full border-2 border-white bg-accent-deep ring-2 ring-accent-light" />
                <span className="text-xs font-mono font-semibold text-accent-deep uppercase tracking-wider block">
                  {item.period}
                </span>
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <span className="text-xs font-mono text-ink-subtle block">
                  {item.organization}
                </span>
                <p className="text-sm text-ink-muted leading-relaxed font-body max-w-2xl">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded border border-border-strong bg-white p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-sm">
            <div className="w-10 h-10 mx-auto rounded-full border border-border-strong flex items-center justify-center text-ink font-mono text-xs font-semibold">
              AK
            </div>
            <h3 className="font-display text-base font-semibold text-ink">
              Verified timeline entries pending confirmation
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed font-body">
              In accordance with strict verification rules, no unconfirmed employment dates, graduation milestones, or training credentials will be displayed until verified against primary records.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
