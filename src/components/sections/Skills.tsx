import React from "react";
import { toolkitData } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Skills() {
  return (
    <section id="toolkit" className="py-20 sm:py-28 border-t border-border bg-white" aria-label="Technical toolkit">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Technical Index"
          title="Verified tools and technologies"
          description="A direct inventory of technologies confirmed across delivered projects. No arbitrary percentage bars or unverified claims."
        />

        {/* Confirmed tools used in projects */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent-mid" />
            <h3 className="font-mono text-xs text-ink uppercase tracking-wider font-semibold">
              Verified in completed projects
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {toolkitData.usedInProjects.map((group) => (
              <div
                key={group.categoryName}
                className="p-6 rounded border border-border-strong bg-surface space-y-4 shadow-specimen"
              >
                <div>
                  <h4 className="font-display text-base font-semibold text-ink">
                    {group.categoryName}
                  </h4>
                  <p className="text-xs text-ink-subtle mt-1 font-body">
                    {group.description}
                  </p>
                </div>

                <ul className="space-y-2 pt-2 border-t border-border">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="flex items-center justify-between text-xs font-mono text-ink-muted"
                    >
                      <span className="text-ink font-medium">{skill.name}</span>
                      {skill.note && (
                        <span className="text-ink-subtle text-[11px]">
                          {skill.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Currently learning section (gracefully handles empty list until Ahmed supplies) */}
        {toolkitData.currentlyLearning.length > 0 ? (
          <div className="space-y-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-ink-subtle" />
              <h3 className="font-mono text-xs text-ink-subtle uppercase tracking-wider font-semibold">
                Currently learning
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {toolkitData.currentlyLearning.map((group) => (
                <div
                  key={group.categoryName}
                  className="p-6 rounded border border-border bg-surface/60 space-y-4"
                >
                  <h4 className="font-display text-base font-semibold text-ink">
                    {group.categoryName}
                  </h4>
                  <ul className="space-y-2">
                    {group.skills.map((skill) => (
                      <li key={skill.name} className="text-xs font-mono text-ink-muted">
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded border border-border bg-surface text-xs font-mono text-ink-subtle flex items-center justify-between">
            <span>Additional stack &amp; learning tracks:</span>
            <span>Awaiting confirmed list</span>
          </div>
        )}
      </div>
    </section>
  );
}
