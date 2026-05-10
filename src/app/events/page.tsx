import { getTampaGovEvents } from "@/lib/tampa-api";
import { TAMPA_EVENTS } from "@/lib/resources";
import { EventsClient } from "@/components/events-client";
import type { CommunityEventWithSource } from "@/lib/resources";

export default async function EventsPage() {
  const govEvents = await getTampaGovEvents().catch(() => [] as CommunityEventWithSource[]);

  // Use live Tampa.gov events, fall back to static if empty
  const events: CommunityEventWithSource[] =
    govEvents.length > 0
      ? govEvents
      : TAMPA_EVENTS.map((e) => ({ ...e, source: undefined }));

  return <EventsClient events={events} />;
}
