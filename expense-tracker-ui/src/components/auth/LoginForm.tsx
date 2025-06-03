import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { AppDispatch, RootState } from "../../redux/store";

const LoginForm = ({
  onFlip,
}: {
  onFlip: (to: "register" | "forgot") => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <h2 className="text-xl font-bold">Login</h2>
      {error && <div className="text-red-500">{error}</div>}
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
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
      <div className="text-sm mt-2 flex justify-between">
        <button
          type="button"
          onClick={() => onFlip("register")}
          className="text-blue-500"
        >
          Create Account
        </button>
        <button
          type="button"
          onClick={() => onFlip("forgot")}
          className="text-blue-500"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
