import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
  Paper,
} from '@mui/material';
import {
  Domain as DomainIcon,
  MeetingRoom as RoomIcon,
  RocketLaunch as AssignIcon,
} from '@mui/icons-material';
import confetti from 'canvas-confetti';

const BASE_URL = 'http://localhost:8083';

const AssignRoomByDomain = () => {
  const [domains, setDomains] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const domainRes = await axios.get(`${BASE_URL}/api/employeeDomains`);
        const roomRes = await axios.get(`${BASE_URL}/api/listRooms`);
        setDomains(domainRes.data);
        setRooms(roomRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setSnackbar({
          open: true,
          message: 'Failed to load data',
          severity: 'error',
        });
      }
    };
    fetchData();
  }, []);

  const triggerFireworks = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handleAssign = async () => {
    const dto = {
      domain: selectedDomain,
      roomId: parseInt(selectedRoomId),
    };

    try {
      const response = await axios.put(`${BASE_URL}/api/assingEmployeesToRoom`, dto);
      const assignedCount = response.data?.assignedCount;

      if (assignedCount === 0) {
        setSnackbar({
          open: true,
          message: 'No employees to be assigned.',
          severity: 'info',
        });
      } else {
        triggerFireworks();
        setSnackbar({
          open: true,
          message: '🎉 Employees assigned to room successfully!',
          severity: 'success',
        });
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to assign employees.';
      setSnackbar({ open: true, message, severity: 'error' });
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          maxWidth: 500,
          mx: 'auto',
          borderRadius: 3,
          backgroundColor: '#ffffff'
,
        }}
      >
        <Typography variant="h5" gutterBottom color="primary">
          <AssignIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Domain-Based Room Assignment
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Domain</InputLabel>
          <Select
            value={selectedDomain}
            label="Domain"
            onChange={(e) => setSelectedDomain(e.target.value)}
          >
            <MenuItem value="">-- Select Domain --</MenuItem>
            {domains.map((domain, idx) => (
              <MenuItem key={idx} value={domain}>
                <DomainIcon fontSize="small" sx={{ mr: 1 }} />
                {domain}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Room</InputLabel>
          <Select
            value={selectedRoomId}
            label="Room"
            onChange={(e) => setSelectedRoomId(e.target.value)}
          >
            <MenuItem value="">-- Select Room --</MenuItem>
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.id}>
                <RoomIcon fontSize="small" sx={{ mr: 1 }} />
                {room.roomName} (ID: {room.id})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleAssign}
          disabled={!selectedDomain || !selectedRoomId}
          startIcon={<AssignIcon />}
        >
          Assign
        </Button>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AssignRoomByDomain;
