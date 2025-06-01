
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const monthlyData = {
  December: {
    totalIncome: 75000,
    totalExpenses: 48000,
    netSavings: 27000,
    categories: [
      { name: 'Food & Dining', amount: 15000, budget: 18000 },
      { name: 'Bills & Utilities', amount: 12000, budget: 12000 },
      { name: 'Transport', amount: 8000, budget: 10000 },
      { name: 'Shopping', amount: 6000, budget: 8000 },
      { name: 'Entertainment', amount: 4000, budget: 5000 },
      { name: 'Subscriptions', amount: 3000, budget: 3000 }
    ]
  }
};

const Monthly = () => {
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [viewType, setViewType] = useState('overview');
  
  const currentData = monthlyData[selectedMonth as keyof typeof monthlyData] || monthlyData.December;
  const savingsRate = Math.round((currentData.netSavings / currentData.totalIncome) * 100);

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Monthly Overview</h1>
            <p className="text-gray-600 mt-2">Track your monthly financial progress</p>
          </div>
          
          <div className="flex gap-4">
            <Select value={viewType} onValueChange={setViewType}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="expenses">Expenses Only</SelectItem>
                <SelectItem value="income">Income Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs value={selectedMonth} onValueChange={setSelectedMonth}>
          <TabsList className="grid grid-cols-6 lg:grid-cols-12 mb-8">
            {months.map((month) => (
              <TabsTrigger key={month} value={month} className="text-xs lg:text-sm">
                {month.slice(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedMonth}>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Income</p>
                    <p className="text-2xl font-bold text-green-600 mt-2">₹{currentData.totalIncome.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600 mt-2">₹{currentData.totalExpenses.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50">
                    <TrendingDown className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Net Savings</p>
                    <p className="text-2xl font-bold text-blue-600 mt-2">₹{currentData.netSavings.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-blue-50">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Savings Rate</p>
                    <p className="text-2xl font-bold text-purple-600 mt-2">{savingsRate}%</p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-50">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {currentData.categories.map((category, index) => {
                    const percentage = Math.round((category.amount / category.budget) * 100);
                    const isOverBudget = percentage > 100;
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-900">{category.name}</span>
                          <div className="text-right">
                            <span className="font-bold text-gray-900">₹{category.amount.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 ml-2">/ ₹{category.budget.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{percentage}% of budget</span>
                          <span className={isOverBudget ? 'text-red-600 font-medium' : 'text-green-600'}>
                            {isOverBudget ? 'Over Budget' : 'Within Budget'}
                          </span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              isOverBudget ? 'bg-red-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Monthly;
