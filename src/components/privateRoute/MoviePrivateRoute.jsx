import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const MoviePrivateRoute = () => {
  const location = useLocation();
  const token = JSON.parse(localStorage.getItem("loginUser")) || null;
  console.log(token);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
