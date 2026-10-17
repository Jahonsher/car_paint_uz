const { test, expect } = require("@playwright/test");
const fs = require("node:fs");
const makeProduct = (id) => ({
  product_id: String(id),
  product_title_uz: "Professional bo‘yoq " + id,
  product_title_ru: "Профессиональная краска " + id,
  product_title_en: "Professional paint " + id,
  brand_name: "CarPaint",
  product_description_uz:
    "<p>Sirt uchun sifatli qoplama.</p><script>window.injected = true</script>",
  product_image_url: [
    "https://server.carpaint.uz/test-product.svg",
    "https://server.carpaint.uz/test-product-2.svg",
  ],
});
async function mockApi(page) {
  const requests = [];
  await page.route("https://server.carpaint.uz/**", async (route) => {
    const url = new URL(route.request().url());
    if (url.pathname.endsWith(".svg"))
      return route.fulfill({
        contentType: "image/svg+xml",
        body: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><ellipse cx="100" cy="212" rx="55" ry="9" fill="#c7cabd"/><rect x="45" y="45" width="110" height="160" rx="10" fill="#d5ed51"/><ellipse cx="100" cy="45" rx="55" ry="12" fill="#a0a895"/><text x="58" y="100" font-family="Arial" font-size="18" font-weight="bold">CARPAINT</text><text x="60" y="132" font-family="Arial" font-size="12">PRO FINISH</text></svg>',
      });
    if (route.request().method() === "OPTIONS")
      return route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-headers": "*",
        },
      });
    requests.push({
      path: url.pathname,
      search: url.search,
      body: route.request().postDataJSON(),
    });
    let data = [];
    if (url.pathname.endsWith("/categories"))
      data = [
        {
          category_id: "1",
          category_name_uz: "Bo‘yoqlar",
          category_name_ru: "Краски",
          category_name_en: "Paints",
        },
        {
          category_id: "2",
          category_name_uz: "Laklar",
          category_name_en: "Clear coats",
        },
      ];
    else if (url.pathname.endsWith("/subcategories"))
      data = [
        {
          sub_category_id: "10",
          sub_category_name_uz: "Metallik",
          sub_category_name_en: "Metallic",
        },
      ];
    else if (url.pathname.endsWith("/brands"))
      data = [{ brand_id: "1", brand_name: "CarPaint" }];
    else if (url.pathname.endsWith("/product/list")) {
      const body = route.request().postDataJSON() || {};
      const count =
        body.search_uz === "nothing"
          ? 0
          : Number(url.searchParams.get("page")) > 1
            ? 2
            : Number(url.searchParams.get("limit") || 12);
      data = Array.from({ length: count }, (_, i) =>
        makeProduct(
          i + 1 + (Number(url.searchParams.get("page") || 1) - 1) * 12,
        ),
      );
    } else if (/\/product\/[^/]+$/.test(url.pathname))
      data = makeProduct(url.pathname.split("/").pop());
    else if (url.pathname.endsWith("/news"))
      data = [
        {
          new_id: "1",
          new_title_uz: "Yangi ranglar",
          new_title_en: "New colors",
          new_image: "https://server.carpaint.uz/test-product.svg",
          new_description_uz:
            "<p>" +
            "Yangi mahsulotlar haqida batafsil ma’lumot. ".repeat(12) +
            "</p>",
        },
      ];
    await route.fulfill({
      json: { data },
      headers: { "access-control-allow-origin": "*" },
    });
  });
  return requests;
}
test("first visit, language, 3D colors and responsive pages", async ({
  page,
}) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await mockApi(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Rangdan",
  );
  await expect(page.locator(".desktop-nav a")).toHaveCount(5);
  await page.getByRole("button", { name: "Qizil", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Qizil", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".paint-showcase")).toHaveCSS("--paint", "#f06550");
  await page.locator("#language").selectOption("ru");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "с цвета.",
  );
  await page.reload();
  await expect(page.locator("#language")).toHaveValue("ru");
  await page.locator("#language").selectOption("uz");
  await expect(page.locator(".product-card")).toHaveCount(4);
  fs.mkdirSync("artifacts", { recursive: true });
  await page.screenshot({
    path: "artifacts/home-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({
    path: "artifacts/home-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Menyu", exact: true }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-navigation")).toBeHidden();
  for (const route of [
    "/product",
    "/about",
    "/news",
    "/contact",
    "/single/1",
    "/not-found",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1,h3").first()).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  }
  await expect(page.getByRole("heading", { name: "404" })).toBeVisible();
  expect(errors).toEqual([]);
});
test("catalog filters, debounce, pagination, safe details and return path", async ({
  page,
}) => {
  const requests = await mockApi(page);
  await page.goto("/product");
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page.locator("#category-filter").selectOption("1");
  await expect(page.locator("#subcategory-filter option")).toHaveCount(2);
  await page.locator("#subcategory-filter").selectOption("10");
  await page.locator("#brand-filter").selectOption("1");
  await page.locator("#product-search").fill("paint");
  await expect(page).toHaveURL(/q=paint/);
  await expect(page.locator(".product-card")).toHaveCount(12);
  await page.getByRole("button", { name: "Keyingi", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(2);
  await expect(page).toHaveURL(/page=2/);
  const catalogUrl = page.url();
  await page.locator(".product-card").first().click();
  await expect(page.locator("h1")).toContainText("13");
  expect(await page.evaluate(() => window.injected)).toBeUndefined();
  await expect(page.locator(".detail-price")).not.toContainText("30 000");
  await page.getByRole("link", { name: "Katalogga qaytish" }).click();
  await expect(page).toHaveURL(catalogUrl);
  await page.locator("#category-filter").selectOption("2");
  await expect(page).not.toHaveURL(/sub=10|page=2/);
  await page.locator("#product-search").fill("nothing");
  await expect(
    page.getByRole("heading", { name: "Mahsulot topilmadi" }),
  ).toBeVisible();
  await page.locator(".empty-state button").click();
  await expect(page.locator(".product-card")).toHaveCount(12);
  expect(
    requests.some(
      (r) =>
        r.body?.category_id === "1" &&
        r.body?.sub_category_id === "10" &&
        r.body?.brand_id?.[0] === "1",
    ),
  ).toBeTruthy();
  await page.screenshot({
    path: "artifacts/catalog-desktop.png",
    fullPage: true,
    animations: "disabled",
  });
});
test("persisted catalog avoids duplicate fresh requests after a reload", async ({
  page,
}) => {
  const requests = await mockApi(page);
  await page.goto("/product");
  await expect(page.locator(".product-card")).toHaveCount(12);
  await expect
    .poll(() =>
      page.evaluate(() => localStorage.getItem("carpaint:catalog:v1")),
    )
    .toBeTruthy();
  const before = requests.filter((r) =>
    r.path.endsWith("/product/list"),
  ).length;
  await page.reload();
  await expect(page.locator(".product-card")).toHaveCount(12);
  expect(requests.filter((r) => r.path.endsWith("/product/list")).length).toBe(
    before,
  );
});
test("API failures show retry, never a blank screen", async ({ page }) => {
  await page.route("**/api/v1/**", (route) =>
    route.fulfill({
      status: 500,
      json: { error: "test" },
      headers: { "access-control-allow-origin": "*" },
    }),
  );
  await page.goto("/product");
  await expect(page.locator(".empty-state h3")).toHaveText(
    "Ma’lumotni yuklab bo‘lmadi",
    { timeout: 20000 },
  );
  await expect(page.locator(".empty-state button")).toBeVisible();
  await expect(page.locator("header")).toBeVisible();
});
test("contact inquiry, validation and FAQ are usable", async ({ page }) => {
  await mockApi(page);
  await page.goto("/single/1");
  await page
    .getByRole("link", { name: "Ushbu mahsulot haqida so‘rash" })
    .click();
  await expect(page.locator("#contact-message")).toHaveValue(
    "Professional bo‘yoq 1",
  );
  await page.locator("button[type=submit]").click();
  expect(
    await page
      .locator("#contact-name")
      .evaluate((el) => el.validity.valueMissing),
  ).toBeTruthy();
  await page.locator("#contact-name").fill("Test user");
  await page.locator("#contact-phone").fill("+998 90 123 45 67");
  await page.locator("button[type=submit]").click();
  await expect(page.locator(".contact-form [role=status]")).toBeVisible();
  await page.locator("summary").first().click();
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});
test("reduced motion disables decorative animation", async ({ page }) => {
  await mockApi(page);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".paint-can")).toHaveCSS("animation-name", "none");
});
test.describe("production offline shell", () => {
  test.use({ serviceWorkers: "allow" });
  test("previously loaded app and lazy routes reopen offline", async ({
    page,
    context,
  }) => {
    await mockApi(page);
    await page.goto("/");
    await expect(page.locator(".product-card")).toHaveCount(4);
    await page.evaluate(() => navigator.serviceWorker.ready.then(() => true));
    await expect
      .poll(() =>
        page.evaluate(() => Boolean(navigator.serviceWorker.controller)),
      )
      .toBeTruthy();
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator("h1")).toContainText("Rangdan");
    await expect(page.locator(".offline-bar")).toBeVisible();
    await page.goto("/about");
    await expect(page.locator("h1")).toContainText("Yaxshi natija");
    await context.setOffline(false);
  });
});
