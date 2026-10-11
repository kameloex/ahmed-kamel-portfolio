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
        "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-medium tracking-wide rounded border border-accent/30 bg-accent-tint12 text-accent",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#77CFFF]" />
      <span>{label}</span>
    </span>
  );
}
