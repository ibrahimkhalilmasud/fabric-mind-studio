# Fabric Mind Studio

AI-powered fashion concept platform for couture teams, designers, and textile suppliers.

## Features
- AI Fashion Concept Generator (garment direction + marketing copy)
- AI Moodboard Generator (Pollinations image concepts + download + snapshot export)
- Fabric Intelligence Engine (silk, satin, chiffon, lace, jacquard, organza, velvet)
- Offline project recovery (IndexedDB with LocalStorage fallback)
- Export system (PDF design brief + JSON + moodboard snapshot)
- Premium dark glassmorphism UI with responsive layout and keyboard-accessible controls

## Stack
- Next.js App Router + TypeScript
- TailwindCSS + Framer Motion
- Zustand state management
- Next.js API routes
- Gemini API (optional) + Pollinations image generation

## Quick Start
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Environment
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
`GEMINI_API_KEY` is optional. Without it, the app falls back to deterministic local generation for offline usability.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run type-check`

## Deployment
See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel, Netlify, and GitHub Pages instructions.

## GitHub Setup Instructions
1. Push repository to GitHub.
2. Add optional repository secret/environment variable: `GEMINI_API_KEY`.
3. Connect repo in Vercel or Netlify.
4. Ensure Node 20+ runtime.

## License
MIT — see [LICENSE](./LICENSE).
