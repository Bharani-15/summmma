// src/components/BookRoom.js
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
import {
  MeetingRoom,
  EventSeat,
  AccessTime,
  Person,
  Send,
} from '@mui/icons-material';
import axios from '../api/axios';

function BookRoom() {
  const location = useLocation();
  const prefilledRoomId = location.state?.roomId || '';
  const [roomId, setRoomId] = useState(prefilledRoomId);
  const [booking, setBooking] = useState({
    requiredSeats: '',
    startTime: '',
    endTime: '',
    empId: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (prefilledRoomId) {
      setRoomId(prefilledRoomId);
    }
  }, [prefilledRoomId]);

  const handleBook = async () => {
    try {
      const res = await axios.post(`/book/${roomId}`, booking);
      setMessage(res.data);
    } catch (err) {
      console.error(err);
      setMessage('Error booking room');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom color="primary" fontWeight="bold">
          Book a Meeting Room
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Fill in the details below to reserve a room.
        </Typography>
        <Box display="flex" flexDirection="column" gap={3} mt={2}>
          <TextField
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MeetingRoom />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Required Seats"
            type="number"
            value={booking.requiredSeats}
            onChange={(e) =>
              setBooking({ ...booking, requiredSeats: e.target.value })
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventSeat />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Start Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setBooking({ ...booking, startTime: e.target.value })
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="End Time"
            type="datetime-local"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setBooking({ ...booking, endTime: e.target.value })
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTime />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Employee ID"
            value={booking.empId}
            onChange={(e) =>
              setBooking({ ...booking, empId: e.target.value })
            }
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            endIcon={<Send />}
            onClick={handleBook}
            size="large"
            sx={{ mt: 1 }}
          >
            Book Now
          </Button>
          {message && <Alert severity="info">{message}</Alert>}
        </Box>
      </Paper>
    </Container>
  );
}

export default BookRoom;
