import React, { createContext, useContext, useEffect, useState } from "react";
import en from "../lang/en.json";
import ar from "../lang/ar.json";

const resources = {
  en,
  ar,
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("lang") || "en"
  );

  const t = resources[lang];

  useEffect(() => {
    // 🔥 THIS is where direction changes
    const dir = lang === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dir = dir;

    localStorage.setItem("lang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
