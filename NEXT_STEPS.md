# Next Steps After Supabase Setup

## ✅ You've Completed:
1. ✅ Created Supabase project
2. ✅ Added credentials to `.env`
3. ✅ Ran the initial migration

## 🔧 Action Required: Update Database Schema & Add INSERT Policies

Since the database schema was updated to use TEXT IDs instead of UUIDs, you need to:

### Option 1: Drop and Recreate Tables (Recommended if no important data)

1. Go to your Supabase dashboard → **SQL Editor**
2. Run this to drop existing tables:
```sql
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS news CASCADE;
DROP TABLE IF EXISTS events CASCADE;
```

3. Then run the updated migration from `supabase/migrations/001_initial_schema.sql` (it now uses TEXT IDs)

4. Add INSERT policies:
```sql
CREATE POLICY "Allow insert on resources" ON resources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert on news" ON news
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert on events" ON events
  FOR INSERT WITH CHECK (true);
```

### Option 2: Just Add INSERT Policies (If tables already exist)

If you want to keep your current setup, just add the INSERT policies above.

## 🌱 Seed the Database

After running the SQL above, run the seed script:

```bash
bun run seed
```

You should see:
```
✅ Seeded 12 resources
✅ Seeded 4 news items
✅ Seeded 4 events
✨ Database seeding completed successfully!
```

## 🚀 Verify Everything Works

1. **Check your database** in Supabase dashboard → **Table Editor**
   - You should see data in `resources`, `news`, and `events` tables

2. **Restart your dev server** (if running):
   ```bash
   bun run dev
   ```

3. **Test the website** - The app will now fetch data from Supabase instead of static data!

## 📝 What's Next?

The app is now configured to use Supabase! All data fetching functions in `src/lib/db.ts` will:
- Fetch from Supabase when configured ✅
- Fall back to static data if Supabase is unavailable

You can now:
- Manage data through Supabase dashboard
- Add/edit resources, news, and events via the Supabase API
- The website will automatically display data from your database
