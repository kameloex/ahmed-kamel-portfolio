import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  tagline?: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  title,
  tagline,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("space-y-3 max-w-2xl", className)}>
      {tagline && (
        <p className="text-xs font-mono font-medium tracking-wider text-accent uppercase inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#77CFFF]" />
          {tagline}
        </p>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-ink-muted leading-relaxed font-body">
          {description}
        </p>
      )}
    </div>
  );
}
