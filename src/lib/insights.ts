/**
 * Real community insights derived from directory resources, events, and news.
 * Used by the Insights page to show live data instead of static placeholders.
 */

import type { Resource } from "./resources";
import { TAMPA_RESOURCES } from "./resources";

export interface CategoryTrend {
  label: string;
  value: number;
  pct: number;
  status: "up" | "down" | "stable";
}

export interface AreaBreakdown {
  name: string;
  volume: "High" | "Medium" | "Low";
  focus: string;
  count: number;
}

/** Normalize category string so DB variants group correctly (e.g. "food assistance" → "Food Assistance"). */
const CATEGORY_ALIASES: Record<string, string> = {
  "food assistance": "Food Assistance",
  "housing": "Housing",
  "mental health": "Mental Health",
  "youth programs": "Youth Programs",
  "healthcare": "Healthcare",
  "education": "Education",
  "employment": "Employment",
  "veterans": "Veterans",
  "legal aid": "Legal Aid",
  "crisis support": "Crisis Support",
  "seniors": "Seniors",
  "arts & culture": "Arts & Culture",
  "community": "Community",
  "events": "Events",
  "family": "Family",
  "festival": "Festival",
};

function normalizeCategory(cat: string | undefined): string {
  if (!cat || typeof cat !== "string") return "Other";
  const key = cat.trim().toLowerCase();
  return (CATEGORY_ALIASES[key] ?? cat.trim()) || "Other";
}

/** Tampa area keywords in addresses → display name */
const AREA_KEYWORDS: { pattern: RegExp; name: string }[] = [
  { pattern: /ybor|7th ave|e\.?\s*7th/i, name: "Ybor City" },
  { pattern: /downtown|kennedy\s*blvd|jackson\s*st/i, name: "Downtown" },
  { pattern: /causeway|westshore|spruce/i, name: "Westshore / Causeway" },
  { pattern: /hanna\s*ave|e\.?\s*hanna|east\s*tampa|22nd\s*st|32nd\s*st/i, name: "East Tampa" },
  { pattern: /n\.?\s*florida|north\s*florida|florida\s*ave/i, name: "North Tampa" },
  { pattern: /macdill|south\s*tampa|gandy/i, name: "South Tampa" },
  { pattern: /tampa\s*heights|howard\s*ave/i, name: "Tampa Heights" },
  { pattern: /sulphur\s*springs|lake\s*magdalen/i, name: "Sulphur Springs" },
];

/** Derive "Live Demand Overview" from real resource counts by category. */
export function computeCategoryTrends(resources: Resource[]): CategoryTrend[] {
  const total = resources.length;
  if (total === 0) {
    return [
      { label: "No data yet", value: 0, pct: 0, status: "stable" },
    ];
  }

  const byCategory = new Map<string, number>();
  for (const r of resources) {
    const cat = normalizeCategory(r.category);
    byCategory.set(cat, (byCategory.get(cat) ?? 0) + 1);
  }

  const sorted = [...byCategory.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return sorted.map(([label, value]) => ({
    label,
    value,
    pct: Math.round((value / total) * 100),
    status: "stable" as const,
  }));
}

/** When directory has only one category (e.g. all "Other"), return sample breakdown so charts look complete. */
export function getCategoryTrendsWithFallback(resources: Resource[]): { trends: CategoryTrend[]; isSample: boolean } {
  const real = computeCategoryTrends(resources);
  const singleOther = real.length === 1 && real[0].label === "Other" && resources.length > 0;
  if (singleOther) {
    return {
      trends: computeCategoryTrends(TAMPA_RESOURCES),
      isSample: true,
    };
  }
  return { trends: real, isSample: false };
}

/** Derive "Neighborhood Needs" from resource locations and categories. */
export function computeAreaBreakdown(resources: Resource[]): AreaBreakdown[] {
  const areaResources = new Map<string, Resource[]>();

  for (const r of resources) {
    const loc = (r.location || "").toLowerCase();
    let matched = false;
    for (const { pattern, name } of AREA_KEYWORDS) {
      if (pattern.test(loc)) {
        const list = areaResources.get(name) ?? [];
        list.push(r);
        areaResources.set(name, list);
        matched = true;
        break;
      }
    }
    if (!matched) {
      const name = "Tampa Bay (other)";
      const list = areaResources.get(name) ?? [];
      list.push(r);
      areaResources.set(name, list);
    }
  }

  const result: AreaBreakdown[] = [];
  for (const [name, list] of areaResources.entries()) {
    const count = list.length;
    const volume: "High" | "Medium" | "Low" =
      count >= 4 ? "High" : count >= 2 ? "Medium" : "Low";
    const byCategory = new Map<string, number>();
    for (const r of list) {
      const cat = normalizeCategory(r.category);
      byCategory.set(cat, (byCategory.get(cat) ?? 0) + 1);
    }
    const topCategory =
      [...byCategory.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Various";
    result.push({ name, volume, focus: topCategory, count });
  }

  return result.sort((a, b) => b.count - a.count).slice(0, 8);
}

/** Format a date for "Added X ago" display. */
export function formatRelativeTime(isoDate: string): string {
  try {
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return "In directory";
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000));
    const diffHours = Math.floor(diffMs / (60 * 60 * 1000));
    const diffMins = Math.floor(diffMs / (60 * 1000));
    if (diffDays >= 30) return "Added 30+ days ago";
    if (diffDays >= 1) return `Added ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
    if (diffHours >= 1) return `Added ${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    if (diffMins >= 1) return `Added ${diffMins} min ago`;
    return "Added just now";
  } catch {
    return "In directory";
  }
}
