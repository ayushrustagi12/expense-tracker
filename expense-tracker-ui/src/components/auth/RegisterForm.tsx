import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

const RegisterForm = ({ onFlip }: { onFlip: (to: "login") => void }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isStrongPassword = password.length >= 8;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStrongPassword) return;
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <h2 className="text-xl font-bold">Register</h2>
      {error && <div className="text-red-500">{error}</div>}
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password (min 8 chars)"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {!isStrongPassword && (
        <p className="text-sm text-red-500">Password too weak.</p>
      )}
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded disabled:opacity-50"
        disabled={isLoading || !isStrongPassword}
      >
        {isLoading ? "Creating Account..." : "Register"}
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

export default RegisterForm;
