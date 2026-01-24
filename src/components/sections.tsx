"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ArrowRight, 
  Heart, 
  Users, 
  ShieldCheck, 
  Target, 
  MessageCircle, 
  TrendingUp, 
  Clock,
  Navigation
} from "lucide-react";
import Link from "next/link";
import { TAMPA_RESOURCES } from "@/lib/resources";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary py-20">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/40 opacity-90" />
      
      {/* Background Pattern/Imagery Placeholder */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
      
      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-secondary text-white border-none px-4 py-1.5 text-sm font-medium">
              Civic Technology for Hillsborough County
            </Badge>
            <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading leading-[1.1]">
              Connecting Tampa to <br />
              <span className="text-secondary">Resources that Matter.</span>
            </h1>
            <p className="mb-10 text-xl leading-relaxed text-white/80 max-w-2xl font-sans">
              A community-first platform designed to help Tampa residents discover local food assistance, housing support, mental health services, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/directory">
                <Button size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 border-none text-white shadow-xl shadow-accent/20">
                  Find Help Near Me <Navigation className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/directory">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg text-white border-white/30 hover:bg-white/10 backdrop-blur-sm">
                  Explore Directory
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hidden md:block"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest">Scroll to Explore</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

export function FeaturedResources() {
  const featured = TAMPA_RESOURCES.filter(r => r.featured).slice(0, 3);
  
  return (
    <section className="bg-background py-24 border-b">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary">Featured Local Resources</h2>
            <p className="text-lg text-muted-foreground font-sans">
              Spotlighting impactful Tampa organizations providing essential services to our neighbors today.
            </p>
          </div>
          <Link href="/directory">
            <Button variant="ghost" className="group text-primary font-semibold hover:text-secondary">
              View All Resources <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((resource, idx) => (
            <motion.div
              key={resource.id}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border border-border/40 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden group">
                <div className="h-2 bg-secondary/20 group-hover:bg-secondary transition-colors" />
                <CardHeader className="pb-4">
                  <Badge variant="outline" className="mb-3 w-fit border-secondary/30 text-secondary bg-secondary/5">{resource.category}</Badge>
                  <CardTitle className="text-2xl font-heading text-primary group-hover:text-secondary transition-colors">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-base text-foreground/70 line-clamp-3">
                    {resource.longDescription || resource.description}
                  </CardDescription>
                  <div className="space-y-3 pt-2">
                    <div className="flex items-start text-sm text-muted-foreground">
                      <MapPin className="mr-3 h-4 w-4 shrink-0 text-secondary" />
                      <span>{resource.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-3 h-4 w-4 shrink-0 text-secondary" />
                      <span>{resource.phone}</span>
                    </div>
                  </div>
                  <Link href={`/resources/${resource.id}`}>
                    <Button className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-medium">
                      View Organization Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Search Resources",
      description: "Find organizations by name, keyword, or specific service needed in Tampa."
    },
    {
      icon: Target,
      title: "Filter by Category",
      description: "Narrow results by category, location, or the specific community you belong to."
    },
    {
      icon: MessageCircle,
      title: "Connect & Inquire",
      description: "Get direct contact info, website links, and location maps for each resource."
    },
    {
      icon: Heart,
      title: "Get Support",
      description: "Access the services you need to improve your quality of life in Tampa Bay."
    }
  ];

  return (
    <section className="bg-primary/5 py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-4">How This Helps Tampa</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple, human-centered approach to finding local community support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-lg text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <step.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold mb-3 font-heading text-primary">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InsightsPreview() {
  const insights = [
    { label: "Food Assistance", value: "34%", trend: "up" },
    { label: "Housing Support", value: "28%", trend: "stable" },
    { label: "Mental Health", value: "19%", trend: "up" },
    { label: "Youth Programs", value: "12%", trend: "down" }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <Badge variant="secondary" className="mb-4">Live Trends</Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-6">Community Insight Preview</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We track anonymous search trends to help local leaders and organizations identify where our community needs the most support.
            </p>
            <div className="space-y-6">
              {insights.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-primary">{item.label}</span>
                    <span className="text-muted-foreground">{item.value} of searches</span>
                  </div>
                  <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: item.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/insights">
              <Button variant="link" className="mt-8 p-0 text-secondary h-auto font-bold text-lg group">
                View Detailed Trends <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <Card className="p-8 flex flex-col items-center justify-center text-center border-border/40 bg-primary/5">
              <TrendingUp className="h-10 w-10 text-secondary mb-4" />
              <div className="text-3xl font-bold text-primary mb-1">2,400+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Searches this week</div>
            </Card>
            <Card className="p-8 flex flex-col items-center justify-center text-center border-border/40">
              <Clock className="h-10 w-10 text-accent mb-4" />
              <div className="text-3xl font-bold text-primary mb-1">12</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">New resources added</div>
            </Card>
            <Card className="p-8 flex flex-col items-center justify-center text-center border-border/40 col-span-2">
              <Users className="h-10 w-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-primary mb-1">North Tampa</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Highest search volume area</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-white mb-6">Help Us Grow the Hub</h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10 font-sans">
          Our directory is only as strong as our community. If you know of a resource, program, or nonprofit that should be listed, let us know.
        </p>
        <Link href="/submit">
          <Button size="lg" className="h-14 px-10 text-lg bg-white text-secondary hover:bg-white/90 shadow-2xl">
            Submit a New Resource
          </Button>
        </Link>
      </div>
    </section>
  );
}
