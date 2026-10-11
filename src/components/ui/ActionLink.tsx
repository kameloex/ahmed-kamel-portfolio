import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "subtle";
  external?: boolean;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export function ActionLink({
  href,
  children,
  variant = "secondary",
  external = false,
  className,
  onClick,
  ariaLabel,
}: ActionLinkProps) {
  if (!href && !onClick) {
    return null;
  }

  const baseStyles =
    "inline-flex items-center justify-center text-sm font-medium transition-all duration-200 rounded active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-accent";

  const variants = {
    primary:
      "bg-ink text-bg hover:bg-white active:bg-ink-muted px-4 py-2.5 shadow-sm font-semibold hover:shadow-[0_0_20px_rgba(245,247,250,0.2)]",
    secondary:
      "border border-border text-ink hover:border-accent hover:text-accent bg-surface/80 active:bg-surface px-4 py-2.5 hover:shadow-[0_0_20px_rgba(119,207,255,0.15)]",
    subtle:
      "text-ink-muted hover:text-ink active:text-accent underline-offset-4 hover:underline py-1 px-1",
  };

  const combinedClasses = cn(baseStyles, variants[variant], className);

  if (onClick && !href) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {children}
      </button>
    );
  }

  if (!href) return null;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={combinedClasses}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={combinedClasses} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}
