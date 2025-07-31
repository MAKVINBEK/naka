// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";

export const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/profile" replace />;
  }
  return children;
};
