import React from "react";
import { AuthHeader } from "@/components/auth/AuthHeader";
import AuthCard from "@/components/auth/AuthCard";
import { useAuthForm } from "@/hooks/useAuthForm";

const Login = () => {
  const {
    authMode,
    email,
    password,
    confirmPassword,
    fullName,
    emailSent,
    isFlipping,
    setEmail,
    setPassword,
    setConfirmPassword,
    setFullName,
    handleSubmit,
    switchMode,
  } = useAuthForm();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <AuthHeader authMode={authMode} />

        <AuthCard
          authMode={authMode}
          isFlipping={isFlipping}
          formData={{
            email,
            password,
            confirmPassword,
            fullName,
            emailSent,
          }}
          onFormDataChange={{
            setEmail,
            setPassword,
            setConfirmPassword,
            setFullName,
          }}
          onSubmit={handleSubmit}
          onSwitchMode={switchMode}
        />
      </div>
    </div>
  );
};

export default Login;
