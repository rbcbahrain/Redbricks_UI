import React,{useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { UserContext } from '../context/UserContext';
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const { theme, setTheme, themeClasses } = useTheme();

  return (
    <header
      className={`flex justify-between items-center p-4 ${themeClasses[theme].header}`}
    >
      <div className="flex items-center gap-2">
        <img src="/RedbricksLogo.png" alt="Logo" className="h-10" />
        <span className="font-bold text-lg">RedBricks</span>
      </div>

      {/* Right: Menu + Theme Selector */}
      <div className="flex items-center gap-4">
      <nav className="flex gap-2">
  <Link to="/HomePage" className="hover:underline">Home</Link>
  <Link to="/contact" className="hover:underline">Contact Us</Link>
   {/* Other links */}
      {user ? (
        <>
        <span>Welcome, {user.name}</span>
        <button onClick={logout} className="ml-4">Logout</button>
        </>
      ) : (
        <>
  <Link to="/login" className="hover:underline">Login</Link>
  <Link to="/register" className="hover:underline">Register</Link>
   <Link to="/serviceform" className="hover:underline">ServiceForm</Link>
  </>
      )}
</nav>

      <select
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  className="p-1 rounded border bg-white text-black"
>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
</select>
</div>
    </header>
  );
}
