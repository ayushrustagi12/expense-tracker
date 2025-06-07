import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/authSlice";
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

interface LoginFormProps {
  remember: boolean;
  onRememberChange: (remember: boolean) => void;
  onSwitchMode: (mode: AuthMode) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSwitchMode,
  onRememberChange,
  remember,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { toast } = useToast();

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Error states (only for focus management, errors shown via toast)
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Refs for focus management
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  // Validation functions
  const validateEmail = (value: string) => {
    if (!value.trim()) return "Email is required.";
    if (!/\S+@\S+\.\S+/.test(value)) return "Enter a valid email address.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Password is required.";
    if (value.length < 6) return "Password must be at least 6 characters.";
    return "";
  };

  const validateAll = () => {
    const eError = validateEmail(email);
    const pError = validatePassword(password);
    setEmailError(eError);
    setPasswordError(pError);
    if (eError) {
      emailRef.current?.focus();
      toast({
        title: "Validation Error",
        description: eError,
        variant: "destructive",
      });
      return false;
    }
    if (pError) {
      passwordRef.current?.focus();
      toast({
        title: "Validation Error",
        description: pError,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Clear errors on input change (for focus only)
  useEffect(() => {
    if (emailError) setEmailError(validateEmail(email));
  }, [email]);

  useEffect(() => {
    if (passwordError) setPasswordError(validatePassword(password));
  }, [password]);

  // Show toast on API error changes
  useEffect(() => {
    if (error) {
      toast({
        title: "Login failed",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, toast]);

  // Show success toast on login success
  useEffect(() => {
    if (user && !isLoading && !error) {
      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.name || user.email}!`,
        variant: "default",
      });
      // Clear form fields and errors
      setEmail("");
      setPassword("");
      setEmailError("");
      setPasswordError("");
    }
  }, [user, isLoading, error, toast]);

  // Form submit handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;
    dispatch(loginUser({ email, password, navigate, remember }) as any);
  };

  // Accessibility: aria-describedby IDs (optional since no inline errors now)
  const emailErrorId = emailError ? "email-error" : undefined;
  const passwordErrorId = passwordError ? "password-error" : undefined;

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your dashboard
          {/* Remove inline error div here; handled by toast */}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              ref={emailRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailError(validateEmail(email))}
              aria-invalid={!!emailError}
              aria-describedby={emailErrorId}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="mt-1"
            />
            {/* Removed inline email error paragraph */}
          </div>

          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordError(validatePassword(password))}
              aria-invalid={!!passwordError}
              aria-describedby={passwordErrorId}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
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
            {/* Removed inline password error paragraph */}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={remember}
                onChange={(e) => onRememberChange(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                aria-describedby="remember-desc"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900 cursor-pointer"
                tabIndex={0}
                aria-label="Remember me checkbox"
                title="Keep me logged in on this device"
              >
                Remember me
              </label>
            </div>

            <button
              type="button"
              onClick={() => onSwitchMode("forgot-password")}
              className="text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Forgot your password?
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
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => onSwitchMode("register")}
              className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            >
              Sign up here
            </button>
          </p>
        </div>
      </CardContent>
    </>
  );
};

export default LoginForm;
