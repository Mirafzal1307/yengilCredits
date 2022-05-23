import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const PrivateRoute = (props:any) => {
  // const isAuth  = false
// console.log(props);

  const token = localStorage.getItem("auth");

  console.log("token", token);
  if (token) {
    return <Outlet/>
  } else {
    return <Navigate to={token ? "/dashboard" : "/login"}/>
  }
  // return <>{token ? <Outlet /> : <Navigate to="/login" />}</>;
};

export default PrivateRoute;