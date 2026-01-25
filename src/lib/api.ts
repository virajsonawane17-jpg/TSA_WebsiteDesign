export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category?: string;
}

export interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_name: string;
  category: string[];
}

export interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
}

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const NEWSDATA_API_KEY = process.env.NEWSDATA_API_KEY;

export async function getTampaWeather(): Promise<WeatherData | null> {
  if (!OPENWEATHER_API_KEY) return null;
  
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Tampa,US&appid=${OPENWEATHER_API_KEY}&units=imperial`,
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching Tampa weather:", error);
    return null;
  }
}

export async function getTampaNews(): Promise<NewsArticle[]> {
  if (!NEWSDATA_API_KEY) {
    console.warn("NEWSDATA_API_KEY is missing");
    return [];
  }
  
  try {
    // Using NewsData.io latest endpoint as researched
    // Note: q=Tampa search is reliable for all plan types
    const res = await fetch(
      `https://newsdata.io/api/1/latest?apikey=${NEWSDATA_API_KEY}&q=Tampa&country=us&language=en`,
      { next: { revalidate: 7200 } } // Cache for 2 hours
    );
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error("NewsData API error:", errorData);
      return [];
    }
    
    const data: NewsDataResponse = await res.json();
    
    if (data.status !== "success") {
      return [];
    }

    return data.results.map(article => ({
      title: article.title,
      description: article.description || "No description available",
      url: article.link,
      urlToImage: article.image_url,
      publishedAt: article.pubDate,
      source: {
        name: article.source_name || article.source_id.charAt(0).toUpperCase() + article.source_id.slice(1)
      },
      category: article.category?.[0] || "News"
    }));
  } catch (error) {
    console.error("Error fetching Tampa news:", error);
    return [];
  }
}
