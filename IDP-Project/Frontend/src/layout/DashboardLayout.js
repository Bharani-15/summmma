import React from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Box,
  Button,
} from '@mui/material';
import { useUser } from '../context/UserContext';

const tabs = [
  { label: 'Rooms', value: 'rooms' },
  { label: 'Staff', value: 'staff' },
  { label: 'Buildings', value: 'buildings' },
  { label: 'Maintenance', value: 'maintenance' },
];

export default function MaintenanceDashboardLayout({ children, activeTab, onTabChange }) {
  const { user } = useUser();

  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });
 
      // Clear any frontend state if needed
      window.location.href = 'http://localhost:3000/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
        }}>
        <Toolbar sx={{ position: 'relative', justifyContent: 'center' }}>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            MAINTENANCE MANAGER DASHBOARD
          </Typography>
          <Box sx={{ position: 'absolute', right: 16 }}>
            <Button
              onClick={handleLogout}
              sx={{
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
          </Box>
        </Toolbar>

        <Tabs
          value={activeTab}
          onChange={handleChange}
          centered
          textColor="inherit"
          indicatorColor="secondary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </AppBar>

      <Box p={3}>{children}</Box>
    </>
  );
}
