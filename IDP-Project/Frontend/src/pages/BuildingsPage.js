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
import ApartmentIcon from '@mui/icons-material/Apartment';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import VideocamIcon from '@mui/icons-material/Videocam';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { getAllBuildings } from '../api/buildingApi';

export default function BuildingsPage() {
  const [buildings, setBuildings] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const res = await getAllBuildings();
      setBuildings(res.data);
    } catch (err) {
      console.error('Error fetching buildings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const handleAccordionChange = (buildingId) => (_, isExpanded) => {
    setExpanded(isExpanded ? buildingId : null);
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
        🏢 Buildings Overview
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        buildings.map((building) => (
          <Accordion
            key={building.id}
            expanded={expanded === building.id}
            onChange={handleAccordionChange(building.id)}
            sx={{
              mb: 2,
              borderRadius: 2,
              boxShadow: 3,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ bgcolor: '#1976d2' }}>
                  <ApartmentIcon />
                </Avatar>
                <Typography variant="h6">{building.buildingName}</Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Paper variant="outlined" sx={{ width: '100%', p: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Rooms in {building.buildingName}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <List dense>
                  {building.rooms.map((room) => (
                    <ListItem key={room.id} divider>
                      <Box display="flex" flexDirection="column" width="100%" pl={1}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <MeetingRoomIcon sx={{ color: '#607d8b' }} />
                          <Typography variant="body1" fontWeight="medium">
                            Room ID: {room.id}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <Typography variant="body2" fontWeight="bold">Status:</Typography>
                          <Chip
                            label={room.status}
                            color={getStatusColor(room.status)}
                            size="small"
                            
                            sx={{
                              borderRadius: 0,
                              fontWeight: 'bold',
                              px: 1,
                              pointerEvents: 'none',
                            }}
                          />
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <VideocamIcon fontSize="small" />
                          <Typography variant="body2">
                            Projector: {room.hasProjector ? 'Yes' : 'No'}
                          </Typography>
                        </Box>

                        <Box display="flex" alignItems="center" gap={1} mt={1}>
                          <EditNoteIcon fontSize="small" />
                          <Typography variant="body2">
                            Blackboard: {room.hasBlackboard ? 'Yes' : 'No'}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
}
