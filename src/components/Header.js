import React, { useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const { theme, setTheme, themeClasses } = useTheme();
  const navigate = useNavigate();

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
        <span className="font-bold text-lg">RedBricks</span>
      </div>

      {/* Navigation & Theme */}
      <div className="flex items-center gap-4">
        <nav className="flex gap-4 items-center">
        

          {user ? (
            <>
              <span>Welcome, {user.name}</span>

              {/* Admin-only link */}
              {role === "Admin" && (
                <Link to="/ServiceHomePage" className="hover:underline">Home</Link>
              )}

          

              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-1 border rounded hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <> 
            <Link to="/HomePage" className="hover:underline">Home</Link>
                <Link to="/contact" className="hover:underline">Contact</Link>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          )}
        </nav>

        {/* Theme selector */}
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
