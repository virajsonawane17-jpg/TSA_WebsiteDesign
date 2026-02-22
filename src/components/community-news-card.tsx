"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { NewsImage } from "./news-image";

interface CommunityNewsCardProps {
  id: string;
  title: string;
  excerpt: string;
  imageUrl?: string | null;
  link: string;
  date: string;
  source: string;
  category: string;
}

export function CommunityNewsCard({ title, excerpt, imageUrl, link, date, source, category }: CommunityNewsCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-all border-none bg-white group shadow-sm">
      <div className="relative h-40 overflow-hidden">
        <NewsImage
          src={imageUrl}
          alt={title}
          fallbackSrc="https://images.unsplash.com/photo-1504711432869-efd5973e8d48?q=80&w=800&auto=format&fit=crop"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-accent text-white border-none text-[10px] px-2 py-0 z-10">
          {category}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-1">
          <Calendar className="h-3 w-3" />
          <span>{date} • {source}</span>
        </div>
        <CardTitle className="text-base font-bold text-primary leading-tight group-hover:text-accent transition-colors line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">
          {excerpt}
        </p>
        <Button variant="link" className="p-0 h-auto text-accent text-xs font-bold" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            Read more →
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
