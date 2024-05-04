import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swalactive from '../components/swalfire';
import { factAPI } from '../controllers/factController';

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
      const data = await factAPI.loginAPI(username, password);;
      storeTokenAndNavigate(data);
    } catch (error) {
      console.error('Login error:', error);
      swalactive("error","Login failed");
    }
  };
  const storeTokenAndNavigate = async (data) => {
    await new Promise((resolve) => {
      localStorage.setItem('token', data.token); // จัดเก็บ token ใน localStorage
      resolve(); // แสดงว่าการเก็บข้อมูลเสร็จสิ้น
    });
    navigate('/data');
    swalactive('success', 'Login success');
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
