// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Accounts from "../pages/Accounts";
import Cards from "../pages/Cards";
import EMITracker from "../pages/EMITracker";
import Monthly from "../pages/Monthly";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import Login from "../pages/Login";

const AppRoutes = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <PrivateRoute>
            <Accounts />
          </PrivateRoute>
        }
      />
      <Route
        path="/cards"
        element={
          <PrivateRoute>
            <Cards />
          </PrivateRoute>
        }
      />
      <Route
        path="/emi"
        element={
          <PrivateRoute>
            <EMITracker />
          </PrivateRoute>
        }
      />
      <Route
        path="/monthly"
        element={
          <PrivateRoute>
            <Monthly />
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
