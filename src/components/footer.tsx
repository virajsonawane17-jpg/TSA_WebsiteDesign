import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-secondary fill-secondary" />
              <span className="text-lg font-bold tracking-tight font-heading">Tampa Resource Hub</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Empowering Tampa residents with easy access to community resources, support services, and nonprofit programs. Built for the community, by the community.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/directory" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary">Resource Directory</Link></li>
              <li><Link href="/insights" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary">Community Insights</Link></li>
              <li><Link href="/submit" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary">Submit a Resource</Link></li>
              <li><Link href="/emergency" className="text-sm opacity-80 hover:opacity-100 hover:text-secondary">Emergency Services</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm opacity-80">Hillsborough County, FL</li>
              <li className="text-sm opacity-80">Email: info@tamparesourcehub.org</li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-secondary">Community</h3>
            <p className="mt-4 text-xs opacity-70 italic">
              A collaborative effort to connect Tampa residents with the support and services they need to thrive.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center md:flex md:items-center md:justify-between">
          <p className="text-xs opacity-60">
            &copy; 2026 Tampa Community Resource Hub. All rights reserved. Built with pride for Tampa.
          </p>
          <div className="mt-4 md:mt-0 flex items-center justify-center space-x-4">
            <Link href="/privacy" className="text-xs opacity-60 hover:opacity-100">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
