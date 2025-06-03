import { useState } from "react";
import { AuthMode } from "../api/auth";

export const useAuthForm = () => {
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === "login") {
      console.log("Login attempt:", { email, password });
    } else if (authMode === "register") {
      console.log("Register attempt:", {
        fullName,
        email,
        password,
        confirmPassword,
      });
    } else if (authMode === "forgot-password") {
      console.log("Forgot password for:", email);
      setEmailSent(true);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFullName("");
    setEmailSent(false);
  };

  const switchMode = (mode: AuthMode) => {
    setIsFlipping(true);
    setTimeout(() => {
      setAuthMode(mode);
      resetForm();
      setIsFlipping(false);
    }, 300);
  };

  return {
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
  };
};
