"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Phone, 
  AlertCircle, 
  ShieldAlert, 
  Home, 
  HeartPulse, 
  Soup,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  LifeBuoy
} from "lucide-react";
import Link from "next/link";

export default function EmergencyPage() {
  const hotlines = [
    { name: "Suicide & Crisis Lifeline", number: "988", telNumber: "988", description: "24/7 free and confidential support for people in distress.", color: "bg-orange-600" },
    { name: "Hillsborough County 211", number: "2-1-1", telNumber: "211", description: "The gateway to health and human services in our community.", color: "bg-primary" },
    { name: "Domestic Violence Hotline", number: "1-800-500-1119", telNumber: "18005001119", description: "The Spring of Tampa Bay - 24/7 crisis support.", color: "bg-secondary" },
    { name: "Florida Abuse Hotline", number: "1-800-962-2873", telNumber: "18009622873", description: "Report child or elder abuse or neglect.", color: "bg-primary" }
  ];

  const categories = [
    {
      title: "Immediate Crisis Support",
      icon: ShieldAlert,
      items: [
        { name: "Crisis Center of Tampa Bay", action: "Call 211", link: "/resources/5", phone: "211" },
        { name: "ACT (Abuse Counseling)", action: "Call (813) 935-2015", link: "tel:8139352015", phone: "(813) 935-2015" },
        { name: "Mobile Crisis Unit", action: "Call (813) 272-2958", link: "tel:8132722958", phone: "(813) 272-2958" }
      ] as Array<{ name: string; action: string; link: string; phone?: string }>
    },
    {
      title: "Emergency Shelter",
      icon: Home,
      items: [
        { name: "Metropolitan Ministries", action: "View Shelter", link: "/resources/2" },
        { name: "Salvation Army Tampa", action: "Call (813) 226-0055", link: "tel:8132260055", phone: "(813) 226-0055" },
        { name: "St. Vincent de Paul", action: "Call (813) 977-7057", link: "tel:8139777057", phone: "(813) 977-7057" }
      ] as Array<{ name: string; action: string; link: string; phone?: string }>
    },
    {
      title: "Food Emergency",
      icon: Soup,
      items: [
        { name: "Feeding Tampa Bay", action: "Find Pantry", link: "/resources/1" },
        { name: "St. Peter Claver", action: "Call (813) 223-7098", link: "tel:8132237098", phone: "(813) 223-7098" },
        { name: "Tampa Crossroads", action: "Call (813) 238-8557", link: "tel:8132388557", phone: "(813) 238-8557" }
      ] as Array<{ name: string; action: string; link: string; phone?: string }>
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        {/* Urgent Header */}
        <section className="bg-orange-600 py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="h-10 w-10 animate-pulse" />
                <Badge className="bg-white text-orange-600 border-none font-bold">Priority Support</Badge>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mb-6">
                Emergency & Crisis Resources
              </h1>
              <p className="text-xl text-white/90 leading-relaxed font-sans">
                If you are experiencing an immediate life-threatening emergency, please dial <b>911</b>. For all other urgent support, use the verified hotlines below.
              </p>
            </div>
          </div>
        </section>

        {/* Hotlines Grid */}
        <section className="container mx-auto px-4 sm:px-6 -mt-12 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hotlines.map((hotline, i) => (
              <Card key={i} className="border-none shadow-2xl overflow-hidden rounded-3xl bg-white group hover:-translate-y-2 transition-transform">
                <div className={`h-2 ${hotline.color}`} />
                <CardContent className="p-8">
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">{hotline.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-4 font-heading">{hotline.number}</div>
                  <p className="text-sm text-foreground/70 mb-8 leading-relaxed">
                    {hotline.description}
                  </p>
                  <a href={`tel:${hotline.telNumber}`} className="block">
                    <Button className={`w-full h-12 font-bold ${hotline.color} text-white hover:opacity-90`}>
                      <Phone className="mr-2 h-4 w-4" /> Call Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-24 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {categories.map((cat, i) => (
              <div key={i} className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
                    <cat.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <h2 className="text-2xl font-bold font-heading text-primary">{cat.title}</h2>
                </div>
                <div className="space-y-4">
                  {cat.items.map((item, j) => (
                    <Card className="border-border/40 hover:border-orange-200 transition-colors shadow-sm group">
                      <CardContent className="p-6 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-primary group-hover:text-orange-600 transition-colors">{item.name}</h4>
                          {item.phone ? (
                            <a href={`tel:${item.phone.replace(/\D/g, '')}`} className="text-xs text-muted-foreground mt-1 hover:text-orange-600 transition-colors inline-block">
                              {item.action}
                            </a>
                          ) : (
                            <p className="text-xs text-muted-foreground mt-1">{item.action}</p>
                          )}
                        </div>
                        {item.link.startsWith('tel:') ? (
                          <a href={item.link}>
                            <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-orange-100 group-hover:text-orange-600">
                              <Phone className="h-5 w-5" />
                            </Button>
                          </a>
                        ) : (
                          <Link href={item.link}>
                            <Button variant="ghost" size="icon" className="rounded-full group-hover:bg-orange-100 group-hover:text-orange-600">
                              <ArrowRight className="h-5 w-5" />
                            </Button>
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mental Health Specific */}
        <section className="py-24 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <HeartPulse className="h-16 w-16 text-secondary mb-8" />
                <h2 className="text-4xl font-bold font-heading mb-6">Mental Health & Suicide Prevention</h2>
                <p className="text-xl text-white/70 leading-relaxed mb-10">
                  You are not alone. Tampa has specialized services for trauma, depression, and crisis intervention available 24 hours a day, 7 days a week.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-secondary mb-2">Text Support</h4>
                    <p className="text-sm text-white/60">Text <b>HOME</b> to <a href="sms:741741" className="underline hover:text-secondary transition-colors"><b>741741</b></a> to connect with a Crisis Counselor.</p>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="font-bold text-secondary mb-2">Trevor Project</h4>
                    <p className="text-sm text-white/60">LGBTQ+ youth support. Call <a href="tel:18664887386" className="underline hover:text-secondary transition-colors"><b>1-866-488-7386</b></a> or text <b>START</b> to <a href="sms:678678" className="underline hover:text-secondary transition-colors"><b>678-678</b></a>.</p>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 bg-white rounded-[3rem] p-12 text-primary shadow-2xl relative">
                <div className="absolute top-0 right-0 -mr-4 -mt-4">
                  <LifeBuoy className="h-20 w-20 text-secondary rotate-12" />
                </div>
                <h3 className="text-2xl font-bold font-heading mb-6">Local Crisis Center</h3>
                <div className="space-y-6">
                  <p className="text-foreground/70 leading-relaxed">
                    The <b>Crisis Center of Tampa Bay</b> is the gateway to help in Hillsborough County. They provide a range of services from suicide prevention to sexual assault advocacy.
                  </p>
                  <div className="space-y-4">
                    <a href="tel:211" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                        <Phone className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="font-bold">Dial 2-1-1 (24/7)</span>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-5 w-5 text-secondary" />
                      </div>
                      <span className="font-bold">Online Chat Available</span>
                    </div>
                  </div>
                  <Link href="/resources/5">
                    <Button className="w-full h-14 bg-primary text-white font-bold mt-6">
                      View Crisis Center Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Help CTA */}
        <section className="py-24 bg-white text-center">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold font-heading text-primary mb-6">Still not sure where to start?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              The Resource Directory has over 50+ organizations categorized by need. Start a search to find more specific support.
            </p>
            <Link href="/directory">
              <Button size="lg" className="h-14 px-10 bg-secondary text-white font-bold">
                Go to Full Directory
              </Button>
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
