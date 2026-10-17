import {
  CACHE_KEY,
  MAX_AGE,
  readCache,
  readLanguage,
  writeCache,
} from "./storage";
import { localized, plainText, productImages, getList } from "./catalog";
beforeEach(() => localStorage.clear());
const entry = (key, updated, data = { data: [] }) => ({
  queryKey: [key],
  queryHash: JSON.stringify([key]),
  state: { status: "success", data, dataUpdatedAt: updated },
});
test("first visit and corrupt preferences fall back to Uzbek", () => {
  expect(readLanguage()).toBe("uz");
  localStorage.setItem("lang", '"broken');
  expect(readLanguage()).toBe("uz");
  localStorage.setItem("lang", '"xx"');
  expect(readLanguage()).toBe("uz");
  localStorage.setItem("lang", '"ru"');
  expect(readLanguage()).toBe("ru");
});
test("expired entries are discarded individually while newer data survives", () => {
  localStorage.setItem(
    CACHE_KEY,
    JSON.stringify({
      version: 1,
      queries: [entry("products", 1), entry("categories", MAX_AGE)],
    }),
  );
  expect(readCache(MAX_AGE + 2).queries.map((q) => q.queryKey[0])).toEqual([
    "categories",
  ]);
});
test("corrupt and different cache schemas do not crash the application", () => {
  localStorage.setItem(CACHE_KEY, "{broken");
  expect(readCache()).toBeNull();
  localStorage.setItem(CACHE_KEY, JSON.stringify({ version: 2, queries: [] }));
  expect(readCache()).toBeNull();
});
test("only public catalog data is persisted, with a bounded storage footprint", () => {
  writeCache(
    {
      queries: [
        entry("contact", 1000, { phone: "private" }),
        entry("products", 1000),
      ],
    },
    1000,
  );
  expect(readCache(1000).queries.map((q) => q.queryKey[0])).toEqual([
    "products",
  ]);
  writeCache(
    {
      queries: Array.from({ length: 60 }, () =>
        entry("products", 1000, "x".repeat(20000)),
      ),
    },
    1000,
  );
  expect(localStorage.getItem(CACHE_KEY).length).toBeLessThan(301000);
});
test("blocked browser storage is optional", () => {
  const spy = jest
    .spyOn(Storage.prototype, "setItem")
    .mockImplementation(() => {
      throw new Error("Quota");
    });
  expect(() => writeCache({ queries: [] })).not.toThrow();
  spy.mockRestore();
});
test("unsafe images and missing data do not become rendered resource URLs", () => {
  expect(
    productImages({ product_image_url: ["javascript:alert(1)", "/image.png"] }),
  ).toEqual(["https://server.carpaint.uz/image.png"]);
  expect(productImages({})).toEqual([]);
  expect(getList({ data: {} })).toEqual([]);
});
test("HTML descriptions become text and executable content is removed", () => {
  expect(
    plainText(
      "<p>Hello &amp; welcome</p><script>alert(1)</script><img src=x onerror=alert(1)>",
    ),
  ).toBe("Hello & welcome");
});
test("missing translations fall back to available product content", () => {
  expect(localized({ product_title_uz: "Bo‘yoq" }, "product_title", "en")).toBe(
    "Bo‘yoq",
  );
});
