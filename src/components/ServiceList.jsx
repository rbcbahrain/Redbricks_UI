import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ServiceList({ services, onSelectService }) {
  const { currentThemeClasses } = useTheme();

  return (
    <div>
      <h3 className={`text-2xl font-semibold mb-4 ${currentThemeClasses.text}`}>Services</h3>
      <div className="flex flex-wrap gap-6 justify-center">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => onSelectService(service)}
            className={`cursor-pointer rounded-lg shadow-md overflow-hidden w-48 transition-transform hover:scale-105 ${currentThemeClasses.form} hover:opacity-90`}
          >
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h4 className={`font-semibold text-lg mb-1 ${currentThemeClasses.text}`}>
                {service.name}
              </h4>
              <p className="text-gray-500 dark:text-gray-400">
                ${service.price} • {service.duration}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
