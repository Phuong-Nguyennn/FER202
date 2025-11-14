// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import * as api from '../services/api';

// 1. Context
const AuthContext = createContext();

// 2. Trạng thái khởi tạo
const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

// 3. Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload));
      return { ...state, isLoading: false, isAuthenticated: true, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, isLoading: false, error: action.payload };
    case 'LOGOUT':
      localStorage.removeItem('user');
      return { ...initialAuthState };
    case 'RESTORE_SESSION':
      return { ...state, isAuthenticated: !!action.payload, user: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

// 4. Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [initialized, setInitialized] = useState(false); // ✅ mới thêm

  // ✅ Khi reload, đọc user từ localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        dispatch({ type: 'RESTORE_SESSION', payload: JSON.parse(savedUser) });
      }
    } catch (error) {
      console.error('Error restoring session:', error);
    } finally {
      setInitialized(true); // ✅ báo hiệu hoàn tất
    }
  }, []);

  const clearError = () => dispatch({ type: 'CLEAR_ERROR' });

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const accounts = await api.getUsers();
      const user = accounts.find(
        (acc) =>
          (acc.username === usernameOrEmail || acc.email === usernameOrEmail) &&
          acc.password === password
      );

      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true, user };
      } else {
        const errorMessage = 'Invalid username/email or password!';
        dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed due to a network error.';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const logout = () => dispatch({ type: 'LOGOUT' });

  const contextValue = {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    loading: state.isLoading,
    error: state.error,
    initialized, // ✅ thêm vào context
    login,
    logout,
    clearError,
  };

  // ✅ Khi chưa khởi tạo xong, show “Loading...”
  if (!initialized) {
    return <div style={{ textAlign: 'center', marginTop: '40px' }}>Loading...</div>;
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// 5. Custom hook
export const useAuth = () => useContext(AuthContext);
