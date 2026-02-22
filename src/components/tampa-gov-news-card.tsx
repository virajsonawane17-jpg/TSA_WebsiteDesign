"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { NewsImage } from "./news-image";

interface TampaGovNewsCardProps {
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  link: string;
  pubDate?: string | null;
  index: number;
}

export function TampaGovNewsCard({ title, description, imageUrl, link, pubDate, index }: TampaGovNewsCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white shadow-sm group">
      <div className="relative h-44 overflow-hidden bg-muted">
        <NewsImage
          src={imageUrl}
          alt={title}
          fallbackSrc="https://images.unsplash.com/photo-1569025743873-ea3e9ce9c8ef?q=80&w=800&auto=format&fit=crop"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground border-0 text-[10px] font-semibold z-10">
          City of Tampa
        </Badge>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span>
            {pubDate
              ? new Date(pubDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </span>
        </div>
        <CardTitle className="text-lg font-bold text-primary leading-tight line-clamp-2 group-hover:text-secondary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pt-0">
        <p className="text-muted-foreground text-sm mb-5 line-clamp-3 leading-relaxed">
          {description || "Read the full story on the City of Tampa website."}
        </p>
        <Button variant="outline" className="w-full border-primary/40 text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Read on Tampa.gov
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
