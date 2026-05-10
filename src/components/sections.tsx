"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Search,
  MapPin,
  Phone,
  Heart,
  Users,
  Target,
  MessageCircle,
  Clock,
  Navigation,
  Calendar as CalendarIcon,
  Loader2,
  Building2,
  UtensilsCrossed,
  Home,
  Brain,
  GraduationCap,
  Stethoscope,
  Briefcase,
  ShieldCheck,
  Star,
  TrendingUp,
  CheckCircle2,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { getFeaturedResources } from "@/lib/db";
import { Resource, CommunityEvent } from "@/lib/resources";
import { useState, useEffect } from "react";
import { TampaGovNewsCard } from "@/components/tampa-gov-news-card";
import { CommunityNewsCard } from "@/components/community-news-card";
import {
  ContainerScroll,
  ContainerSticky,
  GalleryContainer,
  GalleryCol,
  ContainerAnimated,
} from "@/components/ui/container-scroll";
import { MouseSpark } from "@/components/ui/mouse-spark";

/* ─── Animation variants ─── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

/* ─── Wave divider ─── */
function WaveDivider({
  fill = "#ffffff",
  flip = false,
  className = "",
}: {
  fill?: string;
  flip?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 1440 72"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className={`w-full h-14 md:h-[72px] ${flip ? "scale-y-[-1]" : ""}`}
      >
        <path
          d="M0,44 C240,72 480,16 720,44 C960,72 1200,20 1440,44 L1440,72 L0,72 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

/* ─── Category floating cards (hero) ─── */
const heroCategories = [
  { icon: UtensilsCrossed, label: "Food Assistance", color: "from-orange-400 to-amber-500" },
  { icon: Home, label: "Housing", color: "from-teal-500 to-cyan-400" },
  { icon: Brain, label: "Mental Health", color: "from-violet-500 to-purple-400" },
  { icon: GraduationCap, label: "Youth Programs", color: "from-pink-500 to-rose-400" },
  { icon: Stethoscope, label: "Healthcare", color: "from-emerald-500 to-green-400" },
  { icon: Briefcase, label: "Employment", color: "from-blue-500 to-indigo-400" },
];

/* ─── Category icon map (for directory cards) ─── */
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

/* ════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════ */
export function Hero() {
  const images = [
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/Image-1-1769318907736.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-2-1769318908171.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-3-1769318907789.webp",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-4-1769318908177.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-5-1769318907712.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-6-1769318906990.jpg",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-7-1769318908231.webp",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-8-resized-1769318907254.webp",
    "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/image-9-1769318907142.jpg",
  ];

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Beach background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/beach-background.png')" }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/65 to-primary/85" />

      <MouseSpark theme="dark" />

      <ContainerScroll className="pt-20 md:pt-36 relative z-10">
        <ContainerSticky className="flex flex-col items-center">
          <div className="container relative z-10 mx-auto px-4 sm:px-6 text-center mb-12">
            <ContainerAnimated>
              {/* Top badge */}
              <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/85 px-5 py-2 rounded-full text-sm font-medium mb-8">
                <span className="h-2 w-2 rounded-full bg-secondary animate-pulse shrink-0" />
                Civic Technology for Hillsborough County
              </div>

              {/* Headline */}
              <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl font-heading leading-[1.05]">
                Connecting Tampa to<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, oklch(0.74 0.156 218) 0%, oklch(0.91 0.092 163) 100%)",
                  }}
                >
                  Resources That Matter
                </span>
              </h1>

              {/* Sub */}
              <p className="mb-10 text-xl leading-relaxed text-white/72 max-w-2xl mx-auto font-sans">
                Your community hub for food assistance, housing support, mental health
                services, youth programs, and more — all verified and free to access.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link href="/directory">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg bg-accent hover:bg-accent/90 border-none text-white shadow-2xl shadow-accent/25 font-bold group"
                  >
                    Find Resources Near Me
                    <Navigation className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-lg text-white border-white/35 bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold shadow-lg"
                  >
                    Suggest a Resource
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: MapPin, label: "Local Support" },
                  { icon: ShieldCheck, label: "Verified Resources" },
                  { icon: CheckCircle2, label: "Accessible Help" },
                  { icon: Heart, label: "Always Free" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/80 text-sm font-medium"
                  >
                    <badge.icon className="h-4 w-4 text-secondary" />
                    {badge.label}
                  </div>
                ))}
              </div>

              {/* Floating category cards */}
              <div className="flex flex-wrap justify-center gap-2.5">
                {heroCategories.map((cat) => (
                  <Link href="/directory" key={cat.label}>
                    <motion.div
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="flex items-center gap-2 bg-white/12 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm font-medium hover:bg-white/22 transition-colors cursor-pointer"
                    >
                      <div
                        className={`h-7 w-7 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center shrink-0`}
                      >
                        <cat.icon className="h-4 w-4 text-white" />
                      </div>
                      {cat.label}
                    </motion.div>
                  </Link>
                ))}
              </div>
            </ContainerAnimated>
          </div>

          {/* Gallery */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 overflow-hidden rounded-2xl">
            <GalleryContainer className="bg-primary/50 backdrop-blur-sm p-4 border border-white/10 shadow-2xl">
              <GalleryCol yRange={["0%", "-20%"]}>
                {images.slice(0, 3).map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                    <img src={src} alt="Tampa community" className="w-full h-full object-cover" />
                  </div>
                ))}
              </GalleryCol>
              <GalleryCol yRange={["0%", "10%"]}>
                {images.slice(3, 6).map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                    <img src={src} alt="Tampa community" className="w-full h-full object-cover" />
                  </div>
                ))}
              </GalleryCol>
              <GalleryCol yRange={["0%", "-10%"]}>
                {images.slice(6, 9).map((src, i) => (
                  <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10">
                    <img src={src} alt="Tampa community" className="w-full h-full object-cover" />
                  </div>
                ))}
              </GalleryCol>
            </GalleryContainer>
          </div>
        </ContainerSticky>
      </ContainerScroll>

      {/* Wave into next section */}
      <WaveDivider fill="#ffffff" className="relative z-10" />
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   FEATURED RESOURCES
════════════════════════════════════════════════════════ */
export function FeaturedResources() {
  const [featured, setFeatured] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFeaturedResources(6)
      .then(setFeatured)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "oklch(0.975 0.018 80)" }}>
      {/* Coastal dot pattern */}
      <div className="absolute inset-0 coastal-pattern opacity-60 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 py-24">
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-accent fill-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">
                Spotlighted Organizations
              </span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary">
              Featured Local Resources
            </h2>
            <p className="text-lg text-muted-foreground font-sans">
              Verified Tampa organizations making a direct impact on our neighbors today.
            </p>
          </div>
          <Link href="/directory">
            <Button
              variant="outline"
              className="border-primary/25 text-primary hover:bg-primary hover:text-white group font-semibold"
            >
              View All Resources
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-secondary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((resource, idx) => {
              const IconComponent = categoryIconMap[resource.category] || Heart;
              const colorClass = categoryColorMap[resource.category] || "text-secondary bg-secondary/10";
              return (
                <motion.div
                  key={resource.id}
                  variants={fadeUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <Card className="h-full bg-white/85 backdrop-blur-sm border border-white/60 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 overflow-hidden">
                    {/* Teal accent bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-secondary to-aqua group-hover:h-1.5 transition-all" />

                    <CardHeader className="pb-3 pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${colorClass}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <Badge
                          variant="outline"
                          className="border-secondary/25 text-secondary bg-secondary/8 text-xs font-semibold"
                        >
                          {resource.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl font-heading text-primary group-hover:text-secondary transition-colors line-clamp-1">
                        {resource.name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-5">
                      <CardDescription className="text-sm text-foreground/70 line-clamp-3 leading-relaxed min-h-[4rem]">
                        {resource.longDescription || resource.description}
                      </CardDescription>

                      <div className="space-y-2.5 border-t pt-4">
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(resource.location)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-sm text-muted-foreground hover:text-secondary transition-colors group/link"
                        >
                          <MapPin className="mr-2.5 h-4 w-4 shrink-0 text-secondary" />
                          <span className="truncate group-hover/link:underline">{resource.location}</span>
                        </a>
                        <a
                          href={`tel:${resource.phone.replace(/\D/g, "")}`}
                          className="flex items-center text-sm text-muted-foreground hover:text-secondary transition-colors group/link"
                        >
                          <Phone className="mr-2.5 h-4 w-4 shrink-0 text-secondary" />
                          <span className="group-hover/link:underline">{resource.phone}</span>
                        </a>
                      </div>

                      <Link href={`/resources/${resource.id}`} className="block">
                        <Button className="w-full bg-primary hover:bg-secondary text-white font-medium transition-colors shadow-sm">
                          View Organization Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <WaveDivider fill="#ffffff" />
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   HOW IT WORKS
════════════════════════════════════════════════════════ */
export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      number: "01",
      title: "Search Resources",
      description: "Find organizations by name, keyword, or specific service needed in Tampa Bay.",
      color: "from-secondary to-aqua",
    },
    {
      icon: Target,
      number: "02",
      title: "Filter by Need",
      description: "Narrow results by category, audience group, or the specific type of support you require.",
      color: "from-accent to-sunset",
    },
    {
      icon: MessageCircle,
      number: "03",
      title: "Connect Directly",
      description: "Get direct contact info, website links, and map directions for any organization.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      icon: Heart,
      number: "04",
      title: "Access Support",
      description: "Reach the services you need to improve your quality of life — all completely free.",
      color: "from-emerald-500 to-teal-400",
    },
  ];

  return (
    <section className="relative bg-white py-24 overflow-hidden">
      {/* Subtle wave pattern */}
      <div className="absolute inset-0 wave-pattern opacity-40 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Waves className="h-5 w-5 text-secondary" />
            <span className="text-sm font-bold uppercase tracking-widest text-secondary">
              Simple & Accessible
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-4">
            How This Helps Tampa
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A human-centered approach to discovering the community support you need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-white rounded-3xl border border-border/50 shadow-md hover:shadow-xl hover:shadow-primary/8 p-8 h-full transition-all duration-300">
                {/* Step number */}
                <div className="text-6xl font-black text-primary/6 font-heading absolute top-4 right-5 select-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 transition-transform`}
                >
                  <step.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-3 font-heading text-primary">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <WaveDivider fill="oklch(0.975 0.018 80)" className="mt-8" />
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   NEWS TEASER
════════════════════════════════════════════════════════ */
interface CommunityNewsItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string;
  link: string;
  date: string;
  source?: string;
  category?: string;
}

interface TampaGovNewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl?: string;
}

export function NewsTeaser() {
  const [communityNews, setCommunityNews] = useState<CommunityNewsItem[]>([]);
  const [tampaGovNews, setTampaGovNews] = useState<TampaGovNewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const [communityRes, tampaGovRes] = await Promise.all([
          fetch("/api/news/community?limit=3"),
          fetch("/api/news/tampa-gov?limit=3"),
        ]);
        const communityData = communityRes.ok ? await communityRes.json() : [];
        const tampaGovData = tampaGovRes.ok ? await tampaGovRes.json() : [];
        setCommunityNews(communityData);
        setTampaGovNews(tampaGovData);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  const combinedNews = [
    ...tampaGovNews.slice(0, 2).map((item) => ({ ...item, type: "tampa-gov" as const })),
    ...communityNews.slice(0, 1).map((item) => ({ ...item, type: "community" as const })),
  ].slice(0, 3);

  return (
    <section style={{ backgroundColor: "oklch(0.975 0.018 80)" }} className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-secondary" />
              <span className="text-sm font-bold uppercase tracking-widest text-secondary">
                Stay Informed
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-4">
              Tampa Community Pulse
            </h2>
            <p className="text-lg text-muted-foreground">
              Latest news, housing initiatives, and local successes from the Tampa Bay area.
            </p>
          </div>
          <Link href="/news">
            <Button
              variant="outline"
              className="border-secondary/30 text-secondary hover:bg-secondary hover:text-white font-semibold group"
            >
              View All News
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-secondary animate-spin" />
          </div>
        ) : combinedNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {combinedNews.map((item, idx) => (
              <motion.div
                key={item.type === "tampa-gov" ? item.link : item.id}
                variants={fadeUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
              >
                {item.type === "tampa-gov" ? (
                  <TampaGovNewsCard
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    link={item.link}
                    pubDate={item.pubDate}
                    index={idx}
                  />
                ) : (
                  <CommunityNewsCard
                    id={item.id}
                    title={item.title}
                    excerpt={item.excerpt}
                    imageUrl={item.imageUrl}
                    link={item.link}
                    date={item.date}
                    source={item.source ?? "Community"}
                    category={item.category ?? "Local"}
                  />
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/60 rounded-3xl border border-dashed border-secondary/20 backdrop-blur-sm">
            <Building2 className="h-12 w-12 text-secondary/30 mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">
              No recent Tampa news at the moment. Check back soon.
            </p>
          </div>
        )}
      </div>

      <WaveDivider fill="#ffffff" className="mt-8" />
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   EVENTS TEASER
════════════════════════════════════════════════════════ */
export function EventsTeaser() {
  const [upcomingEvents, setUpcomingEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events?limit=3")
      .then((r) => (r.ok ? r.json() : []))
      .then(setUpcomingEvents)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 flex justify-center">
          <Loader2 className="h-8 w-8 text-secondary animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 coastal-pattern opacity-30 pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-5 w-5 text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">
                Happening Now
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-4">
              Upcoming Community Events
            </h2>
            <p className="text-lg text-muted-foreground">
              Festivals, career fairs, and workshops happening in Tampa this month.
            </p>
          </div>
          <Link href="/events">
            <Button
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent hover:text-white font-semibold group"
            >
              Full Calendar
              <CalendarIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              variants={fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full border-l-4 border-l-accent bg-white shadow-md hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-3">
                    <Badge className="bg-accent/12 text-accent border-accent/20 border font-semibold text-xs">
                      {event.category}
                    </Badge>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                      {event.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-primary leading-tight">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-accent shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-accent shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  </div>
                  <Link href="/events">
                    <Button
                      variant="ghost"
                      className="p-0 h-auto text-accent hover:text-accent/80 font-bold text-sm group"
                    >
                      Event details
                      <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <WaveDivider fill="oklch(0.975 0.018 80)" className="mt-8" />
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   INSIGHTS PREVIEW
════════════════════════════════════════════════════════ */
export function InsightsPreview() {
  const [insights, setInsights] = useState([
    { label: "Food Assistance", value: "34%", trend: "up", width: "34%" },
    { label: "Housing Support", value: "28%", trend: "stable", width: "28%" },
    { label: "Mental Health", value: "19%", trend: "up", width: "19%" },
    { label: "Youth Programs", value: "12%", trend: "down", width: "12%" },
  ]);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalEvents: 0,
    totalNews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/insights?limit=4")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) {
          setInsights(data.trends);
          setStats(data.stats);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section style={{ backgroundColor: "oklch(0.975 0.018 80)" }} className="py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: trend bars */}
          <div className="lg:w-1/2">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 border font-semibold">
              <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
              Live Community Trends
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-heading text-primary mb-4">
              Where Tampa Needs Us Most
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              We anonymously track resource searches to help local leaders identify
              where the community needs the most support — and act on it.
            </p>

            <div className="space-y-6">
              {insights.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-primary">{item.label}</span>
                    <span className="text-muted-foreground">{item.value} of searches</span>
                  </div>
                  <div className="h-2.5 w-full bg-white rounded-full overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: item.value }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: idx * 0.12, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-secondary to-aqua rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link href="/insights">
              <Button
                variant="link"
                className="mt-8 p-0 text-secondary h-auto font-bold text-base group"
              >
                View Detailed Trends
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Right: stat cards */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <motion.div whileHover={{ y: -6 }}>
              <Card className="p-8 flex flex-col items-center justify-center text-center bg-white border-border/40 shadow-lg hover:shadow-xl transition-all">
                <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Search className="h-7 w-7 text-secondary" />
                </div>
                <div className="text-4xl font-black text-primary mb-1 font-heading">
                  {stats.totalResources.toLocaleString() || "—"}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Total Resources
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -6 }}>
              <Card className="p-8 flex flex-col items-center justify-center text-center bg-white border-border/40 shadow-lg hover:shadow-xl transition-all">
                <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                  <CalendarIcon className="h-7 w-7 text-accent" />
                </div>
                <div className="text-4xl font-black text-primary mb-1 font-heading">
                  {stats.totalEvents || "—"}
                </div>
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Upcoming Events
                </div>
              </Card>
            </motion.div>

            <motion.div whileHover={{ y: -6 }} className="col-span-2">
              <Card className="p-8 flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-6 bg-gradient-to-br from-primary to-secondary text-white border-none shadow-xl">
                <div className="h-16 w-16 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <div>
                  <div className="text-4xl font-black mb-1 font-heading">Tampa Bay</div>
                  <div className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                    Built for Hillsborough County Residents
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      <WaveDivider fill="oklch(0.235 0.068 213)" className="mt-8" />
    </section>
  );
}

/* ════════════════════════════════════════════════════════
   CTA SECTION
════════════════════════════════════════════════════════ */
export function CTASection() {
  return (
    <section className="relative py-28 bg-primary overflow-hidden">
      {/* Animated background accents */}
      <div className="absolute top-0 right-0 h-80 w-80 bg-secondary/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-80 w-80 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute inset-0 coastal-pattern opacity-10 pointer-events-none" />

      <div className="relative container mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-white/80 text-sm font-medium mb-8">
          <Heart className="h-4 w-4 text-accent fill-accent" />
          Help Build the Hub
        </div>

        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-heading text-white mb-6 max-w-3xl mx-auto leading-tight">
          Know a Resource That Should Be Listed?
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
          Our directory is only as strong as our community. If you know of a resource,
          program, or nonprofit that helps Tampa residents — let us know.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/submit">
            <Button
              size="lg"
              className="h-14 px-10 text-lg bg-accent hover:bg-accent/90 text-white border-none shadow-2xl shadow-accent/20 font-bold"
            >
              Submit a New Resource
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/directory">
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg text-white border-white/30 hover:bg-white/10 font-semibold"
            >
              Browse Directory
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: ShieldCheck, label: "Manually Verified", desc: "Every listing reviewed by our team" },
            { icon: Heart, label: "Always Free", desc: "No cost to access or submit resources" },
            { icon: Users, label: "Community Driven", desc: "Built by and for Tampa residents" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-3 bg-white/8 border border-white/12 rounded-2xl p-6"
            >
              <item.icon className="h-7 w-7 text-secondary" />
              <div className="text-white font-bold text-sm">{item.label}</div>
              <div className="text-white/55 text-xs text-center">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

