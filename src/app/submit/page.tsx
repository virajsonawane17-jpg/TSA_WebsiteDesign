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
  User
} from "lucide-react";

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
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const steps = [
    { title: "Organization Info", icon: Building2 },
    { title: "Services & Description", icon: FileText },
    { title: "Location & Contact", icon: MapPin },
    { title: "Review & Submit", icon: CheckCircle2 }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F9FB]">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-primary py-20 text-white">
          <div className="container mx-auto px-4 sm:px-6">
            <h1 className="text-4xl font-bold font-heading mb-4">Submit a Resource</h1>
            <p className="text-xl text-white/70 max-w-2xl font-sans">
              Help us expand our hub. Suggest a new local organization or community program to be verified and added to our directory.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 -mt-12 pb-24">
          <div className="max-w-4xl mx-auto">
            {/* Stepper */}
            {!submitted && (
              <div className="flex justify-between mb-8 overflow-x-auto pb-4 gap-4">
                {steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3 shrink-0">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step > i + 1 ? 'bg-secondary text-white' : step === i + 1 ? 'bg-accent text-white' : 'bg-white text-muted-foreground border border-border'}`}>
                      {step > i + 1 ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                    </div>
                    <span className={`text-sm font-bold uppercase tracking-wider hidden sm:block ${step === i + 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <Card className="rounded-3xl border-border/40 shadow-2xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-12 text-center"
                    >
                      <div className="h-24 w-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShieldCheck className="h-12 w-12" />
                      </div>
                      <h2 className="text-3xl font-bold font-heading text-primary mb-4">Thank You for Contributing!</h2>
                      <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
                        Your submission has been received. Our community moderation team will review the information and reach out if any clarifications are needed.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button onClick={() => window.location.href = '/directory'} className="h-12 px-8 bg-primary text-white font-bold">
                          Return to Directory
                        </Button>
                        <Button variant="outline" onClick={() => { setSubmitted(false); setStep(1); }} className="h-12 px-8 border-primary/20 text-primary font-bold">
                          Submit Another
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-8 sm:p-12">
                      {step === 1 && (
                        <motion.div 
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest">Organization Name</label>
                            <Input 
                              placeholder="e.g. Tampa Community Outreach" 
                              className="h-14 text-lg"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              required
                            />
                          </div>
                          <div className="space-y-4">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest">Primary Category</label>
                            <select 
                              className="w-full h-14 bg-background border border-input rounded-md px-3 text-lg outline-none focus:ring-2 focus:ring-secondary"
                              value={formData.category}
                              onChange={(e) => setFormData({...formData, category: e.target.value})}
                              required
                            >
                              <option value="">Select a Category</option>
                              <option value="Food Assistance">Food Assistance</option>
                              <option value="Housing">Housing</option>
                              <option value="Mental Health">Mental Health</option>
                              <option value="Youth Programs">Youth Programs</option>
                              <option value="Healthcare">Healthcare</option>
                              <option value="Legal Aid">Legal Aid</option>
                              <option value="Employment">Employment</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div 
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <div className="space-y-4">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest">Service Description</label>
                            <Textarea 
                              placeholder="Describe the services and programs offered..." 
                              className="min-h-[200px] text-lg py-4"
                              value={formData.description}
                              onChange={(e) => setFormData({...formData, description: e.target.value})}
                              required
                            />
                            <p className="text-xs text-muted-foreground italic">Be as descriptive as possible to help residents understand how they can be helped.</p>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.div 
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest">Physical Address</label>
                              <Input 
                                placeholder="Street, City, Zip" 
                                className="h-12"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest">Phone Number</label>
                              <Input 
                                placeholder="(813) 000-0000" 
                                className="h-12"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest">Official Website</label>
                              <Input 
                                placeholder="https://..." 
                                className="h-12"
                                value={formData.website}
                                onChange={(e) => setFormData({...formData, website: e.target.value})}
                              />
                            </div>
                            <div className="space-y-4">
                              <label className="text-sm font-bold text-primary uppercase tracking-widest">Contact Email</label>
                              <Input 
                                placeholder="info@org.com" 
                                className="h-12"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 4 && (
                        <motion.div 
                          key="step4"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-8"
                        >
                          <div className="bg-muted/30 p-8 rounded-2xl border border-border/40 space-y-6">
                            <div className="flex justify-between border-b border-border/40 pb-4">
                              <div>
                                <h3 className="text-2xl font-bold text-primary font-heading">{formData.name || "Untitled Organization"}</h3>
                                <Badge className="mt-2 bg-secondary text-white border-none">{formData.category || "No Category Selected"}</Badge>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-secondary font-bold">Edit</Button>
                            </div>
                            <div className="space-y-4">
                              <p className="text-sm text-foreground/70 leading-relaxed italic">
                                "{formData.description || "No description provided."}"
                              </p>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <span className="font-bold block text-muted-foreground uppercase text-[10px] tracking-widest mb-1">Location</span>
                                  {formData.location || "N/A"}
                                </div>
                                <div>
                                  <span className="font-bold block text-muted-foreground uppercase text-[10px] tracking-widest mb-1">Contact</span>
                                  {formData.phone || "N/A"}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <label className="text-sm font-bold text-primary uppercase tracking-widest">Your Name (Optional)</label>
                            <Input 
                              placeholder="Helpful Neighbor" 
                              className="h-12"
                              value={formData.submitterName}
                              onChange={(e) => setFormData({...formData, submitterName: e.target.value})}
                            />
                            <p className="text-xs text-muted-foreground">We use this to credit contributors or reach out with questions.</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Form Navigation */}
                      <div className="mt-12 flex justify-between pt-8 border-t border-border/40">
                        {step > 1 ? (
                          <Button type="button" variant="outline" onClick={prevStep} className="h-12 px-6 border-primary/20 text-primary font-bold">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                          </Button>
                        ) : (
                          <div />
                        )}
                        
                        {step < 4 ? (
                          <Button type="button" onClick={nextStep} className="h-12 px-8 bg-primary text-white font-bold">
                            Continue <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        ) : (
                          <Button type="submit" className="h-12 px-10 bg-accent hover:bg-accent/90 text-white font-bold shadow-xl shadow-accent/20">
                            Submit for Verification
                          </Button>
                        )}
                      </div>
                    </form>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
            
            {!submitted && (
              <div className="mt-12 flex items-start gap-4 p-8 rounded-3xl bg-secondary/5 border border-secondary/10">
                <ShieldCheck className="h-8 w-8 text-secondary shrink-0" />
                <div>
                  <h4 className="font-bold text-primary font-heading mb-2">Our Verification Process</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    To maintain the highest level of trust, every submission is manually reviewed by our team. We verify the organization's nonprofit status, service area, and contact information before listing them in the public directory.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
