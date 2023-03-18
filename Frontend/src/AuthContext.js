import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform authentication and set user data
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    // Perform logout and clear user data
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

