interface TRHMarkProps {
  size?: number;
  color?: string;
}

export function TRHMark({ size = 32, color = "var(--coral)" }: TRHMarkProps) {
  const cx = 16, cy = 16;
  const inner = 7, outer = 13;
  const rays: React.ReactElement[] = [];
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * inner;
    const y1 = cy + Math.sin(a) * inner;
    const x2 = cx + Math.cos(a) * outer;
    const y2 = cy + Math.sin(a) * outer;
    rays.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      {rays}
      <circle cx={cx} cy={cy} r="4.5" fill={color} />
    </svg>
  );
}
