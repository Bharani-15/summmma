import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landingPage.css';
 
const LandingPage = () => {
  const navigate = useNavigate();
 
  const handleStart = () => {
    navigate('/login');
  };
 
  return (
    <div className="landing-container">
      <div className="overlay" />
      <div className="landing-content">
        <h1 className="title">Room Management System</h1>
        <p className="subtitle">
          Streamline your room operations with our all-in-one platform.
        </p>
 
        <div className="modules">
          <div className="module-card">
            <h3>Room Booking <br></br>Dashboard</h3>
            <p>Book rooms in real-time with availability tracking.</p>
          </div>
          <div className="module-card">
            <h3>Room Maintenance Dashboard</h3>
            <p>Manage maintenance tasks of the room.</p>
          </div>
          <div className="module-card">
            <h3>Employee Room allocation Dashboard</h3>
            <p>Handle employee roles, access, and room permissions with ease.</p>
          </div>
        </div>
 
        <button className="start-button" onClick={handleStart}>
          Get Started
        </button>
      </div>
    </div>
  );
};
 
export default LandingPage;