import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = ({ children }) => {
  // const { user } = useSelector((state) => ({ ...state }));
  const role = localStorage.getItem("role");

  if (role !== "admin") {
    console.log("navigate to login");
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default AdminRoute;
