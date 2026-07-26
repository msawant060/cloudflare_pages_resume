# Cloudflare Pages Deployment Guide

## Quick Start

### Option 1: Deploy with GitHub Integration (Recommended)

1. **Push to GitHub:**
   ```bash
   git push origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages → Create a project
   - Select "Connect to Git"
   - Authorize GitHub and select this repository
   - Configure build settings:
     - Framework: None (CRA)
     - Build command: `npm run build`
     - Build output directory: `build`
   - Deploy!

### Option 2: Deploy with Wrangler CLI

1. **Install Wrangler:**
   ```bash
   npm install -g wrangler
   ```

2. **Build the app:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   ```bash
   wrangler pages deploy build
   ```

### Option 3: Drag & Drop

1. Build the app:
   ```bash
   npm run build
   ```

2. Go to Cloudflare Dashboard → Pages
3. Click "Upload assets" and select the `build` folder

## Environment Setup

The project is configured with:
- **Build output directory:** `build/`
- **Build command:** `npm run build`
- **Routing:** SPA routing configured via `_redirects`
- **Security headers:** Set via `_headers` file
- **Caching:** Optimized for static assets and index.html

## Important Notes

- The `_redirects` file ensures all routes fall back to `index.html` (required for React Router)
- The `_headers` file includes security headers and cache control
- Environment variables can be set in Cloudflare Pages dashboard under "Settings → Environment variables"
- The app uses React v18.2.0 with Tailwind CSS

## Preview Deployments

Every git push creates an automatic preview deployment. Once connected to GitHub via Cloudflare Pages, you'll get:
- Preview URL for each PR
- Staging deployments
- Automatic production deployment on merge to main

## Custom Domain

After deployment:
1. Go to your Pages project in Cloudflare
2. Click "Custom domains"
3. Add your domain
4. Follow DNS setup instructions

## Performance Tips

- Static assets in `public/_static` are cached for 1 year
- `index.html` is cached for 0 seconds (always fresh)
- Consider enabling Cloudflare Workers KV for dynamic content if needed
- Use Cloudflare Analytics for monitoring

For more info: https://developers.cloudflare.com/pages/
