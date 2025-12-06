import React from "react";
import { BrowserRouter as Router, Routes,Route,Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useTheme } from "./context/ThemeContext";
import LoginForm from "./components/Loginform";
import RegistrationForm from "./components/Registerform";
import ForgotPasswordForm from "./components/ForgotPasswordform";

import AdminRoutes from "./components/Route/AdminRoute";
import UserRoutes from "./components/Route/CommonRoute";

function App() {
  const { theme, themeClasses } = useTheme();

  const role = localStorage.getItem("role"); // "admin" or "user"

  return (
    <Router>
      <div className={`App min-h-screen flex flex-col ${themeClasses[theme].body}`}>

        <Header />

        <main className="flex-1 p-6">
<Routes>
           {/* Public routes */}
         
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
             
         

          {/* Admin private routes */}
          {role === "Admin" && (<Route path="*" element={<AdminRoutes />}/>)}

          {/* User private routes */}
          {role === "user" && (<Route path="*" element={<UserRoutes />}/>)}
</Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
