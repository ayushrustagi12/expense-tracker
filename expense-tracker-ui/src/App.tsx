// expense-tracker-ui/src/App.tsx

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { fetchCurrentUser } from "./redux/authSlice";

const App = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser() as any);
    }
  }, [dispatch, user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/auth" />}
        />
        <Route
          path="/auth"
          element={!user ? <AuthPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
