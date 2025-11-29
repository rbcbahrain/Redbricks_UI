import React, { useState } from 'react';
import { FiMail, FiKey } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const ForgotPasswordForm = () => {
  const { currentThemeClasses = {} } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Password reset link sent to:", email);
    // TODO: Trigger actual password reset request
  };

  return (
    <div className={`max-w-md mx-auto p-8 shadow-lg rounded-lg ${currentThemeClasses.form}`}>
      <h2 className="text-2xl font-semibold text-center mb-6 flex items-center justify-center gap-2">
        <FiKey className="text-xl" />
        Forgot Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${currentThemeClasses.text}`}>
            Email address
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiMail />
            </span>
            <input
              id="email"
              type="email"
              className={`w-full pl-10 pr-3 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentThemeClasses.inputBorder}`}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button type="submit" className={currentThemeClasses.button}>
            Send Reset Link
          </button>
        </div>
      </form>

      {/* Back to login */}
      <div className="mt-6 text-center">
        <a href="/login" className={`text-sm ${currentThemeClasses.link}`}>
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
