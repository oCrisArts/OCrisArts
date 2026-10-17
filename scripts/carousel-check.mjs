import { createServer } from 'vite';
import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

const server = await createServer({ server: { host: '127.0.0.1', port: 8555, strictPort: true } });
await server.listen();
let browser;
const rail = '[data-node-id="4:35836"]';
try {
  browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, hasTouch: true });
  await context.route(/googletagmanager\.com|static\.hotjar\.com|clarity\.ms/, r => r.fulfill({ body: '' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  const position = () => page.locator(rail).evaluate(el => new DOMMatrix(getComputedStyle(el).transform).m41);
  const prepare = async (path = '/') => {
    await page.goto('http://127.0.0.1:8555' + path);
    await page.locator(rail).waitFor();
    const decline = page.getByRole('button', { name: /^(Recusar|Decline|Rechazar)$/ });
    if (await decline.isVisible()) await decline.click();
    await page.mouse.move(0, 0);
    await page.locator('#cases').evaluate(el => el.scrollIntoView({ behavior: 'instant' }));
    await page.waitForTimeout(1100);
  };
  const visibleCard = () => page.locator(rail + ' a[data-case-slug]').evaluateAll(cards => {
    for (const card of cards) {
      const r = card.getBoundingClientRect();
      const x = Math.max(20, r.left + 20), y = Math.max(100, r.top + 40);
      if (x < Math.min(innerWidth - 20, r.right - 20) && y < Math.min(innerHeight - 100, r.bottom - 20) && card.contains(document.elementFromPoint(x, y))) {
        return { x, y, slug: card.dataset.caseSlug, href: card.getAttribute('href') };
      }
    }
    throw new Error('No unobstructed case card');
  });
  await prepare();
  const start = await position();
  await page.waitForTimeout(250);
  assert.ok(await position() < start, 'Autoplay moves left');
  let card = await visibleCard();
  await page.mouse.move(card.x, card.y);
  const hovered = await position();
  await page.waitForTimeout(250);
  assert.equal(await position(), hovered, 'Hover pauses autoplay');
  await page.mouse.down();
  assert.equal(await page.locator(rail).evaluate(el => el.hasPointerCapture(1)), false, 'No capture on pointerdown');
  await page.mouse.move(card.x + 3, card.y + 1);
  assert.equal(await position(), hovered, 'Small movement is not a drag');
  await page.mouse.up();
  await page.waitForURL('**' + card.href);
  assert.ok(page.url().endsWith('/cases/' + card.slug), 'Ordinary click follows slug');

  await prepare('/en');
  card = await visibleCard();
  await page.mouse.move(card.x, card.y);
  await page.mouse.down();
  await page.mouse.move(card.x + 100, card.y, { steps: 10 });
  assert.equal(await page.locator(rail).evaluate(el => el.hasPointerCapture(1)), true, 'Capture starts after horizontal threshold');
  await page.mouse.up();
  assert.ok(page.url().endsWith('/en'), 'Dragging does not open a case');
  await page.locator(rail).evaluate(el => { if (el.contains(document.activeElement)) document.activeElement.blur(); });
  await page.mouse.move(0, 0);
  const released = await position();
  await page.waitForTimeout(500);
  assert.equal(await position(), released, 'Resume delay is respected');
  await page.waitForTimeout(1500);
  assert.ok(await position() < released, 'Autoplay resumes and reverses at the right bound');

  const link = page.locator(rail + ' a[data-case-slug]').first();
  await link.focus();
  const focused = await position();
  await page.waitForTimeout(250);
  assert.equal(await position(), focused, 'Keyboard focus pauses autoplay');
  const href = await link.getAttribute('href');
  await page.keyboard.press('Enter');
  await page.waitForURL('**' + href);
  assert.ok(href.startsWith('/en/cases/'), 'Keyboard navigation preserves language');

  await page.setViewportSize({ width: 390, height: 844 });
  await prepare();
  card = await visibleCard();
  await page.touchscreen.tap(card.x, card.y);
  await page.waitForURL('**' + card.href);
  await prepare();
  card = await visibleCard();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: card.x, y: card.y }] });
  for (let i = 1; i <= 8; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: card.x + i * 10, y: card.y }] });
  assert.equal(await page.locator(rail).evaluate(el => el.classList.contains('is-dragging')), true, 'Touch swipe starts dragging');
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  assert.ok(page.url().endsWith('/'), 'Swipe does not navigate');
  assert.equal(await page.locator(rail).evaluate(el => el.classList.contains('is-dragging')), false);
  const touchReleased = await position();
  await page.waitForTimeout(1800);
  assert.notEqual(await position(), touchReleased, 'Touch release resumes autoplay without a sticky hover');
  card = await visibleCard();
  const scrollBefore = await page.evaluate(() => scrollY);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: card.x, y: card.y }] });
  for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: card.x, y: card.y - i * 12 }] });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  assert.equal(await page.locator(rail).evaluate(el => el.classList.contains('is-dragging')), false, 'Vertical gesture does not drag the rail');
  assert.ok(await page.evaluate(() => scrollY) > scrollBefore, 'Native vertical touch scrolling remains available');
  assert.deepEqual(errors, []);
  console.log('Carousel: mouse click, threshold/capture, drag suppression, hover/focus, delayed resume, reversal, keyboard, localized links and mobile touch passed.');
} finally {
  await browser?.close();
  await server.close();
}
