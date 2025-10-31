import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navigation />
      <div style={{ padding: "20px" }}>
        <Routes>
          {/* Bài 1 */}
          <Route path="/" element={<Home />} />
          <Route path="/san-pham" element={<Products />} />
          <Route path="/lien-he" element={<Contact />} />

          {/* Bài 2 */}
          <Route path="/san-pham/:productId" element={<ProductDetail />} />

          {/* Bài 3 */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="settings" element={<Settings />} />
            <Route path="reports" element={<Reports />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
