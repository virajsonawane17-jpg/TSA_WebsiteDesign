"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Phone, Globe, ExternalLink, ArrowRight, Heart, Users, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Resource, TAMPA_RESOURCES } from "@/lib/resources";
import { useState, useMemo } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      
      <div className="container relative mx-auto px-4 sm:px-6">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div variants={fadeIn}>
            <Badge variant="secondary" className="mb-6 px-3 py-1 text-sm font-medium">
              Official Tampa & Hillsborough County Resource Hub
            </Badge>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn}
            className="mb-6 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Supporting Every Resident in <span className="text-primary">Tampa Bay.</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn}
            className="mb-10 text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            Discover local food banks, housing assistance, mental health support, and community programs. Real resources for real needs in our neighborhood.
          </motion.p>
          
          <motion.div 
            variants={fadeIn}
            className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
          >
            <Link href="#directory">
              <Button size="lg" className="h-12 px-8 text-base">
                Browse Directory
              </Button>
            </Link>
            <Link href="#submit">
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Contribute a Resource
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            variants={fadeIn}
            className="mt-16 flex items-center justify-center space-x-8 border-t pt-8 grayscale opacity-60"
          >
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-sm font-semibold">Verified Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span className="text-sm font-semibold">Community Driven</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5" />
              <span className="text-sm font-semibold">Always Free</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function FeaturedResources() {
  const featured = TAMPA_RESOURCES.filter(r => r.featured).slice(0, 3);
  
  return (
    <section id="featured" className="bg-muted/30 py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Featured Support Services</h2>
            <p className="text-lg text-muted-foreground">
              These organizations are making a significant impact in Tampa right now. Learn how they can help you or your loved ones.
            </p>
          </div>
          <Link href="#directory">
            <Button variant="ghost" className="group">
              View All Resources <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {featured.map((resource, idx) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-none shadow-lg transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Heart className="h-6 w-6 fill-current" />
                  </div>
                  <Badge variant="secondary" className="mb-2 w-fit">{resource.category}</Badge>
                  <CardTitle className="text-xl leading-tight">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base text-foreground/80">
                    {resource.longDescription || resource.description}
                  </CardDescription>
                  <div className="space-y-2 pt-4">
                    <div className="flex items-start text-sm">
                      <MapPin className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{resource.location}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{resource.phone}</span>
                    </div>
                  </div>
                  <Button asChild className="mt-4 w-full" variant="outline">
                    <a href={resource.website} target="_blank" rel="noopener noreferrer">
                      Visit Website <ExternalLink className="ml-2 h-3 w-3" />
                    </a>
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

export function ResourceDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);

  const categories = Array.from(new Set(TAMPA_RESOURCES.map(r => r.category)));
  const audiences = ["Everyone", "Families", "Seniors", "Youth", "Veterans", "Low-Income"];

  const filteredResources = useMemo(() => {
    return TAMPA_RESOURCES.filter(resource => {
      const matchesSearch = 
        resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || resource.category === selectedCategory;
      const matchesAudience = !selectedAudience || resource.audiences.includes(selectedAudience as any);
      
      return matchesSearch && matchesCategory && matchesAudience;
    });
  }, [searchQuery, selectedCategory, selectedAudience]);

  return (
    <section id="directory" className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">Community Resource Directory</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Search and filter through our comprehensive list of local organizations and support programs.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 space-y-6">
          <div className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Search by name, service, or keyword..." 
              className="h-14 pl-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Categories
            </Button>
            {categories.map(cat => (
              <Button 
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"} 
                size="sm"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="mr-2 text-sm font-medium text-muted-foreground">For:</span>
            {audiences.map(aud => (
              <Button 
                key={aud}
                variant={selectedAudience === aud ? "secondary" : "ghost"} 
                size="sm"
                onClick={() => setSelectedAudience(selectedAudience === aud ? null : aud)}
                className="rounded-full h-8"
              >
                {aud}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border border-border/50 transition-colors hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="mb-2 flex items-center justify-between">
                      <Badge variant="outline" className="font-normal">{resource.category}</Badge>
                      <div className="flex gap-1">
                        {resource.audiences.slice(0, 2).map(a => (
                          <span key={a} className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{a}</span>
                        ))}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{resource.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="line-clamp-3 text-sm leading-relaxed">
                      {resource.description}
                    </CardDescription>
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-2 h-3 w-3" />
                        <span className="truncate">{resource.location}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="mr-2 h-3 w-3" />
                        <span>{resource.phone}</span>
                      </div>
                    </div>
                    <Button asChild variant="link" className="h-auto p-0 text-primary">
                      <a href={resource.website} target="_blank" rel="noopener noreferrer">
                        Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-lg text-muted-foreground">No resources found matching your criteria. Try adjusting your filters.</p>
              <Button variant="link" onClick={() => { setSearchQuery(""); setSelectedCategory(null); setSelectedAudience(null); }}>
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function SubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section id="submit" className="bg-primary/5 py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl bg-background shadow-2xl border border-primary/10">
          <div className="bg-primary px-8 py-10 text-primary-foreground">
            <h2 className="mb-2 text-3xl font-bold tracking-tight">Add to the Hub</h2>
            <p className="opacity-90">
              Know of a local resource we missed? Submit it here for review by our community moderators.
            </p>
          </div>
          
          <div className="p-8">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Submission Received!</h3>
                <p className="mb-8 text-muted-foreground">
                  Thank you for helping our community. Our team will review the resource information and add it to the directory soon.
                </p>
                <Button onClick={() => setSubmitted(false)}>Submit Another</Button>
              </motion.div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Organization Name</label>
                    <Input placeholder="e.g. Tampa Community Garden" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Service Category</label>
                    <Input placeholder="e.g. Environment / Food" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Physical Address or Service Area</label>
                  <Input placeholder="Street address or 'Hillsborough County'" required />
                </div>
                
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Contact Email/Phone</label>
                    <Input placeholder="contact@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Website URL</label>
                    <Input placeholder="https://..." />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold">Description of Services</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Briefly explain what this resource provides to residents..."
                    required
                  ></textarea>
                </div>
                
                <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
                  {loading ? "Processing..." : "Submit Resource"}
                </Button>
                
                <p className="text-center text-xs text-muted-foreground italic">
                  By submitting, you agree that this information is accurate to the best of your knowledge.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
