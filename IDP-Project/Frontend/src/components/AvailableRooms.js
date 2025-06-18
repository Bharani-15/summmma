import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Box,
  Tooltip,
} from '@mui/material';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from '../api/axios';

function AvailableRooms() {
  const [seats, setSeats] = useState('');
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`/available/${seats}`);
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching rooms');
    }
  };

  const handleBookNow = (roomId) => {
    navigate('/meeting-room/book', { state: { roomId } });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom color="primary">
        <MeetingRoomIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
        Find Available Rooms
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mb={4}>
        <TextField
          type="number"
          label="Required Seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          inputProps={{ min: 1 }}
        />
        <Button variant="contained" color="primary" onClick={fetchRooms}>
          Search
        </Button>
      </Box>

      <Grid container spacing={3}>
        {rooms.map((room) => (
          <Grid item xs={12} sm={6} md={4} key={room.id}>
            <Card
              elevation={4}
              sx={{
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <MeetingRoomIcon sx={{ mr: 1 }} />
                  {room.roomName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {room.id}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <EventSeatIcon sx={{ fontSize: 18, mr: 1 }} />
                  Seats: {room.noOfSeats}
                </Typography>
                <Typography variant="body2">
                  <LocationCityIcon sx={{ fontSize: 18, mr: 1 }} />
                  Building: {room.building}
                </Typography>
                <Chip
                  icon={
                    room.availability ? (
                      <CheckCircleIcon />
                    ) : (
                      <CancelIcon />
                    )
                  }
                  label={room.availability ? 'Available' : 'Booked'}
                  color={room.availability ? 'success' : 'error'}
                  sx={{ mt: 2 ,pointerEvents: 'none'}}
                />
              </CardContent>
              <CardActions>
                <Tooltip title="Proceed to booking">
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={() => handleBookNow(room.id)}
                  >
                    Book Now
                  </Button>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default AvailableRooms;
