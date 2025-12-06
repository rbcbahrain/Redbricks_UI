import React, { useState,useContext  } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiLogIn,FiUser  } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import { UserContext } from '../context/UserContext';
import { API_BASE_URL } from "../config";

const LoginForm = () => {
  const { theme, themeClasses } = useTheme(); // get theme and themeClasses from context
  const currentThemeClasses = themeClasses[theme] || {}; // get classes for current theme
const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [errors, setErrors] = useState({ email: '', password: '', api: '' });
  const [loading, setLoading] = useState(false);
 const { setUser } = useContext(UserContext);
// email validation regex
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", email, password);

     let validationErrors = { email: '', password: '', api: '' };
    let isValid = true;

    if (!validateEmail(email)) {
      validationErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!password) {
      validationErrors.password = 'Please enter your password';
      isValid = false;
    }

    setErrors(validationErrors);
    
    if (!isValid) return;

    setLoading(true);
    setErrors({ email: '', password: '', api: '' }); // Clear previous API error

  try {
    const url = `${API_BASE_URL}/User/checkuserexist?username=${email}&userpassword=${password}`;
    const res = await fetch(url);
    const result = await res.json();
     console.log("Logging in result:", result.userId);
    if (result && result.userId) {
      // Handle login success (e.g., redirect, store user info)
      // Redirect after successful login
      setUser(result);  // Save user info globally
      localStorage.setItem('role', "Admin");
var role=localStorage.getItem('role');
console.log("Role:"+role);
 // Navigate based on role
      if (role === 'Admin') {
        navigate('/');
              // navigate('/serviceform'); // Admin route
      } else {
               navigate('/'); // Normal user route (homepage)
      }
        //navigate('/serviceform');
        
    } else {
      // Handle login failure (show error)
       setErrors(prev => ({ ...prev, api: 'Invalid username or password' }));
    }
  } catch (error) {
    console.error("API error:", error);
    // Show a message to the user
    setLoading(false);
      setErrors(prev => ({ ...prev, api: 'Failed to connect to server. Please try again later.' }));
  }
    
  };

  return (
    <div className={`max-w-md mx-auto p-8 shadow-lg rounded-lg ${currentThemeClasses.form || 'bg-white'}`}>
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
  <FiUser className="text-xl" />
  Login
</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiMail />
            </span>
            <input
              id="email"
              type="email"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiLock />
            </span>
            <input
              id="password"
              type="password"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
           {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          
           {/* Forgot Password Link */}
  <div className="text-right mt-1">
    <a href="/forgotpassword" className="text-sm hover:underline">
      Forgot Password?
    </a>
  </div>
        </div>
  {/* API Error */}
        {errors.api && <p className="text-red-600 text-center mb-2">{errors.api}</p>}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`${currentThemeClasses.button}`}
          >
            <FiLogIn className="text-lg" />
            Log In
          </button>
        </div>
      </form>

      {/* Register Link */}
      <div className="mt-6 text-center">
        <p className="text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="font-medium underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
