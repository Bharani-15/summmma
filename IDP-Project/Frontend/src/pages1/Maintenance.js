import React, { useEffect, useState } from 'react';
import { NavLink, Routes, Route, Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom';
import RoomsPage from '../pages/RoomsPage';
import StaffPage from '../pages/StaffPage';
import BuildingsPage from '../pages/BuildingsPage';
import MaintenancePage from '../pages/MaintenancePage';
 
const getLinkStyle = (isActive) => ({
  color: 'white',
  textDecoration: 'none',
  padding: '8px 12px',
  borderBottom: isActive ? '2px solid white' : 'none',
  fontWeight: isActive ? 'bold' : 'normal',
  transition: 'border-bottom 0.3s ease',
});
 
const MaintenanceLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('rooms');
 
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveTab(path || 'rooms');
  }, [location.pathname]);
 
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = 'http://localhost:3000/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
 
  return (
    <>
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          color: 'white',
          padding: '10px',
          position: 'sticky',
          top: 0,
          zIndex: 1050,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, flex: 1, textAlign: 'center', fontSize: '20px' }}>
            MAINTENANCE MANAGEMENT
          </h1>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
 
      {/* Navigation Tabs */}
      <nav
        style={{
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          padding: '10px 0',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <NavLink to="rooms" style={({ isActive }) => getLinkStyle(isActive)}>
          Rooms
        </NavLink>
        <NavLink to="staff" style={({ isActive }) => getLinkStyle(isActive)}>
          Staff
        </NavLink>
        <NavLink to="buildings" style={({ isActive }) => getLinkStyle(isActive)}>
          Buildings
        </NavLink>
        <NavLink to="maintenance" style={({ isActive }) => getLinkStyle(isActive)}>
          Maintenance
        </NavLink>
      </nav>
 
      {/* Content Area */}
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Outlet />
      </div>
    </>
  );
};
 
const Maintenance = () => {
  return (
    <Routes>
      <Route path="/" element={<MaintenanceLayout />}>
        <Route index element={<Navigate to="rooms" />} />
        <Route path="rooms" element={<RoomsPage />} />
        <Route path="staff" element={<StaffPage />} />
        <Route path="buildings" element={<BuildingsPage />} />
        <Route path="maintenance" element={<MaintenancePage />} />
      </Route>
    </Routes>
  );
};
 
export default Maintenance;
 
 