import React from "react";
import { Link, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./loadingToRedirect";
const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  );
};

export default UserRoute;
