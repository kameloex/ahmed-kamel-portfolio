"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function SystemCore() {
  const groupRef = useRef<THREE.Group>(null);
  const corePanelsRef = useRef<THREE.Group>(null);
  const ringsGroupRef = useRef<THREE.Group>(null);

  // Check if touch device for pointer response rule
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const pointerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);

      const handlePointerMove = (e: MouseEvent) => {
        // Normalized coordinates -1 to 1
        pointerPos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointerPos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      };

      if (!window.matchMedia("(pointer: coarse)").matches) {
        window.addEventListener("mousemove", handlePointerMove, { passive: true });
        return () => window.removeEventListener("mousemove", handlePointerMove);
      }
    }
  }, []);

  // Procedural rings geometry using LineLoop
  const { outerRingGeo, midRingGeo, innerRingGeo } = useMemo(() => {
    function createCircleGeo(radius: number, segments: number) {
      const points: THREE.Vector3[] = [];
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      return new THREE.BufferGeometry().setFromPoints(points);
    }

    return {
      outerRingGeo: createCircleGeo(2.6, 64),
      midRingGeo: createCircleGeo(1.9, 48),
      innerRingGeo: createCircleGeo(1.2, 36),
    };
  }, []);

  // Station connectors and node positions
  const stationNodes = useMemo(() => {
    const nodes = [
      { id: "portal", pos: new THREE.Vector3(-1.8, -1.3, 0.2), label: "A" },
      { id: "cart", pos: new THREE.Vector3(1.8, -1.3, 0.2), label: "B" },
      { id: "hub", pos: new THREE.Vector3(0, 2.0, 0.2), label: "C" },
    ];

    const lines: THREE.BufferGeometry[] = [];
    nodes.forEach((n) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        n.pos,
      ]);
      lines.push(geo);
    });

    return { nodes, lines };
  }, []);

  // Subtle tick geometry for the outer dial
  const ticksGeo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 36;
    const r1 = 2.55;
    const r2 = 2.65;
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      points.push(
        new THREE.Vector3(Math.cos(theta) * r1, Math.sin(theta) * r1, 0),
        new THREE.Vector3(Math.cos(theta) * r2, Math.sin(theta) * r2, 0)
      );
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  // Animation frame loop: orchestrated entrance (< 1.5s) & gentle pointer/idle response
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Orchestrated entrance under 1.5s
    if (t < 1.5) {
      const progress = Math.min(t / 1.2, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.65, 1, eased));
      groupRef.current.rotation.z = THREE.MathUtils.lerp(-0.3, 0, eased);
    }

    // Slow technical idle rotation for outer rings
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z += delta * 0.04;
    }

    // Counter-rotation for layered panels
    if (corePanelsRef.current) {
      corePanelsRef.current.rotation.z -= delta * 0.02;
    }

    // Responsive camera/pointer tilt on desktop
    if (!isTouchDevice) {
      const targetRotX = pointerPos.current.y * 0.18;
      const targetRotY = pointerPos.current.x * 0.22;
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
      groupRef.current.rotation.y = THREE.MathUtils.damp(
        groupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
    } else {
      // Stable lightweight presentation on touch devices: no pointer tracking
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.04;
      groupRef.current.rotation.y = Math.cos(t * 0.3) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer rotating telemetry rings */}
      <group ref={ringsGroupRef}>
        {/* Outer subtle ring */}
        <primitive object={new THREE.Line(outerRingGeo, new THREE.LineBasicMaterial({
          color: 0xf5f7fa,
          transparent: true,
          opacity: 0.15,
        }))} />

        {/* Outer dial ticks */}
        <primitive object={new THREE.LineSegments(ticksGeo, new THREE.LineBasicMaterial({
          color: 0x77cfff,
          transparent: true,
          opacity: 0.35,
        }))} />

        {/* Mid light-blue ring */}
        <primitive object={new THREE.Line(midRingGeo, new THREE.LineBasicMaterial({
          color: 0x77cfff,
          transparent: true,
          opacity: 0.45,
        }))} />

        {/* Inner subtle ring */}
        <primitive object={new THREE.Line(innerRingGeo, new THREE.LineBasicMaterial({
          color: 0xf5f7fa,
          transparent: true,
          opacity: 0.2,
        }))} />
      </group>

      {/* Radiating connector lines to the 3 stations */}
      {stationNodes.lines.map((lineGeo, idx) => (
        <primitive
          key={`connector-${idx}`}
          object={new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({
              color: 0x77cfff,
              transparent: true,
              opacity: 0.4,
            })
          )}
        />
      ))}

      {/* Station nodes */}
      {stationNodes.nodes.map((node) => (
        <group key={node.id} position={node.pos}>
          {/* Outer halo */}
          <mesh>
            <ringGeometry args={[0.12, 0.16, 24]} />
            <meshBasicMaterial color={0x77cfff} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          {/* Inner core node */}
          <mesh>
            <circleGeometry args={[0.08, 24]} />
            <meshBasicMaterial color={0xf5f7fa} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}

      {/* Center Core: 3 Layered technical panels */}
      <group ref={corePanelsRef}>
        {/* Layer 1: Deep blue base panel */}
        <group position={[0, 0, -0.15]} rotation={[0, 0, Math.PI / 8]}>
          <mesh>
            <planeGeometry args={[1.3, 1.3]} />
            <meshBasicMaterial color={0x15384b} transparent opacity={0.4} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.3, 1.3)]} />
            <lineBasicMaterial color={0x77cfff} transparent opacity={0.3} />
          </lineSegments>
        </group>

        {/* Layer 2: Surface panel */}
        <group position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 12]}>
          <mesh>
            <planeGeometry args={[1.1, 1.1]} />
            <meshBasicMaterial color={0x111720} transparent opacity={0.7} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(1.1, 1.1)]} />
            <lineBasicMaterial color={0xf5f7fa} transparent opacity={0.3} />
          </lineSegments>
        </group>

        {/* Layer 3: Top accent panel */}
        <group position={[0, 0, 0.15]} rotation={[0, 0, 0]}>
          <mesh>
            <planeGeometry args={[0.85, 0.85]} />
            <meshBasicMaterial color={0x080b10} transparent opacity={0.85} side={THREE.DoubleSide} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.PlaneGeometry(0.85, 0.85)]} />
            <lineBasicMaterial color={0x77cfff} transparent opacity={0.8} />
          </lineSegments>
        </group>

        {/* Central Core Reticle */}
        <mesh position={[0, 0, 0.2]}>
          <ringGeometry args={[0.18, 0.22, 32]} />
          <meshBasicMaterial color={0x77cfff} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <circleGeometry args={[0.07, 24]} />
          <meshBasicMaterial color={0xf5f7fa} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
