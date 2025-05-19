import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../index.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: username,
        password: password
      });

      localStorage.setItem('access', response.data.access);
      localStorage.setItem('refresh', response.data.refresh);
      console.log('Login successful:', response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid username or password');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');  // Adjust this path based on your routing setup
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Register Button */}
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default Login;
