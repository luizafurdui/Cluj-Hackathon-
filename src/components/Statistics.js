import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Label , BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

import './Statistics.css';


function SimpleDonutChart({data}) {
  const COLORS = ['#4CAF50', '#ff0000', '#888888'];
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  
  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
       <Tooltip />
    </PieChart>
  );
}

const SimpleBarChart = ({data}) => {
  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="timeInSeconds" fill="#8884d8" />
    </BarChart>
  );
};

function truncateToThreeDecimals(num) {
  return Math.floor(num * 1000) / 1000;
}

const Statistics = ({loadThread, otherStats}) => {
    const [messages, setMessages] = useState([]);
    //const [feedback, setFeedback] = useState([]);
    useEffect(() => {
      console.log('new chat loaded:', loadThread);
      if (loadThread !== undefined && loadThread.id !==undefined && loadThread.messages !== undefined
        ){
          setMessages(loadThread.messages);
        //TODO @Andrei optimize to only fetch ids. not the entire history of messages.
        // getThreadMessages(loadThread.id, setMessages, token);
      }
      else {
        setMessages([]);
      }
    }, [loadThread]);

    return (
      (loadThread !== undefined && loadThread.id !==undefined && loadThread.messages !== undefined ?
      <div className="chat-container">  
      </div> : 
      <div className="container slim-container scroll-container">
        <SimpleDonutChart data={otherStats ? otherStats.feedback : [{name:"hello", value: 1}]}/>
        <div class="label-description label-big-bold-number"> Feedback distribution </div>
        <div class="big-bold-number">
          {otherStats ? truncateToThreeDecimals(100 - otherStats.nrThreads * 100 / otherStats.feedback[2].value) :  1}
        </div>
        <div class="label-big-bold-number"> Ratio of rated threads </div>

        {/* <SimpleDonutChart data={otherStats ? otherStats.messagesExchanged : [{name:"hello", value: 1}]}/> */}
        <div class="big-bold-number">
          {otherStats ? truncateToThreeDecimals(otherStats.messagesExchanged[0].value) :  1}
        </div>
        <div class="label-big-bold-number">Messages sent by user per thread</div>
        <SimpleBarChart data= {otherStats ? otherStats.timeElapsed : [{name:"hello", value: 1}]}/>
        <div class="big-bold-number">
          {otherStats ? otherStats.nrThreads :  1}
        </div>
        Number of threads
        </div>)
    );
};

export default Statistics;
