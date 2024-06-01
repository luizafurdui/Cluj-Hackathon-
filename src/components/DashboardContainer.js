import React from 'react';
import '../assets/css/DashboardContainer.css'; // Importing the CSS file


const DashboardContainer = ({ children, handleClick, item }) => {

    const bindPayload = () => {
        if (!item)
            handleClick();
        else
        handleClick(item._id);
    }
    
    return (
        <div className="dashboard-container" onClick={bindPayload}>
            {children}
        </div>
    );
};

export default DashboardContainer;
