import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance'; // import the custom axios instance

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get('/api/user-info/');
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
    window.location.reload();  // Add this after navigation to reset everything

  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={styles.dashboard}>
      <header style={styles.header}>
        <h2>Welcome to {userData.username} Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </header>
      
      <div style={styles.content}>
        <div style={styles.profileCard}>
          <h3>User Profile</h3>
          {userData && (
            <div style={styles.userInfo}>
              <p><strong>Username:</strong> {userData.username}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Member since:</strong> {new Date(userData.date_joined).toLocaleDateString()}</p>
            </div>
          )}
        </div>
        
        <div style={styles.stats}>
          <div style={styles.statCard}>
            <h4>Recent Activity</h4>
            <p>No recent activity</p>
          </div>
          <div style={styles.statCard}>
            <h4>Quick Actions</h4>
            <button style={styles.actionButton}>Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee'
  },
  logoutButton: {
    padding: '8px 16px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  content: {
    display: 'flex',
    gap: '20px'
  },
  profileCard: {
    flex: 1,
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  userInfo: {
    marginTop: '15px'
  },
  stats: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  statCard: {
    padding: '20px',
    background: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  actionButton: {
    padding: '8px 16px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  }
};

export default Dashboard;
