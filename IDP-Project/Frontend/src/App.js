import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import RoomAllocation from './pages1/RoomAllocation';
import Booking from './pages1/Booking';
import Maintenance from './pages1/Maintenance';
import AvailableRooms from './components/AvailableRooms';
import BookRoom from './components/BookRoom';
import CancelBooking from './components/CancelBooking';
import BookedRooms from './components/BookedRooms';
import RoomList from './RoomManagementComponent/RoomList';
import EmployeeRoomManager from './RoomManagementComponent/EmployeeRoomManager';
import AssignEmployeeToRoom from './RoomManagementComponent/AssignEmployeeToRoom';

import Login from './LoginPage';
import LandingPage from './LandingPage'; // <-- Import LandingPage
import DashboardLayout from './components/layout/DashboardLayout';
import theme from './theme';
import { UserProvider } from './context/UserContext';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <UserProvider>
      <Router>
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route element={<DashboardLayout />}>
            <Route path="/maintenance-management/*" element={<Maintenance />} />
            <Route path="/meeting-room" element={<Booking />}>
              <Route index element={<AvailableRooms />} />
              <Route path="book" element={<BookRoom />} />
              <Route path="cancel" element={<CancelBooking />} />
              <Route path="booked-rooms" element={<BookedRooms />} />
            </Route>

            <Route path="/room-management" element={<RoomAllocation />}>
              <Route index element={<RoomList />} />
              <Route path="updateEmployee/:empId" element={<EmployeeRoomManager />} />
              <Route path="updateEmployee" element={<EmployeeRoomManager />} />
              <Route path="assignEmployeesToRoom" element={<AssignEmployeeToRoom />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  </ThemeProvider>
);

export default App;
