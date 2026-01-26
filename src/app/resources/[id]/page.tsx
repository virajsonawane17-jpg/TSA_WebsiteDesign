import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { getResourceById, getResources } from "@/lib/db";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { 
  MapPin, 
  Phone, 
  Globe, 
  ArrowLeft, 
  ExternalLink, 
  Heart, 
  Share2, 
  Navigation,
  CheckCircle2,
  Users,
  Target
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const resource = await getResourceById(id);

  if (!resource) {
    notFound();
  }

  const allResources = await getResources();
  const similarResources = allResources
    .filter(r => r.category === resource.category && r.id !== resource.id)
    .slice(0, 3);

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb & Navigation */}
        <div className="container mx-auto px-4 py-8 sm:px-6">
          <Link href="/directory" className="inline-flex items-center text-sm font-semibold text-primary hover:text-secondary transition-colors group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Directory
          </Link>
        </div>

        {/* Resource Header */}
        <section className="pb-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <Badge className="bg-secondary text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-widest">{resource.category}</Badge>
                    {resource.featured && <Badge className="bg-accent text-white border-none px-3 py-1 text-xs font-bold uppercase tracking-widest">Featured Resource</Badge>}
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-primary leading-tight mb-6">
                    {resource.name}
                  </h1>
                  <p className="text-xl text-foreground/70 leading-relaxed font-sans max-w-3xl">
                    {resource.longDescription || resource.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-border/40 shadow-sm flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Who it serves</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resource.audiences.map(aud => (
                          <span key={aud} className="text-xs font-semibold text-primary bg-primary/5 px-2 py-1 rounded">
                            {aud}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-border/40 shadow-sm flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Primary Focus</p>
                      <p className="text-sm font-semibold text-primary mt-1">{resource.category}</p>
                      <p className="text-xs text-muted-foreground mt-1">Verified Community Organization</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-4">
                  <h3 className="text-2xl font-bold font-heading text-primary">Services & Support</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Direct Client Assistance",
                      "Community Outreach",
                      "Resource Navigation",
                      "Information & Referral",
                      "Emergency Support",
                      "Advocacy Services"
                    ].map((service, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-secondary shrink-0" />
                        <span className="text-foreground/80 font-medium">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Action Card */}
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-border/40 shadow-xl overflow-hidden sticky top-24">
                  <div className="bg-primary p-8 text-white">
                    <h3 className="text-xl font-bold font-heading mb-2">Connect with Them</h3>
                    <p className="text-white/70 text-sm">Reach out directly to access services or learn more about their programs.</p>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <MapPin className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Physical Address</p>
                          <p className="text-sm font-medium leading-relaxed">{resource.location}</p>
                          <Button variant="link" className="p-0 h-auto text-secondary text-xs font-bold mt-1">
                            Get Directions <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <Phone className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Phone Number</p>
                          <p className="text-sm font-medium leading-relaxed">{resource.phone}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">Mon - Fri, 9:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 pt-6 border-t">
                      <Button asChild className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold">
                        <a href={resource.website} target="_blank" rel="noopener noreferrer">
                          Visit Official Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="outline" className="w-full h-12 border-primary/20 text-primary font-bold">
                        <Share2 className="mr-2 h-4 w-4" /> Share Resource
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/5 rounded-3xl p-8 border border-secondary/10">
                  <Heart className="h-8 w-8 text-secondary mb-4" />
                  <h4 className="text-lg font-bold text-primary font-heading mb-2">Support this Cause</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Many of our featured resources rely on community volunteers and donations. Consider getting involved today.
                  </p>
                  <Button variant="link" className="p-0 text-secondary font-bold h-auto group">
                    Ways to help <ArrowLeft className="ml-2 h-4 w-4 rotate-180 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mock Map Section */}
        <section className="bg-white py-24 border-y">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold font-heading text-primary mb-12 text-center">Service Location</h2>
              <div className="h-[400px] w-full rounded-3xl bg-muted relative overflow-hidden border border-border/40 shadow-inner">
                 <div className="absolute inset-0 bg-[#e5e7eb] opacity-50 bg-cover bg-center" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${resource.lng},${resource.lat},14,0/1200x800?access_token=pk.eyJ1Ijoib3JjaGlkcyIsImEiOiJjbGZ3Z3R4MHcwM3R6M3FwZ2d3Z3R4MHcwM3R6In0.fake')` }} />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-12 w-12 bg-accent rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-bounce">

                 <MapPin className="h-6 w-6 text-white fill-current" />
               </div>
               <div className="absolute bottom-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-border/40">
                 <p className="text-xs font-bold text-primary mb-1">{resource.name}</p>
                 <p className="text-[10px] text-muted-foreground">{resource.location}</p>
               </div>
            </div>
          </div>
        </section>

        {/* Similar Resources */}
        {similarResources.length > 0 && (
          <section className="py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6">
              <h2 className="text-3xl font-bold font-heading text-primary mb-12">Other {resource.category} Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {similarResources.map((res) => (
                  <Link key={res.id} href={`/resources/${res.id}`} className="group">
                    <Card className="h-full border border-border/40 shadow-sm transition-all hover:shadow-xl group-hover:-translate-y-1">
                      <CardHeader className="pb-4">
                        <Badge variant="secondary" className="mb-3 w-fit bg-secondary/10 text-secondary border-none">{res.category}</Badge>
                        <CardTitle className="text-xl font-heading text-primary group-hover:text-secondary transition-colors">{res.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="line-clamp-2 mb-4">{res.description}</CardDescription>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="mr-2 h-3 w-3" />
                          <span className="truncate">{res.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
