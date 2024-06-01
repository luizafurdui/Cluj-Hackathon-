import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Radar, RadarChart, PolarGrid, PolarRadiusAxis, PolarAngleAxis } from 'recharts';
import "../../assets/css/StatisticNode.css";

const backend = process.env.REACT_APP_API_URL;
const StatisticNode = ({ data, isConnectable }) => {
  const [isLoading, setIsLoading] = useState(true); // State to manage loading

  // Function to simulate loading completion
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const renderChart = () => {
    if (data && data.statistics) {
      if (data.statistics.type === "bar") {
        return (
          <BarChart
            width={330}
            height={250}
            data={data.statistics.data}
            layout='vertical'
            margin={{
              top: 20,
              right: 30,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={true} />
            <XAxis type="number" />
            <YAxis dataKey={data.statistics.name} type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey={data.statistics.point} fill="#8884d8" />
          </BarChart>
        );
      }
      if (data.statistics.type === "radar") {
        return (
        <RadarChart outerRadius={90} width={730} height={250} data={data.statistics.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={data.statistics.name} />
            <PolarRadiusAxis angle={30} domain={[0, 50]} />
            <Radar name="Mike" dataKey={data.statistics.point} stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
          );
    }
    }
    return null; // Return null if conditions are not met
};

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />

      {renderChart()}


      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(StatisticNode);
