import React, { useEffect, useState } from 'react';
import '../RoomList.css';
import { getAllRooms } from '../api/roomApi';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
} from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router-dom';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [visibleRoomId, setVisibleRoomId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await getAllRooms();
        setRooms(res.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };
    fetchRooms();
  }, []);

  const handleToggle = (roomId) => {
    setVisibleRoomId((prev) => (prev === roomId ? null : roomId));
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'cleaned':
        return {
          backgroundColor: '#b0bec5',
          color: 'white',
          fontWeight: 'bold',
          padding: '4px 10px',
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        };
      case 'dirty':
        return {
          backgroundColor: '#212121',
          color: 'white',
          fontWeight: 'bold',
          padding: '4px 10px',
          borderRadius: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
        };
      default:
        return {
          backgroundColor: '#9e9e9e',
          color: 'white',
          fontWeight: 'bold',
          padding: '4px 10px',
          borderRadius: '16px',
        };
    }
  };

  const yesChipStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '0.8rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
  };

  const noChipStyle = {
    backgroundColor: '#9e9e9e',
    color: 'white',
    fontWeight: 'bold',
    padding: '4px 10px',
    borderRadius: '16px',
    fontSize: '0.8rem',
  };

  return (
    <Box sx={{ mt: 4, px: 2, background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)', minHeight: '100vh', pb: 4 }}>
      {/* <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          p: 4,
          borderRadius: 3,
          mb: 4,
          boxShadow: 4,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" sx={{ color: 'white', fontWeight: 700 }}>
          Room Dashboard
        </Typography>
        <Typography sx={{ color: '#c5cae9', mt: 1 }}>
          Monitor and manage room allocations with ease.
        </Typography>
      </Box> */}

      <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 5, overflow: 'hidden' }}>
        <Table sx={{ border: '1px solid #bbdefb' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#283593' }}>
              {[
                'ID',
                'Name',
                'Seats',
                'Occupied',
                'Available',
                'Status',
                'Last Cleaned',
                'Projector',
                'Blackboard',
                'Employees',
              ].map((heading) => (
                <TableCell
                  key={heading}
                  sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rooms.map((room) => (
              <React.Fragment key={room.id}>
                <TableRow hover sx={{ transition: 'background 0.3s', '&:hover': { backgroundColor: '#e8eaf6' } }}>
                  <TableCell>{room.id}</TableCell>
                  <TableCell>{room.roomName}</TableCell>
                  <TableCell>{room.noOfSeats}</TableCell>
                  <TableCell>{room.occupied}</TableCell>
                  <TableCell>{room.notOccupied}</TableCell>
                  <TableCell>
                    <span style={getStatusStyle(room.status)}>
                      <CleaningServicesIcon sx={{ fontSize: 16 }} />
                      {room.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    {room.lastCleanedTime
                      ? new Date(room.lastCleanedTime).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <span style={room.hasProjector ? yesChipStyle : noChipStyle}>
                      <ScreenShareIcon sx={{ fontSize: 16 }} />
                      {room.hasProjector ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={room.hasBlackboard ? yesChipStyle : noChipStyle}>
                      <EditNoteIcon sx={{ fontSize: 16 }} />
                      {room.hasBlackboard ? 'Yes' : 'No'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleToggle(room.id)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 'bold',
                        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                        color: 'white',
                        borderRadius: '20px',
                        px: 2,
                        '&:hover': {
                          background: 'linear-gradient(to right, #5f2c82, #49a09d)',
                        },
                      }}
                    >
                      {visibleRoomId === room.id ? 'Hide' : 'Show'}
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell colSpan={10} sx={{ p: 0 }}>
                    <Collapse in={visibleRoomId === room.id} timeout="auto" unmountOnExit>
                      <Box sx={{ p: 2, backgroundColor: '#f3f4f6' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                          Employees:
                        </Typography>
                        {room.employees?.length > 0 ? (
                          <Table size="small">
                            <TableHead>
                              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                                <TableCell sx={{ fontWeight: 'bold' }}>Employee ID</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Domain</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {room.employees.map((emp) => (
                                <TableRow key={emp.id}>
                                  <TableCell>{emp.id}</TableCell>
                                  <TableCell>{emp.name}</TableCell>
                                  <TableCell>{emp.domain || 'N/A'}</TableCell>
                                  <TableCell>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      onClick={() => navigate(`/room-management/updateEmployee/${emp.id}`)}
                                      sx={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        borderRadius: '20px',
                                        px: 2,
                                      }}
                                    >
                                      Update Room
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        ) : (
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            No employees assigned
                          </Typography>
                        )}
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default RoomList;
