"use client";

import { Navbar, Footer, EmergencyBanner } from "@/components/layout-elements";
import { TAMPA_EVENTS } from "@/lib/resources";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ExternalLink, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <EmergencyBanner />
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Badge variant="outline" className="mb-4 px-3 py-1 text-secondary border-secondary uppercase tracking-widest text-xs">
            Community Calendar
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 font-heading">
            Tampa Community Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover workshops, festivals, job fairs, and neighborhood gatherings happening across the Tampa Bay area.
          </p>
        </div>

        {/* Featured Events */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-8 flex items-center gap-2">
            <Badge className="bg-accent text-white">Featured</Badge>
            Highlight Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TAMPA_EVENTS.filter(e => e.featured).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden border-none bg-primary text-white h-full group flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img 
                      src={event.imageUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                      <Badge variant="outline" className="mb-4 text-secondary border-secondary">
                        {event.category}
                      </Badge>
                      <CardTitle className="text-2xl font-bold mb-4 font-heading leading-tight">
                        {event.title}
                      </CardTitle>
                      <div className="space-y-3 mb-6 opacity-90">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-secondary" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-secondary" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-secondary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white w-full md:w-auto" asChild>
                      <a href={event.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        View Details
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Regular Events List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TAMPA_EVENTS.filter(e => !e.featured).map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 border-muted group h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                      {event.category}
                    </Badge>
                    <div className="text-xs font-bold text-accent flex items-center gap-1 uppercase tracking-tighter">
                      <Ticket className="h-3 w-3" />
                      Free / Open
                    </div>
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
                  <Button variant="outline" className="w-full group-hover:border-secondary group-hover:text-secondary transition-colors" asChild>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      More Info
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Calendar CTA */}
        <section className="mt-24 p-12 rounded-3xl bg-secondary/10 border-2 border-dashed border-secondary/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-primary mb-4 font-heading">Host a Community Event?</h2>
            <p className="text-lg text-muted-foreground">
              Are you organizing a resource fair, workshop, or community gathering? Add it to our calendar to reach thousands of Tampa residents.
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-white whitespace-nowrap">
            Submit an Event
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
