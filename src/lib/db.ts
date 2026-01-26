import { supabase, isSupabaseConfigured } from './supabase';
import { Resource, NewsItem, CommunityEvent, TAMPA_RESOURCES, TAMPA_NEWS, TAMPA_EVENTS } from './resources';

// Transform database row to Resource interface
function transformResource(row: any): Resource {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    longDescription: row.long_description || undefined,
    category: row.category as any,
    audiences: row.audiences as any[],
    location: row.location,
    lat: row.lat,
    lng: row.lng,
    phone: row.phone,
    email: row.email || undefined,
    website: row.website,
    featured: row.featured || false,
  };
}

// Transform database row to NewsItem interface
function transformNews(row: any): NewsItem {
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content || undefined,
    date: row.date,
    source: row.source,
    category: row.category,
    imageUrl: row.image_url || undefined,
    link: row.link,
  };
}

// Transform database row to CommunityEvent interface
function transformEvent(row: any): CommunityEvent {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: row.date,
    time: row.time,
    location: row.location,
    category: row.category,
    imageUrl: row.image_url || undefined,
    link: row.link,
    featured: row.featured || false,
  };
}

/**
 * Fetch all resources from Supabase (or return static data as fallback)
 */
export async function getResources(): Promise<Resource[]> {
  // Fallback to static data if Supabase is not configured
  if (!isSupabaseConfigured() || !supabase) {
    return TAMPA_RESOURCES;
  }

  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('featured', { ascending: false })
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching resources:', error);
      return TAMPA_RESOURCES; // Fallback to static data
    }

    return data.map(transformResource);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return TAMPA_RESOURCES; // Fallback to static data
  }
}

/**
 * Fetch a single resource by ID (or return from static data as fallback)
 */
export async function getResourceById(id: string): Promise<Resource | null> {
  // Fallback to static data if Supabase is not configured
  if (!isSupabaseConfigured() || !supabase) {
    return TAMPA_RESOURCES.find(r => r.id === id) || null;
  }

  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching resource:', error);
      return TAMPA_RESOURCES.find(r => r.id === id) || null; // Fallback
    }

    return data ? transformResource(data) : null;
  } catch (error) {
    console.error('Error fetching resource:', error);
    return TAMPA_RESOURCES.find(r => r.id === id) || null; // Fallback
  }
}

/**
 * Fetch featured resources (or return from static data as fallback)
 */
export async function getFeaturedResources(limit: number = 6): Promise<Resource[]> {
  // Fallback to static data if Supabase is not configured
  if (!isSupabaseConfigured() || !supabase) {
    return TAMPA_RESOURCES.filter(r => r.featured).slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('featured', true)
      .limit(limit)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching featured resources:', error);
      return TAMPA_RESOURCES.filter(r => r.featured).slice(0, limit); // Fallback
    }

    return data.map(transformResource);
  } catch (error) {
    console.error('Error fetching featured resources:', error);
    return TAMPA_RESOURCES.filter(r => r.featured).slice(0, limit); // Fallback
  }
}

/**
 * Fetch all news items from Supabase (or return static data as fallback)
 */
export async function getNews(limit?: number): Promise<NewsItem[]> {
  // Fallback to static data if Supabase is not configured
  if (!isSupabaseConfigured() || !supabase) {
    return limit ? TAMPA_NEWS.slice(0, limit) : TAMPA_NEWS;
  }

  try {
    let query = supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching news:', error);
      return limit ? TAMPA_NEWS.slice(0, limit) : TAMPA_NEWS; // Fallback
    }

    return data.map(transformNews);
  } catch (error) {
    console.error('Error fetching news:', error);
    return limit ? TAMPA_NEWS.slice(0, limit) : TAMPA_NEWS; // Fallback
  }
}

/**
 * Fetch all events from Supabase (or return static data as fallback)
 */
export async function getEvents(): Promise<CommunityEvent[]> {
  // Fallback to static data if Supabase is not configured
  if (!isSupabaseConfigured() || !supabase) {
    return TAMPA_EVENTS;
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
      .order('time', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return TAMPA_EVENTS; // Fallback
    }

    return data.map(transformEvent);
  } catch (error) {
    console.error('Error fetching events:', error);
    return TAMPA_EVENTS; // Fallback
  }
}

/**
 * Fetch featured events (or return from static data as fallback)
 */
export async function getFeaturedEvents(limit: number = 3): Promise<CommunityEvent[]> {
  // Fallback to static data if Supabase is not configured
  if (!isSupabaseConfigured() || !supabase) {
    return TAMPA_EVENTS.filter(e => e.featured).slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('featured', true)
      .limit(limit)
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching featured events:', error);
      return TAMPA_EVENTS.filter(e => e.featured).slice(0, limit); // Fallback
    }

    return data.map(transformEvent);
  } catch (error) {
    console.error('Error fetching featured events:', error);
    return TAMPA_EVENTS.filter(e => e.featured).slice(0, limit); // Fallback
  }
}
