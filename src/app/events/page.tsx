import { getEvents } from "@/lib/db";
import { getTampaGovEvents } from "@/lib/tampa-api";
import type { CommunityEventWithSource } from "@/lib/resources";
import { EventsContent } from "./events-content";

export const revalidate = 900; // Revalidate every 15 min (Tampa Gov cache)

export default async function EventsPage() {
  const [dbEvents, tampaGovEvents] = await Promise.all([
    getEvents(),
    getTampaGovEvents(),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

  const dbIds = new Set(dbEvents.map((e) => e.id));
  const merged: CommunityEventWithSource[] = [
    ...dbEvents.map((e) => ({ ...e, source: undefined as undefined })),
    ...tampaGovEvents.filter((e) => !dbIds.has(e.id)),
  ]
    .filter((event) => {
      const eventDate = parseDisplayDate(event.date);
      if (!eventDate) return true; // Keep events with invalid dates
      eventDate.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
      return eventDate >= today; // Only keep events that are today or in the future
    })
    .sort((a, b) => {
      const dateA = parseDisplayDate(a.date);
      const dateB = parseDisplayDate(b.date);
      if (!dateA || !dateB) return 0;
      return dateA.getTime() - dateB.getTime();
    });

  return <EventsContent events={merged} />;
}

function parseDisplayDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}
