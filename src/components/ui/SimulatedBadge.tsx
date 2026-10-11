import React from "react";
import { cn } from "@/lib/utils";

interface SimulatedBadgeProps {
  label?: string;
  className?: string;
}

export function SimulatedBadge({
  label = "Simulated demo logic",
  className,
}: SimulatedBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-medium tracking-wide rounded border border-border-strong bg-accent-light text-ink",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent-mid animate-pulse" />
      <span>{label}</span>
    </span>
  );
}
