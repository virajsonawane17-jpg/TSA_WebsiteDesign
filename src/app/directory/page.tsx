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
  Filter, 
  X, 
  Map as MapIcon, 
  List,
  Navigation,
  Info
} from "lucide-react";
import Link from "next/link";

const TampaResourceMap = dynamic(
  () =>
    import("@/components/tampa-resource-map").then(
      (mod) => mod.TampaResourceMap,
    ),
  { ssr: false },
);

export default function DirectoryPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedResourceId, setSelectedResourceId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchResources() {
      try {
        const data = await getResources();
        setResources(data);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchResources();
  }, []);

  const categories = Array.from(new Set(resources.map(r => r.category))).sort();
  const audiences = ["Everyone", "Families", "Seniors", "Youth", "Veterans", "Low-Income"];

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesSearch = 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      const matchesAudience = !selectedAudience || resource.audiences.includes(selectedAudience as any);
      
      return matchesSearch && matchesCategory && matchesAudience;
    });
  }, [resources, searchQuery, selectedCategory, selectedAudience]);

  const selectedResource = useMemo(() => 
    resources.find(r => r.id === selectedResourceId), 
  [resources, selectedResourceId]);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        {/* Directory Header */}
        <section className="bg-primary pt-12 pb-24 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold font-heading mb-4">Resource Directory</h1>
              <p className="text-xl text-white/80 font-sans">
                Browse verified community resources across Tampa and Hillsborough County.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="container mx-auto px-4 sm:px-6 -mt-12">
          <div className="bg-white rounded-2xl shadow-xl border border-border/40 p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-grow relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input 
                  placeholder="Search by name, service, or keyword..." 
                  className="h-14 pl-12 text-lg border-border/60 focus:ring-secondary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex bg-muted p-1 rounded-xl">
                  <Button 
                    variant={viewMode === "list" ? "default" : "ghost"} 
                    className={viewMode === "list" ? "bg-white text-primary shadow-sm hover:bg-white" : "text-muted-foreground"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="mr-2 h-4 w-4" /> List
                  </Button>
                  <Button 
                    variant={viewMode === "map" ? "default" : "ghost"} 
                    className={viewMode === "map" ? "bg-white text-primary shadow-sm hover:bg-white" : "text-muted-foreground"}
                    onClick={() => setViewMode("map")}
                  >
                    <MapIcon className="mr-2 h-4 w-4" /> Map
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 mr-4">
                <Filter className="h-4 w-4 text-secondary" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Filters:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select 
                  className="bg-muted/50 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-secondary outline-none"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select 
                  className="bg-muted/50 border-none rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-secondary outline-none"
                  value={selectedAudience || ""}
                  onChange={(e) => setSelectedAudience(e.target.value || null)}
                >
                  <option value="">All Audiences</option>
                  {audiences.map(aud => (
                    <option key={aud} value={aud}>{aud}</option>
                  ))}
                </select>

                {(selectedCategory || selectedAudience || searchQuery) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-accent hover:text-accent/80 font-bold"
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedAudience(null);
                      setSearchQuery("");
                    }}
                  >
                    Clear All <X className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <section className="container mx-auto px-4 sm:px-6 py-12">
          {viewMode === "list" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredResources.length > 0 ? (
                  filteredResources.map((resource) => (
                    <motion.div
                      key={resource.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="h-full border border-border/40 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 group">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{resource.category}</Badge>
                            {resource.featured && <Badge className="bg-accent text-white border-none">Featured</Badge>}
                          </div>
                          <CardTitle className="text-2xl font-heading text-primary group-hover:text-secondary transition-colors leading-tight">
                            {resource.name}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <CardDescription className="text-base text-foreground/70 line-clamp-3 leading-relaxed">
                            {resource.description}
                          </CardDescription>
                          
                          <div className="space-y-3 border-t pt-4">
                            <a 
                              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.location)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start text-sm text-muted-foreground hover:text-secondary transition-colors cursor-pointer group"
                            >
                              <MapPin className="mr-3 h-4 w-4 shrink-0 text-secondary group-hover:scale-110 transition-transform" />
                              <span className="truncate group-hover:underline">{resource.location}</span>
                            </a>
                            <a 
                              href={`tel:${resource.phone.replace(/\D/g, '')}`}
                              className="flex items-center text-sm text-muted-foreground hover:text-secondary transition-colors cursor-pointer group"
                            >
                              <Phone className="mr-3 h-4 w-4 shrink-0 text-secondary group-hover:scale-110 transition-transform" />
                              <span className="group-hover:underline">{resource.phone}</span>
                            </a>
                          </div>

                            <div className="flex flex-wrap gap-2 pt-2">
                              {resource.audiences.map(aud => (
                                <span key={aud} className="text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/5 px-2 py-0.5 rounded-full border border-secondary/10">
                                  {aud}
                                </span>
                              ))}
                            </div>

                          <div className="flex gap-3 pt-4">
                            <Link href={`/resources/${resource.id}`} className="flex-grow">
                              <Button variant="outline" className="w-full border-primary/20 text-primary hover:bg-primary hover:text-white">
                                View Details
                              </Button>
                            </Link>
                            <Button asChild className="bg-secondary hover:bg-secondary/90 shadow-lg shadow-secondary/10">
                              <a href={resource.website} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Search className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">No Resources Found</h3>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto mb-8">
                      We couldn't find any resources matching your current search or filters.
                    </p>
                    <Button onClick={() => { setSearchQuery(""); setSelectedCategory(null); setSelectedAudience(null); }}>
                      Reset All Filters
                    </Button>
                  </div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
              <div className="lg:col-span-2 h-full">
                <TampaResourceMap
                  resources={filteredResources}
                  selectedResourceId={selectedResourceId}
                  onSelectResource={(id) => setSelectedResourceId(id)}
                />
              </div>

              {/* Sidebar Info */}
              <div className="bg-white rounded-3xl shadow-xl border border-border/40 p-6 overflow-y-auto">
                {selectedResource ? (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 text-muted-foreground hover:text-primary mb-4"
                      onClick={() => setSelectedResourceId(null)}
                    >
                      <X className="mr-2 h-4 w-4" /> Deselect
                    </Button>
                    <Badge className="bg-secondary/10 text-secondary border-none mb-2">{selectedResource.category}</Badge>
                    <h3 className="text-3xl font-heading font-bold text-primary">{selectedResource.name}</h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {selectedResource.longDescription || selectedResource.description}
                    </p>
                    
                    <div className="space-y-4 pt-6 border-t">
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedResource.location)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-4 hover:bg-muted/50 p-3 rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                          <MapPin className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Location</p>
                          <p className="text-sm font-medium group-hover:text-secondary transition-colors">{selectedResource.location}</p>
                        </div>
                      </a>
                      <a 
                        href={`tel:${selectedResource.phone.replace(/\D/g, '')}`}
                        className="flex items-start gap-4 hover:bg-muted/50 p-3 rounded-xl transition-colors cursor-pointer group"
                      >
                        <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/10 transition-colors">
                          <Phone className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Contact</p>
                          <p className="text-sm font-medium group-hover:text-secondary transition-colors">{selectedResource.phone}</p>
                        </div>
                      </a>
                    </div>

                    <div className="pt-8 space-y-3">
                      <Button asChild className="w-full bg-primary h-12 text-white">
                        <a href={selectedResource.website} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Link href={`/resources/${selectedResource.id}`} className="block">
                        <Button variant="outline" className="w-full h-12 border-primary/20 text-primary">
                          Full Resource Details
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-4">
                    <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6 text-muted-foreground">
                      <Info className="h-10 w-10" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">Select a Pin</h3>
                    <p className="text-muted-foreground">
                      Click on any marker on the map to view organization details and contact information.
                    </p>
                    <div className="mt-8 pt-8 border-t w-full text-left">
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Results ({filteredResources.length})</h4>
                      <div className="space-y-3">
                        {filteredResources.slice(0, 5).map(r => (
                          <button 
                            key={r.id}
                            className="w-full text-left p-3 rounded-xl hover:bg-muted transition-colors text-sm font-medium text-primary border border-transparent hover:border-border/40"
                            onClick={() => setSelectedResourceId(r.id)}
                          >
                            {r.name}
                          </button>
                        ))}
                        {filteredResources.length > 5 && (
                          <p className="text-[10px] text-center text-muted-foreground pt-2">And {filteredResources.length - 5} others...</p>
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
