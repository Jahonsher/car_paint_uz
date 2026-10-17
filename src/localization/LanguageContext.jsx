import { createContext, useContext, useEffect, useMemo, useState } from "react";
import messages from "./messages";
import { readLanguage } from "../utils/storage";
const LanguageContext = createContext();
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readLanguage);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("lang", JSON.stringify(lang));
    } catch {}
  }, [lang]);
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key) => messages[lang][key] ?? messages.uz[key] ?? key,
    }),
    [lang],
  );
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
export const useLanguage = () => useContext(LanguageContext);
