import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState('');

  const register = (name) => {
    setUsername(name);
    setIsRegistered(true);
  };

  return (
    <AuthContext.Provider value={{ isRegistered, username, register }}>
      {children}
    </AuthContext.Provider>
  );
};
