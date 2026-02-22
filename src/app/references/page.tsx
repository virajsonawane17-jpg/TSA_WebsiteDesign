"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, FileText, ExternalLink, Code, Database, Globe, Users, Zap, Image, Link as LinkIcon, Shield } from "lucide-react";

interface Source {
  title: string;
  url: string;
  description: string;
  usage: string;
  permission: string;
  license?: string;
  category: "framework" | "library" | "api" | "image" | "documentation" | "external" | "database";
}

// Frameworks & Core Technologies
const frameworks: Source[] = [
  {
    title: "Next.js 15.5.7",
    url: "https://nextjs.org/",
    description: "React framework for production with App Router, Server Components, and optimized performance",
    usage: "Core framework used for routing, server-side rendering, API routes, and static site generation. Powers all pages and components.",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "framework",
  },
  {
    title: "React 19.2.0",
    url: "https://react.dev/",
    description: "JavaScript library for building user interfaces with components and hooks",
    usage: "Primary UI library for all interactive components, state management, and client-side rendering",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "framework",
  },
  {
    title: "TypeScript 5",
    url: "https://www.typescriptlang.org/",
    description: "Typed superset of JavaScript that compiles to plain JavaScript",
    usage: "Used throughout the entire codebase for type safety, interfaces, and improved developer experience",
    permission: "Apache License 2.0 - Free for commercial and personal use",
    license: "Apache-2.0",
    category: "framework",
  },
  {
    title: "Node.js",
    url: "https://nodejs.org/",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    usage: "Runtime environment for Next.js development server and build processes",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "framework",
  },
];

// Libraries & Dependencies
const libraries: Source[] = [
  {
    title: "Tailwind CSS 4",
    url: "https://tailwindcss.com/",
    description: "Utility-first CSS framework for rapid UI development",
    usage: "Primary styling system for all components, layouts, and responsive design throughout the application",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Framer Motion 12.23.24",
    url: "https://www.framer.com/motion/",
    description: "Production-ready motion library for React with declarative animations",
    usage: "Used for page transitions, component animations, hover effects, and smooth scrolling animations across all pages",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Radix UI Components",
    url: "https://www.radix-ui.com/",
    description: "Unstyled, accessible component primitives for building design systems",
    usage: "Base components for Select, Dialog, Dropdown, Tooltip, Accordion, and other accessible UI primitives",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Shadcn UI",
    url: "https://ui.shadcn.com/",
    description: "Re-usable components built with Radix UI and Tailwind CSS",
    usage: "Component library providing Card, Button, Badge, Input, Select, and other UI components used throughout the site",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Lucide React 0.554.0",
    url: "https://lucide.dev/",
    description: "Beautiful & consistent icon toolkit for React",
    usage: "All icons throughout the application including navigation icons, feature icons, and UI element icons",
    permission: "ISC License - Free for commercial and personal use",
    license: "ISC",
    category: "library",
  },
  {
    title: "Supabase Client 2.93.1",
    url: "https://supabase.com/",
    description: "Open source Firebase alternative providing database, authentication, and storage",
    usage: "Backend database for storing resources, events, and news. Used for data persistence and retrieval",
    permission: "Apache License 2.0 - Free tier available for commercial use",
    license: "Apache-2.0",
    category: "database",
  },
  {
    title: "Supabase SSR 0.8.0",
    url: "https://supabase.com/docs/guides/auth/server-side/nextjs",
    description: "Server-side rendering utilities for Supabase with Next.js",
    usage: "Server-side authentication and data fetching for secure API routes and server components",
    permission: "Apache License 2.0 - Free for commercial and personal use",
    license: "Apache-2.0",
    category: "library",
  },
  {
    title: "Recharts 2.15.4",
    url: "https://recharts.org/",
    description: "Composable charting library built on React and D3",
    usage: "Data visualization charts on the Insights page including bar charts, pie charts, and trend visualizations",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Leaflet 1.9.4 & React Leaflet 5.0.0",
    url: "https://leafletjs.com/",
    description: "Open-source JavaScript library for mobile-friendly interactive maps",
    usage: "Interactive map component on Directory page showing resource locations with markers and popups",
    permission: "BSD 2-Clause License - Free for commercial and personal use",
    license: "BSD-2-Clause",
    category: "library",
  },
  {
    title: "React Hook Form 7.66.1",
    url: "https://react-hook-form.com/",
    description: "Performant, flexible and extensible forms with easy-to-use validation",
    usage: "Form handling and validation for resource submission forms and user input forms",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Zod 4.1.12",
    url: "https://zod.dev/",
    description: "TypeScript-first schema validation library",
    usage: "Form validation schemas and runtime type checking for API responses and user inputs",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Date-fns 4.1.0",
    url: "https://date-fns.org/",
    description: "Modern JavaScript date utility library",
    usage: "Date formatting and manipulation for events, news articles, and timestamps throughout the application",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Class Variance Authority 0.7.1",
    url: "https://cva.style/",
    description: "Build type-safe component APIs with variants",
    usage: "Component variant management for buttons, badges, and other UI components with type-safe props",
    permission: "Apache License 2.0 - Free for commercial and personal use",
    license: "Apache-2.0",
    category: "library",
  },
  {
    title: "Tailwind Merge 3.4.0",
    url: "https://github.com/dcastil/tailwind-merge",
    description: "Merge Tailwind CSS classes without style conflicts",
    usage: "Utility function for combining Tailwind classes safely in component props and conditional styling",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "CLSX 2.1.1",
    url: "https://github.com/lukeed/clsx",
    description: "Tiny utility for constructing className strings conditionally",
    usage: "Conditional class name generation for components based on props and state",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "CMDK 1.1.1",
    url: "https://cmdk.paco.me/",
    description: "Fast, composable, unstyled command menu for React",
    usage: "Command palette component for search and navigation (if implemented)",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Embla Carousel React 8.6.0",
    url: "https://www.embla-carousel.com/",
    description: "Lightweight carousel library with fluid scrolling",
    usage: "Image carousels and content sliders for featured content displays",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Sonner 2.0.7",
    url: "https://sonner.emilkowal.ski/",
    description: "Toast notifications for React",
    usage: "Toast notifications for user feedback, success messages, and error alerts",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Vaul 1.1.2",
    url: "https://vaul.emilkowal.ski/",
    description: "Unstyled drawer component for React",
    usage: "Drawer/sheet components for mobile navigation and side panels",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Next Themes 0.4.6",
    url: "https://github.com/pacocoursey/next-themes",
    description: "Perfect dark mode in 2 lines of code",
    usage: "Theme management for dark/light mode switching (if implemented)",
    permission: "MIT License - Free for commercial and personal use",
    license: "MIT",
    category: "library",
  },
  {
    title: "Orchids Visual Edits 1.0.12",
    url: "https://orchids.dev/",
    description: "Visual editing tools for Next.js",
    usage: "Development tool for visual editing capabilities in Next.js",
    permission: "Commercial License - Used under development license",
    license: "Commercial",
    category: "library",
  },
];

// Custom Components & Features
const customComponents: Source[] = [
  {
    title: "NewsImage Component",
    url: "N/A - Custom component",
    description: "Custom React component for handling news article images with fallback support",
    usage: "Used in NewsCard, TampaGovNewsCard, and CommunityNewsCard components. Handles image loading errors and displays fallback images when primary images fail. Located in src/components/news-image.tsx",
    permission: "Original work - Created by project team. No external dependencies",
    license: "Project-owned",
    category: "library",
  },
  {
    title: "NewsCard Components",
    url: "N/A - Custom components",
    description: "Reusable card components for displaying news articles with consistent styling and image handling",
    usage: "NewsCard (src/components/news-card.tsx), TampaGovNewsCard (src/components/tampa-gov-news-card.tsx), and CommunityNewsCard (src/components/community-news-card.tsx) used throughout News page and homepage teaser",
    permission: "Original work - Created by project team",
    license: "Project-owned",
    category: "library",
  },
  {
    title: "Tel: Protocol Links",
    url: "N/A - HTML standard",
    description: "HTML tel: protocol for clickable phone number links",
    usage: "Used throughout directory page, resource detail pages, and featured resources to make phone numbers clickable. Opens device dialer on mobile or calling app on desktop. Format: tel:{phone_number}",
    permission: "HTML standard - No license required. Built-in browser feature",
    license: "N/A - HTML Standard",
    category: "library",
  },
];

// APIs & Data Sources
const apis: Source[] = [
  {
    title: "City of Tampa Events API",
    url: "https://www.tampa.gov/mobile-feeds/events/all",
    description: "Official City of Tampa public events API providing event data in JSON format",
    usage: "Fetches public events from Tampa.gov for display on Events page. Used in src/lib/tampa-api.ts with 15-minute cache revalidation",
    permission: "Public API - No API key required. Free for public use. Data is public domain",
    license: "Public Domain",
    category: "api",
  },
  {
    title: "City of Tampa News RSS Feed",
    url: "https://tampa.gov/news/feed",
    description: "RSS feed for City of Tampa news and press releases",
    usage: "Parses RSS feed to display official Tampa news on News page. Used in src/lib/tampa-api.ts with 1-hour cache revalidation",
    permission: "Public RSS Feed - Free for public use. Content is public domain",
    license: "Public Domain",
    category: "api",
  },
  {
    title: "Google Maps Search API",
    url: "https://developers.google.com/maps/documentation/urls/get-started",
    description: "Google Maps URL-based search API for generating map links",
    usage: "Used to create clickable address links that open Google Maps with resource locations. Implemented in directory page, resource detail pages, and featured resources section. Format: https://www.google.com/maps/search/?api=1&query={encoded_address}",
    permission: "Public API - No API key required for URL-based searches. Free for public use. Subject to Google Maps Platform Terms of Service",
    license: "Google Maps Platform Terms of Service",
    category: "api",
  },
  {
    title: "OpenStreetMap Tile Layer",
    url: "https://www.openstreetmap.org/",
    description: "Open-source mapping data and tile service",
    usage: "Provides map tiles for Leaflet map component on Directory page. Used via TileLayer component in src/components/tampa-resource-map.tsx. Attribution required per OSM copyright policy",
    permission: "Open Database License (ODbL) - Free for commercial and personal use. Attribution required",
    license: "ODbL",
    category: "api",
  },
  {
    title: "OpenWeatherMap API",
    url: "https://openweathermap.org/api",
    description: "Weather data API providing current weather conditions",
    usage: "Fetches Tampa weather data for weather widget. Used in src/lib/api.ts. Requires API key (NEXT_PUBLIC_OPENWEATHER_API_KEY)",
    permission: "Free tier available - 60 calls/minute. Attribution required. Used for non-commercial educational project",
    license: "CC BY-SA 4.0 (with attribution)",
    category: "api",
  },
  {
    title: "NewsData.io API",
    url: "https://newsdata.io/",
    description: "News aggregation API providing news articles from various sources",
    usage: "Fetches Tampa-related news articles for News page. Used in src/lib/api.ts with fallback API key for development",
    permission: "Free tier available - 200 requests/day. Used for educational/non-commercial purposes",
    license: "API Terms of Service",
    category: "api",
  },
];

// Image Sources & Media
const imageSources: Source[] = [
  {
    title: "Beach Background Image",
    url: "N/A - Project asset",
    description: "Aerial beach photograph used as homepage hero background",
    usage: "Homepage hero section background image. Stored in public/beach-background.png. Used in src/components/sections.tsx Hero component with overlay for text readability",
    permission: "Project-owned image - Uploaded by project team. Used as background with overlay",
    license: "Project-owned",
    category: "image",
  },
  {
    title: "Picsum Photos",
    url: "https://picsum.photos/",
    description: "Lorem Ipsum for photos - placeholder image service",
    usage: "Placeholder images for events page when event images are not available. Used in src/app/events/events-content.tsx with deterministic seeds based on category",
    permission: "Free to use - No attribution required. Images are from Unsplash with permission",
    license: "Unsplash License",
    category: "image",
  },
  {
    title: "Unsplash",
    url: "https://unsplash.com/",
    description: "High-quality free stock photos",
    usage: "Hero image on Spotlight page (photo-1488521787991-ed7bbaae773c). Used via direct Unsplash CDN link. Also used as fallback images in TampaGovNewsCard (photo-1569025743873-ea3e9ce9c8ef) and CommunityNewsCard (photo-1504711432869-efd5973e8d48) components when primary news images fail to load",
    permission: "Unsplash License - Free for commercial and personal use. No attribution required but appreciated",
    license: "Unsplash License",
    category: "image",
  },
  {
    title: "Supabase Storage",
    url: "https://supabase.com/storage",
    description: "File storage service provided by Supabase",
    usage: "Hosts uploaded images for resources, events, and news articles. Images stored at slelguoygbfzlpylpxfs.supabase.co. Also used as default placeholder image for news items when images fail to load. Homepage Hero gallery displays 9 Tampa community images (Image-1 through image-9) showcasing city landmarks, waterfront scenes, and community spaces",
    permission: "Supabase Storage - Free tier available. Images uploaded by project team",
    license: "Project-owned content",
    category: "image",
  },
  {
    title: "Homepage Gallery Images",
    url: "N/A - Supabase Storage",
    description: "Collection of 9 Tampa community photographs displayed in homepage Hero gallery",
    usage: "Gallery images in Hero section showcasing Tampa landmarks, waterfront scenes, bridges, cityscapes, and community spaces. Images include: Tampa skyline at night, waterfront walkways, bridges (including purple-lit bridge), city murals, Gasparilla ship, and urban scenes. Displayed in animated gallery container on homepage (src/components/sections.tsx Hero component)",
    permission: "Project-owned images - Uploaded to Supabase Storage by project team. All images depict Tampa, Florida locations and landmarks",
    license: "Project-owned",
    category: "image",
  },
  {
    title: "News Image Fallback - Supabase Default",
    url: "N/A - Supabase Storage",
    description: "Default fallback image used when news article images fail to load",
    usage: "Used as DEFAULT_PLACEHOLDER in NewsImage component (src/components/news-image.tsx). Falls back to Image-1-1769318907736.jpg from Supabase Storage when primary news images fail to load. Also used as fallback in NewsTeaser component (src/components/sections.tsx) and NewsCard component",
    permission: "Project-owned image - Stored in Supabase Storage. Used as fallback/placeholder",
    license: "Project-owned",
    category: "image",
  },
  {
    title: "News Image Fallback - Unsplash",
    url: "https://unsplash.com/",
    description: "Unsplash images used as fallback for news components",
    usage: "Used as fallbackSrc in TampaGovNewsCard (photo-1569025743873-ea3e9ce9c8ef) and CommunityNewsCard (photo-1504711432869-efd5973e8d48) components. These Unsplash images are displayed when primary news images fail to load or are unavailable",
    permission: "Unsplash License - Free for commercial and personal use. No attribution required but appreciated",
    license: "Unsplash License",
    category: "image",
  },
  {
    title: "Inline SVG Fallback",
    url: "N/A - Generated inline",
    description: "Custom SVG data URI for event image fallbacks",
    usage: "Fallback image when event images and placeholder images fail to load. Generated inline in src/app/events/events-content.tsx",
    permission: "Original work - Created by project team. No external source",
    license: "Project-owned",
    category: "image",
  },
];

// External Links & Resources
const externalLinks: Source[] = [
  {
    title: "Feeding Tampa Bay",
    url: "https://feedingtampabay.org",
    description: "Nonprofit organization providing food assistance",
    usage: "Resource link in directory - Listed as community resource for food assistance",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Metropolitan Ministries",
    url: "https://www.metromin.org",
    description: "Nonprofit providing services to homeless and at-risk families",
    usage: "Resource link in directory - Listed as community resource",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "IBIS Healthcare",
    url: "https://ibishealthcare.org",
    description: "Healthcare services provider",
    usage: "Resource link in directory - Listed as community resource",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Crisis Center of Tampa Bay",
    url: "https://www.crisiscenter.com",
    description: "24/7 crisis intervention and counseling services",
    usage: "Resource link in directory - Listed as emergency resource",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Boys & Girls Clubs of Tampa",
    url: "https://www.bgctampa.org",
    description: "Youth development organization",
    usage: "Resource link in directory - Listed as community resource",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Gasparilla Pirate Fest",
    url: "https://gasparillapiratefest.com",
    description: "Annual Tampa pirate festival event",
    usage: "Event link in events directory - Featured event with images",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Tampa Bay Times",
    url: "https://www.tampabay.com",
    description: "Local news publication",
    usage: "News source link in news articles",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "WFLA News",
    url: "https://www.wfla.com",
    description: "Local news station",
    usage: "News source link in news articles",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Creative Loafing Tampa",
    url: "https://www.cltampa.com",
    description: "Local alternative news publication",
    usage: "News source link in news articles",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
  {
    title: "Tampa Patch",
    url: "https://patch.com/florida/tampa",
    description: "Local news and community information",
    usage: "News source link in news articles",
    permission: "Public website - Link provided for informational purposes",
    license: "N/A",
    category: "external",
  },
];

// Documentation & Research
const documentation: Source[] = [
  {
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description: "Official Next.js 15 documentation for App Router, Server Components, and API routes",
    usage: "Primary reference for Next.js features, routing, server components, and best practices",
    permission: "MIT License - Documentation is freely available",
    license: "MIT",
    category: "documentation",
  },
  {
    title: "React Documentation",
    url: "https://react.dev",
    description: "Official React documentation for hooks, components, and patterns",
    usage: "Reference for React hooks, component patterns, state management, and best practices",
    permission: "MIT License - Documentation is freely available",
    license: "MIT",
    category: "documentation",
  },
  {
    title: "TypeScript Documentation",
    url: "https://www.typescriptlang.org/docs/",
    description: "TypeScript language documentation and handbook",
    usage: "Reference for TypeScript syntax, types, interfaces, and advanced features",
    permission: "Apache License 2.0 - Documentation is freely available",
    license: "Apache-2.0",
    category: "documentation",
  },
  {
    title: "Tailwind CSS Documentation",
    url: "https://tailwindcss.com/docs",
    description: "Complete Tailwind CSS utility class reference and guides",
    usage: "Reference for utility classes, responsive design, custom configuration, and styling patterns",
    permission: "MIT License - Documentation is freely available",
    license: "MIT",
    category: "documentation",
  },
  {
    title: "Supabase Documentation",
    url: "https://supabase.com/docs",
    description: "Supabase guides for database, authentication, storage, and real-time features",
    usage: "Reference for database setup, queries, authentication, and storage configuration",
    permission: "Apache License 2.0 - Documentation is freely available",
    license: "Apache-2.0",
    category: "documentation",
  },
  {
    title: "City of Tampa RSS Feeds Documentation",
    url: "https://www.tampa.gov/info/rss-feeds",
    description: "Official documentation for Tampa.gov RSS feeds and APIs",
    usage: "Reference for Tampa.gov API endpoints, event types, and RSS feed structure",
    permission: "Public documentation - Freely available",
    license: "Public Domain",
    category: "documentation",
  },
  {
    title: "Radix UI Documentation",
    url: "https://www.radix-ui.com/docs",
    description: "Component API documentation for Radix UI primitives",
    usage: "Reference for accessible component implementation, props, and customization",
    permission: "MIT License - Documentation is freely available",
    license: "MIT",
    category: "documentation",
  },
  {
    title: "Shadcn UI Documentation",
    url: "https://ui.shadcn.com/docs",
    description: "Component documentation and installation guide",
    usage: "Reference for component usage, customization, and installation",
    permission: "MIT License - Documentation is freely available",
    license: "MIT",
    category: "documentation",
  },
];

const categoryIcons = {
  framework: Code,
  library: Code,
  api: Globe,
  image: Image,
  documentation: FileText,
  external: LinkIcon,
  database: Database,
  development: Code,
  design: Zap,
  research: BookOpen,
  testing: Database,
  deployment: Globe,
};

const categoryColors = {
  framework: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  library: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  api: "bg-green-500/10 text-green-600 border-green-500/20",
  image: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  documentation: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  external: "bg-gray-500/10 text-gray-600 border-gray-500/20",
  database: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
  development: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  design: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  research: "bg-green-500/10 text-green-600 border-green-500/20",
  testing: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  deployment: "bg-pink-500/10 text-pink-600 border-pink-500/20",
};

const allSources = [
  ...frameworks,
  ...libraries,
  ...customComponents,
  ...apis,
  ...imageSources,
  ...externalLinks,
  ...documentation,
];

export default function ReferencesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-primary pt-16 pb-32 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10">
            <BookOpen className="h-96 w-96 -mr-20 -mt-20" />
          </div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <Badge className="bg-secondary text-white border-none mb-6">TSA Project Documentation</Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6 max-w-3xl">
              Complete Source References
            </h1>
            <p className="text-xl text-white/70 max-w-2xl font-sans leading-relaxed">
              Comprehensive documentation of all sources, frameworks, libraries, APIs, images, and resources used in the Tampa Community Resource Hub project, including usage and permissions.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 -mt-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
            {/* Sources Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Frameworks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Code className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">Frameworks & Core Technologies</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Core technologies and runtime environments
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="space-y-6">
                      {frameworks.map((source, index) => {
                        const Icon = categoryIcons[source.category];
                        return (
                          <motion.div
                            key={source.url}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-blue-600" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-primary text-lg mb-1">{source.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${categoryColors[source.category]} border text-xs shrink-0`}>
                                      {source.category}
                                    </Badge>
                                  </div>
                                  <div className="pl-14 space-y-2">
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Usage:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.usage}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Permission & License:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.permission}</p>
                                      {source.license && (
                                        <Badge variant="outline" className="mt-2 text-xs">
                                          {source.license}
                                        </Badge>
                                      )}
                                    </div>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors mt-2"
                                    >
                                      Visit Source <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Libraries */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Code className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">Libraries & Dependencies</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          NPM packages and third-party libraries ({libraries.length} total)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="space-y-6">
                      {libraries.map((source, index) => {
                        const Icon = categoryIcons[source.category];
                        return (
                          <motion.div
                            key={source.url}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                          >
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                      <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-purple-600" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-primary text-lg mb-1">{source.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${categoryColors[source.category]} border text-xs shrink-0`}>
                                      {source.category}
                                    </Badge>
                                  </div>
                                  <div className="pl-14 space-y-2">
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Usage:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.usage}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Permission & License:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.permission}</p>
                                      {source.license && (
                                        <Badge variant="outline" className="mt-2 text-xs">
                                          {source.license}
                                        </Badge>
                                      )}
                                    </div>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors mt-2"
                                    >
                                      Visit Source <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* APIs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Globe className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">APIs & Data Sources</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          External APIs and data feeds
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="space-y-6">
                      {apis.map((source, index) => {
                        const Icon = categoryIcons[source.category];
                        return (
                          <motion.div
                            key={source.url}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                      <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-green-600" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-primary text-lg mb-1">{source.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${categoryColors[source.category]} border text-xs shrink-0`}>
                                      {source.category}
                                    </Badge>
                                  </div>
                                  <div className="pl-14 space-y-2">
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Usage:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.usage}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Permission & License:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.permission}</p>
                                      {source.license && (
                                        <Badge variant="outline" className="mt-2 text-xs">
                                          {source.license}
                                        </Badge>
                                      )}
                                    </div>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors mt-2"
                                    >
                                      Visit Source <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Image Sources */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-pink-500/10 flex items-center justify-center">
                        <Image className="h-6 w-6 text-pink-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">Image Sources & Media</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Image services and media resources
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="space-y-6">
                      {imageSources.map((source, index) => {
                        const Icon = categoryIcons[source.category];
                        return (
                          <motion.div
                            key={source.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                      <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-pink-600" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-primary text-lg mb-1">{source.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${categoryColors[source.category]} border text-xs shrink-0`}>
                                      {source.category}
                                    </Badge>
                                  </div>
                                  <div className="pl-14 space-y-2">
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Usage:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.usage}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Permission & License:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.permission}</p>
                                      {source.license && (
                                        <Badge variant="outline" className="mt-2 text-xs">
                                          {source.license}
                                        </Badge>
                                      )}
                                    </div>
                                    {source.url !== "N/A - Generated inline" && source.url !== "N/A - Supabase Storage" && source.url !== "N/A - Project asset" && (
                                      <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors mt-2"
                                      >
                                        Visit Source <ExternalLink className="h-3 w-3" />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Documentation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
                        <FileText className="h-6 w-6 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">Documentation & Research</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Reference documentation and guides
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="space-y-6">
                      {documentation.map((source, index) => {
                        const Icon = categoryIcons[source.category];
                        return (
                          <motion.div
                            key={source.url}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                      <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-orange-600" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-primary text-lg mb-1">{source.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${categoryColors[source.category]} border text-xs shrink-0`}>
                                      {source.category}
                                    </Badge>
                                  </div>
                                  <div className="pl-14 space-y-2">
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Usage:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.usage}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Permission & License:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.permission}</p>
                                      {source.license && (
                                        <Badge variant="outline" className="mt-2 text-xs">
                                          {source.license}
                                        </Badge>
                                      )}
                                    </div>
                                    <a
                                      href={source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors mt-2"
                                    >
                                      Visit Source <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Custom Components */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <Code className="h-6 w-6 text-indigo-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">Custom Components & Features</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Project-specific components and implementations ({customComponents.length} total)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <div className="space-y-6">
                      {customComponents.map((source, index) => {
                        const Icon = categoryIcons[source.category];
                        return (
                          <motion.div
                            key={source.title}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Card className="border-border/40 hover:shadow-lg transition-all duration-300">
                              <CardContent className="p-6">
                                <div className="space-y-4">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-4 flex-grow">
                                      <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                                        <Icon className="h-5 w-5 text-indigo-600" />
                                      </div>
                                      <div className="flex-grow min-w-0">
                                        <h3 className="font-bold text-primary text-lg mb-1">{source.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-2">{source.description}</p>
                                      </div>
                                    </div>
                                    <Badge className={`${categoryColors[source.category]} border text-xs shrink-0`}>
                                      {source.category}
                                    </Badge>
                                  </div>
                                  <div className="pl-14 space-y-2">
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Usage:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.usage}</p>
                                    </div>
                                    <div>
                                      <p className="text-xs font-semibold text-primary mb-1">Permission & License:</p>
                                      <p className="text-sm text-muted-foreground leading-relaxed">{source.permission}</p>
                                      {source.license && source.license !== "N/A - HTML Standard" && (
                                        <Badge variant="outline" className="mt-2 text-xs">
                                          {source.license}
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* External Links Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white border-b border-border/40 p-8 pb-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-12 w-12 rounded-xl bg-gray-500/10 flex items-center justify-center">
                        <LinkIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-heading text-primary">External Resource Links</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                          Community organization and news source links ({externalLinks.length} total)
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-8 bg-white">
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                      The application includes links to {externalLinks.length} external resources including nonprofit organizations, 
                      community services, news sources, and event websites. All links are provided for informational purposes 
                      and point to publicly available websites. These organizations maintain their own websites and content policies.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {externalLinks.map((source, index) => (
                        <motion.div
                          key={source.url}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                        >
                          <Card className="border-border/40 hover:shadow-md transition-all">
                            <CardContent className="p-4">
                              <h4 className="font-semibold text-primary text-sm mb-1">{source.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{source.description}</p>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-medium text-secondary hover:text-secondary/80 transition-colors"
                              >
                                Visit <ExternalLink className="h-3 w-3" />
                              </a>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Work Log Section - PDF Embed */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-accent p-6 text-white">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6" />
                      <CardTitle className="text-xl font-heading">Development Work Log</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <div className="w-full h-[800px] relative">
                      <iframe
                        src="/work-log.pdf"
                        className="w-full h-full border-0 rounded-b-3xl"
                        title="Development Work Log PDF"
                        style={{ minHeight: "800px" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Copyright Checklist Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl overflow-hidden">
                  <CardHeader className="bg-accent p-6 text-white">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6" />
                      <CardTitle className="text-xl font-heading">Copyright Checklist</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <div className="w-full h-[800px] relative">
                      <iframe
                        src="/copyright-checklist.pdf"
                        className="w-full h-full border-0 rounded-b-3xl"
                        title="Copyright Checklist PDF"
                        style={{ minHeight: "800px" }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl p-8 bg-primary text-white">
                  <Shield className="h-10 w-10 text-secondary mb-6" />
                  <h3 className="text-2xl font-bold font-heading mb-4">Source Summary</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <p className="font-semibold mb-2">Total Sources Documented:</p>
                      <p className="text-white/80">{allSources.length} sources</p>
                    </div>
                    <div>
                      <p className="font-semibold mb-2">Breakdown:</p>
                      <ul className="text-white/80 space-y-1 ml-4">
                        <li>• {frameworks.length} Frameworks</li>
                        <li>• {libraries.length} Libraries</li>
                        <li>• {customComponents.length} Custom Components</li>
                        <li>• {apis.length} APIs</li>
                        <li>• {imageSources.length} Image Sources</li>
                        <li>• {documentation.length} Documentation</li>
                        <li>• {externalLinks.length} External Links</li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-white/20">
                      <p className="text-white/70 text-xs leading-relaxed">
                        All sources have been properly cited with usage descriptions and permission/licenses documented. 
                        This project complies with TSA requirements for source attribution.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Project Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card className="rounded-3xl border-border/40 shadow-xl p-8 bg-secondary text-white">
                  <Users className="h-10 w-10 text-white mb-6" />
                  <h3 className="text-2xl font-bold font-heading mb-4">TSA Project</h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-6">
                    This project was developed for the Technology Student Association (TSA) competition, showcasing
                    modern web development practices and civic technology solutions for the Tampa community.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Zap className="h-4 w-4 text-white" />
                      <span>Next.js 15 with App Router</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Code className="h-4 w-4 text-white" />
                      <span>TypeScript & React 19</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Database className="h-4 w-4 text-white" />
                      <span>Supabase Backend</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
