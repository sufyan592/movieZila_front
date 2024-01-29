import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const AdminPrivateRoute = () => {
  const location = useLocation();

  const loginUser = JSON.parse(localStorage.getItem("loginUser")) || null;
  const { role } = loginUser?.data ? jwtDecode(loginUser?.data) : { role: [] };

  if (role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/movies" state={{ from: location }} replace />;
  }
};
