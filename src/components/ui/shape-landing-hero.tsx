"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4" aria-hidden>
      <path
        fill="oklch(0.85 0.16 80)"
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
      />
    </svg>
  );
}

export function HeroGeometric() {
  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/beach-background.png"
          alt="Tampa Bay waterfront"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Top vignette — keeps navbar links readable */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-black/55 to-transparent z-10" />

      {/* Bottom cinematic gradient */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] z-10"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 40%, transparent 100%)",
        }}
      />

      {/* ── GIANT DISPLAY TEXT ── */}
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 z-20 text-center select-none"
        style={{ top: "13%" }}
      >
        {/* Main headline */}
        <h1
          className="font-black leading-none text-white whitespace-nowrap tracking-tight"
          style={{ fontSize: "clamp(2.5rem, 15.5vw, 220px)", letterSpacing: "-0.025em" }}
        >
          COMM
          <span style={{ color: "oklch(0.655 0.197 10)" }}>*</span>
          UNITY
        </h1>

        {/* Handwritten script decoration — drawn via Framer Motion pathLength */}
        <div
          className="flex justify-end"
          style={{ paddingRight: "clamp(2rem, 19vw, 280px)", marginTop: "clamp(-6px, -1.2vw, -20px)" }}
        >
          <svg
            viewBox="0 0 460 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "clamp(140px, 27vw, 440px)" }}
            aria-hidden
          >
            <motion.path
              d="M6,38 C40,14 80,52 140,30 C200,8 245,50 305,26 C345,10 385,42 415,32 C432,26 446,34 454,30"
              stroke="oklch(0.655 0.197 10)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.7, ease: "easeOut" }}
            />
            {/* second overlapping stroke for the "ink" feel */}
            <motion.path
              d="M6,40 C55,22 90,48 148,34"
              stroke="oklch(0.655 0.197 10)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 0.9, delay: 1.4, ease: "easeOut" }}
            />
          </svg>
        </div>
      </motion.div>

      {/* ── BOTTOM CONTENT ── */}
      <div className="relative z-20 mt-auto pb-14 text-center px-4">

        {/* Stars */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex items-center justify-center gap-0.5 mb-1"
        >
          {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} />)}
          <span className="text-white/90 text-sm font-semibold ml-2">4.9 / 5</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-white/55 text-sm tracking-wide mb-7"
        >
          Trusted Resource Hub for Tampa Bay Residents
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-semibold text-white leading-snug mb-10 mx-auto"
          style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)", maxWidth: "680px" }}
        >
          Whether you need food assistance, healthcare, or community support,
          <br className="hidden sm:block" />
          we&apos;ve got the right resource for you.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-3 justify-center mb-12"
        >
          <Link
            href="/directory"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-white text-sm transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "oklch(0.655 0.197 10)" }}
          >
            Browse Resources
          </Link>
          <Link
            href="/submit"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full font-semibold text-sm border border-white/30 text-white/90 hover:bg-white/10 transition-all duration-300"
          >
            Submit a Resource
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 text-white/50" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
