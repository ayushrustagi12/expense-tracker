import React from "react";
import { Card } from "@/components/ui/card";
import { AuthMode } from "@/types/auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthCardProps {
  authMode: AuthMode;
  isFlipping: boolean;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    emailSent: boolean;
  };
  onFormDataChange: {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setFullName: (fullName: string) => void;
  };
  onSubmit: (e: React.FormEvent) => void;
  onSwitchMode: (mode: AuthMode) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({
  authMode,
  isFlipping,
  formData,
  onFormDataChange,
  onSubmit,
  onSwitchMode,
}) => (
  <div style={{ perspective: "1000px" }}>
    <Card
      className={`relative overflow-hidden transition-transform duration-500 ${
        isFlipping ? "transform rotate-y-180" : ""
      }`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={`transition-all duration-500 ease-in-out transform ${
          isFlipping ? "opacity-0" : "opacity-100"
        }`}
      >
        {authMode === "login" && <LoginForm onSwitchMode={onSwitchMode} />}
        {authMode === "register" && (
          <RegisterForm onSwitchMode={onSwitchMode} />
        )}
        {authMode === "forgot-password" && (
          <ForgotPasswordForm
            email={formData.email}
            emailSent={formData.emailSent}
            onEmailChange={onFormDataChange.setEmail}
            onSubmit={onSubmit}
            onSwitchMode={onSwitchMode}
          />
        )}
      </div>
    </Card>
  </div>
);

export default AuthCard;
