# Surgiquip

Website for **Surgiquip Solutions, Inc.** — a 43-year-old Houston medical device distributor (authorized Skytron dealer for Southeast Texas).

🔗 **Production:** https://surgiquipsolutions.com (TBD — pending DNS cutover)
🔗 **Progress page (client-facing):** https://htek.dev/proposals/surgiquip/progress (password `surgiquip2026`)

## Stack

- **Astro** v6 (SSG)
- **Tailwind CSS** v4
- **Vercel** (hosting + serverless functions)
- **Fonts:** Playfair Display + Inter

## Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # build to ./dist
npm run preview    # preview production build
```

## Project Structure

```
src/
├── pages/          # Astro pages (homepage + Products/Services/Projects/About/Contact/Quote)
├── components/     # Header, Footer, Hero, StatBar, ServicesGrid, PartnerLogos, Logo
├── layouts/        # BaseLayout, StubPage
├── data/           # site.ts (NAP, brand strings, nav, services, stats, partners)
└── styles/         # global.css (Tailwind v4 theme tokens)
public/             # robots.txt, favicon, static assets
api/                # Vercel serverless (quote-request.ts)
```

## Brand Tokens

| Token | Hex |
|-------|-----|
| Primary navy | `#0a2c5e` |
| Primary navy dark | `#061e42` |
| Accent blue | `#1e6fd9` |

## Workflow

- **Branch + PR + Vercel preview** for ALL changes — never push to `main` directly
- Hector reviews preview URLs before merge
- No direct client communication — always through Hector

## Project Spec & Backlog

Full Phase 1 spec lives in the rocha-family repo:
- `data/specs/surgiquip-website-v1.md` — backlog + acceptance criteria
- `data/specs/surgiquip-v1.md` — multi-phase proposal spec
- `data/agents/surgiquip/` — agent memory (core/working/long-term)

## Client

- **Sponsor:** Carla
- **Tech contact:** Lance
- **Owner:** Gerardo
- **HQ:** 10653 Kinghurst Drive, Houston, TX 77099
- **Phone:** (713) 681-6362

## License

© Surgiquip Solutions, Inc. All rights reserved.
