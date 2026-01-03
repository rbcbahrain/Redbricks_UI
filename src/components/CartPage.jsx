import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  const { theme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className={`max-w-3xl mx-auto p-6 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cart.map((item, idx) => (
              <div
                key={idx}
                className={`border rounded-md p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between ${
                  isDark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <div>
                  <h3 className="text-xl font-bold">{item.service.name}</h3>
                  <p>Date: {item.date}, Location: {item.location}</p>
                  <p>Address: {item.address ? `${item.address.line1} ${item.address.line2} ${item.address.line3}, ${item.address.city}, ${item.address.country}` : "N/A"}</p>
                  <p className={`mt-2 font-semibold ${isDark ? "text-green-400" : "text-green-700"}`}>
                    Price: ${item.service.price}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(idx)}
                  className={`mt-4 sm:mt-0 px-4 py-2 rounded hover:opacity-80 transition ${
                    isDark ? "bg-red-700 text-white" : "bg-red-600 text-white"
                  }`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={`border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between ${
            isDark ? "border-gray-700" : "border-gray-300"
          }`}>
            <div className="mb-4 sm:mb-0 text-lg font-semibold">
              Total: ${cart.reduce((sum, item) => sum + (item.service.price || 0), 0)}
            </div>
            <button
              className={`bg-blue-600 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition`}
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
