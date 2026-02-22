"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { NewsImage } from "./news-image";

interface NewsCardProps {
  article_id: string;
  title: string;
  description?: string | null;
  image_url?: string | null;
  link: string;
  pubDate: string;
  source_id: string;
}

export function NewsCard({ article_id, title, description, image_url, link, pubDate, source_id }: NewsCardProps) {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-white group shadow-sm">
      <div className="relative h-48 overflow-hidden">
        <NewsImage
          src={image_url}
          alt={title}
          fallbackSrc="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3f997176-9cd5-44c5-880a-703ea12f7459/Image-1-1769318907736.jpg"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <Badge className="absolute top-4 right-4 bg-secondary text-white z-10">
          {source_id}
        </Badge>
      </div>
      <CardHeader>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
          <Calendar className="h-3 w-3" />
          <span>{new Date(pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
        </div>
        <CardTitle className="text-xl font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-muted-foreground mb-6 line-clamp-3 italic">
          "{description || "Click to read more about this update from the Tampa area."}"
        </p>
        <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary hover:text-white group" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Read Full Story
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
