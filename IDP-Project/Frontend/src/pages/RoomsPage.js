import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  CleaningServices as CleanIcon,
  Delete as ClearIcon,
  AssignmentInd as StaffIcon,
  MeetingRoom as RoomIcon,
  AccessTime as AccessTimeIcon,
  Videocam as VideocamIcon,
  EditNote as EditNoteIcon,
  CheckCircle as YesIcon,
  Cancel as NoIcon,
  Warning as DirtyIcon,
} from '@mui/icons-material';
import dayjs from 'dayjs';
import {
  getAllRooms,
  updateRoomStatus,
  assignStaffToRoom,
  clearStaffFromRoom,
  updateLastCleanedTime,
} from '../api/roomApi';
import { getAllStaff } from '../api/staffApi';

export default function RoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchRooms = async () => {
    const res = await getAllRooms();
    setRooms(res.data);
  };

  const fetchStaff = async () => {
    const res = await getAllStaff();
    setStaffList(res.data);
  };

  useEffect(() => {
    fetchRooms();
    fetchStaff();
  }, []);

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleStatusUpdate = async (roomId, status) => {
    await updateRoomStatus(roomId, status);
    fetchRooms();
    showSnackbar('Room status updated!');
  };

  const handleAssignStaff = async (roomId, staffId) => {
    await assignStaffToRoom(roomId, staffId);
    fetchRooms();
    showSnackbar('Staff assigned to room!');
  };

  const handleClearStaff = async (roomId) => {
    await clearStaffFromRoom(roomId);
    fetchRooms();
    showSnackbar('Staff cleared from room!', 'info');
  };

  const handleLastCleanedUpdate = async (roomId) => {
    const now = dayjs().toISOString();
    await updateLastCleanedTime(roomId, now);
    fetchRooms();
    showSnackbar('Last cleaned time updated!');
  };

  return (
    <Box sx={{ mt: 4 }}>
      

      <Paper
        elevation={6}
        sx={{
          mt: 3,
          overflowX: 'auto',
          borderRadius: 3,
          border: '1px solid #ccc',
        }}
      >
        <Table
          sx={{
            minWidth: 700,
            borderCollapse: 'collapse',
            '& thead th': {
              background: 'linear-gradient(135deg, #283593, #5c6bc0)',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              fontSize: '1rem',
            },
            '& tbody td': {
              border: '1px solid #ddd',
              fontSize: '0.95rem',
            },
            '& tbody tr:nth-of-type(odd)': {
              backgroundColor: '#f5f5f5',
            },
            '& tbody tr:hover': {
              backgroundColor: '#e3f2fd',
              transition: 'background-color 0.3s ease',
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Room ID</TableCell>
              <TableCell>Room Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Projector</TableCell>
              <TableCell>Blackboard</TableCell>
              <TableCell>Last Cleaned</TableCell>
              <TableCell>Assigned Staff</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  <RoomIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {room.id}
                </TableCell>
                <TableCell>
                  <RoomIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {room.roomName}
                </TableCell>
                <TableCell>
                  {room.status === 'Clean' ? (
                    <CleanIcon fontSize="small" sx={{ mr: 1, color: 'green', verticalAlign: 'middle' }} />
                  ) : (
                    <DirtyIcon fontSize="small" sx={{ mr: 1, color: 'orange', verticalAlign: 'middle' }} />
                  )}
                  {room.status}
                </TableCell>
                <TableCell>
                  {room.hasProjector ? (
                    <YesIcon color="success" fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  ) : (
                    <NoIcon color="error" fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  )}
                  {room.hasProjector ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  {room.hasBlackboard ? (
                    <YesIcon color="success" fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  ) : (
                    <NoIcon color="error" fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  )}
                  {room.hasBlackboard ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  <AccessTimeIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {room.lastCleanedTime
                    ? dayjs(room.lastCleanedTime).format('YYYY-MM-DD HH:mm')
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <StaffIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                  {room.housekeepingStaff ? room.housekeepingStaff.name : 'Unassigned'}
                </TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="column" gap={1}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select
                        label="Status"
                        value={room.status}
                        onChange={(e) => handleStatusUpdate(room.id, e.target.value)}
                      >
                        <MenuItem value="Clean">Clean</MenuItem>
                        <MenuItem value="Dirty">Dirty</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth>
                      <InputLabel>Assign Staff</InputLabel>
                      <Select
                        label="Assign Staff"
                        value={room.housekeepingStaff?.id || ''}
                        onChange={(e) => handleAssignStaff(room.id, e.target.value)}
                      >
                        {staffList.map((staff) => (
                          <MenuItem key={staff.id} value={staff.id}>
                            <StaffIcon fontSize="small" sx={{ mr: 1 }} />
                            {staff.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <Button
                      variant="outlined"
                      size="small"
                      sx={{
                        color: 'red',
                        borderColor: 'red',
                        '&:hover': {
                          borderColor: 'darkred',
                          backgroundColor: '#ffe5e5',
                        },
                      }}
                      startIcon={<ClearIcon sx={{ color: 'red' }} />}
                      onClick={() => handleClearStaff(room.id)}
                      fullWidth
                    >
                      Clear Staff
                    </Button>

                    <Button
                      variant="contained"
                      size="small"
                      color="success"
                      startIcon={<CleanIcon />}
                      onClick={() => handleLastCleanedUpdate(room.id)}
                    >
                      Update Cleaned Time
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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
}
