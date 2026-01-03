import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { masterscreenlist } from "../data/serviceData";

export default function ServiceHomePage() {
  const { currentThemeClasses } = useTheme();

  return (
    <div>
      <h2 className={`text-3xl font-bold mb-6 ${currentThemeClasses.text}`}>
        Create Services
      </h2>

      <div className="flex gap-6 flex-wrap justify-center">
        {masterscreenlist.map((screenlst) => {
          
          // ⬅ Card UI
          const Card = (
            <div
              className={`cursor-pointer p-4 rounded-lg shadow-md transition-transform hover:scale-105
                ${currentThemeClasses.form} hover:opacity-90
                w-36 flex flex-col items-center`}
            >
              <img
                src={screenlst.image}
                alt={screenlst.name}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <span
                className={`font-semibold text-lg ${currentThemeClasses.text}`}
              >
                {screenlst.name}
              </span>
            </div>
          );

          // ⬅ If the item has a link
          return screenlst.link ? (
            <Link key={screenlst.id} to={screenlst.link}>
              {Card}
            </Link>
          ) : (
            <div key={screenlst.id}>{Card}</div> // ⬅ No link for Upcoming
          );
        })}
      </div>
    </div>
  );
}
