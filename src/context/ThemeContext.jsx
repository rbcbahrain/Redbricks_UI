import React, { createContext, useState, useEffect, useContext } from "react";

// Complete theme class configuration styles
const themeClasses = {
  light: {
    header: "bg-gray-200 text-black",
    body: "bg-gray-50 text-black",
    footer: "bg-gray-300 text-black",
    form: "bg-white text-black",
    button: "bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    dangerButton: "bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    text: "text-gray-800",
    link: "text-blue-600 hover:text-blue-800",
    inputBorder: "border-gray-300",
  },
  dark: {
    header: "bg-gray-800 text-white",
    body: "bg-gray-900 text-white",
    footer: "bg-gray-700 text-white",
    form: "bg-gray-800 text-white",
    button: "bg-gray-600 text-white hover:bg-gray-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    dangerButton: "bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    text: "text-white",
    link: "text-blue-400 hover:text-blue-600",
    inputBorder: "border-gray-600",
  },
  blue: {
    header: "bg-blue-800 text-white",
    body: "bg-blue-100 text-black",
    footer: "bg-blue-700 text-white",
    form: "bg-blue-50 text-black",
    button: "bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    dangerButton: "bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    text: "text-blue-900",
    link: "text-blue-700 hover:text-blue-900",
    inputBorder: "border-blue-300",
  },
  green: {
    header: "bg-green-800 text-white",
    body: "bg-green-100 text-black",
    footer: "bg-green-700 text-white",
    form: "bg-green-50 text-black",
    button: "bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    dangerButton: "bg-red-600 text-white hover:bg-red-700 flex items-center justify-center gap-2 w-full py-3 rounded",
    text: "text-green-900",
    link: "text-green-700 hover:text-green-900",
    inputBorder: "border-green-300",
  },
};

const defaultTheme = "light";

// Create Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || defaultTheme
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // currentThemeClasses exposes only active theme values
  const currentThemeClasses = themeClasses[theme] || themeClasses[defaultTheme];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeClasses, currentThemeClasses }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
