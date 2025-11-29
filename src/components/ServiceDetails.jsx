// src/components/ServiceDetails.jsx
import React, { useState, useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function ServiceDetails({ service, onBack }) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!name || !date || !location || !address) {
      alert("Please fill in all fields before adding to cart");
      return;
    }

    addToCart({ service, name, date, location, address });
    alert("Service added to cart!");
    navigate("/cart"); // redirect to cart page
  };

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/");
  };

  return (
    <div className="max-w-lg mx-auto">
      <button
        onClick={handleBack}
        className={`mb-4 px-3 py-1 rounded ${
          theme === "dark"
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-200 text-gray-900 hover:bg-gray-300"
        }`}
      >
        &lt; Back to services
      </button>
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="text-3xl font-bold mb-2">{service.name}</h3>
      <p className="mb-1">
        <strong>Price:</strong> ${service.price}
      </p>
      <p className="mb-4">
        <strong>Duration:</strong> {service.duration}
      </p>
      <form className="space-y-4" onSubmit={handleAddToCart}>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">Your Name</label>
          <input
            id="name"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            }`}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="date">
            Preferred Date
          </label>
          <input
            id="date"
            type="date"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            }`}
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="location">
            Preferred Location
          </label>
          <select
            id="location"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            }`}
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          >
            <option value="">Select location</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 focus:border-blue-500"
            }`}
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 rounded font-semibold ${
            theme === "dark"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          Add to Cart
        </button>
      </form>
    </div>
  );
}
