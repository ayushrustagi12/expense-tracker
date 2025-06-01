
import React from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, CreditCard } from 'lucide-react';

const emis = [
  {
    id: 1,
    title: 'Home Loan - HDFC',
    amount: 25000,
    startMonth: 'Jan 2023',
    endMonth: 'Dec 2042',
    remainingMonths: 228,
    mode: 'Auto Debit',
    source: 'HDFC Bank Savings',
    status: 'Active'
  },
  {
    id: 2,
    title: 'Car Loan - SBI',
    amount: 18000,
    startMonth: 'Jun 2022',
    endMonth: 'May 2027',
    remainingMonths: 42,
    mode: 'Auto Debit',
    source: 'SBI Current Account',
    status: 'Active'
  },
  {
    id: 3,
    title: 'Personal Loan - ICICI',
    amount: 12000,
    startMonth: 'Mar 2024',
    endMonth: 'Feb 2027',
    remainingMonths: 26,
    mode: 'Manual',
    source: 'HDFC Bank Savings',
    status: 'Active'
  },
  {
    id: 4,
    title: 'Education Loan - Axis',
    amount: 8000,
    startMonth: 'Aug 2020',
    endMonth: 'Jul 2024',
    remainingMonths: 0,
    mode: 'Auto Debit',
    source: 'Axis Bank Savings',
    status: 'Completed'
  }
];

const EMITracker = () => {
  const totalActiveEMI = emis
    .filter(emi => emi.status === 'Active')
    .reduce((sum, emi) => sum + emi.amount, 0);

  return (
    <Layout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">EMI Tracker</h1>
            <p className="text-gray-600 mt-2">Monitor and manage all your loan EMIs</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add EMI
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Monthly EMI</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">₹{totalActiveEMI.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-red-50">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active EMIs</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{emis.filter(emi => emi.status === 'Active').length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Due Date</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">15th Dec</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* EMI Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">EMI Details</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan Details</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMI Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {emis.map((emi) => (
                  <tr key={emi.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{emi.title}</div>
                        <div className="text-xs text-gray-500">Started {emi.startMonth}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">₹{emi.amount.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{emi.startMonth} - {emi.endMonth}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {emi.remainingMonths > 0 ? `${emi.remainingMonths} months` : 'Completed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{emi.mode}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{emi.source}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        emi.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {emi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EMITracker;
