import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const MoviePrivateRoute = () => {
  const location = useLocation();
  const user = JSON.parse(window.localStorage.getItem("loginUser"));
  console.log("lOGIN DATA:", user);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};
