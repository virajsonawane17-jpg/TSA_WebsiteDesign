"use client";

import { useRef, useState } from "react";

interface HoverGlowProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  glowColor?: string;
  background?: string;
  color?: string;
  hoverColor?: string;
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  as?: "button" | "a";
}

export function HoverGlow({
  children,
  onClick,
  href,
  className = "",
  glowColor = "#FFB37A",
  background = "#0E1525",
  color = "#FFFFFF",
  hoverColor = "#FFD8B8",
  size = "md",
  icon = null,
  as: Tag = "button",
}: HoverGlowProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hover, setHover] = useState(false);

  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const props = {
    ref,
    onClick,
    onMouseMove: move,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className: `hover-glow hg-${size} ${hover ? "is-hover" : ""} ${className}`,
    style: {
      background,
      color: hover ? hoverColor : color,
    } as React.CSSProperties,
    ...(href ? { href } : {}),
  };

  return (
    <Tag {...props}>
      <span
        className="hg-glow"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          background: `radial-gradient(circle, ${glowColor} 8%, transparent 65%)`,
        }}
      />
      <span className="hg-content">
        {children}
        {icon && <span className="hg-ico">{icon}</span>}
      </span>
    </Tag>
  );
}
