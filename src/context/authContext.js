// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
// import { getCurrentUser, logout as authLogout } from '../api/authApi';
import { getCurrentUser } from '../api/authApi';
import { logout as authLogout } from '../api/authApi';
import * as AuthApi from '../api/authApi';


const AuthContext = createContext();
console.log('AuthApi:', AuthApi);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};