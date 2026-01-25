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
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pubDate: string;
  image_url: string | null;
  source_id: string;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsArticle[];
  nextPage?: string;
}

const OPENWEATHER_API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || "pub_c79e898c6b254a8fb4f0103e44129941";

export async function getTampaWeather(): Promise<WeatherData | null> {
  if (!OPENWEATHER_API_KEY) return null;
  
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Tampa,US&appid=${OPENWEATHER_API_KEY}&units=imperial`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching Tampa weather:", error);
    return null;
  }
}

export async function getTampaNews(size: number = 10): Promise<NewsArticle[]> {
  try {
    const params = new URLSearchParams({
      apikey: NEWS_API_KEY,
      q: "Tampa",
      country: "us",
      language: "en",
      size: size.toString(),
    });

    const response = await fetch(`https://newsdata.io/api/1/latest?${params.toString()}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();

    if (data.status !== "success") {
      throw new Error(`API error! status: ${data.status}`);
    }

    return data.results;
  } catch (error) {
    console.error("Error fetching Tampa news:", error);
    return [];
  }
}
