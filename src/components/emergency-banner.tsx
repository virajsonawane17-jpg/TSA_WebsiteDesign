import Link from "next/link";
import { WeatherWidget } from "./weather-widget";
import { Suspense } from "react";

export function EmergencyBanner() {
  return (
    <div className="bg-orange-600 px-4 py-2 text-center text-sm font-medium text-white">
      <div className="container mx-auto flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2 text-sm font-medium">
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
