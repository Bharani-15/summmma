// src/components/layout/DashboardLayout.js
import React from 'react';
import { AppBar, Box, Toolbar, Typography, Tooltip, Avatar, Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const DashboardLayout = () => {
  const { user } = useUser();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
<AppBar
  position="static"
  sx={{
    background: 'linear-gradient(135deg, #1a237e, #3949ab)',
  }}
>

        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Room Management System
          </Typography>
          {user && (
            <Tooltip title={user}>
              <Avatar sx={{ bgcolor: 'secondary.main', cursor: 'pointer' }}>
                {user.charAt(0).toUpperCase()}
              </Avatar>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4, flexGrow: 1 }}>
        <Outlet />
      </Container>
    </Box>
  );
};

export default DashboardLayout;
