import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const tabs = [
  { label: 'Room List', path: '/room-management' },
  { label: 'Update Employee Room', path: '/room-management/updateEmployee' },
  { label: 'Assign Employee', path: '/room-management/assignEmployeesToRoom' },
];

function RoomAllocation() {
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

  const getLinkStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '10px 16px',
    borderBottom: isActive ? '2px solid white' : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    fontSize: '1rem',
    transition: 'border-bottom 0.3s ease',
  });

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
            ROOM MANAGEMENT DASHBOARD
          </h1>
          <Button
            onClick={handleLogout}
            sx={{
              marginRight: 2,
              color: '#f8f9fa',
              border: '1px solid #f8f9fa',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderColor: '#f8f9fa',
              },
            }}
          >
            Logout
          </Button>
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
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            end={tab.path === '/room-management'}
            style={({ isActive }) => getLinkStyle(isActive)}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      {/* Content Area */}
      <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Outlet />
      </Box>
    </>
  );
}

export default RoomAllocation;
