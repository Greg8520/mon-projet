// QA suite for the Apogée Men landing page (../lp).
//
//   cd qa && npm install && npm test        serves ../lp on a free local port and tests it
//   npm run test:live                        tests https://apogee-men-lp.vercel.app/
//   npm run shots                            also saves section screenshots to qa/out/
//
// Outside the Claude cloud environment, install the browser once: npx playwright install chromium
// Covers playbook Part C (build contract) and Part D (QC lenses) checks that a machine can verify.
// Message match, claim wording and offer decisions still need a human (APOGEE-REGLES.md, checklist).

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const here = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(here, '../lp');
const OUT = path.join(here, 'out');
const SHOTS = process.argv.includes('--shots');
const LIVE = process.env.LP_URL || '';
const AXE = fs.readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');

const PRICE = '49,00 €';
const results = [];
function check(ok, name, detail = '') {
  results.push({ ok, name });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ::  ' + detail : ''}`);
}

// ---------- tiny static server for ../lp ----------
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8',
  '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.json': 'application/json'
};
function serve() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, 'http://local').pathname);
      if (p.endsWith('/')) p += 'index.html';
      const file = path.join(ROOT, path.normalize(p));
      if (!file.startsWith(ROOT + path.sep) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
        res.writeHead(404); res.end('not found'); return;
      }
      res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
      fs.createReadStream(file).pipe(res);
    });
    server.listen(0, '127.0.0.1', () => resolve(server));
  });
}

const server = LIVE ? null : await serve();
const URL_ = LIVE || `http://127.0.0.1:${server.address().port}/`;
// In the Claude cloud environment, outbound HTTPS goes through HTTPS_PROXY; Chromium needs it passed explicitly.
const browser = await chromium.launch(LIVE && process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
if (SHOTS) fs.mkdirSync(OUT, { recursive: true });
console.log(`Testing ${URL_}\n`);

async function open(viewport, opts = {}) {
  const ctx = await browser.newContext({
    viewport, deviceScaleFactor: opts.dpr || 1, reducedMotion: 'reduce',
    isMobile: viewport.width < 600, hasTouch: viewport.width < 600, javaScriptEnabled: opts.js !== false
  });
  if (opts.init) await ctx.addInitScript(opts.init);
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(URL_, { waitUntil: 'networkidle' });
  if (opts.js !== false) await page.evaluate(() => document.fonts.ready);
  return { ctx, page, errors };
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
}

// ---------- 1. mobile 375 x 667: fold, layout, funnel ----------
{
  const { ctx, page: p, errors } = await open({ width: 375, height: 667 }, { dpr: 2 });
  const cta = await p.locator('.hero .btn--primary').boundingBox();
  check(cta.y + cta.height <= 667, 'Mobile 375x667: primary CTA inside the first viewport', `CTA bottom ${Math.round(cta.y + cta.height)}px`);
  const w = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  check(w[0] <= w[1], 'Mobile 375: no horizontal scroll', `${w[0]} / ${w[1]}`);

  await scrollThrough(p);
  const broken = await p.evaluate(() => [...document.images].filter((i) => !i.closest('[hidden]') && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc || i.src));
  check(broken.length === 0, 'All visible images load', broken.join(', '));
  const noDims = await p.evaluate(() => [...document.images].filter((i) => !i.getAttribute('width') || !i.getAttribute('height')).length);
  check(noDims === 0, 'Every <img> has width and height', `${noDims} without`);

  const small = await p.evaluate(() => [...document.querySelectorAll('a[href], button, [role="radio"], summary')].filter((el) => {
    if (el.closest('[hidden]') || el.closest('.drawer') || el.classList.contains('skip')) return false;
    if (getComputedStyle(el).display === 'inline') return false; // inline text links are exempt (WCAG 2.5.8)
    const r = el.getBoundingClientRect();
    return r.height > 0 && r.height < 44;
  }).map((el) => `${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 24)}"`));
  check(small.length === 0, 'Tap targets at least 44px', small.join(' | '));

  const prices = await p.evaluate(() => [...document.querySelectorAll('[data-price-display],[data-receipt-item],[data-receipt-total]')].map((e) => e.textContent));
  check(prices.every((t) => t === '49,00 €'), 'Static equals dynamic: every price reads 49,00 €', `${prices.length} prices`);

  await p.evaluate(() => window.scrollTo(0, document.querySelector('#mecanisme').offsetTop + 200));
  await p.waitForTimeout(400);
  const afterHero = await p.evaluate(() => document.querySelector('[data-sticky]').classList.contains('is-visible'));
  await p.evaluate(() => document.querySelector('#acheter').scrollIntoView());
  await p.waitForTimeout(400);
  const overBuy = await p.evaluate(() => document.querySelector('[data-sticky]').classList.contains('is-visible'));
  check(afterHero && !overBuy, 'Sticky CTA shows after the hero and hides over the buy block', `afterHero=${afterHero} overBuy=${overBuy}`);

  // funnel
  await p.evaluate(() => localStorage.clear());
  await p.reload({ waitUntil: 'networkidle' });
  await p.locator('[data-add]').click();
  await p.waitForTimeout(350);
  const opened = await p.evaluate(() => ({
    open: !document.querySelector('#panier').hidden,
    focus: document.activeElement.getAttribute('aria-label'),
    inert: document.querySelector('main').hasAttribute('inert'),
    href: document.querySelector('[data-checkout]').href
  }));
  check(opened.open && opened.focus === 'Fermer le panier' && opened.inert, 'Add to cart opens the dialog, focuses close, makes the page inert');
  const variant = await p.evaluate(() => document.querySelector('#buyform').dataset.variantId);
  const plan = await p.evaluate(() => document.querySelector('[data-plan]').dataset.sellingPlan);
  check(opened.href.endsWith(`/cart/${variant}:1?selling_plan=${plan}`), 'Checkout permalink carries variant, quantity and selling plan', opened.href);
  check(/^\d+$/.test(variant) && /^\d+$/.test(plan), 'Real Shopify IDs are set (not placeholders)', `variant=${variant} plan=${plan}`);

  let escaped = false;
  for (let i = 0; i < 12; i++) { await p.keyboard.press('Tab'); if (!(await p.evaluate(() => !!document.activeElement.closest('#panier')))) escaped = true; }
  check(!escaped, 'Focus trap keeps focus inside the drawer');
  await p.keyboard.press('Escape');
  await p.waitForTimeout(350);
  const closed = await p.evaluate(() => ({ hidden: document.querySelector('#panier').hidden, onAdd: document.activeElement.hasAttribute('data-add') }));
  check(closed.hidden && closed.onAdd, 'Escape closes the drawer and restores focus');

  await p.locator('[data-add]').click();
  await p.waitForTimeout(350);
  const merged = await p.evaluate(() => ({ lines: document.querySelectorAll('.line').length, badge: document.querySelector('[data-cart-count]').textContent, total: document.querySelector('[data-cart-total]').textContent }));
  check(merged.lines === 1 && merged.badge === '2' && merged.total === '98,00 €', 'Duplicate adds merge, badge counts units, total reconciles', JSON.stringify(merged));
  await p.locator('.line [data-remove]').click();
  const empty = await p.evaluate(() => !document.querySelector('[data-cart-empty]').hidden && document.querySelector('[data-cart-foot]').hidden);
  check(empty, 'Removing the last line shows the empty state');
  check(errors.length === 0, 'No JavaScript errors', errors.join('; '));

  if (SHOTS) {
    await p.keyboard.press('Escape');
    await p.screenshot({ path: path.join(OUT, 'mobile-fold.png') });
  }
  await ctx.close();
}

// ---------- 2. resilience: storage blocked, JavaScript off ----------
{
  const { ctx, page: p, errors } = await open({ width: 375, height: 667 }, { init: () => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }); } });
  await p.locator('[data-add]').click();
  await p.waitForTimeout(300);
  const badge = await p.evaluate(() => document.querySelector('[data-cart-count]').textContent);
  check(badge === '1' && errors.length === 0, 'Storage blocked: the cart still works in memory', `badge=${badge}`);
  await ctx.close();
}
{
  const { ctx, page: p } = await open({ width: 375, height: 667 }, { js: false });
  const s = await p.evaluate(() => ({
    prices: [...document.querySelectorAll('[data-price-display]')].every((e) => e.textContent === '49,00 €'),
    visible: getComputedStyle(document.querySelector('.step')).opacity === '1',
    action: document.querySelector('#buyform').action
  }));
  check(s.prices && s.visible && /\/cart\/add$/.test(s.action), 'Without JavaScript the page stays correct and the form posts to /cart/add');
  await ctx.close();
}

// ---------- 3. other widths, desktop, structure, accessibility ----------
for (const vp of [{ width: 320, height: 640 }, { width: 1440, height: 900 }]) {
  const { ctx, page: p } = await open(vp);
  const w = await p.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
  check(w[0] <= w[1], `Width ${vp.width}: no horizontal scroll`, `${w[0]} / ${w[1]}`);
  if (vp.width === 1440) {
    await p.locator('.chart__bar--hl').hover();
    const tip = await p.evaluate(() => { const t = document.querySelector('.chart__tip'); return t && !t.hidden; });
    check(tip, 'Chart tooltip shows on hover');
    if (SHOTS) {
      await p.screenshot({ path: path.join(OUT, 'desktop-fold.png') });
      await scrollThrough(p);
      await p.addStyleTag({ content: '.hdr,.sticky,.promo{display:none!important}' });
      const sections = await p.$$('main > section:not([hidden]), footer');
      for (let i = 0; i < sections.length; i++) await sections[i].screenshot({ path: path.join(OUT, `desktop-section-${String(i + 1).padStart(2, '0')}.png`) });
    }
  }
  await ctx.close();
}
{
  const { ctx, page: p } = await open({ width: 1280, height: 800 });
  const s = await p.evaluate(() => {
    const heads = [...document.querySelectorAll('h1,h2,h3,h4')].filter((h) => !h.closest('[hidden]'));
    let prev = 0;
    const skips = heads.filter((h) => { const l = +h.tagName[1]; const bad = prev && l > prev + 1; prev = l; return bad; }).length;
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    return {
      h1: document.querySelectorAll('h1').length, skips,
      dashes: (document.documentElement.outerHTML.match(/[–—]/g) || []).length,
      robots: (document.querySelector('meta[name="robots"]') || {}).content || '',
      dupIds: ids.length - new Set(ids).size,
      disclaimer: document.body.innerText.includes('Les compléments alimentaires ne sont pas des médicaments')
    };
  });
  check(s.h1 === 1 && s.skips === 0, 'One H1, heading levels never skip', `h1=${s.h1} skips=${s.skips}`);
  check(s.dashes === 0, 'No em or en dash anywhere in the page', `${s.dashes} found`);
  check(s.robots.includes('noindex'), 'noindex is set (remove only at launch)', s.robots);
  check(s.dupIds === 0, 'No duplicate ids');
  check(s.disclaimer, 'Food-supplement disclaimer is present');

  // claim hygiene (EU + Meta): words that must never appear in visible copy
  const text = await p.evaluate(() => { document.querySelectorAll('details').forEach((d) => { d.open = true; }); return document.body.innerText; });
  const banned = text.match(/\b(guérit|guérir|soigne|soigner|traite|traiter|prévient|prévenir|diagnostiquer|miracle|cliniquement prouvé|\+20,45)\b/gi) || [];
  check(banned.length === 0, 'No banned claim words (guérir, soigner, traiter, prévenir, miracle, +20,45...)', banned.join(', '));

  await p.addScriptTag({ content: AXE });
  const axe = await p.evaluate(async () => {
    const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } });
    return r.violations.map((v) => `${v.impact} ${v.id} (${v.nodes.length})`);
  });
  check(axe.length === 0, 'axe-core: no accessibility violations', axe.join(' | '));
  await ctx.close();
}

// ---------- 4. contrast of text set over photos (axe cannot measure these) ----------
{
  const { ctx, page: p } = await open({ width: 375, height: 667 });
  const { ctx: actx, page: analyzer } = await open({ width: 200, height: 200 });
  await scrollThrough(p);
  await p.addStyleTag({ content: '.hdr,.sticky,.promo{display:none!important}' });
  const sel = '.hero .eyebrow, .hero__title, .hero__lede, .hero .chip span, .hero .chip strong, .hero .trustline, .hero .btn--ghost, .final .eyebrow, .final h2, .final .chip span, .final .chip strong, .final .trustline, .brand .eyebrow, .brand h2, .brand p';
  const items = await p.evaluate((s) => [...document.querySelectorAll(s)].map((el) => {
    const cs = getComputedStyle(el);
    const range = document.createRange();
    range.selectNodeContents(el);
    const r = range.getBoundingClientRect();
    return { text: el.textContent.trim().slice(0, 28), color: cs.color, size: parseFloat(cs.fontSize), weight: +cs.fontWeight, x: r.left + window.scrollX, y: r.top + window.scrollY, w: r.width, h: r.height };
  }), sel);
  await p.addStyleTag({ content: '*{color:transparent!important;text-shadow:none!important} svg{visibility:hidden!important} .btn--ghost{border-color:transparent!important}' });
  const low = [];
  for (const it of items) {
    if (it.w < 2 || it.h < 2) continue;
    const x = Math.max(0, it.x);
    const png = await p.screenshot({ fullPage: true, clip: { x, y: it.y, width: Math.min(it.w, 375 - x), height: it.h } });
    const ratio = await analyzer.evaluate(async ({ b64, color }) => {
      const img = new Image();
      img.src = 'data:image/png;base64,' + b64;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      const g = c.getContext('2d');
      g.drawImage(img, 0, 0);
      const d = g.getImageData(0, 0, c.width, c.height).data;
      const [r, gr, b, a = 1] = color.match(/[\d.]+/g).map(Number);
      const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      const L = (R, G, B) => 0.2126 * lin(R) + 0.7152 * lin(G) + 0.0722 * lin(B);
      const out = [];
      for (let i = 0; i < d.length; i += 12) {
        const lt = L(r * a + d[i] * (1 - a), gr * a + d[i + 1] * (1 - a), b * a + d[i + 2] * (1 - a));
        const lb = L(d[i], d[i + 1], d[i + 2]);
        out.push((Math.max(lt, lb) + 0.05) / (Math.min(lt, lb) + 0.05));
      }
      out.sort((m, n) => m - n);
      return out[Math.floor(out.length * 0.05)]; // 5th percentile = robust worst case
    }, { b64: png.toString('base64'), color: it.color });
    const need = it.size >= 24 || (it.size >= 18.66 && it.weight >= 700) ? 3 : 4.5;
    if (ratio < need) low.push(`"${it.text}" ${ratio.toFixed(2)} < ${need}`);
  }
  check(low.length === 0, `Text over photos meets WCAG contrast (${items.length} blocks measured)`, low.join(' | '));
  await actx.close();
  await ctx.close();
}

await browser.close();
if (server) server.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed${SHOTS ? `, screenshots in ${OUT}` : ''}`);
process.exit(failed.length ? 1 : 0);
