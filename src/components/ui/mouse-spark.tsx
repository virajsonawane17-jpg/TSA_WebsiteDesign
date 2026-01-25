"use client";

import React, { useEffect, useRef, useState } from "react";

interface MouseSparkProps {
  width?: number;
  height?: number;
  theme?: "light" | "dark";
}

export const MouseSpark: React.FC<MouseSparkProps> = ({
  width: customWidth,
  height: customHeight,
  theme = "light",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: customWidth || window.innerWidth,
        height: customHeight || window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, [customWidth, customHeight]);

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
      life: number;
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
          life: 1.0,
        });
      }
    };

    // Mouse move event
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      spawnParticles(e.clientX - rect.left, e.clientY - rect.top);
    };

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.dx;
        p.y += p.dy;
        p.dx *= 0.92;
        p.dy *= 0.92;
        
        // Add life decay to eventually remove them as in original code
        // The original code removes them if speed is low.
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Remove slow particles as per original code
        if (Math.abs(p.dx) < 0.05 && Math.abs(p.dy) < 0.05) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Use parent element for mouse events if possible, or just the canvas
    const target = canvas.parentElement || window;
    target.addEventListener("mousemove", handleMouseMove as any);
    animate();

    return () => {
      target.removeEventListener("mousemove", handleMouseMove as any);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none absolute inset-0 z-0"
      style={{ display: "block" }} 
    />
  );
};

export default MouseSpark;
