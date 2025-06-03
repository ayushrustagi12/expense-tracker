import React from "react";
import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/Dashboard/StatCard";
import { ExpenseChart } from "@/components/Dashboard/ExpenseChart";
import { TrendChart } from "@/components/Dashboard/TrendChart";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  return (
    <Layout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's your financial overview for December 2024
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Expenses"
            value="₹48,000"
            change="+12% from last month"
            changeType="negative"
            icon={TrendingDown}
            iconColor="text-red-600"
          />
          <StatCard
            title="Total Income"
            value="₹75,000"
            change="+5% from last month"
            changeType="positive"
            icon={TrendingUp}
            iconColor="text-green-600"
          />
          <StatCard
            title="Net Savings"
            value="₹27,000"
            change="36% savings rate"
            changeType="positive"
            icon={Wallet}
            iconColor="text-blue-600"
          />
          <StatCard
            title="Credit Utilization"
            value="₹15,000"
            change="30% of limit"
            changeType="neutral"
            icon={CreditCard}
            iconColor="text-purple-600"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ExpenseChart />
          <TrendChart />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Active EMIs
              </h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Home Loan</span>
                <span className="font-medium">₹25,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Car Loan</span>
                <span className="font-medium">₹18,000</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Monthly EMI</span>
                  <span>₹43,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Credit Limits
              </h3>
              <CreditCard className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">HDFC Credit Card</span>
                <span className="font-medium">₹35,000 left</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">SBI Credit Card</span>
                <span className="font-medium">₹15,000 left</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total Available</span>
                  <span className="text-green-600">₹50,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Upcoming Bills
              </h3>
              <AlertCircle className="h-5 w-5 text-orange-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Electricity Bill</span>
                <span className="font-medium text-orange-600">Due 15th</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Netflix Subscription
                </span>
                <span className="font-medium text-orange-600">Due 20th</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Internet Bill</span>
                <span className="font-medium text-green-600">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
