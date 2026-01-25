"use client"

import React, { useEffect, useRef, useState } from "react";

interface MouseSparkProps {
  width?: number;
  height?: number;
  theme?: "light" | "dark";
}

const MouseSpark: React.FC<MouseSparkProps> = ({
  width,
  height,
  theme = "light",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: width || window.innerWidth,
        height: height || window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [width, height]);

  useEffect(() => {
    if (dimensions.width === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Theme colors
    const backgroundColor = theme === "dark" ? "#0a0a0a" : "#f5f5f5";
    const colors = theme === "dark"
      ? ["#ff6b6b", "#feca57", "#48dbfb", "#1dd1a1", "#5f27cd"]
      : ["#ff7f50", "#ffb347", "#00d2ff", "#76e4f7", "#ff85a2"];

    // Particles
    let particles: {
      x: number;
      y: number;
      dx: number;
      dy: number;
      color: string;
    }[] = [];

    const spawnParticles = (x: number, y: number) => {
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          color,
        });
      }
    };

    // Mouse move event
    const handleMouseMove = (e: MouseEvent) => {
      spawnParticles(e.clientX, e.clientY);
    };

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.dx *= 0.92;
        p.dy *= 0.92;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Remove slow particles
        if (Math.abs(p.dx) < 0.05 && Math.abs(p.dy) < 0.05) {
          particles.splice(i, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, theme]);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
};

export default MouseSpark;
