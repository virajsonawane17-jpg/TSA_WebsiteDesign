"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, Menu, X } from "lucide-react";
import { useState } from "react";

export function EmergencyBanner() {
  return (
    <div className="bg-accent px-4 py-2 text-center text-sm font-medium text-white">
      <div className="container mx-auto flex items-center justify-center space-x-2">
        <AlertTriangle className="h-4 w-4" />
        <span>In a crisis? Call or text <b>988</b> for 24/7 support.</span>
        <Link href="/emergency" className="underline hover:opacity-80 ml-2">View Emergency Resources</Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Heart className="h-5 w-5 fill-current" />
          </div>
          <span className="text-xl font-bold tracking-tight text-primary font-heading">
            Tampa Resource Hub
          </span>
        </Link>
        
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-6">
              <Link href="/directory" className="text-sm font-medium hover:text-secondary transition-colors">Directory</Link>
              <Link href="/news" className="text-sm font-medium hover:text-secondary transition-colors">News</Link>
              <Link href="/events" className="text-sm font-medium hover:text-secondary transition-colors">Events</Link>
              <Link href="/insights" className="text-sm font-medium hover:text-secondary transition-colors">Insights</Link>
              <Link href="/references" className="text-sm font-medium hover:text-secondary transition-colors">References</Link>
              <Link href="/submit">
                <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                  Submit Resource
                </Button>
              </Link>
            </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden border-t bg-background px-4 py-6 space-y-4 animate-in slide-in-from-top duration-300">
          <Link href="/directory" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>Directory</Link>
          <Link href="/news" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>News</Link>
          <Link href="/events" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>Events</Link>
          <Link href="/insights" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>Insights</Link>
          <Link href="/references" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>References</Link>
          <Link href="/spotlight" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>Spotlight</Link>
          <Link href="/emergency" className="block text-lg font-medium py-2 text-accent" onClick={() => setIsOpen(false)}>Emergency Help</Link>
          <Link href="/submit" onClick={() => setIsOpen(false)}>
            <Button className="w-full bg-secondary hover:bg-secondary/90 mt-4">
              Submit Resource
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}

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
            <Link href="#" className="text-xs opacity-60 hover:opacity-100">Privacy Policy</Link>
            <Link href="#" className="text-xs opacity-60 hover:opacity-100">Accessibility Statement</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
