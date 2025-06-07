import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Mail } from "lucide-react";
import { AuthMode } from "@/types/auth";

interface ForgotPasswordFormProps {
  email: string;
  emailSent: boolean;
  onEmailChange: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchMode: (mode: AuthMode) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  emailSent,
  onEmailChange,
  onSubmit,
  onSwitchMode,
}) => (
  <>
    <CardHeader>
      <div className="flex items-center justify-center mb-4">
        <button
          onClick={() => onSwitchMode("login")}
          className="absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      </div>
      <CardTitle className="text-2xl font-semibold text-center">
        {emailSent ? "Check Your Email" : "Reset Password"}
      </CardTitle>
      <CardDescription className="text-center">
        {emailSent
          ? "We've sent you instructions to reset your password"
          : "Enter your email address and we'll send you a link to reset your password"}
      </CardDescription>
    </CardHeader>
    <CardContent>
      {emailSent ? (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="bg-green-100 p-3 rounded-full">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            An email has been sent to <strong>{email}</strong> with instructions
            to reset your password.
          </p>
          <Button
            onClick={() => onSwitchMode("login")}
            variant="outline"
            className="w-full"
          >
            Back to Sign In
          </Button>
        </div>
      ) : (
        <>
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>

            <Button type="submit" className="w-full">
              Send Reset Instructions
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => onSwitchMode("login")}
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Back to Sign In
            </button>
          </div>
        </>
      )}
    </CardContent>
  </>
);

export default ForgotPasswordForm;
