import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext(null);

// Create a Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // Store user info here
  const logout = () => {
    setUser(null); // Clear user on logout
    // Also clear any tokens or localStorage if used
  };

  return (
    <UserContext.Provider value={{ user, setUser,logout  }}>
      {children}
    </UserContext.Provider>
  );
};
