"use client";

import { useEffect, useRef } from "react";

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* --------- CONVERSÃO OKLCH PARA RGB --------- */
    const oklchToRgb = (oklchStr: string): string => {
      try {
        // Extrai valores de oklch(L C H / A)
        const match = oklchStr.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
        if (!match) return "168, 85, 247"; // fallback

        const L = parseFloat(match[1]);
        const C = parseFloat(match[2]);
        const H = parseFloat(match[3]);

        // Conversão simplificada OKLCH -> RGB
        const h = (H * Math.PI) / 180;
        const a = C * Math.cos(h);
        const b = C * Math.sin(h);

        // OKLab -> Linear RGB (aproximação)
        const l = L + 0.3963377774 * a + 0.2158037573 * b;
        const m = L - 0.1055613458 * a - 0.0638541728 * b;
        const s = L - 0.0894841775 * a - 1.2914855480 * b;

        const toGamma = (x: number) => {
          const val = x ** 3;
          return Math.max(0, Math.min(255, val * 255));
        };

        const r = Math.round(toGamma(+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s));
        const g = Math.round(toGamma(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s));
        const b_rgb = Math.round(toGamma(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s));

        return `${r}, ${g}, ${b_rgb}`;
      } catch {
        return "168, 85, 247";
      }
    };

    /* --------- LÊ CORES DO TEMA --------- */
    const getVar = (name: string, fallback: string) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
      return value && value !== "" ? value : fallback;
    };

    const PRIMARY = getVar("--primary", "oklch(0.55 0.25 280)");
    const ACCENT = getVar("--accent", "oklch(0.55 0.25 280)");

    // Tenta pegar RGB direto (se disponível no CSS)
    let primaryRgb = getVar("--primary-rgb", "");
    let accentRgb = getVar("--accent-rgb", "");

    // Se não tiver, converte de OKLCH
    if (!primaryRgb || primaryRgb === "") {
      primaryRgb = oklchToRgb(PRIMARY);
    }
    if (!accentRgb || accentRgb === "") {
      accentRgb = oklchToRgb(ACCENT);
    }

    /* --------- CANVAS SETUP --------- */
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    /* --------- Cities --------- */
    interface City {
      x?: number;
      y?: number;
      lat: number;
      lng: number;
    }

    const cities: City[] = [
      { lat: -23.5505, lng: -46.6333 }, // São Paulo
      { lat: 40.7128, lng: -74.006 },   // New York
      { lat: 51.5074, lng: -0.1278 },   // London
      { lat: 35.6762, lng: 139.6503 },  // Tokyo
      { lat: 1.3521, lng: 103.8198 },   // Singapore
      { lat: -33.8688, lng: 151.2093 }, // Sydney
      { lat: 25.2048, lng: 55.2708 },   // Dubai
      { lat: 19.076, lng: 72.8777 },    // Mumbai
      { lat: 50.1109, lng: 8.6821 },    // Frankfurt
      { lat: 43.6532, lng: -79.3832 },  // Toronto
      { lat: 34.0522, lng: -118.2437 }, // Los Angeles
      { lat: 52.3676, lng: 4.9041 },    // Amsterdam
      { lat: 22.3193, lng: 114.1694 },  // Hong Kong
      { lat: 37.5665, lng: 126.978 },   // Seoul
      { lat: 48.8566, lng: 2.3522 },    // Paris
    ];

    const latLngToXY = (lat: number, lng: number) => {
      const x = ((lng + 180) / 360) * canvas.width;
      const latRad = (lat * Math.PI) / 180;
      const merc = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      const y = canvas.height / 2 - (canvas.width * merc) / (2 * Math.PI);
      return { x, y };
    };

    cities.forEach((c) => {
      const pos = latLngToXY(c.lat, c.lng);
      c.x = pos.x;
      c.y = pos.y;
    });

    /* -------- Floating nodes -------- */
    const nodes = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.8,
    }));

    /* -------- Animation loop -------- */
    let frame = 0;
    let animationFrameId: number;

    const animate = () => {
      frame++;

      // Fundo semi-transparente para trail effect suave
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      /* -------- Grid Lines (Paralelos) -------- */
      ctx.strokeStyle = `rgba(${primaryRgb}, 0.15)`;
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);

      // Paralelos (linhas horizontais)
      for (let lat = -60; lat <= 60; lat += 20) {
        ctx.beginPath();
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = latLngToXY(lat, lng);
          lng === -180 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Meridianos (linhas verticais)
      for (let lng = -180; lng <= 180; lng += 30) {
        ctx.beginPath();
        for (let lat = -80; lat <= 80; lat += 2) {
          const p = latLngToXY(lat, lng);
          lat === -80 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      ctx.setLineDash([]);

      /* -------- Cities glow -------- */
      cities.forEach((city, i) => {
        if (!city.x || !city.y) return;

        const pulse = Math.sin(frame * 0.02 + i) * 0.3 + 0.7;

        // Glow externo
        const g = ctx.createRadialGradient(city.x, city.y, 0, city.x, city.y, 20);
        g.addColorStop(0, `rgba(${primaryRgb}, 0.3)`);
        g.addColorStop(0.5, `rgba(${primaryRgb}, 0.15)`);
        g.addColorStop(1, `rgba(${primaryRgb}, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(city.x, city.y, 20, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo pulsante
        ctx.fillStyle = `rgba(${primaryRgb}, ${pulse})`;
        ctx.beginPath();
        ctx.arc(city.x, city.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Anel externo
        ctx.strokeStyle = `rgba(${primaryRgb}, ${pulse * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(city.x, city.y, 6, 0, Math.PI * 2);
        ctx.stroke();
      });

      /* -------- Floating nodes -------- */
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        // Glow do nó
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius * 3);
        g.addColorStop(0, `rgba(${accentRgb}, 0.4)`);
        g.addColorStop(0.5, `rgba(${accentRgb}, 0.2)`);
        g.addColorStop(1, `rgba(${accentRgb}, 0)`);

        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo do nó
        ctx.fillStyle = `rgba(${accentRgb}, 0.8)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      /* -------- Conexões entre nós próximos -------- */
      ctx.strokeStyle = `rgba(${accentRgb}, 0.1)`;
      ctx.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.3;
            ctx.strokeStyle = `rgba(${accentRgb}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1, opacity: 0.6 }}
    />
  );
}