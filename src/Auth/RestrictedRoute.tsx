import React from "react";
import { Navigate, Route } from "react-router-dom";

const RestrictedRoute = (props:any) => {
  // const isAuth  = false

  const token = localStorage.getItem('auth');

  console.log("token",token);
 
  return <>{!token ? <Route {...props} /> : <Navigate to="/" />}</>;

};

export default RestrictedRoute;