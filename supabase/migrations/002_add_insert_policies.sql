-- Add INSERT policies to allow seeding and admin operations
-- Note: In production, you may want to restrict this to authenticated users only

CREATE POLICY "Allow insert on resources" ON resources
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert on news" ON news
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow insert on events" ON events
  FOR INSERT WITH CHECK (true);
