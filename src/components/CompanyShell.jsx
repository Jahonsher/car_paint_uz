import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import copy from '../localization/company';
import { company } from '../data/company';
import logo from '../assets/brand/logo-light.png';
import usePageMotion from '../utils/usePageMotion';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/900.css';
import '../pages/AutomotiveHome.css';
import '../pages/CompanyPages.css';

export const companyLinks = [['/', 'home'], ['/about', 'about'], ['/product', 'productPage'], ['/news', 'news'], ['/contact', 'contacts']];

export default function CompanyShell({ lang, setLang, pageKey = 'home', children }) {
  const language = copy[lang] ? lang : 'uz';
  const text = copy[language];
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const menuButton = useRef(null);
  const shell = usePageMotion(location.pathname, language);
  useEffect(() => {
    const oldTitle = document.title;
    const oldLanguage = document.documentElement.lang;
    const description = document.querySelector('meta[name="description"]');
    const oldDescription = description?.content;
    document.title = `${text[pageKey] || text.productPage} — CarPaint`;
    document.documentElement.lang = language;
    description?.setAttribute('content', text.intro);
    return () => {
      document.title = oldTitle;
      document.documentElement.lang = oldLanguage;
      if (oldDescription !== undefined) description?.setAttribute('content', oldDescription);
    };
  }, [language, pageKey, text]);
  useEffect(() => {
    setMenu(false);
    if (!location.hash) window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape' && menu) { setMenu(false); menuButton.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);
  return <div className="auto-home" ref={shell}>
    <a className="auto-skip" href="#auto-main">{text.skip}</a>
    <div className="auto-topline auto-container"><span>{text.note}</span><a href={company.phoneHref}>{company.phone} ↗</a></div>
    <header className="auto-header auto-container">
      <Link className="auto-logo" to="/" aria-label="CarPaint"><img src={logo} alt="CarPaint" width="200" height="200" /></Link>
      <nav className="auto-nav" aria-label={text.menu}>{companyLinks.map(([path, key]) => <NavLink key={path} to={path} end={path === '/'}>{text[key]}</NavLink>)}</nav>
      <div className="auto-header-actions"><select aria-label={text.language} value={language} onChange={event => {
        setLang(event.target.value);
        try { localStorage.setItem('lang', JSON.stringify(event.target.value)); } catch {}
      }}><option value="uz">UZ</option><option value="ru">RU</option><option value="en">EN</option></select>
        <button ref={menuButton} className="auto-menu-button" aria-label={menu ? text.close : text.menu} aria-expanded={menu} aria-controls="auto-mobile-menu" onClick={() => setMenu(!menu)}>{menu ? '×' : '☰'}</button>
      </div>
    </header>
    <nav id="auto-mobile-menu" className="auto-mobile-nav auto-container" hidden={!menu} aria-label={text.menu}>{companyLinks.map(([path, key]) => <Link key={path} to={path} onClick={() => setMenu(false)}>{text[key]} ↗</Link>)}</nav>
    <main id="auto-main" tabIndex={-1}>{children}</main>
    <footer className="auto-footer auto-container"><Link className="auto-footer-word" to="/">carpaint<span>®</span></Link><nav aria-label={text.menu}>{companyLinks.map(([path, key]) => <Link key={path} to={path}>{text[key]}</Link>)}</nav><div className="company-footer-contact"><a href={company.phoneHref}>{company.phone}</a><a href={`mailto:${company.email}`}>{company.email}</a><span>{text.address}</span></div></footer>
  </div>;
}

export function CompanyPageHeading({ text, title, intro, number }) {
  return <div className="auto-container company-page-heading"><p className="auto-eyebrow">CARPAINT / {number}</p><h1>{title}</h1>{intro && <p>{intro}</p>}</div>;
}

export function CompanyContact({ text, children }) {
  return <section className="auto-contact" id="auto-contact" aria-labelledby="auto-contact-title">
    <div className="auto-container auto-contact-grid"><div><p className="auto-eyebrow">{text.contactLabel}</p><h2 id="auto-contact-title">{text.contactTitle}</h2><p>{text.contactText}</p>
      <a className="auto-contact-phone" href={company.phoneHref}>{company.phone} ↗</a><a className="auto-text-link" href={`mailto:${company.email}`}>{company.email} ↗</a><p className="company-address">{text.address}</p>
    </div>{children}</div>
    <div className="auto-container auto-map"><iframe title={text.mapTitle} loading="lazy" src={company.mapEmbed} width="100%" height="280" /></div>
  </section>;
}
