"use client";

import React from "react";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import { cn } from "@/lib/utils";

interface SimpleViewToggleProps {
  className?: string;
}

export function SimpleViewToggle({ className }: SimpleViewToggleProps) {
  const { isSimpleView, toggleSimpleView } = useAtlasCapabilities();

  return (
    <button
      type="button"
      onClick={toggleSimpleView}
      className={cn(
        "inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
        isSimpleView
          ? "border-accent text-accent bg-accent-tint12"
          : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/60",
        className
      )}
      aria-pressed={isSimpleView}
      title={
        isSimpleView
          ? "Switch to interactive 3D view"
          : "Switch to simple 2D view (reduces motion and disables 3D)"
      }
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full transition-colors",
          isSimpleView ? "bg-accent shadow-[0_0_8px_#77CFFF]" : "bg-ink-subtle"
        )}
      />
      <span>{isSimpleView ? "Simple view on" : "Switch to simple view"}</span>
    </button>
  );
}
