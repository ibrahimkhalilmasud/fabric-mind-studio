# Deployment Guide

## Vercel
1. Import the repository in Vercel.
2. Set `GEMINI_API_KEY` (optional) in project environment variables.
3. Framework preset: Next.js.
4. Build command: `npm run build`.
5. Output: default `.next`.

## Netlify
1. Create a new site from this repository.
2. Build command: `npm run build`.
3. Publish directory: `.next` with Netlify Next.js runtime.
4. Add optional env vars (`GEMINI_API_KEY`, `GEMINI_MODEL`).

## GitHub Pages (Static-lite)
GitHub Pages does not run Next.js API routes. For a static-lite demo:
1. Set `next.config.ts` with `output: "export"` in a Pages-specific branch/workflow.
2. Use direct client-side external APIs or host API routes on Vercel/Netlify.
3. Deploy `/out` to Pages.
