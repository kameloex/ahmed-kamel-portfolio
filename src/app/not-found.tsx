import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
      <span className="text-xs font-mono text-accent">SYSTEM ATLAS · 404</span>
      <h1 className="font-display text-3xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="text-sm text-ink-muted max-w-sm">
        The requested system station or route does not exist in this index.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-ink border border-border px-4 py-2 rounded-sm hover:border-accent hover:text-accent transition-colors mt-2"
      >
        <ArrowLeft size={14} />
        <span>Return to core</span>
      </Link>
    </div>
  );
}
