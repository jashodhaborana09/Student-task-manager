import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ProgressCircle = ({ completed, total, size = 200 }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  const data = [
    { name: 'Completed', value: completed },
    { name: 'Pending', value: Math.max(0, total - completed) }
  ];

  const COLORS = ['#5865f2', '#e5ecff'];

  return (
    <div className="flex flex-col items-center">
      <ResponsiveContainer width={size} height={size}>
        <PieChart>
          <Pie
            data={data}
            cx={size / 2}
            cy={size / 2}
            innerRadius={size / 2 - 30}
            outerRadius={size / 2 - 10}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-center -mt-20">
        <div className="text-3xl font-bold">{percentage}%</div>
        <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
      </div>
    </div>
  );
};

export default ProgressCircle;
