import React, { useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const PrivateRoute = (props) => {
  const location = useLocation();
  const token = JSON.parse(window.localStorage.getItem("loginUser"));
  const { userPermissions } = token
    ? jwtDecode(token.data)
    : { userPermissions: {} };

  const hasCreatePermission = userPermissions.some(
    (permission) => permission === props.create
  );

  const hasEditPermission = userPermissions.some(
    (permission) => permission === props.edit
  );
  const hasDeletePermission = userPermissions.some(
    (permission) => permission === props.delete
  );

  if (hasCreatePermission || hasDeletePermission || hasEditPermission) {
    return <Outlet />;
  } else {
    return <Navigate to="/movies" state={{ from: location }} replace />;
  }
};
