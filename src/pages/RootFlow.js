import React, { useEffect, useState,useMemo } from 'react';
import axios from 'axios';
import LandingPage, { Row, Column } from '../components/RowColumn';
import "../assets/css/HomePage.css"
import Flow from '../components/FlowBase';
import { getUserFlows, createFlow } from '../api';
import DashboardContainer from '../components/DashboardContainer';
import "../assets/css/DashboardContainer.css"
import { useNavigate } from 'react-router-dom';
import FlowBase from '../components/FlowBase';


const RootFlow = () => {
  const [items, setItems] = useState([]); // State to store the fetched data
  let navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      getUserFlows(setItems);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {

  }, [items]);

  return (
    <FlowBase nodes={nodes} edges={[]} ></FlowBase>
  );
};

export default RootFlow;
