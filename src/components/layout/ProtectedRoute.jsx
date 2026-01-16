import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../app/App";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useContext(AuthContext);

  // 1. Not logged in → redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but role not allowed → unauthorized page
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3. Authorized → render child routes
  return <Outlet />;
};

export default ProtectedRoute;
