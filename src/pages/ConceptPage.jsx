import { useEffect, useRef, useState } from "react";
import Icon from "../components/Icon";
import logo from "../assets/brand/logo-light.png";
import wood from "../assets/brand/product1.jpg";
import varnish from "../assets/brand/product2.jpg";
import ferro from "../assets/brand/product3.jpg";
import multi from "../assets/brand/product4.png";
import uni from "../assets/brand/product5.png";
import "./ConceptPage.css";

const products = [
  {
    id: "wood",
    name: "CST dr.WOOD",
    brand: "CST",
    kind: "Qoplama materiallari",
    image: wood,
    inset: true,
    color: "#9b262b",
    text: "CST mahsulotlar to‘plamidan. Mos sirt, qo‘llash usuli va mavjudligini mutaxassisimiz bilan aniqlashtiring.",
  },
  {
    id: "varnish",
    name: "CST Nitro Varnish",
    brand: "CST",
    kind: "Nitrosellyuloza laki",
    image: varnish,
    inset: true,
    color: "#b56736",
    text: "CST dr.WOOD turkumidagi nitrosellyuloza laki. Ishingiz uchun mosligini va qo‘llash shartlarini biz bilan aniqlashtiring.",
  },
  {
    id: "multi",
    name: "Orbay Multi Fill",
    brand: "ORBAY",
    kind: "Poliester shpatlyovka",
    image: multi,
    color: "#6b82ae",
    text: "Orbay Multi Fill — poliester shpatlyovka. Mahsulotni tanlash, qo‘llash va mavjudligi bo‘yicha maslahat oling.",
  },
  {
    id: "uni",
    name: "Orbay Uni Fill",
    brand: "ORBAY",
    kind: "Poliester shpatlyovka",
    image: uni,
    color: "#7893b9",
    text: "Orbay Uni Fill — poliester shpatlyovka. Ishingizga mos materialni tanlash uchun mutaxassisimiz bilan bog‘laning.",
  },
  {
    id: "ferro",
    name: "CST dr.FERRO",
    brand: "CST",
    kind: "Qoplama materiallari",
    image: ferro,
    inset: true,
    color: "#959083",
    text: "CST dr.FERRO turkumidagi mahsulot. Qo‘llash sohasi, narx va mavjudlikni buyurtmadan oldin aniqlashtiring.",
  },
];
const brands = [
  "PPG",
  "DUXONE",
  "AKRiPOL",
  "Polaron",
  "Orbay",
  "Befar",
  "Henkel",
  "Axalta",
  "CST",
];
const source = "https://car-paint-uz.vercel.app/";

function CompanyLogo() {
  return (
    <span className="cp-logo">
      <img src={logo} alt="CarPaint — asl firma logosi" />
    </span>
  );
}

function ProductDialog({ product, onClose }) {
  const dialog = useRef(null);
  const image = useRef(null);
  const frame = useRef(0);
  useEffect(() => {
    const node = dialog.current;
    const oldOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
      cancelAnimationFrame(frame.current);
    };
  }, []);
  function tilt(event) {
    if (
      event.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 28;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -16;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      if (image.current)
        image.current.style.transform =
          "rotateY(" + x + "deg) rotateX(" + y + "deg)";
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    if (image.current) image.current.style.transform = "";
  }
  return (
    <dialog
      className="cp-dialog"
      ref={dialog}
      onClose={onClose}
      aria-labelledby="cp-dialog-title"
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current.close();
      }}
    >
      <button
        className="cp-round cp-dialog-close"
        aria-label="Yopish"
        onClick={() => dialog.current.close()}
      >
        <Icon name="close" />
      </button>
      <div className="cp-dialog-grid">
        <div
          className="cp-dialog-art"
          onPointerMove={tilt}
          onPointerLeave={reset}
        >
          <img
            ref={image}
            className={product.inset ? "cp-inset" : ""}
            src={product.image}
            alt={product.name}
          />
          <span>CARPAINT / PRODUCT STUDIO</span>
        </div>
        <div className="cp-dialog-copy">
          <p className="cp-kicker">
            {product.brand} / {product.kind}
          </p>
          <h2 id="cp-dialog-title">{product.name}</h2>
          <p>{product.text}</p>
          <div className="cp-dialog-note">
            <Icon name="phone" size={18} />
            <span>Narx va mavjudlikni aniqlashtiring.</span>
          </div>
          <a className="cp-button cp-button-red" href="tel:+998909557555">
            Mahsulot haqida so‘rash
            <Icon name="diagonal" />
          </a>
          <a className="cp-dialog-phone" href="tel:+998909557555">
            +998 90 955 75 55
          </a>
          <p className="cp-small">Rasm firmaning amaldagi saytidan olingan.</p>
        </div>
      </div>
    </dialog>
  );
}

export default function ConceptPage() {
  const [active, setActive] = useState(2);
  const [filter, setFilter] = useState("Barchasi");
  const [detail, setDetail] = useState(null);
  const [menu, setMenu] = useState(false);
  const root = useRef(null);
  const rail = useRef(null);
  const pointerStart = useRef(null);
  const suppressClick = useRef(false);
  const openTrigger = useRef(null);
  const menuTrigger = useRef(null);
  const current = products[active];
  const visible = products.filter(
    (p) => filter === "Barchasi" || p.brand === filter,
  );
  useEffect(() => {
    const oldTitle = document.title;
    const oldLang = document.documentElement.lang;
    const oldTheme = document.querySelector(
      'meta[name="theme-color"]',
    )?.content;
    document.title = "CarPaint — yangi dizayn namunasi";
    document.documentElement.lang = "uz";
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", "#f5f4f0");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cp-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.1 },
    );
    if (!reduced.matches)
      root.current.querySelectorAll("[data-reveal]").forEach((node) => {
        node.classList.add("cp-reveal");
        observer.observe(node);
      });
    return () => {
      observer.disconnect();
      document.title = oldTitle;
      document.documentElement.lang = oldLang;
      if (oldTheme)
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute("content", oldTheme);
    };
  }, []);
  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape" && menu) {
        setMenu(false);
        menuTrigger.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  function move(direction) {
    setActive(
      (index) => (index + direction + products.length) % products.length,
    );
  }
  function open(product, event) {
    openTrigger.current = event.currentTarget;
    setDetail(product);
  }
  function close() {
    setDetail(null);
    requestAnimationFrame(() => openTrigger.current?.focus());
  }
  return (
    <div className="cp-concept" ref={root}>
      <a className="cp-skip" href="#cp-main">
        Asosiy mazmunga o‘tish
      </a>
      <div className="cp-topline">
        <span>RANG. SIFAT. ISHONCH.</span>
        <span>
          TOSHKENT, O‘ZBEKISTON <span className="cp-dot" />
        </span>
      </div>
      <header className="cp-header">
        <a href="#cp-main" aria-label="CarPaint bosh sahifa">
          <CompanyLogo />
        </a>
        <nav className="cp-navigation" aria-label="Asosiy menyu">
          <a href="#cp-collection">Mahsulotlar</a>
          <a href="#cp-about">Biz haqimizda</a>
          <a href="#cp-brands">Brendlar</a>
        </nav>
        <div className="cp-header-right">
          <span className="cp-edition">DIZAYN NAMUNASI / 01</span>
          <a className="cp-button cp-button-red" href="#cp-contact">
            Bog‘lanish
            <Icon name="diagonal" size={16} />
          </a>
          <button
            ref={menuTrigger}
            className="cp-round cp-menu-toggle"
            aria-label={menu ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={menu}
            aria-controls="cp-mobile-nav"
            onClick={() => setMenu(!menu)}
          >
            <Icon name={menu ? "close" : "menu"} />
          </button>
        </div>
      </header>
      <nav
        id="cp-mobile-nav"
        className="cp-mobile-nav"
        hidden={!menu}
        aria-label="Mobil menyu"
      >
        {[
          ["cp-collection", "Mahsulotlar"],
          ["cp-about", "Biz haqimizda"],
          ["cp-brands", "Brendlar"],
          ["cp-contact", "Bog‘lanish"],
        ].map(([id, label]) => (
          <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
            {label}
            <Icon name="diagonal" size={16} />
          </a>
        ))}
      </nav>
      <main id="cp-main">
        <section className="cp-hero">
          <div className="cp-hero-heading">
            <p className="cp-kicker">
              <span className="cp-dot" /> 2018-YILDAN BERI SIZ BILAN
            </p>
            <h1>
              Rangni <em>his qiling.</em>
            </h1>
            <p>
              Har bir qatlamda sifat. Har bir rangda xarakter.
              <br />
              Avtomobil bo‘yoqlari va qoplamalar olamiga xush kelibsiz.
            </p>
          </div>
          <div className="cp-stage-meta">
            <span>01 / MAHSULOTLAR GALEREYASI</span>
            <span>
              Tanlang. Yaqindan ko‘ring.
              <Icon name="diagonal" size={13} />
            </span>
          </div>
          <div
            className="cp-showroom"
            ref={rail}
            role="region"
            aria-label="Interaktiv mahsulotlar galereyasi"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                move(1);
              }
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(-1);
              }
            }}
            onPointerDown={(event) => {
              if (event.pointerType === "touch") {
                pointerStart.current = event.clientX;
                suppressClick.current = false;
              }
            }}
            onPointerUp={(event) => {
              if (
                event.pointerType === "touch" &&
                pointerStart.current !== null
              ) {
                const delta = event.clientX - pointerStart.current;
                if (Math.abs(delta) > 45) {
                  move(delta < 0 ? 1 : -1);
                  suppressClick.current = true;
                }
              }
            }}
          >
            <div className="cp-stage-word" aria-hidden="true">
              CARPAINT
            </div>
            <div className="cp-stage-baseline" aria-hidden="true" />
            {products.map((product, index) => {
              let offset = (index - active + products.length) % products.length;
              if (offset > products.length / 2) offset -= products.length;
              return (
                <button
                  key={product.id}
                  className={
                    "cp-rail-product " +
                    (offset === 0 ? "cp-active " : "") +
                    (product.inset ? "cp-has-inset" : "")
                  }
                  style={{
                    "--offset": offset,
                    "--distance": Math.abs(offset),
                    "--product-color": product.color,
                  }}
                  aria-label={
                    product.name +
                    (offset === 0 ? " — yaqindan ko‘rish" : " — tanlash")
                  }
                  aria-pressed={offset === 0}
                  onClick={(event) => {
                    if (suppressClick.current && event.detail !== 0) return;
                    offset === 0 ? open(product, event) : setActive(index);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    draggable="false"
                    fetchpriority={index === 2 ? "high" : "auto"}
                  />
                  <span className="cp-product-shadow" />
                  <span className="cp-rail-number">0{index + 1}</span>
                </button>
              );
            })}
            <button
              className="cp-round cp-stage-prev"
              onClick={() => move(-1)}
              aria-label="Oldingi mahsulot"
            >
              <Icon className="rotate-180" />
            </button>
            <button
              className="cp-round cp-stage-next"
              onClick={() => move(1)}
              aria-label="Keyingi mahsulot"
            >
              <Icon />
            </button>
          </div>
          <div className="cp-selection">
            <div className="cp-selection-side">
              <span className="cp-tiny">JAHON BRENDLARI</span>
              <span>O‘z ishingiz uchun to‘g‘ri tanlov.</span>
            </div>
            <div className="cp-selection-main" aria-live="polite">
              <p>
                {current.brand} <span>/</span> {current.kind}
              </p>
              <h2 key={current.id}>{current.name}</h2>
              <button
                className="cp-link"
                onClick={(event) => open(current, event)}
              >
                Yaqindan ko‘rish
                <Icon name="diagonal" size={16} />
              </button>
            </div>
            <div
              className="cp-selection-dots"
              role="group"
              aria-label="Mahsulotni tanlash"
            >
              {products.map((p, i) => (
                <button
                  key={p.id}
                  className={i === active ? "selected" : ""}
                  onClick={() => setActive(i)}
                  aria-label={p.name}
                  aria-pressed={i === active}
                />
              ))}
            </div>
          </div>
        </section>
        <section className="cp-brand-band" id="cp-brands">
          <div className="cp-brand-intro">
            <span className="cp-dot" />
            <span>ISHONCHLI HAMKORLAR</span>
          </div>
          <div className="cp-brands">
            {brands.map((brand) => (
              <span key={brand}>{brand}</span>
            ))}
          </div>
        </section>
        <section className="cp-about cp-wrap" id="cp-about" data-reveal>
          <div>
            <p className="cp-kicker">BIZ HAQIMIZDA / CARPAINT</p>
            <h2>
              Yaxshi natija
              <br />
              <em>to‘g‘ri tanlovdan.</em>
            </h2>
          </div>
          <div className="cp-about-copy">
            <p>
              2018-yildan buyon dunyoning yetakchi brendlari bilan hamkorlik
              qilamiz. Bo‘yoq va lak mahsulotlarimiz bilan uzoq xizmat
              qiladigan, chiroyli qoplama yaratishga yordam beramiz.
            </p>
            <p>
              Sirtni tayyorlashdan yakuniy qoplamagacha — kerakli material va
              mutaxassis maslahati bir joyda.
            </p>
            <a className="cp-link" href="#cp-contact">
              Birga tanlaymiz
              <Icon name="diagonal" size={17} />
            </a>
          </div>
          <div className="cp-stats">
            <div>
              <strong>
                2018<span>—</span>
              </strong>
              <span>Hamkorlik boshlangan yil</span>
            </div>
            <div>
              <strong>1600</strong>
              <span>Turli mahsulotlar</span>
            </div>
            <div>
              <strong>
                500<span>+</span>
              </strong>
              <span>Ranglar olami</span>
            </div>
          </div>
        </section>
        <section className="cp-collection cp-wrap" id="cp-collection">
          <div className="cp-section-head" data-reveal>
            <div>
              <p className="cp-kicker">SIZNING ISHINGIZ UCHUN</p>
              <h2>
                Har bosqichga
                <br />
                <em>mos material.</em>
              </h2>
            </div>
            <div
              className="cp-filter"
              role="group"
              aria-label="Brend bo‘yicha filtrlash"
            >
              {["Barchasi", "ORBAY", "CST"].map((brand) => (
                <button
                  key={brand}
                  aria-pressed={filter === brand}
                  className={filter === brand ? "selected" : ""}
                  onClick={() => setFilter(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
          <div className="cp-card-grid">
            {visible.map((p, i) => (
              <button
                className="cp-card"
                key={p.id}
                onClick={(event) => open(p, event)}
                style={{ "--card-delay": i * 55 + "ms" }}
              >
                <div className="cp-card-image">
                  <span className="cp-card-brand">{p.brand}</span>
                  <img
                    className={p.inset ? "cp-inset" : ""}
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="cp-card-arrow">
                    <Icon name="diagonal" />
                  </span>
                </div>
                <div className="cp-card-copy">
                  <h3>{p.name}</h3>
                  <p>{p.kind}</p>
                </div>
              </button>
            ))}
          </div>
          <p className="cp-collection-note">
            Firmamiz mahsulotlaridan namunalar. Narx va mavjudlikni bog‘lanib
            aniqlashtiring.
          </p>
        </section>
        <section className="cp-contact cp-wrap" id="cp-contact" data-reveal>
          <div className="cp-contact-inner">
            <div>
              <p className="cp-kicker">G‘OYANGIZNI BIRGA AMALGA OSHIRAMIZ</p>
              <h2>
                Keyingi rangingiz
                <br />
                <em>qanday bo‘ladi?</em>
              </h2>
              <p>
                Vazifangizni ayting. Mos materialni tanlashda yordam beramiz.
              </p>
              <a className="cp-button cp-button-red" href="tel:+998909557555">
                Keling, gaplashamiz
                <Icon name="diagonal" />
              </a>
            </div>
            <div className="cp-paint-fan" aria-hidden="true">
              {[
                "#ece4d7",
                "#c9bbb0",
                "#b07062",
                "#a23435",
                "#702f36",
                "#423a47",
              ].map((color, i) => (
                <span
                  key={color}
                  style={{ "--chip-color": color, "--chip-index": i }}
                >
                  <i />
                  CP — 0{i + 1}
                </span>
              ))}
            </div>
          </div>
          <div className="cp-contact-details">
            <a href="tel:+998909557555">
              <span>TELEFON</span>
              <strong>+998 90 955 75 55</strong>
              <Icon name="diagonal" />
            </a>
            <a href="mailto:info@carpaint.uz">
              <span>ELEKTRON POCHTA</span>
              <strong>info@carpaint.uz</strong>
              <Icon name="diagonal" />
            </a>
            <div>
              <span>MANZIL</span>
              <strong>Yangihayot tumani, Toshkent</strong>
              <Icon name="pin" />
            </div>
          </div>
        </section>
      </main>
      <footer className="cp-footer cp-wrap">
        <a href="#cp-main" aria-label="CarPaint">
          <CompanyLogo />
        </a>
        <p>© {new Date().getFullYear()} CarPaint. Rang va sifat uyg‘unligi.</p>
        <a href={source} target="_blank" rel="noreferrer" className="cp-source">
          Firma sayti
          <Icon name="diagonal" size={14} />
        </a>
      </footer>
      {detail && <ProductDialog product={detail} onClose={close} />}
    </div>
  );
}
