import { useState } from 'react';
import { Link } from 'react-router-dom';
import { company } from '../data/company';
import { localized, productImages, safeImage } from '../utils/catalog';

export function CompanyStatus({ text, loading, error, empty, retry }) {
  return <div className="company-status" role="status"><p>{loading ? text.loading : error ? text.unavailable : empty}</p>{error && <div><button className="auto-button" onClick={retry}>{text.retry} ↻</button><a className="auto-text-link" href={company.phoneHref}>{text.call} ↗</a></div>}</div>;
}

export function CompanyApiImage({ src, alt, ...props }) {
  const [failed, setFailed] = useState(false);
  const image = safeImage(src);
  return image && !failed ? <img src={image} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} {...props} /> : <div className="company-no-image" role="img" aria-label={alt}>CARPAINT</div>;
}

export function CompanyProductCards({ products, lang, text, from = '/product' }) {
  return <div className="company-api-grid">{products.map(product => {
    const title = localized(product, 'product_title', lang) || text.productPage;
    const src = productImages(product)[0];
    return <Link className="company-api-card" to={`/single/${encodeURIComponent(product.product_id)}`} state={{ catalog: from }} key={product.product_id}>
      <div className="company-api-image"><CompanyApiImage key={src} src={src} alt={title} /></div><h2>{title}</h2><p>{text.availability}</p><span>{text.details} ↗</span>
    </Link>;
  })}</div>;
}
