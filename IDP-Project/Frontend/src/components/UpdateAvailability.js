// src/components/UpdateAvailability.js
import { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from '../api/axios';

function UpdateAvailability() {
  const [roomId, setRoomId] = useState('');
  const [availability, setAvailability] = useState(true);

  const updateAvailability = async () => {
    try {
      const res = await axios.put('/update-availability', {
        roomId: Number(roomId),
        availability,
      });
      alert(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to update availability');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom color="primary">
          Update Room Availability
        </Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select
              value={availability.toString()}
              label="Availability"
              onChange={(e) => setAvailability(e.target.value === 'true')}
            >
              <MenuItem value="true">Available</MenuItem>
              <MenuItem value="false">Unavailable</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={updateAvailability}>
            Update
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default UpdateAvailability;
