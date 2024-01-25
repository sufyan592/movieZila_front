import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

export const AdminPrivateRoute = () => {
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("loginUser"));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const user = async () => {
      try {
        const res = await axios.get("http://localhost:8002/api/v1/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.data}`,
          },
        });
        setUsers(res.data);

        console.log(res.data);
      } catch (error) {}
    };
    user();
  }, []);

  if (users?.some((user) => user?.role === "admin")) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
};
