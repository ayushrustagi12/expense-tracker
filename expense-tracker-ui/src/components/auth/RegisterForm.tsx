import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthMode } from "@/types/auth";

interface RegisterFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isStrongPassword = password.length >= 8;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongPassword) return;
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Sign up to start managing your finances
          {error && <div className="text-red-500">{error}</div>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              className="mt-1"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !isStrongPassword}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => onSwitchMode("login")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in here
            </button>
          </p>
        </div>
      </CardContent>
    </>
  );
};

export default RegisterForm;
