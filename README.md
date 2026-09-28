# Aurelia Estates

Premium frontend-only real estate showcase built with Next.js, TypeScript, and Tailwind CSS.

## Brand

**AURELIA ESTATES** — Find a space that feels like home.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local static property data + localStorage

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Deploy on Vercel

1. Import the GitHub repo `eteam5634-sudo/real-estate`.
2. In **Project Settings → Build and Deployment**:
   - **Framework Preset:** `Next.js` (not Other)
   - **Root Directory:** leave empty / `.`
   - **Build Command:** `npm run build` (or leave default)
   - **Output Directory:** leave **empty** (do not set `public`, `.next`, `out`, or `build`)
3. Redeploy.

If the live URL shows Vercel’s `404: NOT_FOUND` page after a “successful” deploy, the Framework Preset or Output Directory is wrong — fix the settings above and redeploy.

## Notes

No backend, database, authentication, or API routes. Favorites, compare, and theme preferences persist in the browser via localStorage. Contact and viewing requests open WhatsApp.
