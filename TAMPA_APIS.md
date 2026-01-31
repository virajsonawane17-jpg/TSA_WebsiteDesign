# Tampa News & Events APIs

This project uses **Tampa-specific** data sources for news and events. No API keys are required for the City of Tampa official APIs.

## City of Tampa Official APIs

Documentation: [City of Tampa – Feeds Information](https://www.tampa.gov/info/rss-feeds)

### Events API

- **Event types (categories)**  
  `GET https://www.tampa.gov/taxonomy/terms/calendar_type`  
  Returns a JSON array of event categories (e.g. Public Meetings, Parks & Recreation).

- **Events by type**  
  `GET https://www.tampa.gov/mobile-feeds/events/{typeId}`  
  - `typeId`: `all` for all events, or a numeric `tid` from the taxonomy (e.g. `91`, `96`).  
  - Multiple types: `events/91+96`.

**Implementation:** `src/lib/tampa-api.ts` – `getTampaGovEvents()` fetches `events/all`, normalizes to the app’s `CommunityEvent` shape, and is used on the **Events** page together with DB/static events.

### News (RSS)

- **City of Tampa News and Press Releases**  
  `GET https://tampa.gov/news/feed`  
  RSS feed; parsed in-app to show title, link, date, description.

**Implementation:** `src/lib/tampa-api.ts` – `getTampaGovNews(limit)` fetches and parses the feed; the **News** page shows a “City of Tampa News & Press Releases” section.

## Other Data Sources

- **News (general Tampa):** [newsdata.io](https://newsdata.io) – `src/lib/api.ts` → `getTampaNews()`. Requires `NEXT_PUBLIC_NEWS_API_KEY` (or fallback key in code).
- **Events (curated):** Supabase `events` table and/or static `TAMPA_EVENTS` in `src/lib/resources.ts` – `src/lib/db.ts` → `getEvents()`.

## Caching

- Tampa Gov events: `revalidate = 900` (15 min) in `getTampaGovEvents()` and on the Events page.
- Tampa Gov news RSS: `revalidate = 3600` (1 hour) in `getTampaGovNews()`.
- News page: `revalidate = 3600`.

## Files

| Purpose              | File |
|----------------------|------|
| Tampa Gov API logic  | `src/lib/tampa-api.ts` |
| General news/weather | `src/lib/api.ts` |
| Events page (server) | `src/app/events/page.tsx` |
| Events UI (client)  | `src/app/events/events-content.tsx` |
| News page            | `src/app/news/page.tsx` |
