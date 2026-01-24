"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Users, GraduationCap, Info, ExternalLink, Code, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function TSAPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-secondary border-secondary uppercase tracking-widest text-xs">
            Competition Entry
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-heading">
            TSA Chapter & Project Info
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Documentation, chapter details, and technical overview for the 2026 National TSA Conference.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chapter Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-primary text-white rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-secondary" />
                    <CardTitle>TSA Chapter Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">School Name</h3>
                      <p className="text-lg font-semibold text-primary">Tampa Community Technical High</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Chapter ID</h3>
                      <p className="text-lg font-semibold text-primary">FL-1024</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Location</h3>
                      <p className="text-lg font-semibold text-primary">Tampa, Florida</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase mb-2">Advisor</h3>
                      <p className="text-lg font-semibold text-primary">Ms. Maria Rodriguez</p>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase mb-4">Chapter Officers</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { role: "President", name: "Alex Chen" },
                        { role: "VP", name: "Sarah Jenkins" },
                        { role: "Secretary", name: "Marcus Thorne" }
                      ].map((officer) => (
                        <div key={officer.role} className="p-4 rounded-lg bg-muted/50 border border-muted">
                          <p className="text-xs font-bold text-secondary uppercase">{officer.role}</p>
                          <p className="font-semibold">{officer.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            {/* CTE Programs */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-secondary text-white rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6" />
                    <CardTitle>Career & Technical Education (CTE)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <p className="text-muted-foreground italic">
                    Our school's CTE programs directly informed the research and development of this resource hub, bridging the gap between classroom learning and community service.
                  </p>
                  <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-xl border border-muted hover:border-secondary transition-colors">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <Code className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Web Development & Design</h4>
                        <p className="text-sm text-muted-foreground">Focuses on semantic HTML5, CSS3, React, and UX/UI principles used to build this platform.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 p-4 rounded-xl border border-muted hover:border-secondary transition-colors">
                      <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                        <Info className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">Civic Tech & Community Engagement</h4>
                        <p className="text-sm text-muted-foreground">Explores how technology can be leveraged to solve local social challenges like resource accessibility.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.section>
          </div>

          {/* Reference Page (Right Sidebar) */}
          <div className="space-y-8">
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="border-none shadow-lg bg-accent text-white">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6" />
                    <CardTitle>Reference Page</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm opacity-90">
                    The following documentation is required for the Webmaster event. Please ensure these links point to your current versions.
                  </p>
                  <div className="space-y-3">
                    <Button variant="secondary" className="w-full justify-start gap-3 bg-white text-accent hover:bg-white/90" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <CheckCircle className="h-4 w-4" />
                        Copyright Checklist (PDF)
                      </a>
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 bg-white text-accent hover:bg-white/90" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <CheckCircle className="h-4 w-4" />
                        Plan of Work Log (PDF)
                      </a>
                    </Button>
                    <Button variant="secondary" className="w-full justify-start gap-3 bg-white text-accent hover:bg-white/90" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <CheckCircle className="h-4 w-4" />
                        Work Cited & Research
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Technical Disclosure</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-4">
                  <p className="text-muted-foreground">
                    This website is a <span className="font-bold text-primary">Custom-Built Theme</span> developed using the following technologies:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons", "Radix UI"].map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-muted text-muted-foreground">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs opacity-70 italic mt-4">
                    All code is original and specifically developed for this competition entry. No generative AI templates or website builders were used.
                  </p>
                </CardContent>
              </Card>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
