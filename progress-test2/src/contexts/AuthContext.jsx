import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import * as api from '../services/api';

const AuthContext = createContext();

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
};

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

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      dispatch({ type: 'RESTORE_SESSION', payload: JSON.parse(savedUser) });
    }
    setInitialized(true);
  }, []);

  const login = async ({ usernameOrEmail, password }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const accounts = await api.getUsers();

      const user = accounts.find(
        (u) =>
          (u.username === usernameOrEmail || u.email === usernameOrEmail) &&
          u.password === password
      );

      if (!user) throw new Error('Tên đăng nhập hoặc mật khẩu không đúng.');

      if (user.status === 'locked' || user.status === 'blocked') {
        throw new Error('Tài khoản của bạn đã bị khóa. Vui lòng liên hệ quản trị viên.');
      }

      if (user.status !== 'active') {
        throw new Error('Tài khoản chưa được kích hoạt. Vui lòng kiểm tra lại.');
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      return { success: true, user };
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  // ✅ Thêm hàm clearError
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        initialized,
        login,
        logout,
        clearError, // ✅ truyền ra ngoài
      }}
    >
      {!initialized ? (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>Đang tải...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
