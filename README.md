# HEATCLOUDE LANDING

Private working repository for the **HeatCloud Slovakia landing page and investor pitch**. Slovak and English, an animated 16-slide presentation, and a responsive Next.js site about cloud infrastructure with local waste-heat recovery.

The pitch presents an investment concept: validate customers, prepare a 250–300 kW pilot, find a suitable site and obtain supplier quotes before committing to construction. Budgets and revenue scenarios are planning assumptions, not secured funding or supplier offers.

## Start here

```sh
npm ci
npm run dev
```

- Landing: http://localhost:8431/sk/
- Investor pitch: http://localhost:8431/sk/investors/
- English pitch: http://localhost:8431/en/investors/
- Controls: arrows to navigate, O for slide overview, F for fullscreen; direct slide links use `#1` through `#16`.
- Verification: `npm run typecheck` and `npm run build`.

Current pitch content: `components/deck/PitchSlides.tsx`; design: `components/deck/pitch.css`; navigation: `components/deck/Deck.tsx`. Landing content lives in `content/landing.ts` and `components/InvestorLanding.tsx`.

Read the [Kaskáda claim review](docs/kaskada-review-2026-09-13.md) for checked sources, identified errors and the changes adopted into the pitch. The older business calculator and legal drafts below have not been validated as investment or legal advice by that review.

Repository visibility is private. GitHub Pages is manual only; pushing code does not publish the website. The original source project is [Mild-Solvent/heatcloud](https://github.com/Mild-Solvent/heatcloud). Historical implementation notes follow; the pitch module described above supersedes the original deck.

---

## Original project notes

The commercial site for **HeatCloud Slovakia**: a cloud provider whose data
centres sell their waste heat into Slovak district heating networks. Service
catalogue, pricing, legal documents, and an interactive model of how the
business works — in Slovak and in English.

**Original upstream preview: https://mild-solvent.github.io/heatcloud/**

> **This is a preview.** The company is in formation and not incorporated. No
> service is operating, nothing can be ordered, there is no backend, and the
> identifiers in the legal notice are explicit placeholders rather than invented
> registration numbers. Every page says so at the top.

The research this is built on — the market study, the deployment model, the EU
funding stack and the kill criteria — is a separate repository:
[mild-solvent/heatcloud-slovakia](https://github.com/Mild-Solvent/heatcloud-slovakia)
([read the dossier](https://mild-solvent.github.io/heatcloud-slovakia/)).

## What is here

Next.js 16 (App Router) + Tailwind + TypeScript, exported to static HTML. Two
languages, 71 routes, no server, no database.

| Route | What it is |
| --- | --- |
| `/` | Picks a language from the browser (`/en/` for English browsers, `/sk/` otherwise) — a script, a meta refresh fallback, and two links |
| `/sk/…`, `/en/…` | The whole site, once per language. The header switch takes you to the same page in the other one |
| `/{lang}/` | The photograph, the pitch, the heat-flow diagram, the product list |
| `/{lang}/products/` + 14 pages | Cloud Servers, Public Cloud, Kubernetes, GPU Cloud, Object Storage, Databases, Backup, Web Hosting, Domains, Streaming, hSuite, hMail, hDrive, Heat Offtake |
| `/{lang}/pricing/` | Every plan in one filterable table, with VAT and annual-billing toggles |
| **`/{lang}/business/`** | **The interactive unit-economics model** — sliders for load, utilisation, compute price, power price, gas price, discount, offtake and heat-pump COP; live EBITDA, revenue split, sensitivity table, and a with/without-heat comparison |
| **`/{lang}/console/`** | **A mock of the customer console** — instances, storage, invoice, and a heat-contribution tab |
| `/{lang}/heat/`, `/datacenters/`, `/about/`, `/support/`, `/contact/` | The rest |
| `/{lang}/legal/` + 7 documents | Terms, AUP, SLA, Privacy, DPA, Cookies, Legal notice |
| **`/{lang}/investors/`** | **The investor presentation** — a full-screen deck of 16 slides driven by keyboard, wheel, swipe and buttons, with its own root layout (no site header): the model, seven precedents abroad on a map, the regulatory tailwind, what a district town gets, the unit economics, the financing of the two halves, the plan, the risks, the ask, the sources. `#7` in the URL opens slide 7; F is full screen. Photographs are optional: drop `public/deck/cover.jpg`, `close.jpg` or `town.jpg` in place and the slides pick them up (the hero photo stands in until then) |
| `404.html` | Bilingual, because a static server cannot know which language was wanted |

Everything is clickable and the interactive parts run in the browser. What does
not exist is a backend: the contact form composes a `mailto:` in your own mail
client, and the console shows fixed illustrative data.

The legal texts are drafts written to Slovak and EU shape (Act 22/2004 on
electronic commerce, Act 102/2014 on consumer distance contracts, Act 431/2002
on accounting, GDPR Articles 28/32/33, EED 2023/1791 for the heat side). The
Slovak versions are translations of the same drafts. **No advocate has reviewed
either language.** Each document says so at the top.

## Design

Two colours, used for what they mean: **orange is heat**, **blue is water**.
Orange marks the hot side of the loop, the heat revenue line and the primary
action; blue marks the return loop, compute, and anything cool and running.
Everything else is warm paper and ink, hairlines rather than boxes, mono
captions rather than badges, and Fraunces for the headings over IBM Plex for the
text and figures. The fonts are fetched at build time by `next/font` and served
from the site's own files, so the cookie policy's "no third-party requests"
stays true.

The photograph on the home page is a visualisation of an intended site, not a
photograph of a built one. It says so in the caption and in the legal notice.
`public/hero.jpg` (1672 px) and `public/hero-1200.jpg` are the two sizes it is
served in; `public/og.jpg` is the 1200×630 crop used for link previews.

The mark — a ring, two heat waves, three water lines — is supplied artwork:
`public/logo.png` (1220 px, transparent) and `public/logo-white.png` are the
masters, `public/logo-256.png` is what the header and footer load, and
`icon-192.png`, `icon-512.png` and `apple-touch-icon.png` are the favicons cut
from it. The heat-flow illustration on the home and heat pages is hand-drawn
SVG in `components/HeatFlow.tsx`, in the same palette.

## Where the content lives

| File | What it holds |
| --- | --- |
| `content/i18n/en.ts`, `content/i18n/sk.ts` | Every string the pages and components show. `sk.ts` is typed against `en.ts`, so a key missing on either side fails `typecheck` |
| `content/services.en.ts`, `content/services.sk.ts` | The catalogue — one object per product in each language, same slugs, same plans. Prices are numbers and are formatted per locale (`€4.90` / `4,90 €`). Drives the mega-menu, the product list, the product pages, `/pricing/` and the footer |
| `content/legal.en.ts`, `content/legal.sk.ts` | The seven legal documents, as arrays of `{ h, body }` sections |
| `content/company.ts` | Brand, contact addresses, regions, reference figures (language-neutral) |
| `content/services.ts`, `content/legal.ts` | The per-locale accessors. They assert at import time that the two language files agree on slugs and plan counts |
| `lib/i18n.ts`, `lib/locale.tsx` | Locale list, href localisation, plural rules, and the `Link` that adds the language prefix so pages can keep writing `href="/pricing/"` |
| `components/BusinessModel.tsx` | The interactive model, with every assumption as a named constant |
| `components/HeatFlow.tsx` | The diagram — electricity in, compute out of the top, heat out of the side, water back |

Rich dictionary strings use a three-token markup rendered by
`components/RichText.tsx`: `[label](/path/)` for links, `**bold**`, `*italic*`.

### The model's assumptions

At the top of `components/BusinessModel.tsx`, and restated in the footnote on the
page: PUE 1.15, 95% heat recovery, €4/MWh thermal maintenance, €800k/MW/year
overhead opex, €6.8m/MW IT capex, €1.1m/MW thermal capex, 8.5 MWh/year per
Slovak flat, 0.202 t CO₂/MWh for displaced gas heat.

The default compute price is **€380/kW/month**, a cloud rate rather than a
wholesale colocation rate. This matters: at colocation rates the site does not
clear its costs on compute alone, and the thesis of the whole site is that it
must. Drag the slider down to watch that happen — and set annual offtake to zero
to see what the heat contract is actually worth.

## Developing

```sh
npm install
npm run dev        # http://localhost:8431
npm run build      # static export into out/
npm run typecheck
```

`npm run build` writes `out/`, a plain directory of HTML any web server can
serve. Set `NEXT_PUBLIC_BASE_PATH=/heatcloud` when building for a GitHub Pages
project site; leave it unset to serve from a domain root. The build needs
network access once, to fetch the fonts.

## Deploying

**GitHub Pages** is manual: `.github/workflows/pages.yml` only runs when explicitly
dispatched after Pages has been configured. The base path comes from
`actions/configure-pages`, so it follows the repository name.

**Anywhere else** — `deploy.sh` builds a Docker image that serves the same export
with nginx:

```sh
bash deploy.sh 8420        # binds to this machine's Tailscale address only
bash smoke.sh http://host:8420
node uitest.mjs http://host:8420
```

## Testing

- `smoke.sh` — HTTP checks over both languages: every route, assets,
  `robots.txt`, the root redirect, the bilingual 404, the language switch, and
  content spot checks.
- `uitest.mjs` — browser checks with Playwright: the root redirect, the
  mega-menu, the language switch, the model sliders, the console tabs, the VAT
  toggle, the FAQ accordions, locale-prefixed cross-links inside the legal
  documents, then a sweep of all 64 content routes at three viewport widths
  looking for horizontal overflow. Writes screenshots to `shots/`. Needs
  chromium once: `npx playwright@1.63.0 install chromium`.

Both take a base URL, so they can be pointed at the Pages deployment as easily as
at a local build.

## Not done yet

- No backend, by design for now: no accounts, no ordering, no real console.
- The Slovak legal texts are translations of unreviewed English drafts. A Slovak
  provider's terms of business should be drafted in Slovak by a Slovak advocate,
  and the English derived from that — the reverse of what exists here.
- `hreflang` alternates are not emitted; the site is `noindex` while it is a
  preview, so nothing reads them yet.
