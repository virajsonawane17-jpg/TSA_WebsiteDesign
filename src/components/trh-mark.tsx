interface TRHMarkProps {
  size?: number;
  color?: string;
}

export function TRHMark({ size = 32, color = "var(--coral)" }: TRHMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Tampa Bay Bridge arch — iconic Tampa silhouette */}
      <path
        d="M2 22 Q16 4 30 22"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Bridge towers */}
      <line x1="10.5" y1="15.5" x2="10.5" y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16"   y1="10.5" x2="16"   y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="21.5" y1="15.5" x2="21.5" y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      {/* Bridge deck / road */}
      <line x1="2" y1="22" x2="30" y2="22" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
      {/* Tampa Bay water — two wave lines */}
      <path
        d="M2 25.5 Q8 23 14 25.5 Q20 28 26 25.5 Q28.5 24.3 30 25.5"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.65"
      />
      <path
        d="M5 29 Q9.5 27 14 29 Q18.5 31 23 29"
        stroke={color}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.38"
      />
    </svg>
  );
}
