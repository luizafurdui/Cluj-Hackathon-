import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LandingPage from '../components/LandingPage';
import "../assets/css/HomePage.css"

const backend = process.env.REACT_APP_API_URL;

const HomePage = () => {

  return (
    <>
    
      <LandingPage></LandingPage>
    </>
  );
};

export default HomePage;
