import Link from "next/link";
import { Waves, MapPin, Mail, Heart, ExternalLink } from "lucide-react";

const quickLinks = [
  { href: "/directory", label: "Resource Directory" },
  { href: "/events", label: "Community Events" },
  { href: "/news", label: "Local News" },
  { href: "/spotlight", label: "Organization Spotlight" },
  { href: "/insights", label: "Community Insights" },
  { href: "/submit", label: "Submit a Resource" },
  { href: "/emergency", label: "Emergency Services" },
];

const resourceCategories = [
  { href: "/directory?cat=Food+Assistance", label: "Food Assistance" },
  { href: "/directory?cat=Housing", label: "Housing Support" },
  { href: "/directory?cat=Mental+Health", label: "Mental Health" },
  { href: "/directory?cat=Healthcare", label: "Healthcare" },
  { href: "/directory?cat=Youth+Programs", label: "Youth Programs" },
  { href: "/directory?cat=Veterans", label: "Veterans Services" },
  { href: "/directory?cat=Legal+Aid", label: "Legal Aid" },
];

export function Footer() {
  return (
    <footer className="relative bg-primary text-white overflow-hidden">
      {/* Top wave */}
      <div className="w-full overflow-hidden leading-none -mb-1" aria-hidden>
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-12 rotate-180"
        >
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="oklch(0.99 0.005 220)"
          />
        </svg>
      </div>

      {/* Subtle ocean pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, white 0px, white 1px, transparent 1px, transparent 12px)`,
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 pt-8 pb-12 lg:pt-10 lg:pb-16">
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-secondary/80 shadow-lg">
                <Waves className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-base font-bold font-heading">Tampa Resource Hub</span>
                <span className="text-[10px] uppercase tracking-widest text-white/50 mt-0.5">
                  Hillsborough County, FL
                </span>
              </div>
            </div>
            <p className="text-sm text-white/65 leading-relaxed max-w-xs">
              A civic-technology platform connecting Tampa Bay residents to verified local
              resources, nonprofit programs, and essential support services — at no cost.
            </p>
            <div className="space-y-2.5 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-secondary shrink-0" />
                <span>Hillsborough County, Florida</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-secondary shrink-0" />
                <span>info@tamparesourcehub.org</span>
              </div>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white hover:pl-1 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Categories */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-5">
              Resource Categories
            </h3>
            <ul className="space-y-2.5">
              {resourceCategories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 hover:text-white hover:pl-1 transition-all duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* TSA & Accessibility */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-5">
                TSA Competition
              </h3>
              <div className="bg-white/8 border border-white/10 rounded-2xl p-5 space-y-3">
                <p className="text-xs text-white/70 leading-relaxed">
                  Developed for the Technology Student Association (TSA) Webmaster
                  competition, showcasing modern civic-tech design and accessible
                  community resources.
                </p>
                <Link
                  href="/references"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:text-white transition-colors"
                >
                  View Source References <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-3">
                Accessibility
              </h3>
              <p className="text-xs text-white/55 leading-relaxed">
                This site is designed to meet WCAG 2.1 accessibility standards.
                Keyboard navigation, focus states, and sufficient color contrast
                are maintained throughout.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/45 text-center md:text-left">
            &copy; 2026 Tampa Community Resource Hub. All rights reserved.
            Built with <Heart className="inline h-3 w-3 text-accent fill-accent mx-0.5" /> for Tampa Bay.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/references" className="text-xs text-white/45 hover:text-white/80 transition-colors">
              References
            </Link>
            <span className="text-xs text-white/30">
              In a crisis? Call <strong className="text-white/60">988</strong>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
