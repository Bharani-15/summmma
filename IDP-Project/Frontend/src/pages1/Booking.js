import { Outlet, NavLink } from 'react-router-dom';

function Booking() {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });
 
      // Clear any frontend state if needed
      window.location.href = 'http://localhost:3000/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getLinkStyle = (isActive) => ({
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    borderBottom: isActive ? '2px solid white' : 'none',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'border-bottom 0.3s ease',
  });

  return (
    <>
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          color: 'white',
          padding: '10px',
          position: 'sticky',
          top: 0,
          zIndex: 1050,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, flex: 1, textAlign: 'center', fontSize: '20px' }}>
            CONFERENCE ROOM BOOKING
          </h1>
          <button className="btn btn-outline-light" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav
        style={{
          background: 'linear-gradient(135deg, #1a237e, #3949ab)',
          padding: '10px 0',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <NavLink to="/meeting-room" end style={({ isActive }) => getLinkStyle(isActive)}>
          Available Rooms
        </NavLink>
        <NavLink to="/meeting-room/book" style={({ isActive }) => getLinkStyle(isActive)}>
          Book Room
        </NavLink>
        <NavLink to="/meeting-room/cancel" style={({ isActive }) => getLinkStyle(isActive)}>
          Cancel Booking
        </NavLink>
        <NavLink to="/meeting-room/booked-rooms" style={({ isActive }) => getLinkStyle(isActive)}>
          Booked Rooms
        </NavLink>
      </nav>

      {/* Content Area */}
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Outlet />
      </div>
    </>
  );
}

export default Booking;
