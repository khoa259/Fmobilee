import React, { useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log("AdminRoute", user);

  if (!user?.role === "admin") {
    return <Navigate to="/login" />;
  }
  return children;
};

export default AdminRoute;
