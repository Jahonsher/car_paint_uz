import { Link } from 'react-router-dom';
import AutomotiveImage from './AutomotiveImage';
import { showroom } from '../data/company';

export default function CompanyGallery({ text }) {
  return <section className="auto-products auto-container" aria-labelledby="auto-products-title">
    <div className="auto-section-head"><div><p className="auto-eyebrow">{text.productsLabel}</p><h2 id="auto-products-title">{text.products}</h2></div><Link className="auto-text-link" to="/product">{text.all} ↗</Link></div>
    <div className="company-photo-grid">{showroom.map((product, index) => <Link className="company-photo-card" key={product.id} to="/product">
      <div className="company-photo"><span className="company-photo-index" aria-hidden="true">0{index + 1}</span><AutomotiveImage name={product.image} alt={`${product.name} — ${text.kinds[product.kind]}`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 29vw" /><span className="company-photo-arrow" aria-hidden="true">↗</span></div>
      <p>{product.brand}</p><h3>{product.name}</h3><span>{text.kinds[product.kind]}</span>
    </Link>)}</div>
    <p className="company-photo-note">{text.photoNote}</p>
  </section>;
}
