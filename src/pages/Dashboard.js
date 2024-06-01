import React, { useEffect, useState,useMemo } from 'react';
import axios from 'axios';
import LandingPage, { Row, Column } from '../components/RowColumn';
import "../assets/css/HomePage.css"
import Flow from '../components/FlowBase';
import { getUserFlows, createFlow, getUserPrimaryFlow } from '../api';
import DashboardContainer from '../components/DashboardContainer';
import "../assets/css/DashboardContainer.css"
import { useNavigate } from 'react-router-dom';
import FlowBase from '../components/FlowBase';


const Dashboard = () => {
  const [flowId, setFlowId] = useState(); // State to store the fetched data
  let navigate = useNavigate();

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      getUserPrimaryFlow(setFlowId);
    };

    fetchData();
  }, [navigate]); 

  useEffect(() => {
    if (flowId !== "" && flowId !== undefined)
      navigate(`/flow/${flowId}`);
  }, [flowId]); 

  const createNewFlow = async () => {
    let newFlowId = await createFlow();
  }

  return (
    // <div className="dashboard-list">
    //     {items.map((item, index) => (
    //         <DashboardContainer key={index} handleClick={setSelectedItem} item={item}>
    //             {/* Render your item. For example, if your item has a `title` property: */}
    //             <h3>{item._id}</h3>
    //             {/* You can add more content here based on the structure of your data */}
    //         </DashboardContainer>
    //     ))}
    //     <DashboardContainer key={"New Flow"} handleClick={createNewFlow}>+</DashboardContainer>
    // </div>
    <FlowBase/>
  );
};

export default Dashboard;
