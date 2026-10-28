import { Link } from 'react-router-dom';
import CompanyShell, { CompanyContact } from '../components/CompanyShell';
import CompanyGallery from '../components/CompanyGallery';
import InstagramReels from '../components/InstagramReels';
import AutomotiveImage from '../components/AutomotiveImage';
import AutomotiveStory from '../components/AutomotiveStory';
import HomeContact from '../components/HomeComp/HomeContact';
import PaintStudio from '../components/PaintStudio';
import PartnerBrands from '../components/PartnerBrands';
import paintCopy from '../localization/paintStudio';
import { company } from '../data/company';
import copy from '../localization/company';

export default function CompanyHome({ lang, setLang }) {
  const text = copy[lang] || copy.uz;
  return <CompanyShell lang={lang} setLang={setLang}>
    <section className="auto-hero auto-container" aria-labelledby="auto-title">
      <div className="auto-hero-copy"><p className="auto-eyebrow"><i />{text.eyebrow}</p>
        <h1 id="auto-title">{text.title}<br /><em>{text.accent}</em></h1>
        <p className="auto-intro">{text.intro}</p>
        <div className="auto-hero-actions"><Link className="auto-button" to="/product">{text.catalog}<span>↗</span></Link><a className="auto-text-link" href={company.phoneHref}>{text.contact} ↗</a></div>
        <a className="auto-scroll-cue" href="#paint-studio"><span>↓</span>{(paintCopy[lang] || paintCopy.uz).studio}</a>
      </div>
      <figure className="auto-hero-art company-hero-art"><AutomotiveImage name="hero" alt={text.heroAlt} hero sizes="(max-width: 760px) 100vw, 58vw" /><div className="company-color-swatch" aria-hidden="true"><i /><i /><i /><i /><i /><span>COLOR / 500+</span></div><figcaption><span>CARPAINT / PRODUCT COLLECTION</span><span>{text.photo} ↗</span></figcaption></figure>
      <div className="auto-hero-index" aria-hidden="true">01 / COLOR & MATERIAL</div>
    </section>
    <PartnerBrands title={text.brandTitle} />
    <PaintStudio lang={lang} />
    <AutomotiveStory text={text} />
    <CompanyGallery text={text} />
    <InstagramReels lang={lang} />
    <section className="auto-about auto-container" aria-labelledby="auto-about-title" data-reveal>
      <figure className="company-about-art"><AutomotiveImage name="primer" alt="Daybond 445 1K Acrylic Primer" sizes="(max-width: 760px) 100vw, 48vw" /><figcaption>CARPAINT / PRODUCT COLLECTION</figcaption></figure>
      <div><p className="auto-eyebrow">{text.aboutLabel}</p><h2 id="auto-about-title">{text.aboutTitle}</h2><p>{text.aboutText}</p><Link className="auto-text-link" to="/about">{text.aboutLink} ↗</Link></div>
    </section>
    <div className="auto-container company-stats">{text.stats.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <CompanyContact text={text}><HomeContact lang={lang} compact /></CompanyContact>
  </CompanyShell>;
}
