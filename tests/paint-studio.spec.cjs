const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.route('https://www.google.com/**', route => route.abort());
  await page.goto('/');
  await expect(page.locator('#paint-studio')).toBeVisible();
});

test('paint a model, compare its original color, and repaint with another finish', async ({ page }) => {
  const studio = page.locator('#paint-studio');
  const scene = studio.locator('.paint-stage');
  await studio.getByRole('radio', { name: 'SUV', exact: true }).check();
  await studio.getByRole('radio', { name: 'Okean ko‘k' }).check();
  await studio.getByRole('radio', { name: 'Satin', exact: true }).check();
  await studio.getByRole('button', { name: 'Rangni qo‘llash' }).click();
  await expect(scene).toHaveAttribute('data-phase', 'painting');
  await expect(studio.getByRole('radio', { name: 'Qizil', exact: true })).toBeDisabled();
  await expect(studio.locator('.paint-spray')).toBeVisible();
  await expect(scene).toHaveAttribute('data-phase', 'done');
  await expect(studio.getByRole('img')).toHaveAttribute('aria-label', /SUV, Okean ko‘k/);
  await expect(studio.locator('linearGradient[id$="-color"] stop').first()).toHaveAttribute('stop-color', '#2165b0');
  await studio.getByRole('button', { name: 'Oldin', exact: true }).click();
  await expect(studio.locator('linearGradient[id$="-color"] stop').first()).toHaveAttribute('stop-color', '#b7bec8');
  await studio.getByRole('button', { name: 'Natija', exact: true }).click();
  await expect(studio.locator('linearGradient[id$="-color"] stop').first()).toHaveAttribute('stop-color', '#2165b0');
  await studio.getByRole('radio', { name: 'Kupe', exact: true }).check();
  await studio.getByRole('radio', { name: 'Zumrad', exact: true }).check();
  await studio.getByRole('button', { name: 'Qayta bo‘yash' }).click();
  await expect(scene).toHaveAttribute('data-phase', 'done');
  await expect(studio.getByRole('img')).toHaveAttribute('aria-label', /Kupe, Zumrad/);
  await studio.getByRole('button', { name: /Qayta boshlash/ }).click();
  await expect(scene).toHaveAttribute('data-phase', 'ready');
  await expect(studio.getByRole('radio', { name: 'Sedan', exact: true })).toBeChecked();
  await expect(studio.getByRole('button', { name: 'Oldin', exact: true })).toBeDisabled();
});

test('motion preference, languages and navigation preserve a usable studio', async ({ page }) => {
  const studio = page.locator('#paint-studio');
  await studio.getByRole('button', { name: 'Rangni qo‘llash' }).click();
  await expect(studio.locator('.paint-stage')).toHaveAttribute('data-phase', 'painting');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(studio.locator('.paint-stage')).toHaveAttribute('data-phase', 'done');
  await expect(studio.locator('.paint-spray')).toHaveCount(0);
  await page.locator('.auto-header select').selectOption('en');
  await expect(studio.getByRole('radio', { name: 'Racing red' })).toBeChecked();
  await studio.getByRole('radio', { name: 'Pearl white' }).check();
  await studio.getByRole('button', { name: 'Paint again' }).click();
  await expect(studio.getByRole('status')).toHaveText('Your new look is ready');
  await expect(studio.getByRole('img')).toHaveAttribute('aria-label', /Pearl white/);
  await page.locator('.auto-header select').selectOption('ru');
  await expect(studio.getByRole('radio', { name: 'Жемчужный белый' })).toBeChecked();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await studio.locator('.paint-apply').click();
  await page.locator('.auto-nav a[href="/about"]').click();
  await expect(studio).toHaveCount(0);
  await page.goBack();
  await expect(studio.locator('.paint-stage')).toHaveAttribute('data-phase', 'ready');
});

test('mobile painting brings the result into view and supports narrow screens', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const studio = page.locator('#paint-studio');
  await studio.getByRole('button', { name: 'Rangni qo‘llash' }).click();
  await expect(studio.locator('.paint-car')).toBeInViewport({ ratio: .9 });
  await expect(studio.locator('.paint-stage')).toHaveAttribute('data-phase', 'done');
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
  }
});
