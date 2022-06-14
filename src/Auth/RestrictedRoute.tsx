import React from "react";
import { Navigate, Route } from "react-router-dom";

const RestrictedRoute = (props:any) => {
  const token = localStorage.getItem('auth');
  return <>{!token ? <Route {...props} /> : <Navigate to="/" />}</>;
};

export default RestrictedRoute;