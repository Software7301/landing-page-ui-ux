import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Region {
  id: string;
  name: string;
  path: string;
  color: "purple" | "cyan";
  position: { x: number; y: number };
}

const regions: Region[] = [
  {
    id: "us-east",
    name: "US East",
    path: "M 180 180 Q 200 160 220 180 T 260 180 Q 260 200 240 220 Q 220 220 200 200 Q 180 200 180 180 Z",
    color: "purple",
    position: { x: 220, y: 200 },
  },
  {
    id: "us-west",
    name: "US West",
    path: "M 100 180 Q 120 160 140 180 T 180 180 Q 180 200 160 220 Q 140 220 120 200 Q 100 200 100 180 Z",
    color: "purple",
    position: { x: 140, y: 200 },
  },
  {
    id: "eu-central",
    name: "EU Central",
    path: "M 420 120 Q 440 100 460 120 T 500 120 Q 500 140 480 160 Q 460 160 440 140 Q 420 140 420 120 Z",
    color: "cyan",
    position: { x: 460, y: 140 },
  },
  {
    id: "eu-west",
    name: "EU West",
    path: "M 360 120 Q 380 100 400 120 T 440 120 Q 440 140 420 160 Q 400 160 380 140 Q 360 140 360 120 Z",
    color: "cyan",
    position: { x: 400, y: 140 },
  },
  {
    id: "asia-pacific",
    name: "Asia Pacific",
    path: "M 520 220 Q 540 200 560 220 T 600 220 Q 600 240 580 260 Q 560 260 540 240 Q 520 240 520 220 Z",
    color: "purple",
    position: { x: 560, y: 240 },
  },
  {
    id: "south-america",
    name: "South America",
    path: "M 240 280 Q 260 260 280 280 T 320 280 Q 320 300 300 320 Q 280 320 260 300 Q 240 300 240 280 Z",
    color: "cyan",
    position: { x: 280, y: 300 },
  },
];

export function GlobalMap() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const regionVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 700 500"
        className="w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <defs>
          <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6D28D9" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#6D28D9" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {regions.map((region, index) => {
          const isHovered = hoveredRegion === region.id;
          const fillColor = region.color === "purple" ? "#6D28D9" : "#22D3EE";
          const gradientId = region.color === "purple" ? "purpleGradient" : "cyanGradient";

          return (
            <g key={region.id}>
              <motion.path
                d={region.path}
                fill={`url(#${gradientId})`}
                stroke={fillColor}
                strokeWidth={isHovered ? 2.5 : 1.5}
                strokeOpacity={isHovered ? 0.9 : 0.5}
                variants={regionVariants}
                custom={index}
                whileHover={{ scale: 1.05 }}
                onMouseEnter={() => setHoveredRegion(region.id)}
                onMouseLeave={() => setHoveredRegion(null)}
                className="cursor-pointer transition-all duration-300"
                style={{ filter: isHovered ? "url(#glow)" : "none" }}
              />
              <motion.circle
                cx={region.position.x}
                cy={region.position.y}
                r={isHovered ? 5 : 3}
                fill={fillColor}
                opacity={isHovered ? 0.9 : 0.6}
                variants={pulseVariants}
                animate={isHovered ? "animate" : undefined}
                transition={{ delay: index * 0.2 }}
                style={{ filter: "url(#glow)" }}
              />
              <text
                x={region.position.x}
                y={region.position.y + 20}
                fill={fillColor}
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                opacity={isHovered ? 1 : 0.7}
                className="pointer-events-none transition-opacity duration-300"
              >
                {region.name}
              </text>
            </g>
          );
        })}

        <motion.circle
          cx="220"
          cy="200"
          r="2"
          fill="#6D28D9"
          opacity="0.4"
          variants={pulseVariants}
          animate="animate"
        />
        <motion.circle
          cx="460"
          cy="140"
          r="2"
          fill="#22D3EE"
          opacity="0.4"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.circle
          cx="560"
          cy="240"
          r="2"
          fill="#6D28D9"
          opacity="0.4"
          variants={pulseVariants}
          animate="animate"
          transition={{ delay: 0.5 }}
        />
      </motion.svg>
    </div>
  );
}
