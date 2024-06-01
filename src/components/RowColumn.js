import React from 'react';
import '../assets/css/RowColumn.css'; // Import the CSS file for styling

// Row component
export const Row = ({ children, style }) => {
  return (
    <div className="flex-row" style={style}>
      {children}
    </div>
  );
};

// Column component
export const Column = ({ children, style }) => {
  return (
    <div className="flex-column" style={style}>
      {children}
    </div>
  );
};
