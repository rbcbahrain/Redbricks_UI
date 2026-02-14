import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useTheme } from "./context/ThemeContext";

// Public pages
import LoginForm from "./components/Loginform";
import RegistrationForm from "./components/Registerform";
import ForgotPasswordForm from "./components/ForgotPasswordform";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";

// Admin/User route wrappers
import AdminRoutes from "./components/Route/AdminRoute";
import UserRoutes from "./components/Route/CommonRoute";

function App() {
  const { theme, themeClasses } = useTheme();
  const role = localStorage.getItem("role"); // "Admin" or "user"

  return (
    <Router>
      <div className={`App min-h-screen flex flex-col ${themeClasses[theme].body}`}>

        <Header />

        <main className="flex-1 p-6">
          <Routes>
            {/* Public Routes */}
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
            <Route path="/cart" element={<CartPage />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                role === "Admin"
                  ? <AdminRoutes />      // Your existing AdminRoutes component
                  : role === "user"
                  ? <UserRoutes />       // Your existing UserRoutes component
                  : <Navigate to="/login" />
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
