import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Wallet,
  Plus,
  Calendar,
  Settings,
  Receipt,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileSection } from "@/components/ProfileSection";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Transactions", href: "/transactions", icon: Receipt },
  { name: "Accounts & Cards", href: "/accounts", icon: CreditCard },
  { name: "EMI Tracker", href: "/emi", icon: Wallet },
  { name: "Monthly Tabs", href: "/monthly", icon: Calendar },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">ExpenseTracker</h1>
        <p className="text-sm text-gray-500 mt-1">Smart Finance Manager</p>
      </div>

      <nav className="p-4 space-y-2 flex-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                isActive
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-4">
          <p className="text-sm font-medium">Monthly Budget</p>
          <p className="text-xs opacity-90 mt-1">₹45,000 / ₹50,000</p>
          <div className="mt-2 bg-white bg-opacity-20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full w-4/5"></div>
          </div>
        </div>
      </div>

      <ProfileSection />
    </div>
  );
};
