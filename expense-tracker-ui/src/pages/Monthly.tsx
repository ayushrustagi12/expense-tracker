import React from "react";
import { Layout } from "@/components/Layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Plus, TrendingUp, AlertCircle } from "lucide-react";

const Monthly = () => {
  const monthlyTabs = [
    {
      id: 1,
      name: "Rent",
      amount: 25000,
      dueDate: "2024-01-01",
      status: "paid",
      category: "Housing",
    },
    {
      id: 2,
      name: "Electricity Bill",
      amount: 1200,
      dueDate: "2024-01-15",
      status: "pending",
      category: "Utilities",
    },
    {
      id: 3,
      name: "Internet",
      amount: 999,
      dueDate: "2024-01-10",
      status: "paid",
      category: "Utilities",
    },
    {
      id: 4,
      name: "Gym Membership",
      amount: 2000,
      dueDate: "2024-01-20",
      status: "upcoming",
      category: "Health",
    },
  ];

  const totalAmount = monthlyTabs.reduce((sum, tab) => sum + tab.amount, 0);
  const paidAmount = monthlyTabs
    .filter((tab) => tab.status === "paid")
    .reduce((sum, tab) => sum + tab.amount, 0);
  const progress = (paidAmount / totalAmount) * 100;

  return (
    <Layout>
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 md:hidden">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Monthly Tabs</h1>
      </div>

      <div className="p-4 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-gray-900">Monthly Tabs</h1>
            <p className="text-gray-600 mt-2">
              Track your recurring monthly expenses
            </p>
          </div>

          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Monthly Tab
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Monthly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₹{totalAmount.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Across all categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Paid This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ₹{paidAmount.toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {Math.round(progress)}% completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ₹{(totalAmount - paidAmount).toLocaleString()}
              </div>
              <p className="text-sm text-gray-500 mt-1">Due this month</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Progress</CardTitle>
            <CardDescription>
              Track your monthly payment completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Monthly Tabs Overview
            </CardTitle>
            <CardDescription>
              Manage your recurring monthly expenses
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {monthlyTabs.map((tab) => (
                <div
                  key={tab.id}
                  className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium text-gray-900">{tab.name}</p>
                        <p className="text-sm text-gray-500">
                          Due: {tab.dueDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge
                      variant={
                        tab.category === "Housing" ? "default" : "secondary"
                      }
                      className="hidden sm:inline-flex"
                    >
                      {tab.category}
                    </Badge>
                    <Badge
                      variant={
                        tab.status === "paid"
                          ? "default"
                          : tab.status === "pending"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {tab.status}
                    </Badge>
                    <span className="font-semibold text-gray-900 text-right">
                      ₹{tab.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Monthly;
