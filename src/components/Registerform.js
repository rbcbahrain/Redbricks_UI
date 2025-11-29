import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const RegisterForm = () => {
   const { theme, themeClasses } = useTheme(); // get theme and themeClasses from context
   const currentThemeClasses = themeClasses[theme] || {}; // get classes for current theme
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Registering with:", name, email, password);
  };

  return (
    <div
      className={`max-w-md mx-auto p-8 shadow-lg rounded-lg ${currentThemeClasses.form || 'bg-white text-black'}`}
    >
      <h2 className={`text-2xl font-semibold text-center mb-4 ${currentThemeClasses.text || ''}`}>
        Register
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className={`block text-sm font-medium mb-1 ${currentThemeClasses.text}`}>
            Name
          </label>
          <input
            id="name"
            type="text"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${currentThemeClasses.inputBorder} ${currentThemeClasses.text}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${currentThemeClasses.text}`}>
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${currentThemeClasses.inputBorder} ${currentThemeClasses.text}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className={`block text-sm font-medium mb-1 ${currentThemeClasses.text}`}>
            Password
          </label>
          <input
            id="password"
            type="password"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${currentThemeClasses.inputBorder} ${currentThemeClasses.text }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${currentThemeClasses.text }`}>
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${currentThemeClasses.inputBorder } ${currentThemeClasses.text }`}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`${currentThemeClasses.button}`}
          >
            Register
          </button>
        </div>
      </form>

      {/* Login Link */}
      <div className={`mt-4 text-center ${currentThemeClasses.text }`}>
        <p className="text-sm">
          Already have an account?{' '}
          <a href="/login" className={`font-medium underline ${currentThemeClasses.link}`}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
