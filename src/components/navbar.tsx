"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Waves, Menu, X, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "/directory", label: "Directory" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/spotlight", label: "Spotlight" },
  { href: "/insights", label: "Insights" },
  { href: "/references", label: "References" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-primary/96 backdrop-blur-md shadow-xl shadow-primary/20 border-b border-white/10"
          : "bg-white/5 backdrop-blur-sm border-b border-white/10"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary shadow-lg shadow-secondary/30 group-hover:scale-105 transition-transform duration-200">
            <Waves className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold tracking-tight font-heading text-white">
              Tampa Resource Hub
            </span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-white/55">
              Community First
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-sm font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-150"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/emergency">
            <span className="text-sm font-medium text-sunset hover:text-white transition-colors cursor-pointer">
              Emergency Help
            </span>
          </Link>
          <Link href="/submit">
            <Button
              size="sm"
              className="bg-accent hover:bg-accent/90 text-white border-none shadow-lg shadow-accent/20 font-semibold h-9 px-4"
            >
              Submit Resource
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-primary/97 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-5 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-base font-medium text-white/75 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/emergency"
                className="block px-4 py-3 text-base font-medium text-sunset hover:bg-white/10 rounded-xl transition-all"
                onClick={() => setIsOpen(false)}
              >
                Emergency Help
              </Link>
              <div className="pt-4 border-t border-white/10">
                <Link href="/submit" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-accent hover:bg-accent/90 text-white font-bold h-12">
                    Submit a Resource
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
