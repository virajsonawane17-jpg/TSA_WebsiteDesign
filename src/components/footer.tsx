"use client";

import Link from "next/link";
import { TRHMark } from "@/components/trh-mark";
import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { s } = useLanguage();
  const f = s.footer;
  const n = s.nav;

  return (
    <footer className="trh-footer">
      <div className="top">
        {/* Brand */}
        <div className="col">
          <div className="brand">
            <TRHMark size={32} />
            <span className="brand-name">Tampa <em>Resource</em> Hub</span>
          </div>
          <p className="lead">{f.lead}</p>
        </div>

        {/* Explore */}
        <div className="col">
          <h4>{f.exploreTitle}</h4>
          <Link href="/">{n.home}</Link>
          <Link href="/directory">{n.resources}</Link>
          <Link href="/news">{n.news}</Link>
          <Link href="/events">{n.events}</Link>
          <Link href="/insights">{n.insights}</Link>
        </div>

        {/* Community */}
        <div className="col">
          <h4>{f.communityTitle}</h4>
          <Link href="/submit">{f.submitResource}</Link>
          <Link href="/references">{n.references}</Link>
          <a href="#">{f.volunteer}</a>
          <a href="#">{f.partner}</a>
          <a href="#">{f.newsletterArchive}</a>
        </div>

        {/* Quick links */}
        <div className="col">
          <h4>{f.quickLinksTitle}</h4>
          <a href="tel:211" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Phone size={12} />{f.helpline}
          </a>
          <a href="#">{f.crisis}</a>
          <Link href="/privacy">{f.privacy}</Link>
          <Link href="/references">{f.contact}</Link>
        </div>
      </div>

      <div className="bottom">
        <span>{f.copyright}</span>
        <span>{f.built}</span>
      </div>
    </footer>
  );
}
