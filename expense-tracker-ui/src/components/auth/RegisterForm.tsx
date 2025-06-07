import React, { useState, useEffect, useRef } from "react";
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
import { useToast } from "@/components/ui/use-toast";

interface RegisterFormProps {
  onSwitchMode: (mode: AuthMode) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchMode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { toast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Refs for focus management
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Validation functions
  const validateName = (val: string) =>
    !val.trim() ? "Full name is required." : "";
  const validateEmail = (val: string) => {
    if (!val.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(val)) return "Enter a valid email address.";
    return "";
  };
  const validatePassword = (val: string) => {
    if (!val) return "Password is required.";
    if (val.length < 8) return "Password must be at least 8 characters.";
    return "";
  };
  const validateConfirmPassword = (val: string, pass: string) => {
    if (val !== pass) return "Passwords must match.";
    return "";
  };

  // Validate all and focus on first error, returns error message if any
  const validateAll = () => {
    const nErr = validateName(name);
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const cpErr = validateConfirmPassword(confirmPassword, password);

    if (nErr) {
      nameRef.current?.focus();
      return nErr;
    }
    if (eErr) {
      emailRef.current?.focus();
      return eErr;
    }
    if (pErr) {
      passwordRef.current?.focus();
      return pErr;
    }
    if (cpErr) {
      confirmPasswordRef.current?.focus();
      return cpErr;
    }
    return "";
  };

  // Show toast on API error changes
  useEffect(() => {
    if (error) {
      toast({
        title: "Registration error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Show toast on success & clear form
  useEffect(() => {
    if (user && !isLoading && !error) {
      toast({
        title: "Account created!",
        description: `Welcome aboard, ${user.name || user.email}!`,
        variant: "default",
      });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  }, [user, isLoading, error, toast]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validateAll();
    if (validationError) {
      toast({
        title: "Validation error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  // Password strength
  const getPasswordStrength = (pass: string) => {
    if (pass.length === 0) return 0;
    if (pass.length < 8) return 1;
    return 2;
  };
  const passwordStrength = getPasswordStrength(password);
  const strengthColor =
    passwordStrength === 0
      ? "bg-gray-300"
      : passwordStrength === 1
      ? "bg-yellow-400"
      : "bg-green-500";
  const strengthText =
    passwordStrength === 0
      ? ""
      : passwordStrength === 1
      ? "Weak password"
      : "Strong password";

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Create Account
        </CardTitle>
        <CardDescription className="text-center">
          Sign up to start managing your finances
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleRegister} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              autoComplete="name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="mt-1"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a strong password"
              required
              autoComplete="new-password"
              className="mt-1 pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-[38px] text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              tabIndex={0}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.96 8.96 0 014.09-7.27M15 12a3 3 0 01-3 3m3-3a3 3 0 00-3-3"
                    opacity={0.5}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2 2l20 20"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>

            {/* Password strength bar */}
            {password.length > 0 && (
              <div className="mt-1">
                <div
                  className={`h-2 rounded ${strengthColor} transition-all duration-500 ease-in-out`}
                  style={{
                    width:
                      passwordStrength === 0
                        ? "0%"
                        : passwordStrength === 1
                        ? "50%"
                        : "100%",
                  }}
                  aria-hidden="true"
                ></div>
                <p
                  className={`text-sm mt-1 ${
                    passwordStrength === 1
                      ? "text-yellow-700"
                      : "text-green-700"
                  } font-semibold`}
                >
                  {strengthText}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type={showConfirmPassword ? "text" : "password"}
              ref={confirmPasswordRef}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              autoComplete="new-password"
              className="mt-1 pr-10"
            />
            <button
              type="button"
              aria-label={
                showConfirmPassword ? "Hide password" : "Show password"
              }
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-2 top-[38px] text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              tabIndex={0}
            >
              {showConfirmPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-9a8.96 8.96 0 014.09-7.27M15 12a3 3 0 01-3 3m3-3a3 3 0 00-3-3"
                    opacity={0.5}
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2 2l20 20"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>

          <Button
            type="submit"
            className="w-full flex justify-center items-center"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            )}
            {isLoading ? "Creating account..." : "Register"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => onSwitchMode("login")}
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
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
