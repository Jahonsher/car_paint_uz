export const CACHE_KEY = "carpaint:catalog:v1";
export const MAX_AGE = 24 * 60 * 60 * 1000;
const PUBLIC_QUERIES = new Set([
  "products",
  "product",
  "categories",
  "subcategories",
  "brands",
  "news",
]);
export function readLanguage() {
  try {
    const raw = localStorage.getItem("lang");
    const language = raw?.startsWith('"') ? JSON.parse(raw) : raw;
    return ["uz", "ru", "en"].includes(language) ? language : "uz";
  } catch {
    return "uz";
  }
}
export function readCache(now = Date.now()) {
  try {
    const entry = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (entry?.version !== 1 || !Array.isArray(entry.queries)) return null;
    const queries = entry.queries.filter(
      (q) =>
        PUBLIC_QUERIES.has(q.queryKey?.[0]) &&
        q.state?.status === "success" &&
        now - q.state.dataUpdatedAt < MAX_AGE &&
        q.state.dataUpdatedAt <= now,
    );
    return { mutations: [], queries };
  } catch {
    return null;
  }
}
export function writeCache(state, now = Date.now()) {
  try {
    const queries = state.queries
      .filter(
        (q) =>
          PUBLIC_QUERIES.has(q.queryKey?.[0]) &&
          q.state.status === "success" &&
          now - q.state.dataUpdatedAt < MAX_AGE,
      )
      .sort((a, b) => b.state.dataUpdatedAt - a.state.dataUpdatedAt)
      .slice(0, 30);
    while (queries.length && JSON.stringify(queries).length > 300000)
      queries.pop();
    localStorage.setItem(CACHE_KEY, JSON.stringify({ version: 1, queries }));
  } catch {
    /* Private mode or full storage must not interrupt browsing. */
  }
}
