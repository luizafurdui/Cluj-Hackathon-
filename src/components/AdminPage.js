import React, { useState } from "react";
import axios from "axios";
import AdminViewer from "./AdminViewer";
import AdminSummary from "./AdminSummary";

const backend = process.env.REACT_APP_API_URL;

const AdminPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [portionCount, setPortionCount] = useState(null);

  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  const token = localStorage.getItem('token');

  // Make an authenticated request to the server
  const config = {
  headers: {
      'Authorization': `${token}`
      }
  };

  const fetchPortionCount = async () => {
    try {
      const response = await axios.post(
        backend + "/portions/count",
        {
          date: selectedDate.toISOString(),
        }
      , config);
      setPortionCount(response.data.count);
    } catch (error) {
      console.error("Error fetching portion count:", error);
    }
  };

  return (
    <div className='container'>
      <h1>Admin Page</h1>
      {portionCount !== null && (
       <> <p>{`Total tests ran: ${
          selectedDate.toISOString().split("T")[0]
        }: ${portionCount}`}</p>
        <AdminViewer date={selectedDate.toISOString().split("T")[0]}/> 
        </>
      )}
      <AdminSummary token={token}></AdminSummary>
      
  
    </div>
  );
};

export default AdminPage;
