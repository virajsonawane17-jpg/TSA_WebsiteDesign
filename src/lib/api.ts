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
}

export interface NewsResponse {
  articles: NewsArticle[];
  status: string;
  totalResults: number;
}

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const NEWSAPI_KEY = process.env.NEXT_PUBLIC_NEWSAPI_KEY;

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
  if (!NEWSAPI_KEY) return [];
  
  try {
    // Searching for Tampa specifically
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=Tampa&sortBy=publishedAt&language=en&apiKey=${NEWSAPI_KEY}`,
      { next: { revalidate: 7200 } } // Cache for 2 hours
    );
    
    if (!res.ok) return [];
    const data: NewsResponse = await res.json();
    return data.articles.filter(article => article.title && article.description).slice(0, 10);
  } catch (error) {
    console.error("Error fetching Tampa news:", error);
    return [];
  }
}
