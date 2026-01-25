import { cache } from 'react';

export interface NewsArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  image_url?: string;
  source_id: string;
  creator?: string[];
  category?: string[];
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
}

const NEWS_API_KEY = process.env.NEWS_API_KEY;

export const getTampaNews = cache(async (size: number = 10): Promise<NewsArticle[]> => {
  if (!NEWS_API_KEY) {
    console.error("NEWS_API_KEY is not defined");
    return [];
  }

  try {
    // Using NewsData.io API
    // We search for "Tampa" in Florida, US
    const params = new URLSearchParams({
      apikey: NEWS_API_KEY,
      q: 'Tampa',
      country: 'us',
      language: 'en',
      size: size.toString(),
    });

    const res = await fetch(`https://newsdata.io/api/1/latest?${params}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("NewsData API error:", errorData);
      return [];
    }

    const data: NewsResponse = await res.json();
    
    // Filter out articles without titles or descriptions
    return data.results.filter(article => article.title && article.description);
  } catch (error) {
    console.error("Error fetching Tampa news from NewsData:", error);
    return [];
  }
});
