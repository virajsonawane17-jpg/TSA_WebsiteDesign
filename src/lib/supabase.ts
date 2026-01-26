import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create Supabase client only if credentials are available
// This allows the app to work with static data as fallback
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const isSupabaseConfigured = () => {
  return supabase !== null;
};

// Database types matching our interfaces
export type Database = {
  public: {
    Tables: {
      resources: {
        Row: {
          id: string;
          name: string;
          description: string;
          long_description: string | null;
          category: string;
          audiences: string[];
          location: string;
          lat: number;
          lng: number;
          phone: string;
          email: string | null;
          website: string;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          long_description?: string | null;
          category: string;
          audiences: string[];
          location: string;
          lat: number;
          lng: number;
          phone: string;
          email?: string | null;
          website: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          long_description?: string | null;
          category?: string;
          audiences?: string[];
          location?: string;
          lat?: number;
          lng?: number;
          phone?: string;
          email?: string | null;
          website?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      news: {
        Row: {
          id: string;
          title: string;
          excerpt: string;
          content: string | null;
          date: string;
          source: string;
          category: string;
          image_url: string | null;
          link: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          excerpt: string;
          content?: string | null;
          date: string;
          source: string;
          category: string;
          image_url?: string | null;
          link: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          excerpt?: string;
          content?: string | null;
          date?: string;
          source?: string;
          category?: string;
          image_url?: string | null;
          link?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      events: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          category: string;
          image_url: string | null;
          link: string;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          date: string;
          time: string;
          location: string;
          category: string;
          image_url?: string | null;
          link: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          date?: string;
          time?: string;
          location?: string;
          category?: string;
          image_url?: string | null;
          link?: string;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};
