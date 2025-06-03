// expense-tracker-ui/src/components/AuthCard.tsx

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

interface AuthCardProps {
  flipTo: "login" | "register" | "forgot";
  setFlipTo: (form: "login" | "register" | "forgot") => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ flipTo, setFlipTo }) => {
  return (
    <div className="w-[400px] bg-white rounded-2xl shadow-lg p-6 transition-all">
      {flipTo === "login" && <LoginForm onFlip={setFlipTo} />}
      {flipTo === "register" && <RegisterForm onFlip={setFlipTo} />}
      {flipTo === "forgot" && <ForgotPasswordForm onFlip={setFlipTo} />}
    </div>
  );
};

export default AuthCard;
