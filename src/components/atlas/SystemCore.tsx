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
      { id: "portal", pos: new THREE.Vector3(-1.8, -1.3, 0.2), label: "01" },
      { id: "cart", pos: new THREE.Vector3(1.8, -1.3, 0.2), label: "02" },
      { id: "hub", pos: new THREE.Vector3(0, 2.0, 0.2), label: "03" },
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

  // Subtle tick geometry for the outer precision dial
  const ticksGeo = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const count = 48;
    const r1 = 2.52;
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

  // Edges geometries for architectural panels
  const panelBoxGeo = useMemo(() => new THREE.BoxGeometry(1.2, 1.2, 0.08), []);
  const panelEdgesGeo = useMemo(() => new THREE.EdgesGeometry(panelBoxGeo), [panelBoxGeo]);

  const discGeo = useMemo(() => new THREE.CylinderGeometry(0.85, 0.85, 0.04, 32), []);
  const discEdgesGeo = useMemo(() => new THREE.EdgesGeometry(discGeo), [discGeo]);

  // Animation frame loop: orchestrated entrance (< 1.5s) & gentle pointer/idle response
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const t = state.clock.getElapsedTime();

    // Orchestrated entrance under 1.2s
    if (t < 1.2) {
      const progress = Math.min(t / 1.0, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.65, 1, eased));
      groupRef.current.rotation.z = THREE.MathUtils.lerp(-0.25, 0, eased);
    }

    // Pointer response on desktop, steady idle on touch
    if (!isTouchDevice) {
      const targetRotX = pointerPos.current.y * 0.28;
      const targetRotY = pointerPos.current.x * 0.35;
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
      // Gentle kinetic idle on touch devices
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.08;
      groupRef.current.rotation.y = Math.cos(t * 0.4) * 0.10;
    }

    // Secondary kinetic movements
    if (corePanelsRef.current) {
      corePanelsRef.current.rotation.z = t * 0.08;
    }
    if (ringsGroupRef.current) {
      ringsGroupRef.current.rotation.z = -t * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Studio Lighting on White Ground */}
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 6, 5]} intensity={1.8} />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#EBF7FF" />

      {/* Soft Contact Drop Shadow Plane Underneath */}
      <mesh position={[0, -2.8, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshBasicMaterial
          color="#080B10"
          transparent
          opacity={0.06}
          depthWrite={false}
        />
      </mesh>

      {/* Kinetic Precision Rings (Black wireframe & Light Blue accents) */}
      <group ref={ringsGroupRef}>
        {/* Outer Ring - Black wireframe line */}
        <lineLoop geometry={outerRingGeo}>
          <lineBasicMaterial color="#080B10" transparent opacity={0.35} />
        </lineLoop>

        {/* Dial Ticks - Black line segments */}
        <lineSegments geometry={ticksGeo}>
          <lineBasicMaterial color="#080B10" transparent opacity={0.4} />
        </lineSegments>

        {/* Middle Ring - Translucent Light Blue accent line */}
        <lineLoop geometry={midRingGeo}>
          <lineBasicMaterial color="#77CFFF" transparent opacity={0.85} linewidth={2} />
        </lineLoop>

        {/* Inner Ring - Black wireframe line */}
        <lineLoop geometry={innerRingGeo}>
          <lineBasicMaterial color="#080B10" transparent opacity={0.25} />
        </lineLoop>
      </group>

      {/* Central Kinetic Blueprint Plates */}
      <group ref={corePanelsRef}>
        {/* Base Layer: Translucent Blueprint Blue Slab */}
        <mesh position={[0, 0, -0.15]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[1.3, 1.3, 0.04]} />
          <meshPhysicalMaterial
            color="#77CFFF"
            transparent
            opacity={0.3}
            roughness={0.1}
            transmission={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Mid Layer: Matte White Slab with Crisp Black Edges */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, -0.15]} geometry={panelBoxGeo}>
          <meshStandardMaterial color="#FFFFFF" roughness={0.25} metalness={0.05} />
        </mesh>
        <lineSegments
          geometry={panelEdgesGeo}
          position={[0, 0, 0]}
          rotation={[0, 0, -0.15]}
        >
          <lineBasicMaterial color="#080B10" transparent opacity={0.8} />
        </lineSegments>

        {/* Top Layer: Precision Translucent Blueprint Disc */}
        <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]} geometry={discGeo}>
          <meshPhysicalMaterial
            color="#77CFFF"
            transparent
            opacity={0.45}
            roughness={0.2}
          />
        </mesh>
        <lineSegments
          geometry={discEdgesGeo}
          position={[0, 0, 0.12]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <lineBasicMaterial color="#0E476B" transparent opacity={0.7} />
        </lineSegments>

        {/* Center Optical Core Spheres */}
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.22]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial color="#080B10" />
        </mesh>
      </group>

      {/* Vector Lines connecting center to 3 System Specimen Anchors */}
      {stationNodes.lines.map((geo, i) => (
        <lineSegments key={i} geometry={geo}>
          <lineDashedMaterial
            color="#080B10"
            transparent
            opacity={0.3}
            dashSize={0.12}
            gapSize={0.08}
          />
        </lineSegments>
      ))}

      {/* 3 Specimen Satellite Nodes */}
      {stationNodes.nodes.map((node) => (
        <group key={node.id} position={node.pos}>
          {/* Node Base Shadow disc */}
          <mesh position={[0, 0, -0.05]}>
            <circleGeometry args={[0.24, 24]} />
            <meshBasicMaterial color="#080B10" transparent opacity={0.08} />
          </mesh>
          {/* Node Solid Matte White Disc */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {/* Node Black Wireframe Perimeter */}
          <lineSegments
            geometry={new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 24))}
          >
            <lineBasicMaterial color="#080B10" transparent opacity={0.6} />
          </lineSegments>
          {/* Active Accent Core */}
          <mesh position={[0, 0, 0.03]}>
            <cylinderGeometry args={[0.09, 0.09, 0.02, 16]} />
            <meshBasicMaterial color="#77CFFF" />
          </mesh>
        </group>
      ))}
    </group>
  );
}
