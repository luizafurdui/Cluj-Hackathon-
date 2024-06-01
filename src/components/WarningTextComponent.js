import React from 'react';

const WarningTextComponent = ({ text, isPaid }) => {
  const textStyle = {
    color: isPaid ? 'green' : 'red',
    backgroundColor: isPaid ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)',
    padding: '5px', 
    borderRadius: '5px',
    display: 'inline-block',
  };

  return <div style={textStyle}>{text}</div>;
};

export default WarningTextComponent;
