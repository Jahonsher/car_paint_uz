import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useLanguage } from "../localization/LanguageContext";
import Icon from "./Icon";
const links = [
  ["/", "home"],
  ["/product", "products"],
  ["/about", "about"],
  ["/news", "news"],
  ["/contact", "contact"],
];
export function Logo() {
  return (
    <span className="logo">
      <span className="logo-mark">
        <i />
        <i />
        <i />
      </span>
      <span>
        car<span>paint</span>
      </span>
    </span>
  );
}
export default function Layout() {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const menuButton = useRef(null);
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    setOpen(false);
    if (previousPath.current !== location.pathname) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
      previousPath.current = location.pathname;
    }
  }, [location.pathname]);
  useEffect(() => {
    const key = (event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  useEffect(() => {
    const key =
      links.find(([path]) => path === location.pathname)?.[1] || "products";
    document.title = t(key) + " — CarPaint";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("footerText"));
  }, [location.pathname, t]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        {t("skip")}
      </a>
      <div className="topbar">
        <div className="container">
          <span>
            <span className="status-dot" />
            {t("topNote")}
          </span>
          <span>
            <Icon name="pin" size={13} />
            {t("location")}
          </span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" aria-label={"CarPaint — " + t("home")}>
            <Logo />
          </Link>
          <nav className="desktop-nav" aria-label={t("navigation")}>
            {links.map(([path, key]) => (
              <NavLink key={path} end={path === "/"} to={path}>
                {t(key)}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            <label className="sr-only" htmlFor="language">
              {t("language")}
            </label>
            <select
              id="language"
              className="language-select"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="uz">UZ</option>
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
            <Link to="/contact" className="button button-primary header-cta">
              {t("consult")}
              <Icon name="diagonal" size={16} />
            </Link>
            <button
              ref={menuButton}
              className="icon-button menu-toggle"
              aria-label={t(open ? "close" : "menu")}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </div>
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          hidden={!open}
          aria-label={t("menu")}
        >
          {links.map(([path, key]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={() => setOpen(false)}
            >
              {t(key)}
              <Icon name="diagonal" size={16} />
            </NavLink>
          ))}
        </nav>
      </header>
      {!online && (
        <div className="offline-bar" role="status">
          {t("offline")}
        </div>
      )}
      <main id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <Link to="/" aria-label="CarPaint">
              <Logo />
            </Link>
            <p>{t("footerText")}</p>
          </div>
          <div>
            <h3>{t("navigation")}</h3>
            <nav>
              {links.slice(1).map(([path, key]) => (
                <Link key={path} to={path}>
                  {t(key)}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <h3>{t("contact")}</h3>
            <a className="footer-phone" href="tel:+998909557555">
              +998 90 955 75 55
            </a>
            <a href="mailto:info@carpaint.uz">info@carpaint.uz</a>
            <span>{t("location")}</span>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            © {new Date().getFullYear()} CarPaint. {t("rights")}
          </span>
          <button
            className="text-button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "instant"
                  : "smooth",
              })
            }
          >
            {t("backTop")}
            <Icon name="up" size={16} />
          </button>
        </div>
      </footer>
    </>
  );
}
