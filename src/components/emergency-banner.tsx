import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { WeatherWidget } from "./weather-widget";
import { Suspense } from "react";

export function EmergencyBanner() {
  return (
    <div className="bg-accent px-4 py-2 text-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>In a crisis? Call or text <b>988</b> for 24/7 support.</span>
          <Link href="/emergency" className="underline hover:opacity-80 ml-2 whitespace-nowrap">View Emergency Resources</Link>
        </div>
        
        <Suspense fallback={<div className="h-6 w-32 bg-white/10 animate-pulse rounded-full hidden md:block" />}>
          <WeatherWidget />
        </Suspense>
      </div>
    </div>
  );
}
