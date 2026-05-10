import Link from "next/link";
import { WeatherWidget } from "./weather-widget";
import { Suspense } from "react";
import { PhoneCall } from "lucide-react";

export function EmergencyBanner() {
  return (
    <div className="bg-gradient-to-r from-orange-600 to-red-600 px-4 py-2">
      <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <PhoneCall className="h-3.5 w-3.5 shrink-0" />
          <span>
            In a crisis? Call or text <strong>988</strong> for 24/7 support.
          </span>
          <Link
            href="/emergency"
            className="underline underline-offset-2 hover:no-underline font-bold ml-1 whitespace-nowrap"
          >
            Emergency Resources →
          </Link>
        </div>

        <Suspense
          fallback={
            <div className="h-5 w-28 bg-white/15 animate-pulse rounded-full hidden md:block" />
          }
        >
          <WeatherWidget />
        </Suspense>
      </div>
    </div>
  );
}
