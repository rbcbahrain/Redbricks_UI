import { Routes, Route, Outlet } from "react-router-dom";
import ServiceForm from "../Service/ServiceForm";
import CategoryForm from "../Category/CategoryForm";

export default function AdminRoutes() {
  return (
    <>
    <Outlet/>
    
    <Routes>
      <Route path="serviceform" element={<ServiceForm />} />
      <Route path="categoryform" element={<CategoryForm />} />
    </Routes>
    </>
  );
}
