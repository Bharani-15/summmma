import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
  Box,
  Alert,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  MeetingRoom,
  EventSeat,
  LocationCity,
  AccessTime,
  ConfirmationNumber,
  Cancel,
} from '@mui/icons-material';
import axios from '../api/axios';

function BookedRooms() {
  const [empId, setEmpId] = useState('');
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBookings = async () => {
    if (!empId.trim()) {
      setMessage('Please enter an Employee ID.');
      return;
    }
    try {
      const res = await axios.get(`/rooms-booked/${empId}`);
      setBookings(res.data);
      setMessage(res.data.length ? '' : 'No bookings found.');
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setMessage('Error fetching bookings. Please try again.');
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      const res = await axios.delete(`/cancel/${bookingId}`);
      alert(res.data);
      fetchBookings(); // Refresh list
    } catch (err) {
      console.error('Error cancelling booking:', err);
      alert('Error cancelling booking. Please try again.');
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        align="center"
        sx={{ color: 'green', fontWeight: 'bold' }}
        gutterBottom
      >
        View Your Booked Rooms
      </Typography>

      <Paper elevation={6} sx={{ p: 4, maxWidth: 500, mx: 'auto', mb: 5, borderRadius: 3 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Employee ID"
            type="number"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ConfirmationNumber />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'green',
                },
                '&:hover fieldset': {
                  borderColor: 'darkgreen',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'green',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'green',
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'darkgreen',
              },
            }}
            endIcon={<Search />}
            onClick={fetchBookings}
            size="large"
          >
            Search Bookings
          </Button>
          {message && <Alert severity="info">{message}</Alert>}
        </Box>
      </Paper>

      {bookings.length > 0 && (
        <Grid container spacing={3}>
          {bookings.map((booking, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card elevation={4} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    <MeetingRoom sx={{ mr: 1, verticalAlign: 'middle' }} />
                    {booking.roomName || 'Room'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <ConfirmationNumber fontSize="small" sx={{ mr: 1 }} />
                    Booking ID: {booking.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <EventSeat fontSize="small" sx={{ mr: 1 }} />
                    Seats: {booking.noOfSeats || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <LocationCity fontSize="small" sx={{ mr: 1 }} />
                    Building: {booking.building || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <AccessTime fontSize="small" sx={{ mr: 1 }} />
                    Start: {booking.startTime ? new Date(booking.startTime).toLocaleString() : 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <AccessTime fontSize="small" sx={{ mr: 1 }} />
                    End: {booking.endTime ? new Date(booking.endTime).toLocaleString() : 'N/A'}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => cancelBooking(booking.id)}
                  >
                    Cancel Booking
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default BookedRooms;
