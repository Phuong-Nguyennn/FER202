//AppRoutes.js định nghĩa các route cho ứng dụng sử dụng React Router
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Import useAuth
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage'; 
import AddPaymentPage from '../pages/AddPaymentPage.jsx';
import EditPaymentPage from '../pages/EditPaymentPage.jsx';
import ViewPaymentPage from '../pages/ViewPaymentPage.jsx';

// Component bảo vệ route
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, initialized } = useAuth();

  // Nếu chưa khởi tạo xong (đang khôi phục session) thì hiển thị loading nhẹ
  if (!initialized) {
    return <div style={{ textAlign: 'center', marginTop: '20px' }}>Loading...</div>;
  }

  // Sau khi đã khởi tạo, kiểm tra đăng nhập
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* 1. Trang mặc định: Chuyển hướng đến /home nếu đã đăng nhập, ngược lại là /login */}
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                {/* 2. Trang Đăng nhập */}
                <Route path="/login" element={<LoginPage />} />
                
                {/* 3. Định nghĩa route bảo vệ cho Trang Chủ/Dashboard (yêu cầu: /home ) */}
                <Route 
                    path="/home" 
                    element={
                        <PrivateRoute>
                            {/* Component Trang chủ/Dashboard */}
                            <DashboardPage /> 
                        </PrivateRoute>
                    } 
                />
                
                {/* 4. Xử lý tất cả các đường dẫn không xác định: Chuyển hướng đến /home */}
                <Route path="*" element={<Navigate to="/home" replace />} />

                <Route path="/expenses/new" element={
                    <PrivateRoute>
                        <AddPaymentPage />
                    </PrivateRoute>
                } />

                <Route path="/expenses/edit/:id" element={
                    <PrivateRoute>
                        <EditPaymentPage />
                    </PrivateRoute>
                } />

                <Route path="/expenses/:id" element={
                    <PrivateRoute>
                        <ViewPaymentPage />
                    </PrivateRoute>
                } />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
