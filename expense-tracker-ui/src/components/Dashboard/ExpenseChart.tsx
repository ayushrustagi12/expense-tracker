
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Food & Dining', value: 15000, color: '#3B82F6' },
  { name: 'Bills & Utilities', value: 12000, color: '#10B981' },
  { name: 'Subscriptions', value: 3000, color: '#F59E0B' },
  { name: 'Transport', value: 8000, color: '#EF4444' },
  { name: 'Shopping', value: 6000, color: '#8B5CF6' },
  { name: 'Entertainment', value: 4000, color: '#06B6D4' }
];

export const ExpenseChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Expense Categories</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
