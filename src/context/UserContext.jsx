import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext(null);

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Restore user when app loads
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    console.log("user: "+JSON.stringify(userData));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
