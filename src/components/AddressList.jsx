// src/components/AddressList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../config";

export default function AddressList({ userId, onSelect, refresh }) {
  const { theme } = useTheme();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${API_BASE_URL}/Address/Getaddresslist/${userId}`)
      .then((res) => setAddresses(Array.isArray(res.data) ? res.data : []))
      .catch(() => setAddresses([]));
  }, [userId, refresh]);

  const handleChange = (e) => {
    const selectedId = Number(e.target.value);
    const selectedAddress = addresses.find(addr => addr.addressId === selectedId);
    onSelect(selectedAddress); // ✅ full object passed
  };

  return (
    <div className="mt-2">
      <label className="block mb-1 font-semibold">Saved Addresses</label>

      <select
        className={`w-full px-3 py-2 border rounded ${
          theme === "dark"
            ? "bg-gray-700 border-gray-500 text-white"
            : "bg-white border-gray-300"
        }`}
        defaultValue=""
        onChange={handleChange}
      >
        <option value="" disabled>
          Select an address
        </option>

        {addresses.length === 0 && (
          <option value="" disabled>
            No saved addresses
          </option>
        )}

        {addresses.map(addr => (
          <option key={addr.addressId} value={addr.addressId}>
            {addr.contactName}, {addr.city}, {addr.country}
          </option>
        ))}
      </select>
    </div>
  );
}
