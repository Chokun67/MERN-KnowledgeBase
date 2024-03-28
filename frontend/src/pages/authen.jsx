import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();

  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle input changes
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch('http://localhost:5555/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username, // Adjust according to your backend expectations
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the token
      navigate('/data'); // Navigate after login
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed'); // Basic error handling
    }
  };

  return (
    <>
      <div className="box-login">
        <div className="boxcenter">
          <div className="login-container">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button type="submit" className="loginbutton bg-black">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
