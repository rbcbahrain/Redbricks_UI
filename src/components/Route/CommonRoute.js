import { Routes, Route } from "react-router-dom";
import HomePage from "../HomePage";
import CartPage from "../CartPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}
