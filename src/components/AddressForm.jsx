// src/components/AddressForm.jsx
import { useState } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../config";
import { SweetAlert } from "../Common/SweetAlert";

export default function AddressForm({ userId, onSelect }) {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    line1: "",
    line2: "",
    line3: "",
    city: "",
    country: "",
    location: "",
    userId: userId,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
      Line1: formData.line1,
      Line2: formData.line2,
      Line3: formData.line3,
      City: 2,       // ensure integer
      Country: 4, // ensure integer
      UserId: formData.userId,
      Location: formData.location
    };

    // PRINT payload to console before POST
    console.log("Payload to be sent:", payload);

    const res = await axios.post(
      `${API_BASE_URL}/Address/addAddress`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    // notify parent
    const fullAddress = `${formData.line1}, ${formData.line2}, ${formData.line3}, ${formData.city}, ${formData.country}`;
    onSelect(fullAddress);

  
 SweetAlert({
             title: "Information",
             body: "<p>Address saved!</p>",
             icon: "success",
             confirmText: "ok",
           });

    setFormData({
      line1: "",
      line2: "",
      line3: "",
      city: "",
      country: "",
      location: "",
      userId: userId,
    });
  } catch (error) {
    console.error("Error saving address:", error);
    
     SweetAlert({
             title: "Error",
             body: "<p>Error saving address</p>",
             icon: "error",
             confirmText: "close",
           });
  }
};


  return (
    <div
      className={`p-4 rounded-md shadow-md ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h3 className="text-xl font-semibold mb-3">Add New Address</h3>

      {["line1", "line2", "line3", "city", "country", "location"].map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.toUpperCase()}
          value={formData[field]}
          onChange={handleChange}
          className="w-full mb-2 px-3 py-2 border rounded"
        />
      ))}

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Address
      </button>
    </div>
  );
}
