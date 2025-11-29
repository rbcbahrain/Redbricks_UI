import React, { useState } from "react";
import CategoryList from "../components/CategoryList";
import ServiceList from "../components/ServiceList";
import ServiceDetails from "../components/ServiceDetails";
import { categories, services } from "../data/serviceData";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

export default function HomePage() {

   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [bookings, setBookings] = useState([]);

  const { theme, toggleTheme,currentThemeClasses } = useTheme();

  const handleBook = (booking) => {
    setBookings((prev) => [...prev, booking]);
    alert(
      `Booking confirmed for ${booking.service.name} on ${booking.date}, by ${booking.name}`
    );
    // reset
    setSelectedService(null);
    setSelectedCategoryId(null);
  };

  return (
    <div className={`${currentThemeClasses.body} min-h-screen`}>
     <div className="max-w-5xl mx-auto p-6">
      
      {!selectedCategoryId && !selectedService && (
        <CategoryList
          categories={categories}
          onSelectCategory={setSelectedCategoryId}
        />
      )}

      {selectedCategoryId && !selectedService && (
        <ServiceList
          services={services[selectedCategoryId]}
          onSelectService={setSelectedService}
        />
      )}

      {selectedService && (
        <ServiceDetails
          service={selectedService}
          onBook={handleBook}
          onBack={() => setSelectedService(null)}
        />
      )}

      <hr className="my-8 border-gray-400 dark:border-gray-600" />
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="list-disc list-inside space-y-1">
          {bookings.map((b, i) => (
            <li key={i}>
              <strong>{b.name}</strong> booked <em>{b.service.name}</em> on {b.date}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}
