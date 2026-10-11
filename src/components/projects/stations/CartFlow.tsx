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
    <div className="w-full rounded-sm border border-border bg-surface p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header with persistent Simulated logic badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <div>
          <span className="text-xs font-mono text-accent">STATION B · CART WORKFLOW</span>
          <h3 className="font-display text-lg font-medium text-ink mt-0.5">
            Scan-to-Checkout Touchscreen Flow
          </h3>
        </div>
        <SimulatedBadge />
      </div>

      {/* Interactive Flow Graphic */}
      <div className="relative h-64 sm:h-72 w-full rounded border border-border/60 bg-bg overflow-hidden flex flex-col items-center justify-center p-6">
        {/* Background Grid */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(245,247,250,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,247,250,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Step Visualizer */}
        <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
          {/* STEP 1: SCAN */}
          {currentStep.id === "scan" && (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-36 h-28 rounded border border-accent/40 bg-surface flex flex-col items-center justify-center overflow-hidden">
                {/* Generic barcode pattern */}
                <div className="flex items-center gap-1.5 opacity-60">
                  <span className="w-1 h-12 bg-ink" />
                  <span className="w-2 h-12 bg-ink" />
                  <span className="w-0.5 h-12 bg-ink" />
                  <span className="w-1.5 h-12 bg-ink" />
                  <span className="w-0.5 h-12 bg-ink" />
                  <span className="w-2 h-12 bg-ink" />
                </div>
                {/* Sweeping scan line */}
                <div className="absolute inset-x-0 h-0.5 bg-accent animate-pulse shadow-[0_0_8px_#77CFFF] top-1/2 -translate-y-1/2" />
                <span className="mt-2 text-[10px] font-mono text-ink-subtle">
                  GENERIC TILE 01
                </span>
              </div>
              <span className="text-xs font-mono text-accent">
                SCAN BEAM ACTIVE · EAN-13 BUFFER
              </span>
            </div>
          )}

          {/* STEP 2: CART */}
          {currentStep.id === "cart" && (
            <div className="w-full space-y-3">
              <div className="rounded border border-border bg-surface p-3 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-ink-subtle border-b border-border/50 pb-1">
                  <span>CART REGISTER</span>
                  <span>QUANTITY: 2</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm border border-accent/40 bg-accent-tint12 flex items-center justify-center text-[10px] font-mono text-accent">
                      A
                    </span>
                    <span className="text-xs font-mono text-ink">GENERIC UNIT A</span>
                  </div>
                  <span className="text-xs font-mono text-accent">QTY: 02</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-t border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-sm border border-border bg-bg flex items-center justify-center text-[10px] font-mono text-ink-muted">
                      B
                    </span>
                    <span className="text-xs font-mono text-ink-muted">GENERIC UNIT B</span>
                  </div>
                  <span className="text-xs font-mono text-ink-muted">QTY: 01</span>
                </div>
              </div>
              <p className="text-center text-xs font-mono text-ink-subtle">
                Repeated scans debounce and increment quantity
              </p>
            </div>
          )}

          {/* STEP 3: PAY (SIMULATED) */}
          {currentStep.id === "pay" && (
            <div className="w-full max-w-xs space-y-3">
              <div className="rounded border border-accent/50 bg-surface p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-ink">SIMULATED WALLET</span>
                  <span className="text-[10px] font-mono text-accent">LUHN VALID</span>
                </div>
                <div className="h-8 rounded border border-border bg-bg px-2 flex items-center justify-between text-xs font-mono text-ink-muted">
                  <span>•••• •••• •••• 4012</span>
                  <span className="text-[10px] text-accent">TEST CARD</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-ink-subtle pt-1">
                  <span>BALANCE DEDUCTION</span>
                  <span className="text-accent">LOCAL LOGIC</span>
                </div>
              </div>
              <p className="text-center text-xs font-mono text-accent">
                No real bank or payment gateway connection
              </p>
            </div>
          )}

          {/* STEP 4: CONFIRMED */}
          {currentStep.id === "confirmed" && (
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-12 h-12 rounded-full border border-accent bg-accent-tint12 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-ink">
                  Transaction Simulated
                </h4>
                <p className="text-xs font-mono text-ink-subtle mt-1">
                  SESSION ID: MOCK-TX-9842 · COMPLETE
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Button-based Flow Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              onClick={() => setCurrentStepIndex(idx)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded-sm border font-mono transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                idx === currentStepIndex
                  ? "border-accent text-accent bg-accent-tint12"
                  : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/50"
              )}
            >
              {idx + 1}. {step.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrev}
            className="flex-1 sm:flex-initial text-xs font-medium px-3 py-2 rounded-sm border border-border bg-surface hover:border-accent hover:text-accent transition-colors"
            aria-label="Previous step in workflow"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 sm:flex-initial text-xs font-medium px-4 py-2 rounded-sm border border-border bg-surface hover:border-accent hover:text-accent transition-colors"
            aria-label="Next step in workflow"
          >
            Next step
          </button>
        </div>
      </div>

      {/* Current Step Description */}
      <div className="p-4 rounded border border-border bg-bg/60 space-y-1">
        <div className="flex items-center justify-between text-xs font-mono text-accent">
          <span>Active Phase: {currentStep.label}</span>
          <span>Step {currentStepIndex + 1} of 4</span>
        </div>
        <p className="text-xs text-ink-muted leading-relaxed">
          {currentStep.detail}
        </p>
      </div>
    </div>
  );
}
