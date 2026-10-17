export const getList = (response) =>
  Array.isArray(response?.data) ? response.data : [];
export function localized(item, field, language) {
  return (
    item?.[field + "_" + language] ||
    item?.[field + "_uz"] ||
    item?.[field + "_ru"] ||
    item?.[field + "_en"] ||
    ""
  );
}
export function safeImage(value) {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value, "https://server.carpaint.uz");
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}
export function productImages(product) {
  const images = product?.product_image_url;
  return (
    Array.isArray(images) ? images : typeof images === "string" ? [images] : []
  )
    .map(safeImage)
    .filter(Boolean);
}
export function plainText(html) {
  if (!html) return "";
  const template = document.createElement("template");
  template.innerHTML = String(html);
  const doc = template.content;
  doc
    .querySelectorAll("script,style,iframe,object")
    .forEach((node) => node.remove());
  doc
    .querySelectorAll("br,p,div,li,h1,h2,h3")
    .forEach((node) => node.append("\n"));
  return doc.textContent.trim();
}
