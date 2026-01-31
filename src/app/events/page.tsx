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

  const dbIds = new Set(dbEvents.map((e) => e.id));
  const merged: CommunityEventWithSource[] = [
    ...dbEvents.map((e) => ({ ...e, source: undefined as undefined })),
    ...tampaGovEvents.filter((e) => !dbIds.has(e.id)),
  ].sort((a, b) => {
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
