import React from "react";
import { Navigate, Route } from "react-router-dom";

function RestrictedRoute(props: any): any {
  const token = localStorage.getItem("auth");
  return <div>{!token ? <Route {...props} /> : <Navigate to="/" />}</div>;
}

export default RestrictedRoute;
