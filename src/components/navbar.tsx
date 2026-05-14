"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { TRHMark } from "@/components/trh-mark";
import { ArrowRight, Plus, Menu, X, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import type { Lang } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, s } = useLanguage();
  const n = s.nav;

  const navLinks = [
    { href: "/", label: n.home },
    { href: "/directory", label: n.resources },
    { href: "/news", label: n.news },
    { href: "/events", label: n.events },
    { href: "/insights", label: n.insights },
    { href: "/submit", label: n.submit },
    { href: "/references", label: n.references },
  ];

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
          <Link href="/emergency" className="crisis-btn" aria-label="Emergency Resources">
            <AlertTriangle size={15} />
          </Link>
          {/* Language toggle */}
          <div className="lang-toggle" role="group" aria-label="Language">
            {(["en", "es"] as Lang[]).map((l) => (
              <button
                key={l}
                className={`lang-btn ${lang === l ? "active" : ""}`}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <Link href="/submit" className="btn-ghost">
            <Plus size={14} />
            {n.addResource}
          </Link>
          <Link href="/directory" className="btn-coral">
            <span>{n.explore}</span>
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
            {/* Mobile language toggle */}
            <div style={{ padding: "12px 20px", borderTop: "1px solid var(--line)" }}>
              <div className="lang-toggle" role="group" aria-label="Language">
                {(["en", "es"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    className={`lang-btn ${lang === l ? "active" : ""}`}
                    onClick={() => { setLang(l); setOpen(false); }}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

    </div>
  );
}
