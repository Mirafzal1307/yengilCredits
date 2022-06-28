import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";
import TokenService from "../Api/tokenService";

function PrivateRoute(props: any): any {
  const token = TokenService.getLocalAccessToken();
  if (token) {
    return <Outlet />;
  }
  return <Navigate to={token ? "/dashboard" : "/login"} />;
}

export default PrivateRoute;
