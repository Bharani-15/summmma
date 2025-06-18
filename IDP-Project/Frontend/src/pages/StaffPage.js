import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { getAllStaff, getRoomsByStaff } from '../api/staffApi';

export default function StaffPage() {
  const [staffList, setStaffList] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [roomsByStaff, setRoomsByStaff] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await getAllStaff();
        setStaffList(res.data);
      } catch (err) {
        console.error('Error fetching staff:', err);
      }
    };
    fetchStaff();
  }, []);

  const handleAccordionChange = (staffId) => async (_, isExpanded) => {
    setExpanded(isExpanded ? staffId : null);

    if (isExpanded && !roomsByStaff[staffId]) {
      setLoading(true);
      try {
        const res = await getRoomsByStaff(staffId);
        setRoomsByStaff((prev) => ({ ...prev, [staffId]: res.data }));
      } catch (err) {
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Clean':
        return 'success';
      case 'Dirty':
        return 'error';
      case 'Maintenance':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom color="primary" fontWeight="bold">
        🧹 Housekeeping Staff Overview
      </Typography>

      {staffList.map((staff) => (
        <Accordion
          key={staff.id}
          expanded={expanded === staff.id}
          onChange={handleAccordionChange(staff.id)}
          sx={{
            mb: 2,
            borderRadius: 2,
            boxShadow: 3,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: '#3f51b5' }}>
                <PersonIcon />
              </Avatar>
              <Typography variant="h6">{staff.name}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {loading && expanded === staff.id ? (
              <Box display="flex" justifyContent="center" my={2}>
                <CircularProgress />
              </Box>
            ) : (
              <Paper variant="outlined" sx={{ width: '100%', p: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Assigned Rooms
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {(roomsByStaff[staff.id] || []).map((room) => (
                    <ListItem key={room.id} divider>
                      <MeetingRoomIcon sx={{ mr: 1, color: '#607d8b' }} />
                      <ListItemText
                        primary={`Room ID: ${room.id}`}
                        secondary={
                          <Chip
                            label={room.status}
                            color={getStatusColor(room.status)}
                            size="small"
                            sx={{
                              mt: 0.5,
                              borderRadius: 0, // sharp edges
                              fontWeight: 'bold',
                              px: 1,
                              pointerEvents: 'none',
                            }}
                          />
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
