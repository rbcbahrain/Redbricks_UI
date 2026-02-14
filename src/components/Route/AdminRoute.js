import { Routes, Route, Navigate } from "react-router-dom";
import ServiceHomePage from "../ServiceHomePage";
import ServiceForm from "../Service/ServiceForm";
import CategoryForm from "../Category/CategoryForm";
import CategoryList from "../Category/CategoryList";
import ServiceTypeForm from "../ServiceType/TypeForm";

export default function AdminRoutes() {
  const role = localStorage.getItem("role");
  if (role !== "Admin") return <Navigate to="/login" />; // Protect admin routes

  return (
    <Routes>
      <Route path="/ServiceHomePage" element={<ServiceHomePage />} />
      <Route path="/serviceform" element={<ServiceForm />} />
      <Route path="/categoryform" element={<CategoryForm />} />
      <Route path="/CategoryList" element={<CategoryList />} />
      <Route path="/typeForm" element={<ServiceTypeForm />} />
      {/* Optional fallback */}
      <Route path="*" element={<Navigate to="/ServiceHomePage" />} />
    </Routes>
  );
}
