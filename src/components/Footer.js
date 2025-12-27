import React from "react";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { theme, themeClasses } = useTheme();//Theme
const{t}=useLang();
const currentYear=new Date().getFullYear();
  return (
    <footer className={`p-4 text-center ${themeClasses[theme].footer}`}>
      <p>© {currentYear} {t.APP_COMPANY_NAME}. {t.FOOTER_RIGHTS}</p>
    </footer>
  );
}
