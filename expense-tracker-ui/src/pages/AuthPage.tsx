import React, { useState } from "react";
import AuthCard from "@/components/auth/AuthCard"; // adjust path
import { AuthMode } from "@/types/auth";

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [isFlipping, setIsFlipping] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    emailSent: false,
  });

  const onFormDataChange = {
    setEmail: (email: string) => setFormData((prev) => ({ ...prev, email })),
    setPassword: (password: string) =>
      setFormData((prev) => ({ ...prev, password })),
    setConfirmPassword: (confirmPassword: string) =>
      setFormData((prev) => ({ ...prev, confirmPassword })),
    setFullName: (fullName: string) =>
      setFormData((prev) => ({ ...prev, fullName })),
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle login/register/forgot here based on `authMode`
  };

  const handleSwitchMode = (mode: AuthMode) => {
    setIsFlipping(true);
    setTimeout(() => {
      setAuthMode(mode);
      setIsFlipping(false);
    }, 300); // sync with CSS animation
  };

  return (
    <AuthCard
      authMode={authMode}
      isFlipping={isFlipping}
      formData={formData}
      onFormDataChange={onFormDataChange}
      onSubmit={handleSubmit}
      onSwitchMode={handleSwitchMode}
    />
  );
};

export default AuthPage;
