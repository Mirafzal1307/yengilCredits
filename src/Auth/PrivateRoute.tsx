import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

function PrivateRoute(props: any): any {
  const token = localStorage.getItem("auth");
  if (token) {
    return <Outlet />;
  }
  return <Navigate to={token ? "/dashboard" : "/login"} />;
}

export default PrivateRoute;
