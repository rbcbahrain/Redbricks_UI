// src/pages/CartPage.jsx
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { API_BASE_URL } from "../config";
export default function CartPage() {
  const { cart, setCart, removeFromCart, updateQuantity } =
    useContext(CartContext);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const userId = 1; // TODO: replace with dynamic user ID

  // Fetch cart items from API on page load
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/Cart/GetCartItemslist?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
  // Log the raw API response to console
      console.log("Raw Cart API data:", data);
        // Normalize data for React
        const normalizedData = data.map((item) => ({
          service: item.serviceName
            ? { name: item.serviceName, price: item.price || 0 }
            : { name: "Unnamed Service", price: item.price || 0 },
         date: item.serviceDate || null, 
          location: item.location, // optional: map location if you have it
          address: item.addressName || "N/A",
          quantity: item.quantity || 1,
          cartItemId:item.cartItemId,
          serviceId:item.serviceId,
          addressId:item.addressId,
        }));

        setCart(normalizedData);
      } catch (error) {
        console.error("Cart API Error:", error);
      }
    };

    fetchCart();
  }, [userId, setCart]);

  // Total price
  const totalPrice = cart
    .reduce(
      (sum, item) => sum + (item.service?.price || 0) * (item.quantity || 1),
      0
    )
    .toFixed(2);

    const handleCheckout = async () => {
  try {
   

      // Map frontend cart to backend OrderItems model
      const orderItem = {
        // OrderId: 0, // Replace with actual order ID if needed
        // ServiceId:  0, // You must include ServiceId from your database
        // Quantity: 0,
        // Price:  0,
        // AddressId:  0, // Include AddressId from your database
        // AddressName: item.address,
        // ServiceDate: serviceDate, // ISO string
        UserId: userId,
      };

      console.log("Posting OrderItem:", orderItem);

      const response = await fetch(`${API_BASE_URL}/Order/CheckOut`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItem),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", errorText);
        throw new Error(errorText);
      
    }

    alert("Order placed successfully ✅");
    setCart([]); // clear cart after success
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Checkout failed ❌");
  }
};


  return (
    <div
      className={`max-w-3xl mx-auto p-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
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
                  <h3 className="text-xl font-bold">{item.service?.name}</h3>
                  <p>
                    Date: {item.date? new Date(item.date).toLocaleDateString()
    : "N/A"} {" "} | Location: {item.location || "N/A"}
                  </p>
                  <p>
                    Address:{" "}
                    {item.address
                      ? item.address
                      : "N/A"}
                  </p>
                  <p
                    className={`mt-2 font-semibold ${
                      isDark ? "text-green-400" : "text-green-700"
                    }`}
                  >
                    Price: ${item.service?.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(idx, (item.quantity || 1) - 1)
                      }
                      className={`px-3 py-1 rounded ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      -
                    </button>

                    <span className="px-2">{item.quantity || 1}</span>

                    <button
                      onClick={() =>
                        updateQuantity(idx, (item.quantity || 1) + 1)
                      }
                      className={`px-3 py-1 rounded ${
                        isDark
                          ? "bg-gray-700 hover:bg-gray-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.cartItemId)}
                  className={`mt-4 sm:mt-0 px-4 py-2 rounded transition ${
                    isDark
                      ? "bg-red-700 hover:bg-red-600"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div
            className={`border-t pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between ${
              isDark ? "border-gray-700" : "border-gray-300"
            }`}
          >
            <div className="text-lg font-semibold">Total: ${totalPrice}</div>
            <button
              onClick={handleCheckout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-lg font-semibold"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
