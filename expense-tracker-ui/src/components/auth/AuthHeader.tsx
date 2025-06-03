import React from "react";
import { Wallet } from "lucide-react";
import { AuthMode } from "../../api/auth";

interface AuthHeaderProps {
  authMode: AuthMode;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ authMode }) => (
  <div className="text-center">
    <div className="flex justify-center">
      <div className="bg-blue-600 p-3 rounded-full">
        <Wallet className="h-8 w-8 text-white" />
      </div>
    </div>
    <h2 className="mt-6 text-3xl font-bold text-gray-900">
      Ultimate Expense Tracker
    </h2>
    <p className="mt-2 text-sm text-gray-600">
      {authMode === "login" &&
        "Sign in to your account to manage your finances"}
      {authMode === "register" &&
        "Create an account to start tracking your expenses"}
      {authMode === "forgot-password" && "Reset your password to regain access"}
    </p>
  </div>
);
