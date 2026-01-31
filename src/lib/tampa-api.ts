/**
 * City of Tampa official APIs – no API key required.
 * Docs: https://www.tampa.gov/info/rss-feeds
 *
 * Events API:
 * - Event types: GET https://www.tampa.gov/taxonomy/terms/calendar_type
 * - Events by type: GET https://www.tampa.gov/mobile-feeds/events/{typeId}
 *   typeId can be "all" or a tid (e.g. 91, 96). Multiple: events/91+96
 *
 * News: City of Tampa News and Press Releases – RSS
 * - GET https://tampa.gov/news/feed
 */

import type { CommunityEvent, CommunityEventWithSource } from "./resources";

const TAMPA_GOV_BASE = "https://www.tampa.gov";
const EVENTS_ALL_URL = `${TAMPA_GOV_BASE}/mobile-feeds/events/all`;
const CALENDAR_TYPES_URL = `${TAMPA_GOV_BASE}/taxonomy/terms/calendar_type`;
const NEWS_FEED_URL = "https://tampa.gov/news/feed";

/** Raw event from City of Tampa mobile-feeds/events API */
export interface TampaGovEventRaw {
  nid: string;
  title: string;
  body: string;
  field_event_collection: string;
  field_event_collection_1: string;
  field_event_attachments?: string;
  field_event_address: string;
  endDate: string;
  startDate: string;
  alias: string;
}

/** Event type from taxonomy/terms/calendar_type */
export interface TampaGovEventType {
  name: string;
  vid: string;
  tid: string;
}

/** Decode common HTML entities so tags can be stripped correctly. */
function decodeHtmlEntities(str: string): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/** Strip HTML tags for plain text. Run decodeHtmlEntities first if content may be entity-encoded. */
function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Extract first line of address from HTML (e.g. "600 N Ashley Dr.") */
function parseAddressHtml(html: string): string {
  if (!html) return "Tampa, FL";
  const match = html.match(/<span class="address-line1">([^<]*)<\/span>/) ||
    html.match(/<span class="organization">([^<]*)<\/span>/) ||
    html.match(/<span class="locality">([^<]*)<\/span>/);
  if (match) return stripHtml(match[1]).trim();
  return stripHtml(html).slice(0, 80) || "Tampa, FL";
}

/** Format ISO date to display date and time */
function formatEventDate(isoStart: string, isoEnd: string): { date: string; time: string } {
  try {
    const start = new Date(isoStart);
    const end = new Date(isoEnd);
    const date = start.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const time = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const timeStr = endTime && endTime !== time ? `${time} – ${endTime}` : time;
    return { date, time: timeStr };
  } catch {
    return { date: "", time: "" };
  }
}

/** Convert Tampa Gov raw event to CommunityEvent-like shape for UI */
function normalizeTampaGovEvent(raw: TampaGovEventRaw): CommunityEventWithSource {
  const { date, time } = formatEventDate(raw.startDate, raw.endDate);
  const link = raw.alias.startsWith("http") ? raw.alias : `${TAMPA_GOV_BASE}${raw.alias}`;
  const imageUrl = raw.field_event_attachments
    ? raw.field_event_attachments.startsWith("http")
      ? raw.field_event_attachments
      : `${TAMPA_GOV_BASE}${raw.field_event_attachments}`
    : undefined;

  return {
    id: `tampa-gov-${raw.nid}`,
    title: raw.title,
    description: stripHtml(raw.body).slice(0, 200) + (stripHtml(raw.body).length > 200 ? "…" : ""),
    date,
    time,
    location: parseAddressHtml(raw.field_event_address),
    category: raw.field_event_collection.replace(/\/.*$/, "").trim() || "Community",
    imageUrl,
    link,
    featured: false,
    source: "tampa_gov",
  };
}

/** Fetch all City of Tampa events (cached). */
export async function getTampaGovEvents(): Promise<CommunityEventWithSource[]> {
  try {
    const res = await fetch(EVENTS_ALL_URL, {
      next: { revalidate: 900 }, // 15 min
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const raw: TampaGovEventRaw[] = await res.json();
    if (!Array.isArray(raw)) return [];
    return raw.map(normalizeTampaGovEvent);
  } catch (err) {
    console.error("Tampa Gov events fetch error:", err);
    return [];
  }
}

/** Fetch event types (categories) from City of Tampa. */
export async function getTampaGovEventTypes(): Promise<TampaGovEventType[]> {
  try {
    const res = await fetch(CALENDAR_TYPES_URL, {
      next: { revalidate: 86400 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("Tampa Gov event types fetch error:", err);
    return [];
  }
}

/** Parsed item from City of Tampa news RSS feed */
export interface TampaGovNewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  imageUrl?: string;
}

/** Extract first image URL from RSS item block (enclosure, media:content, or img in description). */
function extractImageFromItem(block: string, rawDescription: string): string | undefined {
  const enclosure = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]*type=["']image\/[^"']+["']/i) ||
    block.match(/<enclosure[^>]+type=["']image\/[^"']+["'][^>]+url=["']([^"']+)["']/i);
  if (enclosure?.[1]) return enclosure[1].trim();

  const mediaContent = block.match(/<media:content[^>]+url=["']([^"']+)["']/i) ||
    block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (mediaContent?.[1]) return mediaContent[1].trim();

  const imgInDesc = rawDescription?.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgInDesc?.[1]) return imgInDesc[1].trim();

  return undefined;
}

/** Simple RSS channel/item parser (no dependency). */
function parseRssXml(xml: string): TampaGovNewsItem[] {
  const items: TampaGovNewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m;
  while ((m = itemRegex.exec(xml)) !== null) {
    const block = m[1];
    const titleMatch = block.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/) ||
      block.match(/<title>([^<]*)<\/title>/);
    const linkMatch = block.match(/<link>([^<]*)<\/link>/);
    const pubDateMatch = block.match(/<pubDate>([^<]*)<\/pubDate>/);
    const descMatch = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
      block.match(/<description>([\s\S]*?)<\/description>/);

    const rawDesc = descMatch ? descMatch[1] : "";
    const decodedDesc = decodeHtmlEntities(rawDesc);
    const plainDesc = stripHtml(decodedDesc).replace(/\s+/g, " ").trim().slice(0, 280);
    const imageUrl = extractImageFromItem(block, decodedDesc);

    items.push({
      title: titleMatch ? stripHtml(decodeHtmlEntities(titleMatch[1])).trim() : "",
      link: linkMatch ? linkMatch[1].trim() : "",
      pubDate: pubDateMatch ? pubDateMatch[1] : "",
      description: plainDesc || "",
      imageUrl: imageUrl || undefined,
    });
  }
  return items;
}

/** Fetch City of Tampa news and press releases from official RSS feed. */
export async function getTampaGovNews(limit: number = 10): Promise<TampaGovNewsItem[]> {
  try {
    const res = await fetch(NEWS_FEED_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/xml, text/xml, */*" },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRssXml(xml);
    return items.slice(0, limit);
  } catch (err) {
    console.error("Tampa Gov news RSS fetch error:", err);
    return [];
  }
}
