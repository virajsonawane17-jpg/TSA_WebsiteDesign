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
import { TAMPA_RESOURCES, TAMPA_NEWS, TAMPA_EVENTS } from "@/lib/resources";
import { useState } from "react";
import { Newspaper, Calendar as CalendarIcon, Ticket } from "lucide-react";
import { NewsArticle } from "@/lib/api";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export function NewsTeaser({ liveNews = [] }: { liveNews?: NewsArticle[] }) {
  const displayNews = liveNews.length > 0 
    ? liveNews.slice(0, 3).map((article, index) => ({
        id: `live-${index}`,
        title: article.title,
        excerpt: article.description,
        date: new Date(article.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        category: "Real-Time",
        imageUrl: article.urlToImage || "https://images.unsplash.com/photo-1504711432869-efd5973e8d48?q=80&w=800&auto=format&fit=crop"
      }))
    : TAMPA_NEWS.slice(0, 3);
  
  return (
    <section className="bg-primary/5 py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary">Tampa Community Pulse</h2>
              {liveNews.length > 0 && (
                <Badge className="bg-red-500 animate-pulse text-white border-none">LIVE</Badge>
              )}
            </div>
            <p className="text-lg text-muted-foreground">
              Stay updated with the latest developments, housing initiatives, and local successes in the Tampa area.
            </p>
          </div>
          <Link href="/news">
            <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
              View All News <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayNews.map((news, idx) => (
            <motion.div
              key={news.id}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <Badge className={`absolute top-4 left-4 ${news.category === 'Real-Time' ? 'bg-accent' : 'bg-secondary'}`}>{news.category}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <CalendarIcon className="h-3 w-3" />
                    <span>{news.date}</span>
                  </div>
                  <CardTitle className="text-lg font-bold leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2 italic mb-4">"{news.excerpt}"</p>
                  <Link href="/news" className="text-secondary text-sm font-bold flex items-center group/link">
                    Read more <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
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

export function EventsTeaser() {
  const upcomingEvents = TAMPA_EVENTS.slice(0, 3);
  
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-4">Upcoming Community Events</h2>
            <p className="text-lg text-muted-foreground">
              Mark your calendar for festivals, career fairs, and community workshops happening this month.
            </p>
          </div>
          <Link href="/events">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
              Full Calendar <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              variants={fadeIn}
              initial="initial"
              whileInView="animate"
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-l-4 border-l-accent shadow-sm hover:shadow-md transition-all">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-accent/10 text-accent">{event.category}</Badge>
                    <span className="text-xs font-bold text-muted-foreground uppercase">{event.date}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button variant="ghost" className="w-full text-accent hover:text-accent hover:bg-accent/5 p-0 h-auto justify-start font-bold" asChild>
                    <Link href="/events">
                      Event details <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary py-24">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary/40 opacity-90" />
      
      {/* Background Pattern/Imagery Placeholder */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
      
      <div className="container relative mx-auto px-4 sm:px-6 pb-32">
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
                  <Button size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 border-none text-white shadow-xl shadow-accent/20 font-bold group">
                    Find Help Near Me <Navigation className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/directory">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-lg text-white border-white/50 bg-white/5 hover:bg-white/20 backdrop-blur-md shadow-lg transition-all">
                    Explore Directory
                  </Button>
                </Link>
              </div>

          </motion.div>
        </div>
      </div>
      
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/60 hidden lg:flex pointer-events-none"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.4em] translate-x-[0.2em] font-heading opacity-80">
            Scroll to Explore
          </span>
          <div className="relative w-[1.5px] h-16 bg-white/10 overflow-hidden rounded-full">
            <motion.div 
              animate={{ 
                y: [-64, 64],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 w-full h-1/2 bg-gradient-to-b from-transparent via-secondary to-transparent" 
            />
          </div>
        </motion.div>
    </section>
  );
}

export function FeaturedResources() {
  const featured = TAMPA_RESOURCES.filter(r => r.featured).slice(0, 6);
  
  return (
    <section className="relative bg-background py-24 border-b overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative mx-auto px-4 sm:px-6">
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
                whileHover={{ 
                  y: -8,
                  scale: 1.02
                }}
                className="group"
              >
                <Card className="h-full border border-border/40 shadow-sm transition-all hover:shadow-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
                  <div className="h-2 bg-gradient-to-r from-secondary/40 to-secondary group-hover:from-secondary group-hover:to-secondary transition-all" />

                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="border-secondary/30 text-secondary bg-secondary/5">{resource.category}</Badge>
                      <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Heart className="h-4 w-4" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-heading text-primary group-hover:text-secondary transition-colors line-clamp-1">{resource.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <CardDescription className="text-base text-foreground/70 line-clamp-4 min-h-[6rem]">
                      {resource.longDescription || resource.description}
                    </CardDescription>
                    <div className="space-y-3 pt-2">
                      <div className="flex items-start text-sm text-muted-foreground">
                        <MapPin className="mr-3 h-4 w-4 shrink-0 text-secondary" />
                        <span className="line-clamp-1">{resource.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Phone className="mr-3 h-4 w-4 shrink-0 text-secondary" />
                        <span>{resource.phone}</span>
                      </div>
                    </div>
                    <Link href={`/resources/${resource.id}`} className="block w-full">
                      <Button className="w-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/10">
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
                whileHover={{ 
                  y: -10,
                  rotateY: 10,
                  rotateX: 5,
                  scale: 1.05
                }}
                className="flex flex-col items-center text-center group perspective-1000"
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 preserve-3d shadow-secondary/10">
                  <step.icon className="h-10 w-10 translate-z-10" />
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
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4 perspective-1000">
            <motion.div whileHover={{ rotateY: -10, rotateX: 5, z: 50 }} className="preserve-3d">
              <Card className="p-8 flex flex-col items-center justify-center text-center border-border/40 bg-primary/5 shadow-xl shadow-primary/5">
                <TrendingUp className="h-10 w-10 text-secondary mb-4" />
                <div className="text-3xl font-bold text-primary mb-1">2,400+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Searches this week</div>
              </Card>
            </motion.div>
            <motion.div whileHover={{ rotateY: 10, rotateX: 5, z: 50 }} className="preserve-3d">
              <Card className="p-8 flex flex-col items-center justify-center text-center border-border/40 shadow-xl shadow-accent/5">
                <Clock className="h-10 w-10 text-accent mb-4" />
                <div className="text-3xl font-bold text-primary mb-1">12</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">New resources added</div>
              </Card>
            </motion.div>
            <motion.div whileHover={{ rotateY: 0, rotateX: -10, z: 50 }} className="col-span-2 preserve-3d">
              <Card className="p-8 flex flex-col items-center justify-center text-center border-border/40 shadow-xl shadow-secondary/5">
                <Users className="h-10 w-10 text-primary mb-4" />
                <div className="text-3xl font-bold text-primary mb-1">North Tampa</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Highest search volume area</div>
              </Card>
            </motion.div>
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
