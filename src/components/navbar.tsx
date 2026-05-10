"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { TRHMark } from "@/components/trh-mark";
import { ArrowRight, Plus, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Resources" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/insights", label: "Insights" },
  { href: "/submit", label: "Submit" },
  { href: "/references", label: "References" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`nav-host ${scrolled ? "on-light" : ""}`}>
      <nav className="nav-pill">
        <Link href="/" className="brand">
          <TRHMark size={30} />
          <span className="brand-name">
            Tampa <em>Resource</em> Hub
          </span>
        </Link>

        <div className="nav-links">
          {navLinks.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className={`nav-link ${pathname === it.href ? "active" : ""}`}
            >
              {it.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <Link href="/submit" className="btn-ghost">
            <Plus size={14} />
            Add resource
          </Link>
          <Link href="/directory" className="btn-coral">
            <span>Explore</span>
            <span className="ico">
              <ArrowRight size={14} />
            </span>
          </Link>
          <button
            className="hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="mobile-menu">
            {navLinks.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={pathname === it.href ? "active" : ""}
              >
                {it.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
