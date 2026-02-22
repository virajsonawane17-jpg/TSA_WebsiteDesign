"use client";

import { useState } from "react";

interface NewsImageProps {
  src: string | null | undefined;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

// Default placeholder image - Tampa cityscape/news related
const DEFAULT_PLACEHOLDER = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/Image-1-1769318907736.jpg";

export function NewsImage({ src, alt, fallbackSrc, className = "" }: NewsImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string | null>(src || fallbackSrc || null);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    // If we were trying the primary src and have a fallback, try fallback
    if (currentSrc === src && fallbackSrc && fallbackSrc !== src) {
      setCurrentSrc(fallbackSrc);
    } else if (currentSrc !== DEFAULT_PLACEHOLDER) {
      // Try the default placeholder image
      setCurrentSrc(DEFAULT_PLACEHOLDER);
    } else {
      // All options exhausted
      setHasError(true);
    }
  };

  // Use default placeholder if no source or error occurred
  const imageSrc = hasError || !currentSrc ? DEFAULT_PLACEHOLDER : currentSrc;

  return (
    <img 
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
