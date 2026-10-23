import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import CompanyShell, { CompanyContact, CompanyPageHeading } from '../components/CompanyShell';
import CompanyGallery from '../components/CompanyGallery';
import AutomotiveImage from '../components/AutomotiveImage';
import PaintSplash from '../components/PaintSplash';
import HomeContact from '../components/HomeComp/HomeContact';
import { CompanyApiImage, CompanyProductCards, CompanyStatus } from '../components/CompanyApiContent';
import copy from '../localization/company';
import { company } from '../data/company';
import { companyList, companyProduct, companyProducts } from '../utils/companyApi';
import { localized, plainText, productImages } from '../utils/catalog';

export function CompanyAbout({ lang, setLang }) {
  const text = copy[lang] || copy.uz;
  return <CompanyShell lang={lang} setLang={setLang} pageKey="about">
    <CompanyPageHeading text={text} title={text.aboutTitle} intro={text.aboutText} number="ABOUT" />
    <section className="auto-container company-about-feature"><AutomotiveImage name="putty" alt={text.storyAlts[0]} sizes="(max-width: 760px) 100vw, 75vw" hero /><div><p className="auto-eyebrow">{text.brandTitle}</p><p>{company.brands.join(' / ')}</p></div></section>
    <div className="auto-container company-stats">{text.stats.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div>
    <section className="auto-container company-benefits"><p className="auto-eyebrow">{text.benefitsLabel}</p><h2>{text.benefitsTitle}</h2><div className="company-editorial-grid">{text.benefits.map(([title, description], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
    <section className="auto-container company-brand-stories"><h2>{text.brandTitle}</h2>{text.brandDescriptions.map(([brand, description], i) => <article key={brand}><span>0{i + 1}</span><h3>{brand}</h3><p>{description}</p><Link className="auto-text-link" to="/product">{text.catalog} ↗</Link></article>)}</section>
    <CompanyContact text={text}><HomeContact lang={lang} compact /></CompanyContact>
  </CompanyShell>;
}

export function CompanyContactPage({ lang, setLang }) {
  const text = copy[lang] || copy.uz;
  return <CompanyShell lang={lang} setLang={setLang} pageKey="contacts"><CompanyPageHeading text={text} title={text.contacts} intro={text.contactText} number="CONTACT" /><CompanyContact text={text}><HomeContact lang={lang} compact /></CompanyContact></CompanyShell>;
}

export function CompanyCatalog({ lang, setLang }) {
  const text = copy[lang] || copy.uz;
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('category') || '';
  const subcategory = params.get('subcategory') || '';
  const selectedBrands = params.getAll('brand');
  const page = Math.max(1, Math.min(10000, Number(params.get('page')) || 1));
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => { const timer = setTimeout(() => setDebouncedSearch(search), 250); return () => clearTimeout(timer); }, [search]);
  const change = (key, value) => {
    const next = new URLSearchParams(params);
    next.delete(key);
    if (Array.isArray(value)) value.forEach(item => next.append(key, item));
    else if (value) next.set(key, value);
    if (key !== 'page') next.delete('page');
    if (key === 'category') next.delete('subcategory');
    setParams(next, { replace: key === 'q', preventScrollReset: true });
  };
  const categories = useQuery({ queryKey: ['company', 'categories'], queryFn: ({ signal }) => companyList('categories', {}, signal), retry: false });
  const brands = useQuery({ queryKey: ['company', 'brands'], queryFn: ({ signal }) => companyList('brands', { limit: 40, page: 1 }, signal), retry: false });
  const subcategories = useQuery({ queryKey: ['company', 'subcategories', category], queryFn: ({ signal }) => companyList('subcategories', { categoryId: category }, signal), enabled: Boolean(category), retry: false });
  const body = { brand_id: selectedBrands, category_id: category || null, sub_category_id: subcategory || null, search_uz: debouncedSearch };
  const products = useQuery({ queryKey: ['company', 'products', page, body], queryFn: ({ signal }) => companyProducts({ page, body, signal }), retry: false });
  const from = '/product' + (params.size ? '?' + params.toString() : '');
  return <CompanyShell lang={lang} setLang={setLang} pageKey="productPage">
    <CompanyPageHeading text={text} title={text.productPage} intro={text.catalogIntro} number="CATALOG" />
    <section className="auto-container company-catalog" aria-label={text.productPage}>
      <aside className="company-filters"><label htmlFor="company-category">{text.category}</label><select id="company-category" value={category} onChange={event => change('category', event.target.value)}><option value="">{text.allItems}</option>{(categories.data || []).map(item => <option value={item.category_id} key={item.category_id}>{localized(item, 'category_name', lang)}</option>)}</select>
        {category && <><label htmlFor="company-subcategory">{text.subcategory}</label><select id="company-subcategory" value={subcategory} onChange={event => change('subcategory', event.target.value)}><option value="">{text.allItems}</option>{(subcategories.data || []).map(item => <option key={item.sub_category_id} value={item.sub_category_id}>{localized(item, 'sub_category_name', lang)}</option>)}</select></>}
        <fieldset><legend>{text.brand}</legend>{(brands.data || []).map(item => <label className="company-brand-check" key={item.brand_id}><input type="checkbox" checked={selectedBrands.includes(String(item.brand_id))} onChange={() => change('brand', selectedBrands.includes(String(item.brand_id)) ? selectedBrands.filter(id => id !== String(item.brand_id)) : [...selectedBrands, String(item.brand_id)])} />{item.brand_name}</label>)}</fieldset>
        {(categories.isError || brands.isError || subcategories.isError) && <p className="company-filter-note">{text.unavailable}</p>}
        <button className="auto-text-link" onClick={() => setParams({})}>{text.clear}</button>
      </aside>
      <div><label className="company-search-label" htmlFor="company-search">{text.search}</label><input className="company-search" id="company-search" type="search" value={search} placeholder={text.search} onChange={event => change('q', event.target.value)} />
        {products.isPending || products.isError || !products.data?.length ? <CompanyStatus text={text} loading={products.isPending} error={products.isError} empty={text.empty} retry={products.refetch} /> : <CompanyProductCards products={products.data} lang={lang} text={text} from={from} />}
        <nav className="company-pagination" aria-label={text.page}><button disabled={page <= 1 || products.isFetching} onClick={() => change('page', String(page - 1))}>{text.previous}</button><span>{text.page} {page}</span><button disabled={products.isFetching || products.isError || (products.data?.length || 0) < 12} onClick={() => change('page', String(page + 1))}>{text.next}</button></nav>
      </div>
    </section>
    <CompanyGallery text={text} />
  </CompanyShell>;
}

export function CompanyNews({ lang, setLang }) {
  const text = copy[lang] || copy.uz;
  const news = useQuery({ queryKey: ['company', 'news'], queryFn: ({ signal }) => companyList('news', { limit: 20, page: 1 }, signal), retry: false });
  return <CompanyShell lang={lang} setLang={setLang} pageKey="news"><CompanyPageHeading text={text} title={text.news} intro={text.newsIntro} number="NEWS" /><section className="auto-container company-news">
    {news.isPending || news.isError || !news.data?.length ? <CompanyStatus text={text} loading={news.isPending} error={news.isError} empty={text.noNews} retry={news.refetch} /> : <div className="company-news-grid">{news.data.map(item => <article key={item.new_id}><CompanyApiImage key={item.new_image} src={item.new_image} alt={localized(item, 'new_title', lang)} /><h2>{localized(item, 'new_title', lang)}</h2><p>{plainText(localized(item, 'new_description', lang))}</p></article>)}</div>}
  </section></CompanyShell>;
}

export function CompanySingle({ lang, setLang }) {
  const text = copy[lang] || copy.uz;
  const { id } = useParams();
  const location = useLocation();
  const [selected, setSelected] = useState(0);
  const product = useQuery({ queryKey: ['company', 'product', id], queryFn: ({ signal }) => companyProduct(id, signal), retry: false });
  const images = productImages(product.data);
  const title = localized(product.data, 'product_title', lang) || text.productPage;
  const candidate = location.state?.catalog;
  const back = typeof candidate === 'string' && /^\/product(?:\?|$)/.test(candidate) ? candidate : '/product';
  useEffect(() => { setSelected(0); }, [id]);
  return <CompanyShell lang={lang} setLang={setLang} pageKey="productPage"><div className="auto-container company-detail"><Link className="auto-text-link" to={back}>← {text.back}</Link>
    {product.isPending || product.isError ? <><h1>{product.isError ? text.productMissing : text.productPage}</h1><CompanyStatus text={text} loading={product.isPending} error={product.isError} empty={text.productMissing} retry={product.refetch} /></> : <div className="company-detail-grid"><div><div className="company-detail-image"><PaintSplash tone="coral" variant={2} /><CompanyApiImage key={images[selected]} src={images[selected]} alt={title} loading="eager" /></div><div className="company-detail-thumbs">{images.map((image, index) => <button key={image} aria-label={`${title} — ${index + 1}`} aria-pressed={selected === index} onClick={() => setSelected(index)}><img src={image} alt="" width="72" height="72" /></button>)}</div></div><div><p className="auto-eyebrow">CARPAINT / {product.data.brand_name || text.productPage}</p><h1>{title}</h1><p>{plainText(localized(product.data, 'product_description', lang)) || text.noDescription}</p><p className="company-availability">{text.availability}</p><a className="auto-button" href={company.phoneHref}>{text.contact} ↗</a></div></div>}
  </div></CompanyShell>;
}
