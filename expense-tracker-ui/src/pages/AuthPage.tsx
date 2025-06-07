import { useState } from "react";
import AuthCard from "../components/auth/AuthCard";

const AuthPage = () => {
  const [flipTo, setFlipTo] = useState<"login" | "register" | "forgot">(
    "login"
  );

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <AuthCard flipTo={flipTo} setFlipTo={setFlipTo} />
    </div>
  );
};

export default AuthPage;
