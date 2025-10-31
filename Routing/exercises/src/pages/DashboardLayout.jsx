import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <h2>Dashboard</h2>
      <nav>
        <NavLink to="/dashboard" end style={{ marginRight: 15 }}>Home</NavLink>
        <NavLink to="settings" style={{ marginRight: 15 }}>Settings</NavLink>
        <NavLink to="reports">Reports</NavLink>
      </nav>
      <hr />
      <Outlet />
    </div>
  );
}
