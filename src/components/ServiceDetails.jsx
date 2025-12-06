// src/components/ServiceDetails.jsx
import React, { useState, useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";

export default function ServiceDetails({ service, onBack }) {
  const { currentThemeClasses } = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (!name || !date || !location || !address) {
      alert("Please fill all fields");
      return;
    }

    addToCart({ service, name, date, location, address });
    alert("Service added to cart!");
    navigate("/cart");
  };

  return (
    <div className={`max-w-lg mx-auto ${currentThemeClasses.body}`}>

      {/* Back */}
      <button
        onClick={() => onBack?.() || navigate("/")}
        className={`mb-4 px-3 py-2 rounded font-semibold ${currentThemeClasses.button}`}
      >
        ← Back
      </button>

      {/* Image */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      {/* Title */}
      <h3 className={`text-3xl font-bold mb-2 ${currentThemeClasses.text}`}>
        {service.name}
      </h3>

      <p className={currentThemeClasses.text}><strong>Price:</strong> ${service.price}</p>
      <p className={`mb-4 ${currentThemeClasses.text}`}>
        <strong>Duration:</strong> {service.duration}
      </p>

      {/* Booking Form */}
      <form onSubmit={handleAddToCart} className="space-y-4">

        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${currentThemeClasses.form}`}
          required
        />

        {/* Date */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${currentThemeClasses.form}`}
          required
        />

        {/* Location */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${currentThemeClasses.form}`}
          required
        >
          <option value="">Select location</option>
          <option value="Home">Home</option>
          <option value="Office">Office</option>
        </select>

        {/* Address Section */}
        <div>
          <label className={`block mb-1 font-semibold ${currentThemeClasses.text}`}>
            Address
          </label>

          <AddressList
            userId={1}
            onSelect={(addr) => {
              setAddress(addr);
              setShowAddressForm(false);
            }}
          />

          {/* Add New Address */}
          <button
            type="button"
            onClick={() => setShowAddressForm(!showAddressForm)}
            className={`mt-2 px-3 py-2 rounded ${currentThemeClasses.button}`}
          >
            {showAddressForm ? "Cancel" : "Add New Address"}
          </button>

          {showAddressForm && (
            <AddressForm
              userId={1}
              onSelect={(addr) => {
                setAddress(addr);
                setShowAddressForm(false);
              }}
            />
          )}

          {/* Selected Address */}
          <input
            type="text"
            placeholder="Selected Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={`w-full mt-3 px-3 py-2 border rounded ${currentThemeClasses.form}`}
            required
          />
        </div>

        {/* Submit */}
        <button type="submit" className={currentThemeClasses.button}>
          Add To Cart
        </button>
      </form>
    </div>
  );
}
