"use client";

import React, { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useMotionValueEvent } from "motion/react";
import { CartFlow } from "./CartFlow";
import { useAtlasCapabilities } from "@/components/atlas/useAtlasCapabilities";
import { useInViewCanvas } from "@/components/atlas/useInViewCanvas";
import { SimulatedBadge } from "@/components/ui/SimulatedBadge";
import { cn } from "@/lib/utils";

type StepId = "scan" | "cart" | "pay" | "confirmed";

const steps: { id: StepId; label: string; detail: string }[] = [
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

function CartFlowScene({ stepIndex }: { stepIndex: number }) {
  const tileRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Mesh>(null);
  const cartBoxRef = useRef<THREE.Group>(null);
  const payGroupRef = useRef<THREE.Group>(null);
  const confirmRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Scan line animation in Step 0
    if (scanLineRef.current) {
      if (stepIndex === 0) {
        scanLineRef.current.position.y = Math.sin(t * 4) * 0.45;
        scanLineRef.current.visible = true;
      } else {
        scanLineRef.current.visible = false;
      }
    }

    // Generic Tile translation across steps
    if (tileRef.current) {
      if (stepIndex === 0) {
        tileRef.current.position.x = THREE.MathUtils.damp(
          tileRef.current.position.x,
          -1.2,
          5,
          delta
        );
        tileRef.current.scale.setScalar(1);
      } else if (stepIndex === 1) {
        // Tile moves into the cart bay
        tileRef.current.position.x = THREE.MathUtils.damp(
          tileRef.current.position.x,
          1.2,
          5,
          delta
        );
        tileRef.current.scale.setScalar(0.7);
      } else {
        // Receded into cart
        tileRef.current.position.x = 1.2;
        tileRef.current.scale.setScalar(0.7);
      }
    }

    // Cart Register response
    if (cartBoxRef.current) {
      const targetScale = stepIndex >= 1 ? 1.05 : 1;
      cartBoxRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }

    // Simulated Pay terminal popup in Step 2
    if (payGroupRef.current) {
      payGroupRef.current.visible = stepIndex === 2;
      if (stepIndex === 2) {
        payGroupRef.current.rotation.y = Math.sin(t * 1.5) * 0.1;
      }
    }

    // Confirmation ring in Step 3
    if (confirmRingRef.current) {
      confirmRingRef.current.visible = stepIndex === 3;
      if (stepIndex === 3) {
        confirmRingRef.current.rotation.z = t * 1.5;
      }
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Studio Lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} />

      {/* Ground Stage on Dark */}
      <mesh position={[0, -0.6, -0.2]} rotation={[-Math.PI / 4, 0, 0]}>
        <planeGeometry args={[4.2, 1.8]} />
        <meshBasicMaterial color={0x111720} transparent opacity={0.6} side={THREE.DoubleSide} />
      </mesh>
      <lineSegments position={[0, -0.6, -0.2]} rotation={[-Math.PI / 4, 0, 0]}>
        <edgesGeometry args={[new THREE.PlaneGeometry(4.2, 1.8)]} />
        <lineBasicMaterial color={0xf5f7fa} transparent opacity={0.2} />
      </lineSegments>

      {/* Generic Product Tile (No brand logos, no product names) */}
      <group ref={tileRef} position={[-1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.9, 0.9, 0.1]} />
          <meshBasicMaterial color={0x15384b} transparent opacity={0.8} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(0.9, 0.9, 0.1)]} />
          <lineBasicMaterial color={0x77cfff} />
        </lineSegments>
        {/* Generic inner marker */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial color={0x080b10} />
        </mesh>
      </group>

      {/* Sweeping Laser Scan Line */}
      <mesh ref={scanLineRef} position={[-1.2, 0, 0.12]}>
        <planeGeometry args={[1.2, 0.03]} />
        <meshBasicMaterial color={0x77cfff} side={THREE.DoubleSide} />
      </mesh>

      {/* Cart Register Zone (Right Side) */}
      <group ref={cartBoxRef} position={[1.2, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 1.2, 0.1]} />
          <meshBasicMaterial color={0x111720} transparent opacity={0.5} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1.2, 1.2, 0.1)]} />
          <lineBasicMaterial
            color={stepIndex >= 1 ? 0x77cfff : 0xf5f7fa}
            transparent
            opacity={0.4}
          />
        </lineSegments>
      </group>

      {/* Step 2: Simulated Pay Element */}
      <group ref={payGroupRef} position={[0, 0, 0.2]}>
        <mesh>
          <planeGeometry args={[1.6, 1.0]} />
          <meshBasicMaterial color={0x15384b} transparent opacity={0.85} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(1.6, 1.0)]} />
          <lineBasicMaterial color={0x77cfff} />
        </lineSegments>
      </group>

      {/* Step 3: Confirmed Ring Element */}
      <mesh ref={confirmRingRef} position={[0, 0, 0.3]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshBasicMaterial color={0x77cfff} side={THREE.DoubleSide} />
      </mesh>
      {stepIndex === 3 && (
        <mesh position={[0, 0, 0.3]}>
          <circleGeometry args={[0.2, 24]} />
          <meshBasicMaterial color={0x77cfff} />
        </mesh>
      )}
    </group>
  );
}

export function CartFlow3D() {
  const { canRun3D, prefersReducedMotion, isSimpleView } = useAtlasCapabilities();
  const { containerRef, isInView } = useInViewCanvas(0.15);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isManualSelection = useRef(false);

  // Scroll-linked flow scrub
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.25"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isManualSelection.current || prefersReducedMotion || isSimpleView) return;
    const targetIdx = Math.min(
      Math.floor(latest * steps.length),
      steps.length - 1
    );
    if (targetIdx !== currentStepIndex) {
      setCurrentStepIndex(targetIdx);
    }
  });

  const handleManualSelect = (index: number) => {
    isManualSelection.current = true;
    setCurrentStepIndex(index);
    setTimeout(() => {
      isManualSelection.current = false;
    }, 1500);
  };

  const handleNext = () => {
    isManualSelection.current = true;
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
    setTimeout(() => {
      isManualSelection.current = false;
    }, 1500);
  };

  const handlePrev = () => {
    isManualSelection.current = true;
    setCurrentStepIndex((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    setTimeout(() => {
      isManualSelection.current = false;
    }, 1500);
  };

  const currentStep = steps[currentStepIndex];

  if (!canRun3D) {
    return <CartFlow />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl border border-border bg-surface p-4 sm:p-6 lg:p-8 space-y-6 framer-card"
    >
      {/* Header with persistent badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/80">
        <div>
          <span className="text-xs font-mono text-accent uppercase tracking-wider">
            STATION B // TOUCHSCREEN WORKFLOW
          </span>
          <h3 className="font-display text-lg font-semibold text-ink mt-0.5">
            Scan-to-Checkout Touchscreen Terminal
          </h3>
        </div>
        <SimulatedBadge />
      </div>

      {/* 3D Viewport */}
      <div className="relative h-64 sm:h-72 w-full rounded-lg border border-border/60 bg-bg overflow-hidden bg-blueprint-grid">
        {isInView ? (
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full"
          >
            <Suspense fallback={null}>
              <CartFlowScene stepIndex={currentStepIndex} />
            </Suspense>
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs font-mono text-ink-subtle">
            Canvas suspended (out of view)
          </div>
        )}

        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-ink-subtle bg-surface/90 border border-border px-2 py-0.5 rounded pointer-events-none">
          Interactive workflow simulation
        </div>
      </div>

      {/* Step Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => handleManualSelect(idx)}
              className={cn(
                "text-xs px-2.5 py-1.5 rounded border font-mono transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent whitespace-nowrap",
                idx === currentStepIndex
                  ? "border-accent text-accent bg-accent-tint12 shadow-[0_0_10px_rgba(119,207,255,0.2)]"
                  : "border-border text-ink-muted hover:text-ink hover:border-accent/40 bg-surface/50"
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
            className="flex-1 sm:flex-initial text-xs font-medium px-3 py-2 rounded border border-border bg-surface hover:border-accent hover:text-accent text-ink transition-colors font-mono"
            aria-label="Previous step in workflow"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex-1 sm:flex-initial text-xs font-medium px-4 py-2 rounded border border-border bg-surface hover:border-accent hover:text-accent text-ink transition-colors font-mono"
            aria-label="Next step in workflow"
          >
            Next step
          </button>
        </div>
      </div>

      {/* Step Description */}
      <div className="p-4 rounded-lg border border-border/80 bg-bg/80 space-y-1">
        <div className="flex items-center justify-between text-xs font-mono text-accent">
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
