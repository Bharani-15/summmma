import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { updateStatusToDirty, updateRoomMaintenance } from '../api/maintenanceApi';

export default function MaintenancePage() {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [hasProjector, setHasProjector] = useState(false);
  const [hasBlackboard, setHasBlackboard] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      await updateStatusToDirty();
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating room statuses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoomUpdate = async () => {
    if (!roomId) return;
    setLoading(true);
    try {
      await updateRoomMaintenance(roomId, hasProjector, hasBlackboard);
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating room maintenance info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4, px: 2 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, backgroundColor: '#fafafa' }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <CleaningServicesIcon color="primary" fontSize="large" />
          <Typography variant="h5" color="primary" fontWeight="bold">
            Maintenance Automation
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="body1" gutterBottom>
          The tool will automatically mark rooms as <strong>Dirty</strong> if they haven’t been cleaned in the last <strong>3 days</strong>.
        </Typography>

        <Button
          variant="contained"
          color="warning"
          onClick={handleUpdateStatus}
          disabled={loading}
          startIcon={<WarningAmberIcon />}
          sx={{ mt: 3, fontWeight: 'bold', px: 3, py: 1, borderRadius: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Dirty Room Check'}
        </Button>
      </Paper>

      {/* Room Maintenance Update Section */}
      <Paper elevation={4} sx={{ mt: 4, p: 4, borderRadius: 3, backgroundColor: '#fafafa' }}>
        <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
        🔧 Update Room Maintenance Info 🔧
        </Typography>

        <TextField
          label="Room ID"
          type="number"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={hasProjector}
              onChange={(e) => setHasProjector(e.target.checked)}
            />
          }
          label="Has Projector"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={hasBlackboard}
              onChange={(e) => setHasBlackboard(e.target.checked)}
            />
          }
          label="Has Blackboard"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleRoomUpdate}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Update Room Info'}
        </Button>
      </Paper>

      <Snackbar
        open={snackbarOpen || updateSuccess}
        autoHideDuration={4000}
        onClose={() => {
          setSnackbarOpen(false);
          setUpdateSuccess(false);
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          onClose={() => {
            setSnackbarOpen(false);
            setUpdateSuccess(false);
          }}
          icon={<CheckCircleIcon fontSize="inherit" />}
          sx={{ fontWeight: 'bold' }}
        >
          {updateSuccess ? 'Room maintenance info updated!' : 'Room statuses updated successfully!'}
        </Alert>
      </Snackbar>
    </Box>
  );
}
