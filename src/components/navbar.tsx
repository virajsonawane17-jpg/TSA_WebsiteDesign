"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

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
          
          <Link href="/emergency" className="block text-lg font-medium py-2 text-orange-600" onClick={() => setIsOpen(false)}>Emergency Help</Link>
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
