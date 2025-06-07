// src/routes/PrivateRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
