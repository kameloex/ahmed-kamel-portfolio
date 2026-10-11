import React from "react";
import { projects } from "@/data/projects";
import { ProjectStation } from "@/components/projects/ProjectStation";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SelectedWork() {
  return (
    <section id="work" className="py-20 sm:py-24" aria-label="Selected systems">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <SectionHeading
          tagline="Selected work"
          title="Featured digital systems"
          description="Three distinct project stations demonstrating multi-page web architectures, touchscreen transaction state machines, and technical knowledge platforms."
        />

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectStation
              key={project.slug}
              project={project}
              reversed={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
