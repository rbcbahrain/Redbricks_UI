// src/components/AddressList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

export default function AddressList({ userId, onSelect }) {
  const { theme } = useTheme();
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`https://localhost:44372/api/address/GetAddressesByUser/${userId}`)
      .then((res) => {
        // ensure res.data is an array
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
  }, [userId]);

  return (
    <div className="mt-2">
      <h4 className="font-semibold mb-2">Saved Addresses</h4>

      {addresses.length === 0 && (
        <p className="text-sm opacity-70">No saved addresses yet.</p>
      )}

      {addresses.map((addr) => (
        <div
          key={addr.addressId}
          onClick={() =>
            onSelect(
              `${addr.line1}, ${addr.line2}, ${addr.line3}, ${addr.city}, ${addr.country}`
            )
          }
          className={`p-3 mb-2 border rounded cursor-pointer ${
            theme === "dark"
              ? "bg-gray-700 border-gray-500"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <p>{addr.line1} {addr.line2} {addr.line3}</p>
          <p className="text-sm opacity-80">
            {addr.city}, {addr.country}
          </p>
        </div>
      ))}
    </div>
  );
}
