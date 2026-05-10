"use client";

import { useState } from "react";
import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Phone,
  Globe,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Waves,
  Heart,
  Sparkles,
} from "lucide-react";

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

const STEPS = [
  { title: "Organization Info", icon: Building2, desc: "Name & category" },
  { title: "Description", icon: FileText, desc: "Services offered" },
  { title: "Location & Contact", icon: MapPin, desc: "Where to find them" },
  { title: "Review & Submit", icon: CheckCircle2, desc: "Confirm & send" },
];

const CATEGORIES = [
  "Food Assistance",
  "Housing",
  "Mental Health",
  "Youth Programs",
  "Healthcare",
  "Legal Aid",
  "Employment",
  "Veterans",
  "Education",
  "Crisis Support",
  "Seniors",
  "Arts & Culture",
  "Other",
];

export default function SubmitPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    submitterName: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          <div className="absolute top-0 right-0 h-64 w-64 bg-accent/15 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <Heart className="h-5 w-5 text-accent fill-accent" />
              <span className="text-sm font-bold uppercase tracking-widest text-accent">
                Grow the Hub
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold font-heading mb-4 max-w-2xl leading-tight">
              Submit a Resource
            </h1>
            <p className="text-xl text-white/70 font-sans max-w-2xl">
              Help us expand our directory. Suggest a local organization or program to be
              verified and added — completely free.
            </p>
          </div>
          <WaveDivider fill="oklch(0.99 0.005 220)" />
        </section>

        <div className="container mx-auto px-4 sm:px-6 -mt-20 pb-24">
          <div className="max-w-3xl mx-auto">
            {/* ── Stepper ── */}
            {!submitted && (
              <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2 gap-2">
                {STEPS.map((s, i) => {
                  const done = step > i + 1;
                  const active = step === i + 1;
                  return (
                    <div key={i} className="flex items-center gap-2 shrink-0">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                          done
                            ? "bg-secondary text-white shadow-md shadow-secondary/20"
                            : active
                            ? "bg-accent text-white shadow-md shadow-accent/20 ring-4 ring-accent/20"
                            : "bg-white text-muted-foreground border-2 border-border"
                        }`}
                      >
                        {done ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                      </div>
                      <div className="hidden sm:block">
                        <p
                          className={`text-xs font-bold uppercase tracking-wider ${
                            active ? "text-primary" : "text-muted-foreground"
                          }`}
                        >
                          {s.title}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{s.desc}</p>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`hidden sm:block w-8 h-0.5 mx-1 rounded-full transition-colors ${
                            done ? "bg-secondary" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── Form Card ── */}
            <Card className="rounded-3xl border-border/40 shadow-2xl shadow-primary/8 overflow-hidden bg-white">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    /* ── Success ── */
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-10 sm:p-14 text-center"
                    >
                      <div className="relative mx-auto mb-8 h-24 w-24">
                        <div className="absolute inset-0 bg-secondary/15 rounded-full animate-ping" />
                        <div className="relative h-24 w-24 bg-gradient-to-br from-secondary to-aqua rounded-full flex items-center justify-center shadow-xl shadow-secondary/30">
                          <Sparkles className="h-10 w-10 text-white" />
                        </div>
                      </div>
                      <h2 className="text-3xl font-bold font-heading text-primary mb-4">
                        Thank You for Contributing!
                      </h2>
                      <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
                        Your submission has been received. Our team will verify the
                        information and reach out if any clarifications are needed before
                        listing.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          onClick={() => (window.location.href = "/directory")}
                          className="h-12 px-8 bg-primary hover:bg-secondary text-white font-bold transition-colors"
                        >
                          Back to Directory
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => { setSubmitted(false); setStep(1); }}
                          className="h-12 px-8 border-primary/20 text-primary font-bold"
                        >
                          Submit Another
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-8 sm:p-12">
                      {/* ── Step 1 ── */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-7"
                        >
                          <div>
                            <h2 className="text-2xl font-bold font-heading text-primary mb-2">
                              Organization Information
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              Tell us the basics about this resource.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                              Organization Name <span className="text-accent">*</span>
                            </label>
                            <Input
                              placeholder="e.g. Tampa Bay Community Outreach"
                              className="h-14 text-base rounded-xl border-border/60 focus-visible:ring-secondary"
                              value={formData.name}
                              onChange={(e) => update("name", e.target.value)}
                              required
                            />
                            <p className="text-xs text-muted-foreground">
                              Use the organization's official name as it appears on their website.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                              Primary Category <span className="text-accent">*</span>
                            </label>
                            <select
                              className="w-full h-14 bg-background border border-input rounded-xl px-4 text-base outline-none focus:ring-2 focus:ring-secondary transition-shadow"
                              value={formData.category}
                              onChange={(e) => update("category", e.target.value)}
                              required
                            >
                              <option value="">Select the best matching category</option>
                              {CATEGORIES.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 2 ── */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-7"
                        >
                          <div>
                            <h2 className="text-2xl font-bold font-heading text-primary mb-2">
                              Services & Description
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              Help residents understand how this organization can help them.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                              Service Description <span className="text-accent">*</span>
                            </label>
                            <Textarea
                              placeholder="Describe the programs, services, and how residents can access help. Include eligibility requirements if any."
                              className="min-h-[220px] text-base py-4 rounded-xl border-border/60 focus-visible:ring-secondary resize-none"
                              value={formData.description}
                              onChange={(e) => update("description", e.target.value)}
                              required
                            />
                            <p className="text-xs text-muted-foreground">
                              Be as detailed as possible — the more context, the better the listing.
                            </p>
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                              Additional Notes
                            </label>
                            <Textarea
                              placeholder="Hours, seasonal availability, languages offered, accessibility features..."
                              className="min-h-[100px] text-base py-4 rounded-xl border-border/60 focus-visible:ring-secondary resize-none"
                              value={formData.notes}
                              onChange={(e) => update("notes", e.target.value)}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 3 ── */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-7"
                        >
                          <div>
                            <h2 className="text-2xl font-bold font-heading text-primary mb-2">
                              Location & Contact
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              How can residents find and reach this organization?
                            </p>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                                Physical Address <span className="text-accent">*</span>
                              </label>
                              <Input
                                placeholder="Street, City, FL, Zip"
                                className="h-12 rounded-xl border-border/60 focus-visible:ring-secondary"
                                value={formData.location}
                                onChange={(e) => update("location", e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                                Phone Number <span className="text-accent">*</span>
                              </label>
                              <Input
                                placeholder="(813) 000-0000"
                                type="tel"
                                className="h-12 rounded-xl border-border/60 focus-visible:ring-secondary"
                                value={formData.phone}
                                onChange={(e) => update("phone", e.target.value)}
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                                Official Website
                              </label>
                              <Input
                                placeholder="https://organization.org"
                                type="url"
                                className="h-12 rounded-xl border-border/60 focus-visible:ring-secondary"
                                value={formData.website}
                                onChange={(e) => update("website", e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                                Contact Email <span className="text-accent">*</span>
                              </label>
                              <Input
                                placeholder="contact@organization.org"
                                type="email"
                                className="h-12 rounded-xl border-border/60 focus-visible:ring-secondary"
                                value={formData.email}
                                onChange={(e) => update("email", e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Step 4 (Review) ── */}
                      {step === 4 && (
                        <motion.div
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-7"
                        >
                          <div>
                            <h2 className="text-2xl font-bold font-heading text-primary mb-2">
                              Review Your Submission
                            </h2>
                            <p className="text-muted-foreground text-sm">
                              Everything look correct? You can go back to make edits.
                            </p>
                          </div>

                          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/50 rounded-2xl p-7 space-y-5">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h3 className="text-xl font-bold font-heading text-primary">
                                  {formData.name || "Untitled Organization"}
                                </h3>
                                <Badge className="mt-2 bg-secondary text-white border-none">
                                  {formData.category || "No Category"}
                                </Badge>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setStep(1)}
                                className="text-secondary font-bold shrink-0"
                              >
                                Edit
                              </Button>
                            </div>

                            <div className="pt-4 border-t border-border/40">
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">
                                Description
                              </p>
                              <p className="text-sm text-foreground/70 leading-relaxed italic">
                                &ldquo;{formData.description || "No description provided."}&rdquo;
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm pt-4 border-t border-border/40">
                              <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                  Location
                                </p>
                                <p className="font-medium">{formData.location || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                  Phone
                                </p>
                                <p className="font-medium">{formData.phone || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                  Website
                                </p>
                                <p className="font-medium truncate">{formData.website || "N/A"}</p>
                              </div>
                              <div>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1.5">
                                  Email
                                </p>
                                <p className="font-medium truncate">{formData.email || "N/A"}</p>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest block">
                              Your Name (Optional)
                            </label>
                            <Input
                              placeholder="Community Neighbor"
                              className="h-12 rounded-xl border-border/60 focus-visible:ring-secondary"
                              value={formData.submitterName}
                              onChange={(e) => update("submitterName", e.target.value)}
                            />
                            <p className="text-xs text-muted-foreground">
                              Used only to credit contributors or ask follow-up questions.
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {/* ── Navigation ── */}
                      <div className="mt-10 flex justify-between items-center pt-8 border-t border-border/40">
                        {step > 1 ? (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setStep((s) => s - 1)}
                            className="h-12 px-6 border-primary/20 text-primary font-bold"
                          >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                          </Button>
                        ) : (
                          <div />
                        )}

                        <div className="flex items-center gap-3">
                          {/* Progress dots */}
                          <div className="hidden sm:flex gap-1.5">
                            {STEPS.map((_, i) => (
                              <div
                                key={i}
                                className={`h-2 rounded-full transition-all ${
                                  step > i + 1
                                    ? "w-4 bg-secondary"
                                    : step === i + 1
                                    ? "w-6 bg-accent"
                                    : "w-2 bg-border"
                                }`}
                              />
                            ))}
                          </div>

                          {step < 4 ? (
                            <Button
                              type="button"
                              onClick={() => setStep((s) => s + 1)}
                              className="h-12 px-7 bg-primary hover:bg-secondary text-white font-bold transition-colors"
                            >
                              Continue <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              type="submit"
                              className="h-12 px-9 bg-accent hover:bg-accent/90 text-white font-bold shadow-xl shadow-accent/20"
                            >
                              Submit for Verification
                              <CheckCircle2 className="ml-2 h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Verification note */}
            {!submitted && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-start gap-4 p-7 rounded-3xl bg-secondary/5 border border-secondary/15"
              >
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h4 className="font-bold text-primary font-heading mb-1.5">
                    Our Verification Process
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Every submission is manually reviewed by our team. We verify the
                    organization's status, service area, and contact information before
                    publishing to the directory. This ensures residents can always trust
                    the resources listed here.
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
