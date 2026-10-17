const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
test("light concept: real assets, selection, keyboard, dialog and filtering", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/namuna");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Rangni his qiling.",
  );
  await expect(page.locator(".cp-concept")).toHaveCSS(
    "background-color",
    "rgb(245, 244, 240)",
  );
  await expect(page.locator(".cp-rail-product")).toHaveCount(5);
  await expect
    .poll(() =>
      page
        .locator(".cp-rail-product img")
        .evaluateAll((imgs) =>
          imgs.every((i) => i.complete && i.naturalWidth > 0),
        ),
    )
    .toBeTruthy();
  await expect
    .poll(() =>
      page
        .locator(".cp-header .cp-logo img")
        .evaluate((i) => i.complete && i.naturalWidth > 0),
    )
    .toBeTruthy();
  await expect(page.locator(".cp-selection-main h2")).toHaveText(
    "Orbay Multi Fill",
  );
  await page
    .getByRole("button", { name: "Keyingi mahsulot", exact: true })
    .click();
  await expect(page.locator(".cp-selection-main h2")).toHaveText(
    "Orbay Uni Fill",
  );
  await page
    .getByRole("button", { name: "Oldingi mahsulot", exact: true })
    .click();
  await page.locator(".cp-active").focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator(".cp-selection-main h2")).toHaveText(
    "CST Nitro Varnish",
  );
  await page.locator(".cp-selection-main button").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator("#cp-dialog-title")).toHaveText(
    "CST Nitro Varnish",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator(".cp-selection-main button")).toBeFocused();
  await page.getByRole("button", { name: "ORBAY", exact: true }).click();
  await expect(page.locator(".cp-card")).toHaveCount(2);
  await page.getByRole("button", { name: "CST", exact: true }).click();
  await expect(page.locator(".cp-card")).toHaveCount(3);
  await page.getByRole("button", { name: "Barchasi", exact: true }).click();
  await expect(page.locator(".cp-card")).toHaveCount(5);
  expect(errors).toEqual([]);
});
test("light concept: mobile navigation, layout and review screenshots", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/namuna");
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  fs.mkdirSync("artifacts", { recursive: true });
  await page.screenshot({
    path: "artifacts/concept-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.screenshot({
    path: "artifacts/concept-first-screen.png",
    animations: "disabled",
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Menyuni ochish" }).click();
  await expect(page.locator("#cp-mobile-nav")).toBeVisible();
  await page.locator("#cp-mobile-nav a").first().click();
  await expect(page.locator("#cp-mobile-nav")).toBeHidden();
  await expect(page).toHaveURL(/#cp-collection/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "artifacts/concept-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.locator(".cp-selection-main button").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page
      .locator("dialog")
      .evaluate((el) => el.scrollWidth <= el.clientWidth),
  ).toBeTruthy();
  await page.getByRole("button", { name: "Yopish", exact: true }).click();
});
