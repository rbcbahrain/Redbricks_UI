import React, { useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const { theme, setTheme, themeClasses } = useTheme();
  const navigate = useNavigate();

  const{t,lang,setLang}=useLang();

  const role = localStorage.getItem("role"); // "admin" or "user"

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header
      className={`flex justify-between items-center p-4 ${themeClasses[theme].header}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/RedbricksLogo.png" alt="Logo" className="h-10" />
        <span className="font-bold text-lg">{t.APP_COMPANY_NAME}</span>
      </div>

      {/* Navigation & Theme */}
      <div className="flex items-center gap-4">
        <nav className="flex gap-4 items-center">
        

          {user ? (
            <>
              <span>{t.HEADER_WELCOME}, {user.name}</span>

              {/* Admin-only link */}
              {role === "Admin" && (
                <Link to="/ServiceHomePage" className="hover:underline">{t.HEADER_HOME}</Link>
                              )}
               <Link to="/HomePage" className="hover:underline">{t.HEADER_SERVICES}</Link>
          
           <Link to="/cart" className="hover:underline">{t.HEADER_CART}</Link>

              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 border rounded hover:bg-gray-200"
              >
                {t.HEADER_LOGOUT}
              </button>
            </>
          ) : (
            <> 
            <Link to="/HomePage" className="hover:underline">{t.HEADER_HOME}</Link>
                <Link to="/contact" className="hover:underline">{t.HEADER_CONTACT}</Link>
              <Link to="/login" className="hover:underline">{t.HEADER_LOGIN}</Link>
              <Link to="/register" className="hover:underline">{t.HEADER_REGISTER}</Link>
            </>
          )}
        </nav>

        {/* Theme selector */}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-1 rounded border bg-white text-black"
        >
          <option value="light">{t.THEME_LIGHT}</option>
          <option value="dark">{t.THEME_DARK}</option>
          <option value="blue">{t.THEME_BLUE}</option>
          <option value="green">{t.THEME_GREEN}</option>
        </select> 

  {/* Single toggle button */}
  <button
    onClick={() => setLang(lang === "en" ? "ar" : "en")}
    className="px-3 py-1 border rounded hover:bg-gray-200"
  >
     {t.LANG_TOGGLE}
  </button>

      </div>
    </header>
  );
}
