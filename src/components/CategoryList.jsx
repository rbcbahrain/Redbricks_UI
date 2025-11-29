import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function CategoryList({ categories, onSelectCategory }) {
  const { currentThemeClasses } = useTheme();

  return (
    <div>
      <h2 className={`text-3xl font-bold mb-6 ${currentThemeClasses.text}`}>
        Service Categories
      </h2>
      <div className="flex gap-6 flex-wrap justify-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`cursor-pointer p-4 rounded-lg shadow-md transition-transform hover:scale-105
              ${currentThemeClasses.form} hover:opacity-90
              w-36 flex flex-col items-center`}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-20 h-20 rounded-full object-cover mb-3"
            />
            <span className={`font-semibold text-lg ${currentThemeClasses.text}`}>
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
