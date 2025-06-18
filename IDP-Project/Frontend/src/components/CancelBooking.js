// src/components/CancelBooking.js
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  InputAdornment,
} from '@mui/material';
import { Cancel, ConfirmationNumber } from '@mui/icons-material';
import axios from '../api/axios';

function CancelBooking() {
  const location = useLocation();
  const [bookingId, setBookingId] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (location.state?.bookingId) {
      setBookingId(location.state.bookingId);
    }
  }, [location.state]);

  const handleCancel = async () => {
    try {
      const res = await axios.delete(`/cancel/${bookingId}`);
      setMessage(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Error cancelling booking');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="error" fontWeight="bold">
          Cancel a Booking
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Enter your booking ID to cancel your reservation.
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <TextField
            label="Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumber />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="error"
            endIcon={<Cancel />}
            onClick={handleCancel}
            size="large"
            sx={{ mt: 1 }}
          >
            Cancel Booking
          </Button>
          {message && <Alert severity="info">{message}</Alert>}
        </Box>
      </Paper>
    </Container>
  );
}

export default CancelBooking;
