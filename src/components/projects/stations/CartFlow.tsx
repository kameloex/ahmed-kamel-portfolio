"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { SimulatedBadge } from "@/components/ui/SimulatedBadge";

type CartStep = "scan" | "cart" | "pay" | "confirmed";

const steps: { id: CartStep; label: string; detail: string }[] = [
  {
    id: "scan",
    label: "Scan input",
    detail: "EAN-13 barcode read signal simulated. Debounce active.",
  },
  {
    id: "cart",
    label: "Cart state",
    detail: "Generic product token indexed into local cart state. Quantity updated.",
  },
  {
    id: "pay",
    label: "Simulated pay",
    detail: "Local simulated wallet logic and client Luhn check execution.",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    detail: "Simulated session token generated. Cart cleared.",
  },
];

export function CartFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const handlePrev = () => {
    setCurrentStepIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  return (
    <div className="w-full rounded border border-border-strong bg-white p-4 sm:p-6 lg:p-8 space-y-6 shadow-specimen">
      {/* Header with persistent Simulated logic badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-mono font-semibold text-accent-deep uppercase tracking-wider">
            SPECIMEN 02 // TRANSACTION STATE FLOW
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mt-0.5">
            Scan-to-Checkout Touchscreen Terminal
          </h3>
        </div>
        <SimulatedBadge />
      </div>

      {/* Interactive Flow Graphic */}
      <div className="relative h-64 sm:h-72 w-full rounded border border-border bg-surface overflow-hidden flex flex-col items-center justify-center p-6 bg-blueprint-grid">
        {/* State Content Rendering */}
        <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
          {currentStep.id === "scan" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-36 h-28 rounded border border-border-strong bg-white flex flex-col items-center justify-center overflow-hidden shadow-sm">
                <div className="flex items-center gap-1.5 opacity-80">
                  <span className="w-1 h-12 bg-ink" />
                  <span className="w-2 h-12 bg-ink" />
                  <span className="w-0.5 h-12 bg-ink" />
                  <span className="w-1.5 h-12 bg-ink" />
                  <span className="w-0.5 h-12 bg-ink" />
                  <span className="w-2 h-12 bg-ink" />
                </div>
                {/* Laser scan line */}
                <div className="absolute inset-x-0 h-0.5 bg-accent-mid animate-pulse top-1/2 -translate-y-1/2" />
                <span className="mt-2 text-[10px] font-mono text-ink-subtle">
                  GENERIC TILE 01
                </span>
              </div>
              <span className="text-xs font-mono text-accent-deep font-semibold">
                SCAN BEAM ACTIVE · EAN-13 BUFFER
              </span>
            </div>
          )}

          {currentStep.id === "cart" && (
            <div className="flex flex-col items-center space-y-4 w-full">
              <div className="w-full max-w-xs p-3 rounded border border-border-strong bg-white space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-xs font-mono text-ink border-b border-border pb-1.5 font-medium">
                  <span>ITEM REGISTER</span>
                  <span>QTY</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
                  <span className="truncate">GENERIC TILE 01</span>
                  <span className="text-ink font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
                  <span className="truncate">GENERIC TILE 02</span>
                  <span className="text-ink font-semibold">2</span>
                </div>
              </div>
              <span className="text-xs font-mono text-accent-deep font-semibold">
                LOCAL CART STATE UPDATED
              </span>
            </div>
          )}

          {currentStep.id === "pay" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-56 p-4 rounded border border-border-strong bg-white text-xs font-mono space-y-3 shadow-sm">
                <div className="flex justify-between items-center text-ink-muted">
                  <span>WALLET STATUS</span>
                  <span className="w-2 h-2 rounded-full bg-accent-mid" />
                </div>
                <div className="py-2 px-3 rounded bg-surface border border-border text-center text-ink font-medium">
                  SIMULATED BALANCE CHECK
                </div>
                <div className="text-[10px] text-ink-subtle text-center">
                  Client-side Luhn verification
                </div>
              </div>
              <span className="text-xs font-mono text-accent-deep font-semibold">
                SIMULATED AUTHORIZATION PASS
              </span>
            </div>
          )}

          {currentStep.id === "confirmed" && (
            <div className="flex flex-col items-center space-y-3">
              <div className="w-14 h-14 rounded-full border border-border-strong bg-accent-light flex items-center justify-center text-ink font-mono font-bold text-lg shadow-sm">
                OK
              </div>
              <div className="text-center space-y-1">
                <span className="text-xs font-mono font-semibold text-ink block">
                  TRANSACTION CONFIRMED (SIMULATED)
                </span>
                <span className="text-[11px] font-mono text-ink-subtle block">
                  Session Token: #SIM-LOCAL-TX
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Workflow Controls (Next/Previous and Direct Step Buttons) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setCurrentStepIndex(idx)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded border font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-deep whitespace-nowrap",
                idx === currentStepIndex
                  ? "border-ink bg-ink text-white font-medium"
                  : "border-border text-ink-muted hover:text-ink hover:border-ink/40 bg-white"
              )}
            >
              {idx + 1}. {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="flex-1 sm:flex-initial text-xs font-medium px-3 py-2 rounded border border-border-strong bg-white hover:bg-surface text-ink transition-colors font-mono"
            aria-label="Previous step in workflow"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 sm:flex-initial text-xs font-medium px-4 py-2 rounded border border-border-strong bg-white hover:bg-surface text-ink transition-colors font-mono"
            aria-label="Next step in workflow"
          >
            Next step
          </button>
        </div>
      </div>

      {/* Selected Step Description */}
      <div className="p-4 rounded border border-border-strong bg-surface space-y-1">
        <div className="flex items-center justify-between text-xs font-mono text-accent-deep font-semibold">
          <span>Active Phase: {currentStep.label}</span>
          <span>Step {currentStepIndex + 1} of 4</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed font-body">
          {currentStep.detail}
        </p>
      </div>
    </div>
  );
}
