import React from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
  const go = () => {
    navigate("/data");
  };

  return (
    <>
      <div className="box-login">
        <div className="boxcenter">
          <div className="login-container">
            <h1>Login</h1>
            <form className="login-form">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />

              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
              <button type="submit" className="loginbutton bg-black" onClick={go}>
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
