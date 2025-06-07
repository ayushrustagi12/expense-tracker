import React from "react";
import { Layout } from "@/components/Layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Search, ArrowUpDown } from "lucide-react";

const Transactions = () => {
  // Sample transaction data
  const transactions = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: -2500,
      category: "Food",
      date: "2024-01-15",
      type: "expense",
    },
    {
      id: 2,
      description: "Salary Credit",
      amount: 85000,
      category: "Income",
      date: "2024-01-01",
      type: "income",
    },
    {
      id: 3,
      description: "Uber Ride",
      amount: -350,
      category: "Transport",
      date: "2024-01-14",
      type: "expense",
    },
    {
      id: 4,
      description: "Netflix Subscription",
      amount: -499,
      category: "Entertainment",
      date: "2024-01-13",
      type: "expense",
    },
    {
      id: 5,
      description: "Freelance Payment",
      amount: 15000,
      category: "Income",
      date: "2024-01-12",
      type: "income",
    },
  ];

  return (
    <Layout>
      <div className="flex items-center gap-4 p-4 border-b border-gray-200 md:hidden">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">Transactions</h1>
      </div>

      <div className="p-4 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-2">
              Track all your income and expenses
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Transaction
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Transactions</span>
              <Button variant="ghost" size="sm">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </CardTitle>
            <CardDescription>Your latest financial activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge
                      variant={
                        transaction.type === "income" ? "default" : "secondary"
                      }
                      className="hidden sm:inline-flex"
                    >
                      {transaction.category}
                    </Badge>
                    <span
                      className={`font-semibold text-right ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}₹
                      {Math.abs(transaction.amount).toLocaleString()}
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

export default Transactions;
