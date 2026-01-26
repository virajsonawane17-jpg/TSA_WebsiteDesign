import { createClient } from '@supabase/supabase-js';
import { TAMPA_RESOURCES, TAMPA_NEWS, TAMPA_EVENTS } from '../src/lib/resources';

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seedDatabase() {
  console.log('🌱 Starting database seed...\n');

  try {
    // Seed Resources
    console.log('📦 Seeding resources...');
    const resourceData = TAMPA_RESOURCES.map((resource) => ({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      long_description: resource.longDescription || null,
      category: resource.category,
      audiences: resource.audiences,
      location: resource.location,
      lat: resource.lat,
      lng: resource.lng,
      phone: resource.phone,
      email: resource.email || null,
      website: resource.website,
      featured: resource.featured || false,
    }));

    const { data: resources, error: resourcesError } = await supabase
      .from('resources')
      .upsert(resourceData, { onConflict: 'id' });

    if (resourcesError) {
      console.error('❌ Error seeding resources:', resourcesError);
    } else {
      console.log(`✅ Seeded ${resourceData.length} resources`);
    }

    // Seed News
    console.log('\n📰 Seeding news...');
    const newsData = TAMPA_NEWS.map((news) => ({
      id: news.id,
      title: news.title,
      excerpt: news.excerpt,
      content: news.content || null,
      date: news.date,
      source: news.source,
      category: news.category,
      image_url: news.imageUrl || null,
      link: news.link,
    }));

    const { data: news, error: newsError } = await supabase
      .from('news')
      .upsert(newsData, { onConflict: 'id' });

    if (newsError) {
      console.error('❌ Error seeding news:', newsError);
    } else {
      console.log(`✅ Seeded ${newsData.length} news items`);
    }

    // Seed Events
    console.log('\n🎉 Seeding events...');
    const eventData = TAMPA_EVENTS.map((event) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      image_url: event.imageUrl || null,
      link: event.link,
      featured: event.featured || false,
    }));

    const { data: events, error: eventsError } = await supabase
      .from('events')
      .upsert(eventData, { onConflict: 'id' });

    if (eventsError) {
      console.error('❌ Error seeding events:', eventsError);
    } else {
      console.log(`✅ Seeded ${eventData.length} events`);
    }

    console.log('\n✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
