"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!supabase) return;

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

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
          
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          
          {user ? (
            <Link href="/profile" className="flex items-center text-sm font-medium hover:text-secondary transition-colors">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-medium hover:text-secondary transition-colors">
              Sign In
            </Link>
          )}

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
          
          {user ? (
            <Link href="/profile" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>My Profile</Link>
          ) : (
            <Link href="/login" className="block text-lg font-medium py-2" onClick={() => setIsOpen(false)}>Sign In</Link>
          )}

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
