import automotive from '../../localization/company';

export default function HomeContact({ lang = 'uz' }) {
  const text = automotive[lang] || automotive.uz;
  return <form className="auto-contact-form" onSubmit={event => {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const body = `${text.name}: ${values.get('name') || ''}\n${text.email}: ${values.get('email') || ''}\n${text.phone}: ${values.get('phone') || ''}`;
    window.location.href = `mailto:info@carpaint.uz?subject=CarPaint&body=${encodeURIComponent(body)}`;
  }}>
    <div className="auto-field"><label htmlFor="home-name">{text.name}</label><input id="home-name" name="name" type="text" autoComplete="name" placeholder={text.name} /></div>
    <div className="auto-field"><label htmlFor="home-email">{text.email}</label><input id="home-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" /></div>
    <div className="auto-field"><label htmlFor="home-phone">{text.phone}</label><input id="home-phone" name="phone" type="tel" autoComplete="tel" placeholder="+998" /></div>
    <p className="company-form-note">{text.formNote}</p>
    <button className="auto-button company-form-action" type="submit">{text.emailAction} ↗</button>
  </form>;
}
