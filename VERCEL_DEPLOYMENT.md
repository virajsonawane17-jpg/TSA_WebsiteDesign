# Vercel Deployment Guide

## Prerequisites
- ✅ Code pushed to GitHub repository
- ✅ Supabase project created and configured
- ✅ Database migrations run and data seeded

## Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `virajsonawane17-jpg/TSA_WebsiteDesign`
4. Vercel will auto-detect Next.js

## Step 2: Configure Build Settings

Vercel should auto-detect:
- **Framework Preset**: Next.js
- **Build Command**: `bun run build` (or `npm run build`)
- **Install Command**: `bun install` (or `npm install`)
- **Output Directory**: `.next`

## Step 3: Add Environment Variables

In Vercel project settings → Environment Variables, add:

### Required Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://voldogczadjummawhide.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_CPcj-vrCuokJi7RUvOa_zw_OqFzDILI
NEXT_PUBLIC_NEWS_API_KEY=pub_c79e898c6b254a8fb4f0103e44129941
```

### Optional Variables:
```
NEWS_API_KEY=pub_c79e898c6b254a8fb4f0103e44129941
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key_here
```

**Important**: 
- Add these for **Production**, **Preview**, and **Development** environments
- Never commit `.env` file to git (already in `.gitignore`)

## Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your site will be live at: `https://your-project.vercel.app`

## Step 5: Verify Deployment

After deployment, check:
- ✅ Homepage loads correctly
- ✅ Resources page shows data from Supabase
- ✅ Events page displays events
- ✅ News page shows live news from API
- ✅ No console errors

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Verify Supabase credentials are correct

### Database Connection Issues
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Check Supabase project is active
- Ensure RLS policies allow public read access

### API Errors
- Verify `NEXT_PUBLIC_NEWS_API_KEY` is set correctly
- Check API rate limits haven't been exceeded

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Pushes to `master` branch
- **Preview**: Pull requests and other branches

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Site loads without errors
- [ ] Database connections working
- [ ] API integrations functional
- [ ] All pages accessible
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)
