import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../assets/css/HomePage.css"
import CreateTest from '../components/CreateTest'; // Add this import statement
import FirstLandingPage from './FirstLandingPage';
const backend = process.env.REACT_APP_API_URL;

const PopTech = () => {

  return (
    <>
      <FirstLandingPage />
    
      {/* <CreateTest/> */}
      
    </>
  );
};

export default PopTech;
