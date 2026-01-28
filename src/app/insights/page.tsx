"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  Map as MapIcon, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Search,
  CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { getResources } from "@/lib/db";
import { Resource } from "@/lib/resources";
import Link from "next/link";

export default function InsightsPage() {
  const [recentResources, setRecentResources] = useState<Resource[]>([]);

  useEffect(() => {
    async function fetchResources() {
      try {
        const resources = await getResources();
        setRecentResources(resources.slice(-5).reverse());
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    }
    fetchResources();
  }, []);
  const trends = [
    { label: "Food Assistance", value: 85, change: "+12%", status: "up" },
    { label: "Housing Support", value: 72, change: "+5%", status: "up" },
    { label: "Mental Health", value: 58, change: "-2%", status: "down" },
    { label: "Youth Programs", value: 45, change: "+18%", status: "up" },
    { label: "Legal Aid", value: 32, change: "0%", status: "stable" }
  ];

  const neighborhoods = [
    { name: "North Tampa", volume: "High", focus: "Food & Housing" },
    { name: "Ybor City", volume: "Medium", focus: "Arts & Youth" },
    { name: "Westshore", volume: "Medium", focus: "Employment" },
    { name: "South Tampa", volume: "Low", focus: "Education" },
    { name: "Downtown", volume: "High", focus: "Crisis Support" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary pt-16 pb-32 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10">
            <TrendingUp className="h-96 w-96 -mr-20 -mt-20" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Badge className="bg-secondary text-white border-none mb-6">Real-time Community Data</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 max-w-3xl">
              Community Insights <br />& Support Trends
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-sans leading-relaxed">
              We monitor anonymous search patterns and resource availability to help identify service gaps and rising needs across the Tampa Bay area.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 mt-8 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Demand Section */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                  <div className="flex justify-between items-start gap-6">
                    <div className="space-y-3 flex-1">
                      <CardTitle className="text-2xl font-heading text-primary">Live Demand Overview</CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">Weekly search volume by resource category</p>
                    </div>
                    <Badge variant="outline" className="text-secondary border-secondary/20 bg-secondary/5 shrink-0 mt-1">
                      Updated 2h ago
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8 bg-white">
                  {trends.map((item, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-primary">{item.label}</span>
                          {item.status === "up" ? (
                            <span className="flex items-center text-xs font-bold text-accent">
                              <ArrowUpRight className="h-3 w-3 mr-1" /> {item.change}
                            </span>
                          ) : item.status === "down" ? (
                            <span className="flex items-center text-xs font-bold text-blue-500">
                              <ArrowDownRight className="h-3 w-3 mr-1" /> {item.change}
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-muted-foreground">Stable</span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-muted-foreground">{item.value}% volume</span>
                      </div>
                      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className={`h-full rounded-full ${item.status === 'up' ? 'bg-secondary' : 'bg-primary/40'}`}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Tampa Focus Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-3xl border-border/40 shadow-xl">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
                        <MapIcon className="h-5 w-5 text-secondary" />
                      </div>
                      <CardTitle className="text-xl font-heading text-primary">Neighborhood Needs</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <div className="space-y-4">
                      {neighborhoods.map((n, i) => (
                        <div key={i} className="flex justify-between items-center py-3 border-b border-border/40 last:border-0">
                          <div>
                            <p className="font-bold text-primary">{n.name}</p>
                            <p className="text-xs text-muted-foreground">Focus: {n.focus}</p>
                          </div>
                          <Badge variant={n.volume === 'High' ? 'destructive' : 'secondary'} className="text-[10px] uppercase font-bold">
                            {n.volume} Volume
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border-border/40 shadow-xl bg-secondary text-white">
                  <CardHeader className="p-8 pb-4">
                    <Activity className="h-10 w-10 text-white mb-4" />
                    <CardTitle className="text-2xl font-heading">Our Impact Goal</CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <p className="text-white/80 leading-relaxed mb-6">
                      By providing transparent data, we empower local nonprofits to better allocate resources and community members to understand where help is needed most.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-white/60" />
                        <span className="text-sm font-medium">Reduce search friction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-white/60" />
                        <span className="text-sm font-medium">Identify service deserts</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-white/60" />
                        <span className="text-sm font-medium">Coordinate civic response</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar Feed */}
            <div className="space-y-8">
              <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                <div className="bg-accent p-6 text-white flex items-center gap-4">
                  <Clock className="h-6 w-6" />
                  <h3 className="text-lg font-bold font-heading">Recently Added</h3>
                </div>
                <CardContent className="p-6 bg-white">
                  <div className="space-y-6">
                    {recentResources.map((res, i) => (
                      <Link key={res.id} href={`/resources/${res.id}`} className="block group">
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Added 2 days ago</p>
                          <h4 className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">{res.name}</h4>
                          <p className="text-xs text-muted-foreground">{res.category}</p>
                        </div>
                        {i < recentResources.length - 1 && <div className="h-[1px] bg-border/40 mt-4" />}
                      </Link>
                    ))}
                  </div>
                  <Link href="/directory">
                    <Button variant="outline" className="w-full mt-8 border-primary/20 text-primary group font-bold">
                      Explore All <Search className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-border/40 shadow-xl p-8 bg-primary text-white">
                <Users className="h-10 w-10 text-secondary mb-6" />
                <h3 className="text-2xl font-bold font-heading mb-4">Community-Driven</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-8">
                  Data is collected anonymously and aggregated to protect user privacy while providing actionable insights for the City of Tampa.
                </p>
                <Link href="/submit">
                  <Button className="w-full bg-white text-primary hover:bg-white/90 font-bold">
                    Contribute Data
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
