import React, { useState, useEffect } from 'react';
import './loginPage.css';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Paper,
  InputAdornment,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Lock from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
 
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();
 
  // 🔐 Check if already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/user-role', {
          credentials: 'include',
        });
 
        if (res.ok) {
          const roles = await res.json();
          const userRole = roles[0];
 
          if (userRole === 'ROLE_TEAMLEAD') {
            navigate('/meeting-room');
          } else if (userRole === 'ROLE_MAINTAINENCEHEAD') {
            navigate('/maintenance-management/rooms');
          } else if (userRole === 'ROLE_ROOMMANAGEMENTHEAD') {
            navigate('/room-management');
          }
        }
      } catch (err) {
        // Not authenticated, stay on login page
      }
    };
 
    checkAuth();
  }, [navigate]);
 
  // 🔐 Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
 
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);
 
    try {
      const response = await fetch('http://localhost:8080/authenticateTheUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData,
        credentials: 'include',
      });
 
      if (response.ok) {
        const roleResponse = await fetch('http://localhost:8080/api/user-role', {
          credentials: 'include',
        });
 
        const roles = await roleResponse.json();
        const userRole = roles[0];
 
        login(username);
 
        if (userRole === 'ROLE_TEAMLEAD') {
          navigate('/meeting-room');
        } else if (userRole === 'ROLE_MAINTAINENCEHEAD') {
          navigate('/maintenance-management/rooms');
        } else if (userRole === 'ROLE_ROOMMANAGEMENTHEAD') {
          navigate('/room-management');
        } else {
          setError('Unauthorized role');
        }
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };
 
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 3,
            backgroundColor: '#ffffff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <LoginIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Welcome
            </Typography>
          </Box>
          <Typography variant="subtitle1" align="center" gutterBottom>
            Please login to continue
          </Typography>
 
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
 
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                fontSize: '1rem',
                textTransform: 'none',
              }}
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
 
export default LoginPage;