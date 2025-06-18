import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  AssignmentInd as EmployeeIcon,
  MeetingRoom as RoomIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import {
  getAllRooms,
  updateEmployeeRoom,
} from '../api/roomApii';
 
function EmployeeRoomManager() {
  const { empId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(empId || '');
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
 
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomRes = await getAllRooms();
        setRooms(roomRes.data);
      } catch (err) {
        setErrorMessage('Failed to load rooms');
        setErrorOpen(true);
      }
    };
    fetchRooms();
  }, []);
 
  const handleUpdate = async () => {
    if (!selectedEmployeeId || !selectedRoomId) return;
 
    try {
      await updateEmployeeRoom(selectedEmployeeId, selectedRoomId);
      setSnackbarOpen(true);
      setSelectedEmployeeId(empId || '');
      setSelectedRoomId('');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update room';
      setErrorMessage(message);
      setErrorOpen(true);
    }
  };
 
  return (
    <Box sx={{ mt: 4, px: 3 }}>
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            <EmployeeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Assign Room to Employee
          </Typography>
 
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Employee ID"
                variant="outlined"
                value={selectedEmployeeId}
                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                InputProps={{
                  readOnly: !!empId,
                }}
              />
            </Grid>
 
           
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel si>Room</InputLabel>
                <Select
                  value={selectedRoomId}
                  label="Room"
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  sx={{
                    height: 55,
                    width: 150,
                    fontSize: '1rem',
                  }}
                >
                  {rooms.map((room) => (
                    <MenuItem
                      key={room.id}
                      value={room.id}
                      sx={{ fontSize: '1rem', py: 1.5 }}
                    >
                      <RoomIcon fontSize="small" sx={{ mr: 1 }} />
                      {room.roomName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
 
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={handleUpdate}
                disabled={!selectedEmployeeId || !selectedRoomId}
              >
                Update Room
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
 
      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Room updated successfully!
        </Alert>
      </Snackbar>
 
      {/* Error Snackbar */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setErrorOpen(false)}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
 
export default EmployeeRoomManager;
 