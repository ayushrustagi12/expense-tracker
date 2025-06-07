import { useState } from "react";

const ForgotPasswordForm = ({ onFlip }: { onFlip: (to: "login") => void }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reset link sent to ${email} (mocked)`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 rounded"
      >
        Send Reset Link
      </button>
      <div className="text-sm mt-2">
        <button
          type="button"
          onClick={() => onFlip("login")}
          className="text-blue-500"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
