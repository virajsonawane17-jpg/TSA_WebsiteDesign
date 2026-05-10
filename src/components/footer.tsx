import Link from "next/link";
import { TRHMark } from "@/components/trh-mark";
import { Twitter, Instagram, Facebook, Linkedin, Youtube, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="trh-footer">
      <div className="top">
        {/* Brand */}
        <div className="col">
          <div className="brand">
            <TRHMark size={32} />
            <span className="brand-name">Tampa <em>Resource</em> Hub</span>
          </div>
          <p className="lead">
            Connecting Tampa residents with trusted community support, opportunities, and local programs.
          </p>
          <div className="news-form">
            <input placeholder="Your email · monthly digest" />
            <button>Subscribe</button>
          </div>
          <div className="socials">
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="#" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
        </div>

        {/* Explore */}
        <div className="col">
          <h4>Explore</h4>
          <Link href="/">Home</Link>
          <Link href="/directory">Resources</Link>
          <Link href="/news">News</Link>
          <Link href="/events">Events</Link>
          <Link href="/insights">Insights</Link>
        </div>

        {/* Community */}
        <div className="col">
          <h4>Community</h4>
          <Link href="/submit">Submit a Resource</Link>
          <Link href="/references">References</Link>
          <a href="#">Volunteer</a>
          <a href="#">Partner with us</a>
          <a href="#">Newsletter archive</a>
        </div>

        {/* Quick links */}
        <div className="col">
          <h4>Quick links</h4>
          <a href="tel:211" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Phone size={12} />Tampa 2-1-1 helpline
          </a>
          <a href="#">Crisis &amp; emergency lines</a>
          <a href="#">Accessibility statement</a>
          <a href="#">Privacy &amp; data ethics</a>
          <Link href="/references">Contact the team</Link>
        </div>
      </div>

      <div className="bottom">
        <span>© 2026 Tampa Resource Hub · A community-funded civic project</span>
        <span>Built in Tampa Bay · WCAG 2.2 AA compliant</span>
      </div>
    </footer>
  );
}
