// src/components/LoginPage.js
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import {login} from "../api.js";
import "../App.css";

const LoginPage = ({ onLoginSuccess, isAuthenticated }) => {
  const navigate = useNavigate();  // Initialize useNavigate
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loginToken, setLoginToken] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isAuthenticated) navigate('/home');  // Navigate without full page reload
    if(loginToken!== undefined){
      console.log(loginToken);
      const { refreshToken, token, username, rank } = loginToken; // Destructuring the response data
      onLoginSuccess(refreshToken, token, username, rank);

      // Redirect to homepage
      navigate('/home');  // Navigate without full page reload
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[loginToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Try to login:", formData);
      login(formData, setLoginToken);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Show a message if the user is already authenticated (optional)
  // if (isAuthenticated) {
  //   navigate('/home');  // Navigate without full page reload
  //   return <p>You are already logged in.</p>;
  // }

  return (
    <div className='container slim-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label htmlFor="username" className="form-label">Username:</label>
    <input
      type="text"
      id="username"
      name="username"
      value={formData.username}
      onChange={handleChange}
      required
      className="form-input"
    />
  </div>
  <div className="form-group">
    <label htmlFor="password" className="form-label">Password:</label>
    <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      required
      className="form-input"
    />
  </div>
  <button type="submit" className="submit-button">Login</button>
</form>
    </div>
  );
};

export default LoginPage;
