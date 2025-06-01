
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', expenses: 2400, income: 0 },
  { day: 'Tue', expenses: 1398, income: 0 },
  { day: 'Wed', expenses: 9800, income: 50000 },
  { day: 'Thu', expenses: 3908, income: 0 },
  { day: 'Fri', expenses: 4800, income: 0 },
  { day: 'Sat', expenses: 3800, income: 0 },
  { day: 'Sun', expenses: 4300, income: 0 }
];

export const TrendChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          <Bar dataKey="expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
