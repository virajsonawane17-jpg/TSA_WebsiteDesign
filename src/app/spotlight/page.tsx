"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Users, 
  Award, 
  Star, 
  MessageSquare, 
  ArrowRight,
  ExternalLink,
  MapPin,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { TAMPA_RESOURCES } from "@/lib/resources";

export default function SpotlightPage() {
  const featuredOrg = TAMPA_RESOURCES[0]; // Feeding Tampa Bay

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        {/* Spotlight Hero */}
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 space-y-8">
                <Badge className="bg-accent text-white border-none px-4 py-1.5 text-sm font-bold uppercase tracking-widest">Community Spotlight</Badge>
                <h1 className="text-5xl lg:text-7xl font-bold font-heading text-primary leading-tight">
                  Feeding <br />
                  <span className="text-secondary">Tampa Bay</span>
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed font-sans">
                  How the region's largest food rescue organization is transforming the fight against hunger across 10 counties, one meal at a time.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Star className="h-5 w-5 fill-secondary text-secondary" />
                    <span>Impact Leader 2026</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Heart className="h-5 w-5 fill-accent text-accent" />
                    <span>Nonprofit of the Month</span>
                  </div>
                </div>
                <div className="flex gap-4 pt-6">
                  <Link href={`/resources/${featuredOrg.id}`}>
                    <Button size="lg" className="h-14 px-8 bg-primary text-white font-bold">
                      Read Full Story
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="h-14 px-8 border-primary/20 text-primary font-bold">
                    Volunteer Now
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000" 
                    alt="Community Volunteers" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white/20">
                    <p className="text-primary font-bold italic text-lg mb-2">"We don't just provide food; we provide hope for families who didn't know where their next meal was coming from."</p>
                    <p className="text-secondary font-bold text-sm uppercase tracking-widest">— Thomas Mantz, CEO</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 h-64 w-64 bg-secondary/10 rounded-full blur-3xl -z-0" />
                <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-accent/10 rounded-full blur-3xl -z-0" />
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold font-heading mb-4 text-white">The Power of Community</h2>
              <p className="text-white/60 max-w-2xl mx-auto">Feeding Tampa Bay's impact across the region last year.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Meals Provided", value: "95M+", icon: Heart },
                { label: "Counties Served", value: "10", icon: MapPin },
                { label: "Active Volunteers", value: "25k+", icon: Users },
                { label: "Partner Agencies", value: "400+", icon: Award }
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <stat.icon className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-5xl font-bold font-heading">{stat.value}</div>
                  <div className="text-white/60 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold font-heading text-primary">More Than Just a Food Bank</h3>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Feeding Tampa Bay is changing the way we think about hunger. Beyond traditional food distribution, they are addressing the root causes of food insecurity through innovative programs like the FreshForce job training program and HealthMed partnerships.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-3xl border-border/40 p-8 bg-[#F7F9FB]">
                  <h4 className="text-xl font-bold font-heading text-primary mb-4">Mobile Pantries</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Bringing fresh produce and essentials directly into neighborhoods that lack easy access to affordable grocery stores.
                  </p>
                </Card>
                <Card className="rounded-3xl border-border/40 p-8 bg-[#F7F9FB]">
                  <h4 className="text-xl font-bold font-heading text-primary mb-4">After-School Meals</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Ensuring that children have access to nutritious dinners and snacks through local youth centers and schools.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Nominate Next */}
        <section className="py-24 bg-accent text-white">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <MessageSquare className="h-12 w-12 mx-auto mb-8 opacity-50" />
            <h2 className="text-4xl font-bold font-heading mb-6">Who should we spotlight next?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
              Tell us about a local organization or community hero making a difference in Tampa.
            </p>
            <Link href="/submit">
              <Button size="lg" className="h-14 px-10 bg-white text-accent hover:bg-white/90 font-bold shadow-2xl">
                Nominate an Organization
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
