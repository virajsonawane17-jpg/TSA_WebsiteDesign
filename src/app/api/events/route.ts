import { NextResponse } from "next/server";
import { getEvents } from "@/lib/db";
import { getTampaGovEvents } from "@/lib/tampa-api";

function parseDisplayDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "3", 10);
  
  try {
    const [dbEvents, tampaGovEvents] = await Promise.all([
      getEvents(),
      getTampaGovEvents(),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const dbIds = new Set(dbEvents.map((e) => e.id));
    const merged = [
      ...dbEvents.map((e) => ({ ...e, source: undefined as undefined })),
      ...tampaGovEvents.filter((e) => !dbIds.has(e.id)),
    ]
      .filter((event) => {
        const eventDate = parseDisplayDate(event.date);
        if (!eventDate) return true;
        eventDate.setHours(0, 0, 0, 0);
        return eventDate >= today;
      })
      .sort((a, b) => {
        const dateA = parseDisplayDate(a.date);
        const dateB = parseDisplayDate(b.date);
        if (!dateA || !dateB) return 0;
        return dateA.getTime() - dateB.getTime();
      })
      .slice(0, limit);

    return NextResponse.json(merged);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json([], { status: 500 });
  }
}
