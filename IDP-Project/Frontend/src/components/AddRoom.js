// src/components/AddRoom.js
import { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import axios from '../api/axios';

function AddRoom() {
  const [room, setRoom] = useState({
    roomName: '',
    noOfSeats: '',
    building: '',
    availability: true,
    roomType: '',
  });

  const addRoom = async () => {
    try {
      const res = await axios.post('/add', room);
      alert(res.data);
    } catch (err) {
      console.error(err);
      alert('Error adding room');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Typography variant="h6" gutterBottom>
        Add Conference Room
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Room Name"
          value={room.roomName}
          onChange={(e) => setRoom({ ...room, roomName: e.target.value })}
          fullWidth
        />
        <TextField
          label="Seats"
          type="number"
          value={room.noOfSeats}
          onChange={(e) => setRoom({ ...room, noOfSeats: e.target.value })}
          fullWidth
        />
        <TextField
          label="Building"
          value={room.building}
          onChange={(e) => setRoom({ ...room, building: e.target.value })}
          fullWidth
        />
        <TextField
          select
          label="Availability"
          value={room.availability.toString()}
          onChange={(e) =>
            setRoom({ ...room, availability: e.target.value === 'true' })
          }
          fullWidth
        >
          <MenuItem value="true">Available</MenuItem>
          <MenuItem value="false">Unavailable</MenuItem>
        </TextField>
        <TextField
          label="Room Type"
          value={room.roomType}
          onChange={(e) => setRoom({ ...room, roomType: e.target.value })}
          fullWidth
        />
        <Button variant="contained" color="primary" onClick={addRoom}>
          Add Room
        </Button>
      </Box>
    </Paper>
  );
}

export default AddRoom;
