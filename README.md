# HeatCloud Slovakia — product site

The commercial site for **HeatCloud Slovakia**: a cloud provider whose data
centres sell their waste heat into Slovak district heating networks. Service
catalogue, pricing, legal documents, and an interactive model of how the
business works.

**Live: https://mild-solvent.github.io/heatcloud/**

> **This is a preview.** The company is in formation and not incorporated. No
> service is operating, nothing can be ordered, there is no backend, and the
> identifiers in the legal notice are explicit placeholders rather than invented
> registration numbers. Every page says so at the top.

The research this is built on — the market study, the deployment model, the EU
funding stack and the kill criteria — is a separate repository:
[mild-solvent/heatcloud-slovakia](https://github.com/Mild-Solvent/heatcloud-slovakia)
([read the dossier](https://mild-solvent.github.io/heatcloud-slovakia/)).

## What is here

Next.js 16 (App Router) + Tailwind + TypeScript, exported to static HTML. 35
routes, no server, no database.

| Route | What it is |
| --- | --- |
| `/` | The pitch, the heat-flow diagram, the product grid |
| `/products/` + 14 pages | Cloud Servers, Public Cloud, Kubernetes, GPU Cloud, Object Storage, Databases, Backup, Web Hosting, Domains, Streaming, hSuite, hMail, hDrive, Heat Offtake |
| `/pricing/` | Every plan in one filterable table, with VAT and annual-billing toggles |
| **`/business/`** | **The interactive unit-economics model** — sliders for load, utilisation, compute price, power price, gas price, discount, offtake and heat-pump COP; live EBITDA, revenue split, sensitivity table, and a with/without-heat comparison |
| **`/console/`** | **A mock of the customer console** — instances, storage, invoice, and a heat-contribution tab |
| `/heat/`, `/datacenters/`, `/about/`, `/support/`, `/contact/` | The rest |
| `/legal/` + 7 documents | Terms, AUP, SLA, Privacy, DPA, Cookies, Legal notice |

Everything is clickable and the interactive parts run in the browser. What does
not exist is a backend: the contact form composes a `mailto:` in your own mail
client, and the console shows fixed illustrative data.

The legal texts are drafts written to Slovak and EU shape (Act 22/2004 on
electronic commerce, Act 102/2014 on consumer distance contracts, Act 431/2002
on accounting, GDPR Articles 28/32/33, EED 2023/1791 for the heat side). **No
advocate has reviewed them.** Each document says so at the top.

## Where the content lives

| File | What it holds |
| --- | --- |
| `content/services.ts` | The whole catalogue — one object per product. Drives the mega-menu, the product pages, `/pricing/` and the footer. Add an object and everything follows. |
| `content/legal.ts` | The seven legal documents, as arrays of `{ h, body }` sections |
| `content/company.ts` | Brand, placeholder legal identity, regions, reference figures |
| `components/BusinessModel.tsx` | The interactive model, with every assumption as a named constant |
| `components/HeatFlow.tsx` | The hero diagram — electricity in, compute out of the top, heat out of the side |

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
project site; leave it unset to serve from a domain root.

## Deploying

**GitHub Pages** happens automatically: `.github/workflows/pages.yml` builds on
every push to `main` and publishes `out/`. The base path comes from
`actions/configure-pages`, so it follows the repository name.

**Anywhere else** — `deploy.sh` builds a Docker image that serves the same export
with nginx:

```sh
bash deploy.sh 8420        # binds to this machine's Tailscale address only
bash smoke.sh http://host:8420
node uitest.mjs http://host:8420
```

## Testing

- `smoke.sh` — 48 HTTP checks: every route, assets, `robots.txt`, 404 handling,
  and content spot checks.
- `uitest.mjs` — 20 browser checks with Playwright: drives the mega-menu, the
  model sliders, the console tabs, the VAT toggle and the FAQ accordions, then
  sweeps all 32 content routes at three viewport widths looking for horizontal
  overflow. Writes screenshots to `shots/`. Needs chromium once:
  `npx playwright@1.63.0 install chromium`.

Both take a base URL, so they can be pointed at the Pages deployment as easily as
at a local build.

## Not done yet

- **Slovak translation.** The dossier is bilingual; this is English only. Content
  is fully separated from components, so a second locale is a content addition
  rather than a rewrite — but a Slovak provider's terms of business should exist
  in Slovak first.
- No backend, by design for now: no accounts, no ordering, no real console.
- No Open Graph image of its own; it borrows the dossier's.
