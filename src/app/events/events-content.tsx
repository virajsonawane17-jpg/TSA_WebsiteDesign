"use client";

import { useState, useEffect, useMemo } from "react";
import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import type { CommunityEventWithSource } from "@/lib/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Clock, ExternalLink, Ticket, Building2, Filter } from "lucide-react";
import { motion } from "framer-motion";

/** Category-based placeholder images (picsum.photos, deterministic by seed) – always load. */
function getPlaceholderUrlForCategory(category: string): string {
  const seed = category.replace(/\s+/g, "").slice(0, 20) || "tampa";
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/400`;
}

/** Inline SVG data URI – always loads, no network. Tampa-themed calendar/event placeholder. */
const FALLBACK_DATA_URI =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400">' +
      '<rect fill="%231e3a5f" width="800" height="400"/>' +
      '<rect fill="%2329476d" x="0" y="0" width="800" height="400" opacity="0.9"/>' +
      '<g fill="none" stroke="%2394a3b8" stroke-width="2" opacity="0.8">' +
      '<rect x="280" y="140" width="240" height="120" rx="8"/>' +
      '<path d="M300 170 h160 M300 200 h160 M300 230 h80"/>' +
      '</g>' +
      '<text x="400" y="320" font-family="system-ui,sans-serif" font-size="18" fill="%23cbd5e1" text-anchor="middle">Tampa Community Event</text>' +
      "</svg>"
  );

/** Renders event image with fallback chain: event image → category placeholder → inline SVG. */
function EventImage({
  src,
  alt,
  category,
  className,
}: {
  src: string | undefined;
  alt: string;
  category: string;
  className?: string;
}) {
  const fallbackChain = useMemo(() => {
    const urls: string[] = [];
    if (src?.trim()) urls.push(src.trim());
    urls.push(getPlaceholderUrlForCategory(category));
    urls.push(FALLBACK_DATA_URI);
    return urls;
  }, [src, category]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const effectiveSrc = fallbackChain[currentIndex] ?? FALLBACK_DATA_URI;

  useEffect(() => {
    setCurrentIndex(0);
  }, [src, category]);

  const handleError = () => {
    setCurrentIndex((i) => (i < fallbackChain.length - 1 ? i + 1 : i));
  };

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}

type SourceFilter = "all" | "tampa_gov" | "community";

interface EventsContentProps {
  events: CommunityEventWithSource[];
}

export function EventsContent({ events }: EventsContentProps) {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSource, setFilterSource] = useState<SourceFilter>("all");

  const categories = useMemo(() => {
    const set = new Set(events.map((e) => e.category).filter(Boolean));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [events]);

  const filtered = useMemo(() => {
    let list = [...events];
    if (filterCategory !== "all") {
      list = list.filter((e) => e.category === filterCategory);
    }
    if (filterSource === "tampa_gov") {
      list = list.filter((e) => e.source === "tampa_gov");
    } else if (filterSource === "community") {
      list = list.filter((e) => e.source !== "tampa_gov");
    }
    return list;
  }, [events, filterCategory, filterSource]);


  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EmergencyBanner />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-secondary border-secondary uppercase tracking-widest text-xs"
          >
            Community Calendar
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-heading">
            Tampa Community Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover workshops, festivals, job fairs, and neighborhood gatherings across the Tampa
            Bay area. Includes official City of Tampa events.
          </p>
        </div>

        {/* Filter toolbar */}
        <div className="mb-10 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]" size="default">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterSource} onValueChange={(v) => setFilterSource(v as SourceFilter)}>
              <SelectTrigger className="w-[180px]" size="default">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sources</SelectItem>
                <SelectItem value="tampa_gov">City of Tampa</SelectItem>
                <SelectItem value="community">Community</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-muted-foreground shrink-0">
            {filtered.length} event{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center rounded-2xl border border-dashed border-muted-foreground/30 bg-muted/30">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary mb-2">No events match your filters</h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Try changing the category or source filter to see more events.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterCategory("all");
                setFilterSource("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.05, 0.5) }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-muted group h-full flex flex-col">
                <div className="h-48 overflow-hidden bg-muted">
                  <EventImage
                    src={event.imageUrl}
                    alt={event.title}
                    category={event.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-1">
                    <Badge
                      variant="secondary"
                      className="bg-secondary/10 text-secondary hover:bg-secondary/20"
                    >
                      {event.category}
                    </Badge>
                    {event.source === "tampa_gov" ? (
                      <Badge variant="outline" className="text-[10px] flex items-center gap-1 border-primary/30">
                        <Building2 className="h-3 w-3" />
                        City of Tampa
                      </Badge>
                    ) : (
                      <div className="text-xs font-bold text-accent flex items-center gap-1 uppercase tracking-tighter">
                        <Ticket className="h-3 w-3" />
                        Free / Open
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full group-hover:border-secondary group-hover:text-secondary transition-colors"
                    asChild
                  >
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      More Info
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        )}

        <section className="mt-24 p-12 rounded-3xl bg-secondary/10 border-2 border-dashed border-secondary/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-primary mb-4 font-heading">
              Host a Community Event?
            </h2>
            <p className="text-lg text-muted-foreground">
              Are you organizing a resource fair, workshop, or community gathering? Add it to our
              calendar to reach thousands of Tampa residents.
            </p>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap"
            asChild
          >
            <a href="/submit">Submit an Event</a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
