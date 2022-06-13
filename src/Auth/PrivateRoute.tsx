import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const PrivateRoute = (props:any) => {
  const token = localStorage.getItem("auth");
  if (token) {
    return <Outlet/>
  } else {
    return <Navigate to={token ? "/dashboard" : "/login"}/>
  }
};

export default PrivateRoute;