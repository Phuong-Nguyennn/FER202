import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../api/movieAPI';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Giữ login sau khi reload
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    try {
      const res = await axios.get(`/accounts?username=${username}&password=${password}`);
      if (res.data.length > 0) {
        const loggedUser = res.data[0];
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = { user, login, logout, isAuthenticated: !!user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
