import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import AutomotiveImage from './AutomotiveImage';
import PaintSplash from './PaintSplash';
import { showroom } from '../data/company';
import '../pages/ProductShowcase.css';

export default function CompanyGallery({ text }) {
  const rail = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const node = rail.current;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const max = node.scrollWidth - node.clientWidth;
      const next = { start: node.scrollLeft <= 2, end: node.scrollLeft >= max - 2 };
      node.style.setProperty('--rail-progress', String(max > 0 ? node.scrollLeft / max : 1));
      setEdges(previous => previous.start === next.start && previous.end === next.end ? previous : next);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    node.addEventListener('scroll', schedule, { passive: true });
    measure();
    return () => { observer.disconnect(); node.removeEventListener('scroll', schedule); cancelAnimationFrame(frame); };
  }, []);
  const move = direction => {
    const node = rail.current;
    const card = node.querySelector('.company-photo-card');
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(node).columnGap || 0);
    node.scrollBy({ left: direction * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return <section className="auto-products auto-container" aria-labelledby="auto-products-title">
    <PaintSplash tone="coral" variant={2} className="paint-section-wash" />
    <div className="auto-section-head"><div><p className="auto-eyebrow">{text.productsLabel}</p><h2 id="auto-products-title">{text.products}</h2></div><Link className="auto-text-link" to="/product">{text.all} ↗</Link></div>
    <div className="product-rail-toolbar"><p><span aria-hidden="true">↔</span>{text.browseProducts}</p><div><span>01 — 06</span><button type="button" aria-label={text.previousProducts} disabled={edges.start} onClick={() => move(-1)}>←</button><button type="button" aria-label={text.nextProducts} disabled={edges.end} onClick={() => move(1)}>→</button></div></div>
    <div className="company-photo-grid product-rail" ref={rail} tabIndex={0} role="region" aria-label={text.products} onKeyDown={event => { if (event.target === event.currentTarget && ['ArrowLeft','ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}>{showroom.map((product, index) => <Link className="company-photo-card" key={product.id} to="/product">
      <div className="company-photo"><PaintSplash tone={['amber','teal','coral','blue','green','mint'][index]} variant={index} /><span className="company-photo-index" aria-hidden="true">0{index + 1}</span><AutomotiveImage name={product.image} alt={`${product.name} — ${text.kinds[product.kind]}`} sizes="(max-width: 600px) 90vw, (max-width: 1000px) 44vw, 29vw" /><span className="company-photo-arrow" aria-hidden="true">↗</span></div>
      <p>{product.brand}</p><h3>{product.name}</h3><span>{text.kinds[product.kind]}</span>
    </Link>)}</div>
    <p className="company-photo-note">{text.photoNote}</p>
  </section>;
}
