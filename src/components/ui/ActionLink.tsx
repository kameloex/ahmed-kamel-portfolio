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
    "inline-flex items-center justify-center text-sm font-medium transition-all duration-150 rounded active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-accent-deep";

  const variants = {
    primary:
      "bg-ink text-white hover:bg-ink/90 active:bg-ink px-4 py-2.5 shadow-sm font-medium",
    secondary:
      "border border-border-strong text-ink hover:border-ink hover:bg-surface active:bg-white px-4 py-2.5 bg-white font-medium",
    subtle:
      "text-ink-muted hover:text-ink active:text-ink underline-offset-4 hover:underline py-1 px-1",
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
