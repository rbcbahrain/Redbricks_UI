// src/components/AddressList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../config";

export default function AddressList({ userId, onSelect, refresh }) {
  const { theme } = useTheme();
  const [addresses, setAddresses] = useState([]);

  const loadAddresses = () => {
    if (!userId) return;

    axios
      .get(`${API_BASE_URL}/Address/Getaddresslist`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setAddresses(res.data);
        } else {
          setAddresses([]);
          console.warn("Expected array but got:", res.data);
        }
      })
      .catch((err) => {
        console.error("Error fetching addresses:", err);
        setAddresses([]);
      });
  };

  useEffect(() => {
    loadAddresses();
  }, [userId, refresh]); // reload on refresh trigger

  return (
    <div className="mt-2">
      <label className="block mb-1 font-semibold">Saved Addresses</label>
      <select
        className={`w-full px-3 py-2 border rounded ${
          theme === "dark" ? "bg-gray-700 border-gray-500 text-white" : "bg-white border-gray-300"
        }`}
        onChange={(e) => onSelect(e.target.value)}
        defaultValue=""
      >
        <option value="" disabled>
          Select an address
        </option>
        {addresses.length === 0 && (
          <option value="" disabled>
            No saved addresses
          </option>
        )}
        {addresses.map((addr) => (
          <option
            key={addr.addressId}
            value={`${addr.line1}, ${addr.line2}, ${addr.line3}, ${addr.city}, ${addr.country}`}
          >
            {addr.line1} {addr.line2} {addr.line3}, {addr.city}, {addr.country}
          </option>
        ))}
      </select>
    </div>
  );
}
