import React from "react";
import { cn } from "@/lib/utils";

interface AtlasFallbackProps {
  className?: string;
  interactive?: boolean;
}

export function AtlasFallback({ className }: AtlasFallbackProps) {
  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] mx-auto flex items-center justify-center select-none",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 600 600"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background coordinate grid */}
        <defs>
          <pattern
            id="core-grid-light"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(8, 11, 16, 0.05)"
              strokeWidth="1"
            />
          </pattern>
          <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#080B10" floodOpacity="0.08" />
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#core-grid-light)" rx="8" />

        {/* Outer orbital rings */}
        <circle
          cx="300"
          cy="300"
          r="260"
          stroke="rgba(8, 11, 16, 0.15)"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
        <circle
          cx="300"
          cy="300"
          r="210"
          stroke="#77CFFF"
          strokeWidth="1.5"
          strokeOpacity="0.6"
        />
        <circle
          cx="300"
          cy="300"
          r="160"
          stroke="rgba(8, 11, 16, 0.20)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <circle
          cx="300"
          cy="300"
          r="110"
          stroke="#77CFFF"
          strokeWidth="2"
        />

        {/* Technical Axis Lines & Crosshairs */}
        <line
          x1="300"
          y1="40"
          x2="300"
          y2="560"
          stroke="rgba(8, 11, 16, 0.12)"
          strokeWidth="1"
        />
        <line
          x1="40"
          y1="300"
          x2="560"
          y2="300"
          stroke="rgba(8, 11, 16, 0.12)"
          strokeWidth="1"
        />
        <line
          x1="120"
          y1="120"
          x2="480"
          y2="480"
          stroke="#77CFFF"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="2 6"
        />
        <line
          x1="120"
          y1="480"
          x2="480"
          y2="120"
          stroke="#77CFFF"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="2 6"
        />

        {/* Diagonal connecting vectors to 3 specimens */}
        <line
          x1="300"
          y1="300"
          x2="135"
          y2="415"
          stroke="#080B10"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="300"
          y1="300"
          x2="465"
          y2="415"
          stroke="#080B10"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <line
          x1="300"
          y1="300"
          x2="300"
          y2="90"
          stroke="#080B10"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />

        {/* Specimen Nodes */}
        {/* Node A */}
        <g transform="translate(135, 415)" filter="url(#soft-shadow)">
          <circle r="18" fill="#FFFFFF" stroke="#080B10" strokeWidth="1.5" />
          <circle r="7" fill="#77CFFF" />
          <text
            x="0"
            y="34"
            fill="#080B10"
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="monospace"
          >
            SPECIMEN 01 · PORTAL
          </text>
        </g>

        {/* Node B */}
        <g transform="translate(465, 415)" filter="url(#soft-shadow)">
          <circle r="18" fill="#FFFFFF" stroke="#080B10" strokeWidth="1.5" />
          <circle r="7" fill="#77CFFF" />
          <text
            x="0"
            y="34"
            fill="#080B10"
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="monospace"
          >
            SPECIMEN 02 · CART
          </text>
        </g>

        {/* Node C */}
        <g transform="translate(300, 90)" filter="url(#soft-shadow)">
          <circle r="18" fill="#FFFFFF" stroke="#080B10" strokeWidth="1.5" />
          <circle r="7" fill="#77CFFF" />
          <text
            x="0"
            y="-24"
            fill="#080B10"
            fontSize="10"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="monospace"
          >
            SPECIMEN 03 · HUB
          </text>
        </g>

        {/* Center Architectural Kinetic Assemblies (Gimbal Layering) */}
        {/* Layer 3: Rotated Base Plate */}
        <rect
          x="235"
          y="235"
          width="130"
          height="130"
          rx="6"
          fill="#EBF7FF"
          stroke="#77CFFF"
          strokeWidth="1.5"
          transform="rotate(15 300 300)"
          filter="url(#soft-shadow)"
        />

        {/* Layer 2: Mid Precision Plate */}
        <rect
          x="245"
          y="245"
          width="110"
          height="110"
          rx="5"
          fill="#F5F7FA"
          stroke="#080B10"
          strokeWidth="1.5"
          transform="rotate(-10 300 300)"
        />

        {/* Layer 1: Foreground Datum Plate */}
        <rect
          x="255"
          y="255"
          width="90"
          height="90"
          rx="4"
          fill="#FFFFFF"
          stroke="#080B10"
          strokeWidth="2"
        />

        {/* Center Optical Reticle */}
        <circle cx="300" cy="300" r="28" stroke="#77CFFF" strokeWidth="1.5" />
        <circle
          cx="300"
          cy="300"
          r="14"
          fill="#77CFFF"
          fillOpacity="0.25"
          stroke="#0E476B"
          strokeWidth="1.5"
        />
        <circle cx="300" cy="300" r="4" fill="#080B10" />

        {/* Precision Calibration Marks */}
        <path d="M 290 300 H 310 M 300 290 V 310" stroke="#080B10" strokeWidth="1" />

        {/* Architectural labels */}
        <text
          x="300"
          y="370"
          fill="#080B10"
          fontSize="10"
          fontWeight="700"
          textAnchor="middle"
          fontFamily="monospace"
          letterSpacing="1.5"
        >
          KINETIC RIG // CALIBRATED
        </text>
        <text
          x="300"
          y="386"
          fill="#0E476B"
          fontSize="9"
          fontWeight="500"
          textAnchor="middle"
          fontFamily="monospace"
        >
          3 SYSTEM SPECIMENS
        </text>
      </svg>
    </div>
  );
}
