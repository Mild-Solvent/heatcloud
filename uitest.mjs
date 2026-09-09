// Browser check: does the thing actually work when a person uses it?
// Run on the devbox:  node uitest.mjs [base-url]
//   npx playwright install chromium   (once)
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.argv[2] || 'http://100.71.253.33:8430';
const SHOTS = new URL('./shots/', import.meta.url).pathname;
mkdirSync(SHOTS, { recursive: true });

let fails = 0;
const ok = (name, cond, detail = '') => {
  console.log(`  ${cond ? 'ok   ' : 'FAIL '} ${name}${detail ? '  — ' + detail : ''}`);
  if (!cond) fails++;
};

const browser = await chromium.launch();
const errors = [];

async function newPage(width = 1440, height = 900) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') errors.push(`${page.url()} :: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push(`${page.url()} :: ${e.message}`));
  return { ctx, page };
}

// ---------------------------------------------------------------- home + nav
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}01-home.png`, fullPage: false });

  ok('home h1 renders', (await page.locator('h1').first().innerText()).includes('heats Slovak towns'));

  // Mega menu
  await page.getByRole('button', { name: /^Products/ }).click();
  await page.waitForTimeout(250);
  const menuLinks = await page.locator('a[href*="/products/"]').count();
  ok('products mega-menu opens', await page.locator('text=All products').isVisible(), `${menuLinks} product links`);
  await page.screenshot({ path: `${SHOTS}02-megamenu.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
  ok('Escape closes the mega-menu', !(await page.locator('text=All products').isVisible()));

  await page.evaluate(() => window.scrollTo(0, 900));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SHOTS}03-home-products.png` });
  await ctx.close();
}

// -------------------------------------------------------------- business model
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/business/`, { waitUntil: 'networkidle' });
  await page.locator('text=Assumptions').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${SHOTS}04-business-model.png` });

  const ebitdaBefore = await page.locator('text=EBITDA / year').locator('xpath=..').innerText();
  const slider = page.getByLabel('IT load');
  await slider.focus();
  for (let i = 0; i < 10; i++) await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(300);
  const ebitdaAfter = await page.locator('text=EBITDA / year').locator('xpath=..').innerText();
  ok('moving the IT load slider changes EBITDA', ebitdaBefore !== ebitdaAfter,
    `${ebitdaBefore.split('\n')[1]} -> ${ebitdaAfter.split('\n')[1]}`);

  // Push offtake to zero: heat revenue must vanish and the delta must go to ~0.
  const offtake = page.getByLabel('Annual offtake');
  await offtake.focus();
  for (let i = 0; i < 25; i++) await page.keyboard.press('ArrowLeft');
  await page.waitForTimeout(300);
  const deltaText = await page.locator('text=What the heat adds').locator('xpath=..').innerText();
  ok('offtake at 0 removes the heat contribution', /\+?€0/.test(deltaText.replace(/\s/g, '')),
    deltaText.split('\n')[1]);
  await page.screenshot({ path: `${SHOTS}05-business-no-heat.png` });

  await page.getByRole('button', { name: 'Reset' }).click();
  await page.waitForTimeout(300);
  const resetText = await page.locator('text=EBITDA / year').locator('xpath=..').innerText();
  ok('reset restores the reference case', resetText === ebitdaBefore, resetText.split('\n')[1]);
  await ctx.close();
}

// -------------------------------------------------------------------- console
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/console/`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Heat contribution' }).click();
  await page.waitForTimeout(300);
  ok('console heat tab reveals the heat panel', await page.locator('text=heated about 20 flats').isVisible());
  await page.locator('text=heated about 20 flats').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${SHOTS}06-console-heat.png` });

  await page.getByRole('button', { name: 'Invoice' }).click();
  await page.waitForTimeout(300);
  ok('console invoice tab shows egress at zero', await page.locator('text=included').first().isVisible());
  await page.screenshot({ path: `${SHOTS}07-console-invoice.png` });
  await ctx.close();
}

// -------------------------------------------------------------------- pricing
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/pricing/`, { waitUntil: 'networkidle' });
  await page.locator('table').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const rowsAll = await page.locator('tbody tr').count();
  const firstPrice = await page.locator('tbody tr td:last-child').first().innerText();
  await page.getByLabel(/Show with 23% VAT/).check();
  await page.waitForTimeout(300);
  const vatPrice = await page.locator('tbody tr td:last-child').first().innerText();
  ok('VAT toggle changes the prices', firstPrice !== vatPrice, `${firstPrice.trim()} -> ${vatPrice.trim()}`);

  await page.getByRole('button', { name: 'Compute', exact: true }).click();
  await page.waitForTimeout(300);
  const rowsCompute = await page.locator('tbody tr').count();
  ok('group filter narrows the table', rowsCompute < rowsAll, `${rowsAll} -> ${rowsCompute} rows`);
  await page.screenshot({ path: `${SHOTS}08-pricing.png` });
  await ctx.close();
}

// ------------------------------------------------------------- product + legal
{
  const { ctx, page } = await newPage();
  await page.goto(`${BASE}/products/gpu-cloud/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}09-product-gpu.png` });
  ok('product page shows plans', (await page.locator('text=H200 ×8').count()) > 0);

  const faq = page.locator('details').first();
  await faq.locator('summary').click();
  await page.waitForTimeout(200);
  ok('FAQ accordion opens', await faq.evaluate((el) => el.hasAttribute('open')));

  await page.goto(`${BASE}/legal/terms/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}10-legal-terms.png` });
  const secs = await page.locator('h2').count();
  ok('terms document renders its sections', secs >= 19, `${secs} headings`);

  // A table of contents anchor must land on a real heading.
  await page.locator('nav[aria-label="Contents"] a').nth(5).click();
  await page.waitForTimeout(400);
  ok('table-of-contents anchors resolve', page.url().includes('#'), page.url().split('/').pop());
  await ctx.close();
}

// --------------------------------------------------------------------- mobile
{
  const { ctx, page } = await newPage(390, 844);
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${SHOTS}11-mobile-home.png` });
  const hScroll = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  ok('mobile home does not scroll horizontally', !hScroll);

  await page.getByRole('button', { name: 'Menu' }).click();
  await page.waitForTimeout(300);
  ok('mobile drawer opens', await page.locator('text=Console preview').isVisible());
  await page.screenshot({ path: `${SHOTS}12-mobile-menu.png` });
  await page.keyboard.press('Escape');

  await page.goto(`${BASE}/business/`, { waitUntil: 'networkidle' });
  const hScroll2 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  ok('mobile business page does not scroll horizontally', !hScroll2);
  await page.screenshot({ path: `${SHOTS}13-mobile-business.png`, fullPage: false });
  await ctx.close();
}

// ------------------------------------------- responsive sweep of every route
{
  const ROUTES = [
    '/', '/products/', '/pricing/', '/business/', '/console/', '/heat/',
    '/datacenters/', '/about/', '/support/', '/contact/', '/legal/',
    ...['cloud-servers','public-cloud','kubernetes','gpu-cloud','object-storage','databases',
        'backup','web-hosting','domains','streaming','hsuite','hmail','hdrive','heat-offtake']
      .map((s) => `/products/${s}/`),
    ...['terms','aup','sla','privacy','dpa','cookies','imprint'].map((d) => `/legal/${d}/`),
  ];
  for (const [w, h, name] of [[390, 844, 'mobile'], [768, 1024, 'tablet'], [1440, 900, 'desktop']]) {
    const { ctx, page } = await newPage(w, h);
    const bad = [];
    for (const route of ROUTES) {
      await page.goto(`${BASE}${route}`, { waitUntil: 'domcontentloaded' });
      const over = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      if (over > 1) bad.push(`${route} (+${over}px)`);
    }
    ok(`no horizontal overflow on ${ROUTES.length} routes at ${name} (${w}px)`, bad.length === 0, bad.join(', '));
    await ctx.close();
  }
}

await browser.close();

console.log('\n== console errors ==');
if (errors.length) { errors.forEach((e) => console.log('  ' + e)); fails += errors.length; }
else console.log('  none');

console.log(`\n${fails ? `FAIL — ${fails} problem(s)` : 'PASS — all UI checks green'}`);
process.exit(fails ? 1 : 0);
