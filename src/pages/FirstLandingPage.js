import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../Animation/lottieanimation.json';
import '../assets/css/FirstLandingPage.css';
import logo from '../assets/images/logo.png';

const FirstLandingPage = () => {
  return (
    <div className="landing-container">
      <div className="TitleandDescriptionContainer" style={{ marginBottom: '200px' }}>
        <img src={logo} alt="Logo" className="logo" style={{ width: '200px', margin: '0 auto' }} />

        <h1 className="title">SmartGrade</h1>
        <p className="description">
          Give tests a better purpose. Every grade should tell a story of growth and potential.
        </p>
      </div>
      <div className="lottieAnimation">
        <Lottie animationData={animationData} style={{ height: 500, width: 500 }} />

      </div>
    </div>
  );
};

export default FirstLandingPage;
