import React from "react";
import { Spinner } from "@/components/ui/spinner-1";
import clsx from "clsx";

export interface ButtonProps {
  size?: "tiny" | "small" | "medium" | "large";
  type?: "primary" | "secondary" | "tertiary" | "error" | "warning";
  shape?: "square" | "circle" | "rounded";
  svgOnly?: boolean;
  children?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  "aria-label"?: string;
}

const sizeMap: Record<string, string> = {
  tiny: "w-6 h-6 text-sm",
  small: "w-8 h-8 text-sm",
  medium: "w-10 h-10 text-sm",
  large: "w-12 h-12 text-base",
};

const sizeMapText: Record<string, string> = {
  tiny: "px-1.5 h-6 text-sm",
  small: "px-2 h-8 text-sm",
  medium: "px-2.5 h-10 text-sm",
  large: "px-3.5 h-12 text-base",
};

export const Button = ({
  size = "medium",
  type = "secondary",
  shape = "rounded",
  svgOnly = false,
  children,
  prefix,
  suffix,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className,
  "aria-label": ariaLabel,
}: ButtonProps) => {
  const sizeClass = svgOnly ? sizeMap[size] : sizeMapText[size];

  const typeClass =
    disabled || loading
      ? "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
      : type === "primary"
      ? "bg-primary text-white hover:bg-secondary"
      : type === "error"
      ? "bg-red-500 text-white hover:bg-red-600"
      : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 fill-gray-700";

  const shapeClass =
    shape === "rounded"
      ? "rounded-full"
      : shape === "circle"
      ? "rounded-full"
      : "rounded-md";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={clsx(
        "flex justify-center items-center gap-1 transition-all duration-150 select-none",
        sizeClass,
        typeClass,
        shapeClass,
        fullWidth && "w-full",
        className
      )}
    >
      {loading ? <Spinner size={size === "large" ? 24 : 16} /> : prefix}
      {!svgOnly && <span className="px-1">{children}</span>}
      {svgOnly && children}
      {!loading && suffix}
    </button>
  );
};
