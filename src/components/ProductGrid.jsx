import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../localization/LanguageContext";
import { localized, productImages } from "../utils/catalog";
import { ProductImage } from "./UI";
import Icon from "./Icon";
export default function ProductGrid({ products }) {
  const { lang, t } = useLanguage();
  const location = useLocation();
  return (
    <div className="product-grid">
      {products.map((product) => {
        const title =
          localized(product, "product_title", lang) || t("products");
        const src = productImages(product)[0];
        return (
          <Link
            className="product-card"
            to={"/single/" + encodeURIComponent(product.product_id)}
            state={{
              catalog:
                location.pathname === "/product"
                  ? location.pathname + location.search
                  : "/product",
            }}
            key={product.product_id}
          >
            <div className="product-image">
              <ProductImage key={src || "empty"} src={src} alt={title} />
              <span className="product-arrow">
                <Icon name="diagonal" />
              </span>
            </div>
            <div className="product-info">
              <span className="product-brand">
                {product.brand_name || "CARPAINT / COLLECTION"}
              </span>
              <h3>{title}</h3>
              <div>
                <span>{t("priceAsk")}</span>
                <span>
                  {t("details")} <Icon size={15} />
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
