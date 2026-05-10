"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { getResources } from "@/lib/db";
import { Category, Audience, Resource } from "@/lib/resources";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  MapPin,
  Phone,
  ExternalLink,
  X,
  Map as MapIcon,
  List,
  Navigation,
  Info,
  Waves,
  UtensilsCrossed,
  Home,
  Brain,
  GraduationCap,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  Star,
  Users,
  Heart,
} from "lucide-react";
import Link from "next/link";

const TampaResourceMap = dynamic(
  () => import("@/components/tampa-resource-map").then((mod) => mod.TampaResourceMap),
  { ssr: false }
);

/* ─── Category helpers ─── */
const categoryIconMap: Record<string, React.ElementType> = {
  "Food Assistance": UtensilsCrossed,
  "Housing": Home,
  "Mental Health": Brain,
  "Youth Programs": GraduationCap,
  "Healthcare": Stethoscope,
  "Employment": Briefcase,
  "Legal Aid": ShieldCheck,
  "Crisis Support": Phone,
  "Veterans": Star,
  "Education": GraduationCap,
  "Seniors": Users,
  "Arts & Culture": Heart,
};

const categoryColorMap: Record<string, string> = {
  "Food Assistance": "text-orange-500 bg-orange-50",
  "Housing": "text-teal-600 bg-teal-50",
  "Mental Health": "text-violet-600 bg-violet-50",
  "Youth Programs": "text-pink-600 bg-pink-50",
  "Healthcare": "text-emerald-600 bg-emerald-50",
  "Employment": "text-blue-600 bg-blue-50",
  "Legal Aid": "text-slate-600 bg-slate-100",
  "Crisis Support": "text-red-600 bg-red-50",
  "Veterans": "text-indigo-600 bg-indigo-50",
  "Education": "text-amber-600 bg-amber-50",
  "Seniors": "text-cyan-600 bg-cyan-50",
  "Arts & Culture": "text-fuchsia-600 bg-fuchsia-50",
};

const audiences: Audience[] = ["Everyone", "Families", "Seniors", "Youth", "Veterans", "Low-Income"];

/* ─── Wave divider ─── */
function WaveDivider({ fill = "#ffffff" }: { fill?: string }) {
  return (
    <div className="w-full overflow-hidden leading-none pointer-events-none" aria-hidden>
      <svg viewBox="0 0 1440 72" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-14">
        <path d="M0,44 C240,72 480,16 720,44 C960,72 1200,20 1440,44 L1440,72 L0,72 Z" fill={fill} />
      </svg>
    </div>
  );
}

export default function DirectoryPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

  useEffect(() => {
    getResources()
      .then(setResources)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(resources.map((r) => r.category))).sort(),
    [resources]
  );

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        resource.name.toLowerCase().includes(q) ||
        resource.description.toLowerCase().includes(q) ||
        resource.category.toLowerCase().includes(q);
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      const matchesAudience =
        !selectedAudience || resource.audiences.includes(selectedAudience as Audience);
      return matchesSearch && matchesCategory && matchesAudience;
    });
  }, [resources, searchQuery, selectedCategory, selectedAudience]);

  const selectedResource = useMemo(
    () => resources.find((r) => r.id === selectedResourceId),
    [resources, selectedResourceId]
  );

  const hasFilters = !!(selectedCategory || selectedAudience || searchQuery);

  const clearAll = () => {
    setSelectedCategory(null);
    setSelectedAudience(null);
    setSearchQuery("");
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EmergencyBanner />
      <Navbar />

      <main className="flex-grow">
        {/* ── Header ── */}
        <section className="relative bg-primary pt-14 pb-28 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(-45deg,white 0,white 1px,transparent 1px,transparent 12px)" }}
          />
          <div className="absolute top-0 right-0 h-72 w-72 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <Waves className="h-5 w-5 text-secondary" />
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                Resource Directory
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4 max-w-2xl leading-tight">
              Find the Support You Need
            </h1>
            <p className="text-xl text-white/70 font-sans max-w-2xl">
              Browse {loading ? "..." : resources.length}+ verified organizations across
              Tampa and Hillsborough County — free to access.
            </p>
          </div>
          <WaveDivider fill="oklch(0.99 0.005 220)" />
        </section>

        {/* ── Glass Search Panel ── */}
        <div className="container mx-auto px-4 sm:px-6 -mt-20 relative z-20">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary/10 border border-white/60 p-6 md:p-8">
            {/* Search bar + view toggle */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-grow relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, service, or keyword..."
                  className="h-14 pl-14 text-base border-border/50 focus-visible:ring-secondary focus-visible:border-secondary rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex bg-muted rounded-xl p-1 gap-1 shrink-0">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  className={`rounded-lg h-12 px-5 ${viewMode === "list" ? "bg-white text-primary shadow-sm hover:bg-white" : "text-muted-foreground hover:text-primary"}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="mr-2 h-4 w-4" /> List
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  className={`rounded-lg h-12 px-5 ${viewMode === "map" ? "bg-white text-primary shadow-sm hover:bg-white" : "text-muted-foreground hover:text-primary"}`}
                  onClick={() => setViewMode("map")}
                >
                  <MapIcon className="mr-2 h-4 w-4" /> Map
                </Button>
              </div>
            </div>

            {/* Category pill filters */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Filter by Category
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === null
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => {
                  const Icon = categoryIconMap[cat] || Heart;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === cat
                          ? "bg-secondary text-white shadow-md shadow-secondary/20"
                          : "bg-muted text-muted-foreground hover:bg-secondary/10 hover:text-secondary"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Audience pills */}
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
                Filter by Who It Serves
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedAudience(null)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedAudience === null
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  Everyone
                </button>
                {audiences.map((aud) => (
                  <button
                    key={aud}
                    onClick={() => setSelectedAudience(selectedAudience === aud ? null : aud)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedAudience === aud
                        ? "bg-accent text-white shadow-md"
                        : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    {aud}
                  </button>
                ))}

                {hasFilters && (
                  <button
                    onClick={clearAll}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-destructive bg-destructive/8 hover:bg-destructive/15 transition-all"
                  >
                    <X className="h-3.5 w-3.5" /> Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Result count */}
            {!loading && (
              <p className="text-sm text-muted-foreground mt-5 pt-5 border-t border-border/50">
                Showing{" "}
                <strong className="text-primary">{filteredResources.length}</strong>{" "}
                {filteredResources.length === 1 ? "resource" : "resources"}
                {hasFilters && " matching your filters"}
              </p>
            )}
          </div>
        </div>

        {/* ── Content Area ── */}
        <section className="container mx-auto px-4 sm:px-6 py-14">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {loading ? (
                  <div className="col-span-full flex justify-center py-20">
                    <div className="h-10 w-10 rounded-full border-4 border-secondary border-t-transparent animate-spin" />
                  </div>
                ) : filteredResources.length > 0 ? (
                  filteredResources.map((resource) => {
                    const IconComponent = categoryIconMap[resource.category] || Heart;
                    const colorClass = categoryColorMap[resource.category] || "text-secondary bg-secondary/10";
                    return (
                      <motion.div
                        key={resource.id}
                        layout
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.2 }}
                        whileHover={{ y: -4 }}
                        className="group"
                      >
                        <Card className="h-full bg-white border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 overflow-hidden">
                          <div className="h-1 bg-gradient-to-r from-secondary to-aqua group-hover:h-1.5 transition-all" />
                          <CardHeader className="pb-3 pt-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                                <IconComponent className="h-5 w-5" />
                              </div>
                              {resource.featured && (
                                <Badge className="bg-accent text-white border-none text-[10px] font-bold uppercase tracking-wider">
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <Badge
                              variant="outline"
                              className="w-fit border-secondary/20 text-secondary bg-secondary/5 text-xs font-semibold mb-2"
                            >
                              {resource.category}
                            </Badge>
                            <CardTitle className="text-lg font-heading text-primary group-hover:text-secondary transition-colors leading-snug">
                              {resource.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-5">
                            <CardDescription className="text-sm text-foreground/68 line-clamp-3 leading-relaxed">
                              {resource.description}
                            </CardDescription>

                            <div className="space-y-2 border-t pt-4">
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.location)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-sm text-muted-foreground hover:text-secondary transition-colors group/link"
                              >
                                <MapPin className="mr-2 h-4 w-4 shrink-0 text-secondary" />
                                <span className="truncate group-hover/link:underline">{resource.location}</span>
                              </a>
                              <a
                                href={`tel:${resource.phone.replace(/\D/g, "")}`}
                                className="flex items-center text-sm text-muted-foreground hover:text-secondary transition-colors group/link"
                              >
                                <Phone className="mr-2 h-4 w-4 shrink-0 text-secondary" />
                                <span className="group-hover/link:underline">{resource.phone}</span>
                              </a>
                            </div>

                            <div className="flex flex-wrap gap-1.5">
                              {resource.audiences.map((aud) => (
                                <span
                                  key={aud}
                                  className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/8 px-2 py-0.5 rounded-full border border-secondary/15"
                                >
                                  {aud}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-2.5 pt-2">
                              <Link href={`/resources/${resource.id}`} className="flex-grow">
                                <Button
                                  variant="outline"
                                  className="w-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
                                >
                                  View Details
                                </Button>
                              </Link>
                              <Button
                                asChild
                                size="icon"
                                className="bg-secondary hover:bg-secondary/90 shadow-md shadow-secondary/15 shrink-0"
                              >
                                <a href={resource.website} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="col-span-full"
                  >
                    <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-secondary/25 shadow-sm">
                      <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Search className="h-9 w-9 text-secondary/50" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">No Resources Found</h3>
                      <p className="text-muted-foreground max-w-md mx-auto mb-8">
                        We couldn't find any resources matching your search or filters. Try
                        broadening your criteria.
                      </p>
                      <Button onClick={clearAll} className="bg-secondary hover:bg-secondary/90 text-white">
                        Reset All Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ── Map View ── */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
              <div className="lg:col-span-2 h-full rounded-3xl overflow-hidden shadow-xl border border-border/40">
                <TampaResourceMap
                  resources={filteredResources}
                  selectedResourceId={selectedResourceId}
                  onSelectResource={(id) => setSelectedResourceId(id)}
                />
              </div>

              {/* Sidebar */}
              <div className="bg-white rounded-3xl shadow-xl border border-border/40 p-6 overflow-y-auto">
                {selectedResource ? (
                  <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <button
                      className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => setSelectedResourceId(null)}
                    >
                      <X className="mr-1.5 h-4 w-4" /> Deselect
                    </button>

                    <div>
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20 border mb-3">
                        {selectedResource.category}
                      </Badge>
                      <h3 className="text-2xl font-heading font-bold text-primary leading-tight">
                        {selectedResource.name}
                      </h3>
                    </div>

                    <p className="text-sm text-foreground/70 leading-relaxed">
                      {selectedResource.longDescription || selectedResource.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedResource.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 hover:bg-muted/50 p-3 rounded-xl transition-colors group cursor-pointer"
                      >
                        <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                          <MapPin className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                          <p className="text-sm font-medium group-hover:text-secondary transition-colors">
                            {selectedResource.location}
                          </p>
                        </div>
                      </a>
                      <a
                        href={`tel:${selectedResource.phone.replace(/\D/g, "")}`}
                        className="flex items-start gap-3 hover:bg-muted/50 p-3 rounded-xl transition-colors group cursor-pointer"
                      >
                        <div className="h-9 w-9 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                          <Phone className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Phone</p>
                          <p className="text-sm font-medium group-hover:text-secondary transition-colors">
                            {selectedResource.phone}
                          </p>
                        </div>
                      </a>
                    </div>

                    <div className="pt-4 space-y-2.5">
                      <Button asChild className="w-full bg-primary hover:bg-secondary text-white h-11 transition-colors">
                        <a href={selectedResource.website} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Link href={`/resources/${selectedResource.id}`} className="block">
                        <Button variant="outline" className="w-full h-11 border-primary/20 text-primary">
                          Full Details
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
                      <Info className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">Select a Pin</h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Click any marker on the map to view organization details.
                    </p>
                    <div className="w-full text-left border-t pt-5">
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-4">
                        Results ({filteredResources.length})
                      </h4>
                      <div className="space-y-2">
                        {filteredResources.slice(0, 6).map((r) => (
                          <button
                            key={r.id}
                            className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium text-primary border border-transparent hover:border-border/40"
                            onClick={() => setSelectedResourceId(r.id)}
                          >
                            {r.name}
                          </button>
                        ))}
                        {filteredResources.length > 6 && (
                          <p className="text-[10px] text-center text-muted-foreground pt-1">
                            And {filteredResources.length - 6} more...
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
