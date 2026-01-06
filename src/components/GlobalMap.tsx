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
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  const floatVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">
      <motion.div
        variants={floatVariants}
        animate="animate"
        className="relative w-full h-full"
      >
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
            <radialGradient id="sphereGradient" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1E293B" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0F172A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0.8" />
            </radialGradient>
            
            <linearGradient id="purpleGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5" />
              <stop offset="30%" stopColor="#6D28D9" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#6D28D9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4C1D95" stopOpacity="0.2" />
            </linearGradient>
            
            <linearGradient id="cyanGradient3D" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.5" />
              <stop offset="30%" stopColor="#22D3EE" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#22D3EE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0891B2" stopOpacity="0.2" />
            </linearGradient>

            <filter id="glow3D">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter id="shadow3D">
              <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.3" />
            </filter>
          </defs>

          <ellipse
            cx="350"
            cy="250"
            rx="320"
            ry="200"
            fill="url(#sphereGradient)"
            opacity="0.6"
          />

          {regions.map((region, index) => {
            const isHovered = hoveredRegion === region.id;
            const fillColor = region.color === "purple" ? "#8B5CF6" : "#22D3EE";
            const gradientId = region.color === "purple" ? "purpleGradient3D" : "cyanGradient3D";

            return (
              <g key={region.id}>
                <motion.path
                  d={region.path}
                  fill={`url(#${gradientId})`}
                  stroke={fillColor}
                  strokeWidth={isHovered ? 3 : 2}
                  strokeOpacity={isHovered ? 1 : 0.7}
                  variants={regionVariants}
                  custom={index}
                  whileHover={{ scale: 1.08, y: -2 }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className="cursor-pointer transition-all duration-300"
                  style={{ 
                    filter: isHovered ? "url(#glow3D) url(#shadow3D)" : "url(#shadow3D)",
                    transformOrigin: `${region.position.x}px ${region.position.y}px`
                  }}
                />
                <motion.circle
                  cx={region.position.x}
                  cy={region.position.y}
                  r={isHovered ? 6 : 4}
                  fill={fillColor}
                  opacity={isHovered ? 1 : 0.8}
                  variants={pulseVariants}
                  animate={isHovered ? "animate" : "animate"}
                  transition={{ delay: index * 0.2 }}
                  style={{ filter: "url(#glow3D)" }}
                />
                <motion.text
                  x={region.position.x}
                  y={region.position.y + 22}
                  fill={fillColor}
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  opacity={isHovered ? 1 : 0.85}
                  className="pointer-events-none transition-opacity duration-300"
                  style={{ 
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
                    textShadow: `0 0 8px ${fillColor}`
                  }}
                >
                  {region.name}
                </motion.text>
              </g>
            );
          })}

          <motion.circle
            cx="220"
            cy="200"
            r="3"
            fill="#8B5CF6"
            opacity="0.7"
            variants={pulseVariants}
            animate="animate"
            style={{ filter: "url(#glow3D)" }}
          />
          <motion.circle
            cx="460"
            cy="140"
            r="3"
            fill="#22D3EE"
            opacity="0.7"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 1 }}
            style={{ filter: "url(#glow3D)" }}
          />
          <motion.circle
            cx="560"
            cy="240"
            r="3"
            fill="#8B5CF6"
            opacity="0.7"
            variants={pulseVariants}
            animate="animate"
            transition={{ delay: 0.5 }}
            style={{ filter: "url(#glow3D)" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
