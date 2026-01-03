// src/components/ServiceDetails.jsx
import React, { useState, useContext } from "react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import AddressForm from "./AddressForm";
import AddressList from "./AddressList";
import axios from "axios";
import { API_BASE_URL } from "../config";

export default function ServiceDetails({ service, onBack }) {
  const { currentThemeClasses } = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const{user}=useContext(UserContext);
  const LoginUserID=user?.userId;
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [refreshAddresses, setRefreshAddresses] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!name || !date || !location || !address) {
      alert(name);
       alert(location);
       alert(address);
      alert("Please fill all fields");
      return;
    }
 const payload = {
    userId: LoginUserID, // ⚠️ replace with logged-in user id
    serviceId: service.id,
    quantity: 1,
    price: service.price,
    addedAt: new Date().toISOString(),
  };

  try {
    // ✅ Save to DB
    await axios.post(`${API_BASE_URL}/Cart/AddCart`, payload);

    addToCart({ service, name, date, location, address });
    alert("Service added to cart!");
    navigate("/cart");
    } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add service to cart");
  }
  };

  return (
    <div className={`max-w-lg mx-auto ${currentThemeClasses.body}`}>
      {/* Back Button */}
      <button
        onClick={() => onBack?.() || navigate("/HomePage")}
        className={`mb-4 px-3 py-2 rounded font-semibold ${currentThemeClasses.button}`}
      >
        ← Back
      </button>

      {/* Service Image */}
      <img
        src={service.image}
        alt={service.name}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      {/* Service Info */}
      <h3 className={`text-3xl font-bold mb-2 ${currentThemeClasses.text}`}>
        {service.name}
      </h3>
      <p className={currentThemeClasses.text}>
        <strong>Price:</strong> ${service.price}
      </p>
      <p className={`mb-4 ${currentThemeClasses.text}`}>
        <strong>Duration:</strong> {service.duration}
      </p>

      {/* Booking Form */}
      <form onSubmit={handleAddToCart} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${currentThemeClasses.form}`}
          required
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full px-3 py-2 border rounded ${currentThemeClasses.form}`}
          required
        />

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
<div className="mt-4">
  <label className={`block mb-2 font-semibold ${currentThemeClasses.text}`}>
    Address
  </label>

  {/* Dropdown for saved addresses */}
  <AddressList
    userId={1}
    refresh={refreshAddresses}
    onSelect={(addr) => setAddress(addr)}
  />

  {/* Selected Address Card */}
  {address && (
    <div className="mt-2 p-4 rounded-lg border border-gray-300 shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 hover:shadow-md transition-shadow duration-200">
      <p className="text-gray-800 dark:text-gray-200 font-medium mb-1">
        Selected Address
      </p>
      <p className="text-gray-700 dark:text-gray-300 truncate">{address.line1} {address.line2} {address.line3}, {address.city}, {address.country}</p>
    <input type="hidden" value={address.addressId} />
    </div>
  )}

  {/* Add New Address Button */}
  <button
    type="button"
    onClick={() => setShowAddressModal(true)}
    className={`mt-3 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200`}
  >
    Add New Address
  </button>

  {/* Add Address Modal */}
  {showAddressModal && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 relative">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Add New Address
        </h3>

        <AddressForm
          userId={1}
          onSelect={(newAddress) => {
            setAddress(newAddress);                   // select new address
            setShowAddressModal(false);               // close modal
            setRefreshAddresses((prev) => !prev);    // refresh dropdown
          }}
        />

        <button
          onClick={() => setShowAddressModal(false)}
          className="mt-4 px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  )}
</div>


        <button type="submit" className={currentThemeClasses.button}>
          Add To Cart
        </button>
      </form>
    </div>
  );
}
