import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#10B981', '#EF4444'];

const StatisticsComponent = ({ statistics }) => {
    console.log(statistics);
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      {statistics.map((studentStats, index) => {
        const totalCompetencies = studentStats.competencies.length;
        const competenciesHad = studentStats.competencies.reduce((count, competency) => {
          return competency.hasCompetency ? count + 1 : count;
        }, 0);
        const competenciesNotHad = totalCompetencies - competenciesHad;
        const averageCompetency = (competenciesHad / totalCompetencies) * 100;

        const pieData = [
          { name: 'Completed', value: competenciesHad },
          { name: 'Incomplete', value: competenciesNotHad },
        ];

        const barData = [
          { name: 'Completed', value: competenciesHad },
          { name: 'Incomplete', value: competenciesNotHad },
        ];

        return (
          <div key={index} className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-green-500 h-4 rounded-full"
                style={{ width: `${averageCompetency}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {competenciesHad} out of {totalCompetencies} competencies had ({averageCompetency.toFixed(2)}%)
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-md font-semibold mb-2">Competency Ratio (Per student)</h3>
                <PieChart width={200} height={200}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
           
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Competency Ratio (Number of students)</h3>
                <BarChart
                  width={200}
                  height={150}
                  data={barData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatisticsComponent;
