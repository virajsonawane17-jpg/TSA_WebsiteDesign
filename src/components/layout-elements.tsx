import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary sm:inline-block">
            Tampa Resource Hub
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="#directory">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              Directory
            </Button>
          </Link>
          <Link href="#submit">
            <Button size="sm">
              Submit Resource
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-primary fill-primary" />
              <span className="text-lg font-bold tracking-tight">Tampa Resource Hub</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering Tampa residents with easy access to community resources, support services, and nonprofit programs.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#directory" className="text-sm text-muted-foreground hover:text-primary">Resource Directory</Link></li>
              <li><Link href="#featured" className="text-sm text-muted-foreground hover:text-primary">Featured Services</Link></li>
              <li><Link href="#submit" className="text-sm text-muted-foreground hover:text-primary">Submit a Resource</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Community</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Hillsborough County</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">City of Tampa</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Volunteer Opportunities</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">Disclaimer</h3>
            <p className="mt-4 text-xs text-muted-foreground italic">
              This hub is a community-driven project. Please verify all information directly with the respective organizations.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center md:flex md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Tampa Community Resource Hub. All rights reserved. Built for the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
