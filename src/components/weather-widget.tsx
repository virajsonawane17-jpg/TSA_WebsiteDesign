import { getTampaWeather } from "@/lib/api";
import { Cloud, Sun, CloudRain, Wind, Thermometer } from "lucide-react";

export async function WeatherWidget() {
  const weather = await getTampaWeather();

  if (!weather) {
    return null;
  }

  const getIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clouds": return <Cloud className="h-4 w-4" />;
      case "rain": return <CloudRain className="h-4 w-4" />;
      case "clear": return <Sun className="h-4 w-4" />;
      default: return <Cloud className="h-4 w-4" />;
    }
  };

  return (
    <div className="hidden md:flex items-center gap-4 px-3 py-1 rounded-full bg-white/10 text-white text-xs backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-r border-white/20 pr-3">
        <Thermometer className="h-3.5 w-3.5 text-secondary" />
        <span className="font-bold">{Math.round(weather.main.temp)}°F</span>
      </div>
      <div className="flex items-center gap-1.5 border-r border-white/20 pr-3">
        {getIcon(weather.weather[0].main)}
        <span className="capitalize">{weather.weather[0].description}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Wind className="h-3.5 w-3.5 text-secondary" />
        <span>{Math.round(weather.wind.speed)} mph</span>
      </div>
    </div>
  );
}
