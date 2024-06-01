import React from 'react';
import './NumberTextPair.css'; // Import the CSS file

const NumberTextPair = ({ number, text, borderColor, backgroundColor }) => {
    const customStyle = {
      border: `2px solid ${borderColor || '#2de095'}`, // Default to #007bff if borderColor is not provided
      backgroundColor: backgroundColor || 'transparent', // Default to transparent if backgroundColor is not provided
    };

  return (
    <div className="number-text-pair number-text-pair-container" style={customStyle}>
      <div className="number">{number}</div>
      <div className="text">{text}</div>
    </div>
  );
};

export default NumberTextPair;
