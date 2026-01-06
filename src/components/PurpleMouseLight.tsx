import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function PurpleMouseLight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Camada externa - luz mais difusa e ampla */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(91, 33, 182, 0.35) 0%, rgba(91, 33, 182, 0.25) 25%, rgba(91, 33, 182, 0.15) 45%, rgba(91, 33, 182, 0.08) 65%, transparent 85%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 0.8,
        }}
      />
      
      {/* Camada intermediária - luz média */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(109, 40, 217, 0.45) 0%, rgba(109, 40, 217, 0.3) 35%, rgba(109, 40, 217, 0.15) 60%, transparent 80%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(50px)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.85,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 25,
          mass: 0.5,
        }}
      />
      
      {/* Camada interna - núcleo da luz mais intenso */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "250px",
          height: "250px",
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, rgba(139, 92, 246, 0.4) 40%, rgba(124, 58, 237, 0.2) 65%, transparent 85%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(30px)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
          mass: 0.3,
        }}
      />
      
      {/* Ponto central - mais brilhante */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(167, 139, 250, 0.7) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(124, 58, 237, 0.3) 75%, transparent 100%)",
          transform: "translate(-50%, -50%)",
          filter: "blur(15px)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 35,
          mass: 0.2,
        }}
      />
    </div>
  );
}
