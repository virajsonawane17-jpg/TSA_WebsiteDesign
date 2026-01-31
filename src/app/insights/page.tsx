"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  TrendingUp,
  Users,
  Clock,
  Map as MapIcon,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Search,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getResources, getEvents, getNews } from "@/lib/db";
import type { Resource } from "@/lib/resources";
import {
  getCategoryTrendsWithFallback,
  computeAreaBreakdown,
  formatRelativeTime,
} from "@/lib/insights";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function InsightsPage() {
  const [recentResources, setRecentResources] = useState<Resource[]>([]);
  const [trends, setTrends] = useState<{ label: string; value: number; pct: number; status: "up" | "down" | "stable" }[]>([]);
  const [trendsAreSample, setTrendsAreSample] = useState(false);
  const [neighborhoods, setNeighborhoods] = useState<{ name: string; volume: "High" | "Medium" | "Low"; focus: string; count: number }[]>([]);
  const [stats, setStats] = useState<{ resources: number; events: number; news: number } | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [resources, events, news] = await Promise.all([
          getResources(),
          getEvents(),
          getNews(20),
        ]);

        const { trends: t, isSample } = getCategoryTrendsWithFallback(resources);
        setTrends(t);
        setTrendsAreSample(isSample);
        setNeighborhoods(computeAreaBreakdown(resources));

        const withDates = resources.filter((r) => r.created_at);
        const withoutDates = resources.filter((r) => !r.created_at);
        const sortedWithDates = [...withDates].sort(
          (a, b) => new Date((b.created_at ?? 0) as string).getTime() - new Date((a.created_at ?? 0) as string).getTime()
        );
        const recent = [...sortedWithDates, ...withoutDates].slice(0, 6);
        setRecentResources(recent);

        setStats({
          resources: resources.length,
          events: events.length,
          news: news.length,
        });
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Failed to fetch insights data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const updatedLabel = lastUpdated
    ? (() => {
        const mins = Math.floor((Date.now() - lastUpdated.getTime()) / 60000);
        if (mins < 1) return "Just now";
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        return `${hours}h ago`;
      })()
    : "—";

  const categoryChartData = trends.map((t) => ({
    name: t.label.length > 20 ? t.label.slice(0, 20) + "…" : t.label,
    fullName: t.label,
    resources: t.value,
    pct: t.pct,
  }));

  const areaChartData = neighborhoods.map((n) => ({
    name: n.name.length > 16 ? n.name.slice(0, 16) + "…" : n.name,
    fullName: n.name,
    count: n.count,
    focus: n.focus,
  }));

  const pieData = trends.slice(0, 6).map((t, i) => ({
    name: t.label,
    value: t.value,
    color: `var(--color-chart-${(i % 5) + 1})`,
  }));

  const chartConfigPie = pieData.length
    ? pieData.reduce(
        (acc, d) => ({ ...acc, [d.name]: { label: d.name, color: d.color } }),
        {} as Record<string, { label: string; color: string }>
      )
    : {};

  const chartConfigCategory = {
    resources: { label: "Resources", color: "var(--color-chart-1)" },
    pct: { label: "% of directory", color: "var(--color-chart-2)" },
  };

  const chartConfigArea = {
    count: { label: "Resources", color: "var(--color-chart-2)" },
  };

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
              Live data from our directory: resource counts by category and area to help identify service coverage and needs across the Tampa Bay area.
            </p>
            {stats && (
              <div className="mt-8 flex flex-wrap gap-6 text-white/90">
                <span className="font-semibold">{stats.resources} resources</span>
                <span className="font-semibold">{stats.events} events</span>
                <span className="font-semibold">{stats.news} news items</span>
              </div>
            )}
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 mt-8 pb-24">
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-10 w-10 text-secondary animate-spin" />
            </div>
          ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Demand Section – real data from directory */}
            <div className="lg:col-span-2 space-y-8">
              <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                  <div className="flex justify-between items-start gap-6 flex-wrap">
                    <div className="space-y-3 flex-1 min-w-0">
                      <CardTitle className="text-2xl font-heading text-primary">Directory by Category</CardTitle>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Resource count and share of directory by category
                      </p>
                    </div>
                    <Badge variant="outline" className="text-secondary border-secondary/20 bg-secondary/5 shrink-0 mt-1">
                      Updated {updatedLabel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-8 bg-white">
                  {trends.length === 0 ? (
                    <p className="text-muted-foreground py-4">No directory data yet. Add resources to see trends.</p>
                  ) : (
                    <>
                      <div className="mb-8 h-[280px] w-full">
                        <ChartContainer config={chartConfigCategory} className="h-full w-full">
                          <BarChart data={categoryChartData} margin={{ top: 8, right: 8, left: 8, bottom: 32 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
                            <XAxis
                              dataKey="name"
                              tickLine={false}
                              axisLine={false}
                              tick={{ fontSize: 11 }}
                              angle={-45}
                              textAnchor="end"
                              height={56}
                            />
                            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={28} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="resources" fill="var(--color-resources)" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ChartContainer>
                      </div>
                      <p className="text-xs text-muted-foreground mb-4">Breakdown by category (count and share)</p>
                      <div className="space-y-6">
                        {trends.map((item, idx) => (
                      <div key={idx} className="space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="flex items-center gap-3">
                            <span className="text-lg font-bold text-primary">{item.label}</span>
                            {item.status === "up" ? (
                              <span className="flex items-center text-xs font-bold text-accent">
                                <ArrowUpRight className="h-3 w-3 mr-1" /> Trend
                              </span>
                            ) : item.status === "down" ? (
                              <span className="flex items-center text-xs font-bold text-blue-500">
                                <ArrowDownRight className="h-3 w-3 mr-1" /> Trend
                              </span>
                            ) : (
                              <span className="text-xs font-bold text-muted-foreground">Live</span>
                            )}
                          </div>
                          <span className="text-sm font-bold text-muted-foreground">{item.value} resources · {item.pct}% of directory</span>
                        </div>
                        <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(item.pct, 100)}%` }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                            className={`h-full rounded-full ${item.status === "up" ? "bg-secondary" : "bg-primary/40"}`}
                          />
                        </div>
                      </div>
                        ))}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Tampa Focus Areas – real data from resource locations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="rounded-3xl border-border/40 shadow-xl">
                  <CardHeader className="p-8 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center">
                        <MapIcon className="h-5 w-5 text-secondary" />
                      </div>
                      <CardTitle className="text-xl font-heading text-primary">Neighborhood Needs</CardTitle>
                    </div>
                    <p className="text-xs text-muted-foreground">Derived from resource locations in the directory</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    {neighborhoods.length === 0 ? (
                      <p className="text-muted-foreground text-sm py-4">No area breakdown yet. Resources with Tampa-area addresses will appear here.</p>
                    ) : (
                      <>
                        <div className="h-[220px] w-full mb-6">
                          <ChartContainer config={chartConfigArea} className="h-full w-full">
                            <BarChart
                              data={areaChartData}
                              layout="vertical"
                              margin={{ top: 8, right: 8, left: 8, bottom: 8 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                              <XAxis type="number" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={24} />
                              <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} width={90} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Bar dataKey="count" fill="var(--color-count)" radius={[0, 4, 4, 0]} barSize={14} />
                            </BarChart>
                          </ChartContainer>
                        </div>
                        <div className="space-y-4">
                        {neighborhoods.map((n, i) => (
                          <div key={i} className="flex justify-between items-center py-3 border-b border-border/40 last:border-0">
                            <div>
                              <p className="font-bold text-primary">{n.name}</p>
                              <p className="text-xs text-muted-foreground">Focus: {n.focus} · {n.count} resources</p>
                            </div>
                            <Badge variant={n.volume === "High" ? "destructive" : "secondary"} className="text-[10px] uppercase font-bold">
                              {n.volume}
                            </Badge>
                          </div>
                        ))}
                        </div>
                      </>
                    )}
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
                    {recentResources.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No resources in directory yet.</p>
                    ) : (
                      recentResources.map((res, i) => (
                        <Link key={res.id} href={`/resources/${res.id}`} className="block group">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                              {res.created_at ? formatRelativeTime(res.created_at) : "In directory"}
                            </p>
                            <h4 className="font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1">{res.name}</h4>
                            <p className="text-xs text-muted-foreground">{res.category}</p>
                          </div>
                          {i < recentResources.length - 1 && <div className="h-[1px] bg-border/40 mt-4" />}
                        </Link>
                      ))
                    )}
                  </div>
                  <Link href="/directory">
                    <Button variant="outline" className="w-full mt-8 border-primary/20 text-primary group font-bold">
                      Explore All <Search className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {trends.length > 0 && pieData.length > 0 && (
                <Card className="rounded-3xl border-border/40 shadow-xl">
                  <CardHeader className="p-6 pb-2">
                    <CardTitle className="text-lg font-heading text-primary">Category Share</CardTitle>
                    <p className="text-xs text-muted-foreground">Directory split by category</p>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 pb-6">
                    <div className="w-full min-h-[280px] flex flex-col items-center">
                      <ChartContainer
                        config={chartConfigPie}
                        className="w-full max-w-[320px] !aspect-square min-h-[180px] mx-auto"
                      >
                        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={48}
                            outerRadius={64}
                            paddingAngle={pieData.length > 1 ? 3 : 0}
                            label={pieData.length === 1 ? ({ name, value }) => `${name} (${value})` : false}
                          >
                            {pieData.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartLegend
                            content={
                              <ChartLegendContent
                                nameKey="name"
                                className="flex-wrap justify-center gap-x-3 gap-y-2 pt-4 pb-1 text-[11px] [&>div]:min-w-0 max-w-full"
                              />
                            }
                          />
                        </PieChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              )}

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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
