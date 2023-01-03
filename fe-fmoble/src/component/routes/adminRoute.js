import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));

  if (!user?.role === "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AdminRoute;
