import React from 'react';

const StyledButton = ({ number, toggle }) => {
  // Define the base style
  const baseStyle = {
    border: 'none',
    borderRadius: '20%',
    padding: '10px 20px',
    margin: '10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'block',
    boxSizing: 'border-box',
    transition: 'background-color 0.3s',
    cursor: 'pointer'
  };

  // Determine the background color based on the number and toggle
  const backgroundColor = number === 0 
    ? '#808080' // Gray for 0
    : toggle 
      ? '#00ff00c4' // Green when toggle is true
      : '#ff0000c4'; // Red when toggle is false

  // Combine the base style with the conditional background color
  const buttonStyle = { ...baseStyle, backgroundColor };

  return (
    <button style={buttonStyle}>
      {number}
    </button>
  );
};

export default StyledButton;
