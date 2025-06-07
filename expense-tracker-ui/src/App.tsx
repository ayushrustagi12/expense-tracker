import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { fetchCurrentUser } from "./redux/authSlice";
import AppRoutes from "./routes/AppRoutes.tsx";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser() as any);
  }, [dispatch]);

  return (
    <Router>
      <Toaster />
      <AppRoutes />
    </Router>
  );
};

export default App;
