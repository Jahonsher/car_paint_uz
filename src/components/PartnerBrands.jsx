import { company } from '../data/company';

const logos = {
  PPG: 'ppg.svg', DUXONE: 'duxone.png', AKRiPOL: 'akripol.png',
  Polaron: 'polaron.png', Orbay: 'orbay.png', Befar: 'befar.png',
  Henkel: 'henkel.svg', Axalta: 'axalta.png', CST: 'cst.svg',
};

export default function PartnerBrands({ title }) {
  return <section className="auto-material-band" aria-label={title}>
    <p className="auto-container auto-eyebrow">{title}</p>
    <ul className="auto-container partner-brand-grid">
      {company.brands.map(brand => <li className="partner-brand" key={brand}>
        <img src={`/images/brands/${logos[brand]}`} alt={brand} width="144" height="72" loading="lazy" decoding="async" />
      </li>)}
    </ul>
  </section>;
}
