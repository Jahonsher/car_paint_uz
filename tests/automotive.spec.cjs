const { test, expect } = require('@playwright/test');
const fs = require('node:fs');

async function prepare(page, route = '/') {
  await page.route(/https:\/\/(www\.google\.com|www\.youtube\.com)\//, request => request.abort());
  await page.route('https://server.carpaint.uz/**', async request => {
    const url = new URL(request.request().url());
    const headers = { 'access-control-allow-origin': '*', 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': '*' };
    if (request.request().method() === 'OPTIONS') return request.fulfill({ status: 204, headers });
    const product = id => ({ product_id: String(id), product_title_uz: 'Daybond 440', product_title_en: 'Daybond 440', product_title_ru: 'Daybond 440', product_image_url: [new URL('/images/optimized/putty-480.webp', page.url()).href, new URL('/images/optimized/primer-480.webp', page.url()).href], product_description_en: '<p>Polyester putty.</p><script>window.injected=true</script>' });
    let data = [];
    if (url.pathname.endsWith('/categories')) data = [{ category_id: '1', category_name_uz: 'Grunt', category_name_en: 'Primers', category_name_ru: 'Primer' }];
    else if (url.pathname.endsWith('/subcategories')) data = [{ sub_category_id: '10', sub_category_name_en: 'Acrylic' }];
    else if (url.pathname.endsWith('/brands')) data = [{ brand_id: '1', brand_name: 'Daybond' }, { brand_id: '2', brand_name: 'Dexin' }];
    else if (url.pathname.endsWith('/product/list')) {
      const body = request.request().postDataJSON() || {};
      data = body.search_uz === 'nothing' ? [] : Array.from({ length: Number(url.searchParams.get('page')) > 1 ? 2 : 12 }, (_, index) => product(index + 1));
    } else if (/\/product\/[^/]+$/.test(url.pathname)) data = product(url.pathname.split('/').pop());
    await request.fulfill({ json: { data }, headers });
  });
  await page.goto(route);
  await expect(page.locator('.auto-home')).toBeVisible();
}

test('desktop product story: sticky image, matching photo stages, cleanup and motion changes', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await prepare(page);
  const track = page.locator('.auto-story-track');
  const frame = page.locator('.company-story-frame-0');
  await expect(track).toHaveAttribute('data-motion', 'on');
  const top = await track.evaluate(node => node.getBoundingClientRect().top + scrollY);
  await page.evaluate(value => scrollTo(0, value + 20), top);
  await expect(track).toHaveAttribute('data-step', '0');
  await expect.poll(() => frame.evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
  const first = await page.locator('.auto-story-visual').boundingBox();
  const transform = await frame.evaluate(node => getComputedStyle(node).transform);
  await page.evaluate(value => scrollTo(0, value + innerHeight * .65), top);
  await expect(track).toHaveAttribute('data-step', '1');
  await expect(page.locator('.company-story-frame-1')).toHaveCSS('opacity', '1');
  await expect.poll(() => page.locator('.company-story-frame-1').evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
  const middle = await page.locator('.auto-story-visual').boundingBox();
  expect(Math.abs(first.y - middle.y)).toBeLessThan(3);
  await expect.poll(() => frame.evaluate(node => getComputedStyle(node).transform)).not.toBe(transform);
  await page.evaluate(value => scrollTo(0, value + innerHeight * 1.2), top);
  await expect(track).toHaveAttribute('data-step', '2');
  await expect(page.locator('.company-story-frame-2')).toHaveCSS('opacity', '1');
  await expect.poll(() => page.locator('.company-story-frame-2').evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(track).not.toHaveAttribute('data-motion', 'on');
  await expect(page.locator('.auto-story-visual')).toBeHidden();
  for (const image of await page.locator('.company-step-image').all()) await expect(image).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect(track).toHaveAttribute('data-motion', 'on');
  await page.locator('.auto-about .auto-text-link').click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(track).toHaveCount(0);
  await page.goBack();
  await expect(track).toHaveCount(1);
  expect(errors).toEqual([]);
});

test('transparent product assets and gallery navigation work on desktop and mobile', async ({page}) => {
  await prepare(page);
  await page.locator('.auto-header select').selectOption('en');
  const images = require('../src/assets/showroom.json');
  const alpha = await page.evaluate(async sources => Promise.all(sources.map(async src => {
    const image = new Image(); image.src = src; await image.decode();
    const canvas = document.createElement('canvas'); canvas.width = 100; canvas.height = 100;
    const context = canvas.getContext('2d'); context.drawImage(image,0,0,100,100);
    const pixels = context.getImageData(0,0,100,100).data;
    let transparent = 0;
    for(let index=3;index<pixels.length;index+=4) if(pixels[index]<10) transparent++;
    return transparent / 10000;
  })),Object.values(images).map(image=>image.src));
  for(const ratio of alpha) expect(ratio).toBeGreaterThan(.02);
  const gallery = page.locator('.auto-products');
  const rail = gallery.locator('.product-rail');
  const next = gallery.getByRole('button',{name:'Next products',exact:true});
  const previous = gallery.getByRole('button',{name:'Previous products',exact:true});
  await gallery.scrollIntoViewIfNeeded();
  await expect(previous).toBeDisabled();
  await next.click();
  await expect.poll(()=>rail.evaluate(node=>node.scrollLeft)).toBeGreaterThan(20);
  await expect(previous).toBeEnabled();
  await rail.focus();
  const before = await rail.evaluate(node=>node.scrollLeft);
  await rail.press('ArrowRight');
  await expect.poll(()=>rail.evaluate(node=>node.scrollLeft)).toBeGreaterThan(before + 20);
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.setViewportSize({width:390,height:844});
  await rail.evaluate(node=>node.scrollTo({left:node.scrollWidth,behavior:'instant'}));
  await expect(next).toBeDisabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
  await previous.click();
  await expect(next).toBeEnabled();
  await page.setViewportSize({width:320,height:700});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(1);
});

test('all company pages: languages, real contacts, no invented services, responsive layouts and screenshots', async ({ page }) => {
  await prepare(page);
  await page.locator('#home-name').fill('Ali');
  await page.getByRole('combobox').selectOption('en');
  await expect(page.locator('h1')).toContainText('Choose your color.');
  await expect(page.locator('#home-name')).toHaveValue('Ali');
  for (const language of ['uz', 'ru', 'en']) {
    await page.locator('.auto-header select').selectOption(language);
    for (const route of ['/', '/about', '/product', '/news', '/contact']) {
      await page.goto(route);
      await expect(page.locator('.auto-home')).toBeVisible();
      await expect(page.locator('.auto-topline a')).toHaveAttribute('href', 'tel:+998909557555');
      await expect(page.locator('body')).not.toContainText('Lorem ipsum');
      await expect(page.locator('body')).not.toContainText('30 000');
      await expect(page.locator('body')).not.toContainText('detailing');
      for (const width of [320, 390, 768, 1440]) {
        await page.setViewportSize({ width, height: 844 });
        await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), { message: `${language} ${route} ${width}px overflow` }).toBeTruthy();
      }
    }
  }
  await page.goto('/');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole('button', { name: 'Menu', exact: true }).click();
  await expect(page.locator('#auto-mobile-menu')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('#auto-mobile-menu')).toBeHidden();
  await expect(page.getByRole('button', { name: 'Menu', exact: true })).toBeFocused();
  await expect(page.locator('.auto-hero-art img')).toHaveAttribute('loading', 'eager');
  await expect(page.locator('.company-photo-card img').first()).toHaveAttribute('loading', 'lazy');
  await expect.poll(() => page.locator('.auto-hero-art img').evaluate(image => image.complete && image.naturalWidth > 0)).toBeTruthy();
  fs.mkdirSync('artifacts', { recursive: true });
  // Visit every photograph so full-page captures include lazily loaded sections.
  for (const image of await page.locator('main img').all()) {
    if (await image.isVisible()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBeTruthy();
    }
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'artifacts/company-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const image of await page.locator('main img').all()) {
    if (await image.isVisible()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(node => node.complete && node.naturalWidth > 0)).toBeTruthy();
    }
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({ path: 'artifacts/company-desktop.png', fullPage: true });
  await page.screenshot({ path: 'artifacts/company-hero.png' });
});

test('catalog controls, real product details, no fake price, gallery and back navigation', async ({ page }) => {
  await prepare(page, '/product');
  await page.locator('.auto-header select').selectOption('en');
  await expect(page.locator('.company-api-card')).toHaveCount(12);
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page).toHaveURL(/page=2/);
  await expect(page.locator('.company-api-card')).toHaveCount(2);
  await page.getByLabel('Category', { exact: true }).selectOption('1');
  await expect(page).not.toHaveURL(/page=2/);
  await page.getByLabel('Subcategory', { exact: true }).selectOption('10');
  await page.getByLabel('Daybond', { exact: true }).check();
  await page.getByLabel('Dexin', { exact: true }).check();
  await expect(page).toHaveURL(/brand=1&brand=2/);
  await page.getByRole('searchbox').fill('nothing');
  await expect(page.locator('.company-api-card')).toHaveCount(0);
  await page.getByRole('searchbox').fill('Daybond');
  await expect(page.locator('.company-api-card')).toHaveCount(12);
  const catalog = page.url();
  await page.locator('.company-api-card').first().click();
  await expect(page.locator('.company-detail h1')).toHaveText('Daybond 440');
  await expect(page.locator('.company-detail')).not.toContainText('30 000');
  await expect(page.locator('.company-detail')).toContainText('Polyester putty.');
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
  await page.locator('.company-detail-thumbs button').last().click();
  await expect(page.locator('.company-detail-thumbs button').last()).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('link', { name: /Back to catalog/ }).click();
  await expect(page).toHaveURL(catalog);
});

test('reduced motion on first load, API failure, and contact fields', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.route('https://server.carpaint.uz/**', request => request.fulfill({ status: 503, body: 'Unavailable', headers: { 'access-control-allow-origin': '*' } }));
  await page.goto('/product');
  await expect(page.locator('.company-status')).toBeVisible();
  await expect(page.locator('.company-photo-card')).toHaveCount(6);
  await page.goto('/');
  await expect(page.locator('.auto-story-track')).not.toHaveAttribute('data-motion', 'on');
  await expect(page.locator('.auto-story-visual')).toBeHidden();
  await expect(page.locator('.company-step-image')).toHaveCount(3);
  await page.locator('#home-name').fill('Ali');
  await page.locator('#home-email').fill('ali@example.com');
  await page.locator('#home-phone').fill('+998901234567');
  await page.locator('.auto-header select').selectOption('en');
  await expect(page.locator('#home-name')).toHaveValue('Ali');
  await expect(page.locator('#home-email')).toHaveValue('ali@example.com');
  await expect(page.locator('#home-phone')).toHaveValue('+998901234567');
  await expect(page.locator('.company-form-note')).toContainText('opens your email app');
});
