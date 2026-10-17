import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../localization/LanguageContext";
import Icon from "./Icon";
export function EmptyState({ title, text, action, actionLabel, href }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-icon">
        <Icon name="layers" size={30} />
      </span>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {action && (
        <button className="button button-outline" onClick={action}>
          <Icon name="refresh" />
          {actionLabel}
        </button>
      )}
      {href && (
        <Link className="button button-primary" to={href}>
          {actionLabel}
          <Icon />
        </Link>
      )}
    </div>
  );
}
export function Skeletons({ count = 4 }) {
  const { t } = useLanguage();
  return (
    <div className="product-grid" role="status" aria-label={t("loading")}>
      {Array.from({ length: count }, (_, i) => (
        <div className="skeleton-card" key={i}>
          <div />
          <span />
          <span />
        </div>
      ))}
    </div>
  );
}
export function PageLoading() {
  const { t } = useLanguage();
  return (
    <div className="container section" role="status">
      <span className="loading-dot" /> {t("loading")}…
    </div>
  );
}
export function Breadcrumbs({ items = [] }) {
  const { t } = useLanguage();
  return (
    <nav className="breadcrumbs" aria-label={t("navigation")}>
      <Link to="/">{t("home")}</Link>
      {items.map((item, i) => (
        <span key={i}>
          <Icon name="chevron" size={13} />
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
export function PageHeading({ title, text, tag }) {
  return (
    <div className="page-heading">
      {tag && <p className="eyebrow">{tag}</p>}
      <h1>{title}</h1>
      {text && <p className="lead">{text}</p>}
    </div>
  );
}
export function ProductImage({ src, alt, className = "", eager = false }) {
  const { t } = useLanguage();
  const [failed, setFailed] = useState(false);
  return src && !failed ? (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  ) : (
    <div className={"image-fallback " + className}>
      <Icon name="drop" size={36} />
      <span>{t("imageMissing")}</span>
    </div>
  );
}
export function QueryNotice({ query }) {
  const { t } = useLanguage();
  return query.isError && query.data ? (
    <p className="notice" role="status">
      {t("stale")}{" "}
      <button className="text-button" onClick={() => query.refetch()}>
        {t("retry")}
      </button>
    </p>
  ) : null;
}
export function ContactBanner() {
  const { t } = useLanguage();
  return (
    <section className="container cta-section">
      <div className="cta-copy">
        <p className="eyebrow">{t("ctaTag")}</p>
        <h2>{t("ctaTitle")}</h2>
        <p>{t("ctaText")}</p>
        <Link to="/contact" className="button button-dark">
          {t("consult")}
          <Icon name="diagonal" />
        </Link>
      </div>
      <div className="cta-art" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}
