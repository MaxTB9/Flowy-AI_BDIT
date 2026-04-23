# FLOWY AI

> The operating system for all-inclusive resorts — connecting guest experience, operations, and sustainability into one AI platform.

---

## ⚠️ Disclaimer

**This is a non-functional academic mock-up built for a university group project.**
There is no backend, no database, no real machine learning, and no live integrations. Every "AI" output, KPI value, and chart datapoint is hard-coded scripted data. Do not use, deploy, or share this as a real product.

---

## What this is

A static React website that *looks* like a working resort-management AI platform. It demonstrates the **end-to-end story** between two surfaces of the same product:

- **`/guest`** — a guest mobile app rendered inside a phone frame
- **`/ops`** — an operations dashboard rendered inside a laptop frame

Both surfaces share a single in-memory Zustand store, so an action on one screen visibly updates the other in real time. That's how the demo "sells" the illusion.

## Tech stack

- **Vite** + **React 18** + **TypeScript** (strict, no `any`)
- **Tailwind CSS** (custom theme: navy `#0B3B5C`, sand `#C9A36A`)
- **React Router** (3 routes: `/`, `/guest`, `/ops`)
- **Zustand** for shared in-memory state
- **Recharts** for all charts (funnel, bar, line)
- **lucide-react** for icons
- **framer-motion** for subtle transitions

No backend. No `localStorage`. Static build deployable to Vercel or Netlify.

## How to run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # outputs to dist/
npm run preview      # preview the production build
```

## Project structure

```
src/
├── pages/           Landing, Guest, Ops
├── components/
│   ├── PhoneFrame, LaptopFrame, PageTransition,
│   ├── AnimatedNumber, DemoPanel
│   ├── guest/       TabBar + 5 tab views
│   └── ops/         Sidebar + 6 dashboard views
├── state/           store.ts (single Zustand store)
└── data/            scripted.ts, opsData.ts (all hard-coded fixtures)
```

## The 3-minute defense demo script

A hidden demo panel ships with the build. **Press `D` anywhere** to toggle it; it gives you one-click control over the key state changes so the demo is reproducible.

### Act 1 — The pitch (≈30 s) · `/`
Open the landing page. Read the tagline aloud:
> "FLOWY AI is the operating system for all-inclusive resorts — one AI platform connecting guest experience, operations, and sustainability."

Click **Open the Guest App**.

### Act 2 — The guest (≈60 s) · `/guest`
1. **Home tab**: greet *Maria, Gold member, room 214*. Point out the three AI-recommended services with their *match reasons*.
2. Tap **Book now** on the **Sunset Catamaran Tour**. (Or hit `D` → "Book catamaran".)
3. Hop to the **Room** tab — slide the temperature, tap **Skip cleaning today**.
4. Skim the **Concierge** tab to show the AI chat with prompt chips.

### Act 3 — The ops side (≈60 s) · `/ops`
Open `/ops` in a second tab.
1. **Overview**: notice **Revenue today** has ticked up by €85 — that's Maria's catamaran. Point at the resort map.
2. **Revenue**: show the conversion funnel and the *Inside Flowy AI vs External leakage* bar chart.
3. **Operations**: Maria's "skip cleaning" request appears at the top of the housekeeping task list.

### Act 4 — The crisis (≈30 s)
1. Go to **Sustainability**. Click the small **"Trigger leak alert"** link in the header. (Or hit `D` → "Trigger leak alert".)
2. A red anomaly appears, and a banner rises in the top bar: **"Resolve leak alert & notify guest"**. Click it.
3. Cut back to `/guest` → **Concierge** tab. The resort has already messaged Maria with an apology and a €40 spa credit. *That's the loop closing.*

## Deploying

### Vercel (recommended)

The repo includes [`vercel.json`](./vercel.json) for SPA-fallback routing.

```bash
npm install -g vercel
vercel login
vercel              # preview deployment
vercel --prod       # production
```

Or push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite and uses `npm run build` → `dist/`.

### Netlify

The repo includes [`netlify.toml`](./netlify.toml) with the same SPA fallback.

```bash
npm install -g netlify-cli
netlify login
netlify deploy --build           # preview
netlify deploy --build --prod    # production
```

Or drag-and-drop the `dist/` folder into the Netlify dashboard after `npm run build`.

## Design system

| Token       | Value      |
|-------------|------------|
| Primary     | `#0B3B5C` (navy) |
| Accent      | `#C9A36A` (sand) |
| Canvas      | `#FFFFFF` |
| Muted text  | `#6B7280` |
| Font        | Inter (Google Fonts) |
| Grid        | 8 px |
| Card radius | `rounded-2xl` |
| Shadow      | soft, low-contrast (`shadow-soft`) |

## Constraints we held to

- Strict TypeScript, no `any`.
- Every "AI" output annotated `// SCRIPTED: deterministic mock for demo`.
- Components stay under ~200 lines.
- No `localStorage`/`sessionStorage` — state lives in Zustand only.
- Works fully offline once loaded.

---

*Built for academic purposes only. Not a real product.*
