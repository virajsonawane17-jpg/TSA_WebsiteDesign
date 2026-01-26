# Supabase Setup Guide

This guide will help you set up Supabase for the Tampa Community Resource Hub.

## Step 1: Create a Supabase Project

1. Go to [https://app.supabase.com](https://app.supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name**: Tampa Resource Hub (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to Tampa (e.g., `us-east-1`)
5. Click "Create new project" and wait for it to initialize (~2 minutes)

## Step 2: Get Your API Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 3: Configure Environment Variables

1. Open your `.env` file in the project root
2. Replace the placeholder values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase/migrations/001_initial_schema.sql` from this project
3. Copy the entire SQL content
4. Paste it into the SQL Editor in Supabase
5. Click "Run" to execute the migration
6. You should see "Success. No rows returned"

## Step 5: Seed the Database

1. Make sure your `.env` file has the correct Supabase credentials
2. Run the seed script:
   ```bash
   bun run seed
   ```
3. You should see success messages for resources, news, and events

## Step 6: Verify Setup

1. In Supabase dashboard, go to **Table Editor**
2. You should see three tables: `resources`, `news`, and `events`
3. Each table should have data rows

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Make sure your `.env` file has `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Restart your dev server after updating `.env`

### Error: "relation does not exist"
- Make sure you ran the migration SQL in Step 4
- Check that the tables were created in the Table Editor

### Error: "new row violates row-level security policy"
- The migration includes RLS policies for public read access
- If you see this error, check that the policies were created correctly

### Seed script fails
- Verify your Supabase credentials are correct
- Check that the migration was successful
- Ensure you have internet connectivity

## Next Steps

Once setup is complete:
- The app will automatically fetch data from Supabase
- You can manage resources, news, and events through the Supabase dashboard
- Or use the Supabase API to add/edit data programmatically

## Database Schema

- **resources**: Community organizations and support services
- **news**: Local news articles and updates
- **events**: Community events and gatherings

All tables support:
- Public read access (anyone can view)
- Automatic `updated_at` timestamp updates
- Indexed fields for better query performance
