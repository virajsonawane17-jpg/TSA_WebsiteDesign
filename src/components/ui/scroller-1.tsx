"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button-1";
import clsx from "clsx";

type TOverflowType = "x" | "y" | "both";

interface ScrollerProps {
  children: React.ReactNode;
  overflow: TOverflowType;
  height?: number | string;
  width?: number | string;
  withButtons?: boolean;
  childrenContainerClassName?: string;
}

const ArrowUp = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.93935 10.5L2.46968 9.96966L7.2929 5.14644C7.68342 4.75592 8.31659 4.75592 8.70711 5.14644L13.5303 9.96966L14.0607 10.5L13 11.5607L12.4697 11.0303L8 6.56065L3.53034 11.0303L3.00001 11.5607L1.93935 10.5Z" />
  </svg>
);
const ArrowDown = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path fillRule="evenodd" clipRule="evenodd" d="M14.0607 5.49999L13.5303 6.03032L8.7071 10.8535C8.31658 11.2441 7.68341 11.2441 7.29289 10.8535L2.46966 6.03032L1.93933 5.49999L2.99999 4.43933L3.53032 4.96966L7.99999 9.43933L12.4697 4.96966L13 4.43933L14.0607 5.49999Z" />
  </svg>
);
const ArrowLeft = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path fillRule="evenodd" clipRule="evenodd" d="M10.5 14.0607L9.96966 13.5303L5.14644 8.7071C4.75592 8.31658 4.75592 7.68341 5.14644 7.29289L9.96966 2.46966L10.5 1.93933L11.5607 2.99999L11.0303 3.53032L6.56065 7.99999L11.0303 12.4697L11.5607 13L10.5 14.0607Z" />
  </svg>
);
const ArrowRight = () => (
  <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
    <path fillRule="evenodd" clipRule="evenodd" d="M5.50001 1.93933L6.03034 2.46966L10.8536 7.29288C11.2441 7.68341 11.2441 8.31657 10.8536 8.7071L6.03034 13.5303L5.50001 14.0607L4.43935 13L4.96968 12.4697L9.43935 7.99999L4.96968 3.53032L4.43935 2.99999L5.50001 1.93933Z" />
  </svg>
);

export const Scroller = ({
  children,
  overflow,
  height = "100%",
  width = "100%",
  withButtons,
  childrenContainerClassName,
}: ScrollerProps) => {
  const items = React.Children.toArray(children);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastScrollByWheel, setLastScrollByWheel] = useState(false);
  const [showTopOverlay, setShowTopOverlay] = useState(false);
  const [showBottomOverlay, setShowBottomOverlay] = useState(false);
  const [showLeftOverlay, setShowLeftOverlay] = useState(false);
  const [showRightOverlay, setShowRightOverlay] = useState(false);

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
      itemsRef.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleButtonClick = (direction: "next" | "prev") => {
    if (!lastScrollByWheel) {
      scrollToIndex(direction === "next" ? currentIndex + 1 : currentIndex - 1);
    } else {
      let nearestIndex = currentIndex;
      for (let i = 0; i < itemsRef.current.length; i++) {
        const rect = itemsRef.current[i]?.getBoundingClientRect();
        if (overflow === "y") {
          if (direction === "next" && rect && rect.top - 80 > 0) {
            nearestIndex = Math.min(i + 1, items.length - 1);
            break;
          } else if (direction === "prev" && rect && rect.top - 80 > 0) {
            nearestIndex = Math.max(i - 1, 0);
            break;
          }
        } else {
          if (direction === "next" && rect && rect.left > 0) {
            nearestIndex = Math.min(i + 1, items.length - 1);
            break;
          } else if (direction === "prev" && rect && rect.left > 0) {
            nearestIndex = Math.max(i - 1, 0);
            break;
          }
        }
      }
      scrollToIndex(nearestIndex);
    }
    setLastScrollByWheel(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } =
        containerRef.current;
      setShowTopOverlay((overflow === "y" || overflow === "both") && scrollTop > 0);
      setShowBottomOverlay(
        (overflow === "y" || overflow === "both") && scrollTop + clientHeight < scrollHeight - 1
      );
      setShowLeftOverlay((overflow === "x" || overflow === "both") && scrollLeft > 0);
      setShowRightOverlay(
        (overflow === "x" || overflow === "both") && scrollLeft + clientWidth < scrollWidth - 1
      );
    };
    handleScroll();
    const el = containerRef.current;
    el?.addEventListener("scroll", handleScroll, { passive: true });
    return () => el?.removeEventListener("scroll", handleScroll);
  }, [overflow]);

  return (
    <div className="relative overflow-hidden flex flex-col gap-3" style={{ width, height }}>
      {/* Top buttons (y mode) */}
      {withButtons && overflow === "y" && (
        <div className="flex justify-center gap-2 z-10">
          <Button aria-label="scroll up" svgOnly shape="rounded" size="small" type="secondary" onClick={() => handleButtonClick("prev")}><ArrowUp /></Button>
          <Button aria-label="scroll down" svgOnly shape="rounded" size="small" type="secondary" onClick={() => handleButtonClick("next")}><ArrowDown /></Button>
        </div>
      )}

      {/* Scrollable area */}
      <div
        ref={containerRef}
        onWheel={() => setLastScrollByWheel(true)}
        className={clsx(
          "flex hide-scrollbar overflow-auto",
          overflow === "x" ? "flex-row" : "flex-col",
          childrenContainerClassName
        )}
      >
        {items.map((child, i) => (
          <div key={i} ref={(el) => { itemsRef.current[i] = el; }}>
            {child}
          </div>
        ))}
      </div>

      {/* Left/Right buttons (x mode) */}
      {withButtons && overflow === "x" && (
        <div className="flex gap-2 z-10 justify-center">
          <Button aria-label="scroll left" svgOnly shape="rounded" size="small" type="secondary" onClick={() => handleButtonClick("prev")}><ArrowLeft /></Button>
          <Button aria-label="scroll right" svgOnly shape="rounded" size="small" type="secondary" onClick={() => handleButtonClick("next")}><ArrowRight /></Button>
        </div>
      )}

      {/* Gradient fade overlays */}
      <div className={clsx("absolute left-0 right-0 w-full h-16 bg-gradient-to-b from-white to-transparent pointer-events-none transition-all duration-300", showTopOverlay ? (withButtons ? "top-10" : "top-0") : "-top-16")} />
      <div className={clsx("absolute left-0 right-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none transition-all duration-300", showBottomOverlay ? "bottom-0" : "-bottom-16")} />
      <div className={clsx("absolute top-0 bottom-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none transition-all duration-300", showLeftOverlay ? "left-0" : "-left-20")} />
      <div className={clsx("absolute top-0 bottom-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none transition-all duration-300", showRightOverlay ? "right-0" : "-right-20")} />
    </div>
  );
};
