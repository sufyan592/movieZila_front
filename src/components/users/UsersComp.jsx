import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./users.css";
import { useDispatch, useSelector } from "react-redux";
import {
  allUsers,
  usersPermissions,
  permissions,
  allPermissions,
  changePermission,
} from "../../redux/actions/UserAction";

const UserComp = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const dispatch = useDispatch();

  const { users, permissions, userPermissions, isLoading, error } = useSelector(
    (user) => user.userReducer
  );

  useEffect(() => {
    dispatch(allUsers(loginUser.data));
    dispatch(allPermissions());
    dispatch(usersPermissions());
  }, []);

  const notify = (text, type) => {
    toast[type](text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };

  // const handlePermissionChange = async (userId, permissionId, e) => {
  //   try {
  //     dispatch(updatePermissions(userId,permissionId))
  //     // const response = await axios.patch(
  //     //   `http://localhost:8002/api/v1/user/permissions`,
  //     //   { userId, permissionId }
  //     // );

  //     if (response.status === 200) {
  //       notify(response.data.message, "success");

  //       const existingUserPermissionIndex = userPermissions.findIndex(
  //         (uP) => uP.userId === userId && uP.permissionId === permissionId
  //       );

  //       if (existingUserPermissionIndex !== -1) {
  //         const updatedUserPermissions = [...userPermissions];
  //         updatedUserPermissions.splice(existingUserPermissionIndex, 1);
  //         setUserPermissions(updatedUserPermissions);
  //       } else {
  //         const newUserPermission = { userId, permissionId };
  //         setUserPermissions([...userPermissions, newUserPermission]);
  //       }
  //     } else {
  //       notify(response.data.message, "error");
  //     }
  //   } catch (error) {
  //     console.error("Error handling permission change:", error);
  //   }
  // };
  const handlePermissionChange = (userId, permissionId, e) => {
    dispatch(
      changePermission(userId, permissionId, userPermissions, loginUser.data)
    );
  };

  return (
    <div className="dashboard">
      <div className="UserList section-spacing">
        <h2 className="heading">All Users</h2>
        <table className="table">
          <thead>
            <tr>
              <th className="th center l">User</th>
              <th className="th center l" colSpan={permissions.length}>
                Permissions
              </th>
            </tr>
            <tr>
              <th className="th center"></th>
              {permissions?.map((permission) => (
                <th key={permission.id} className="th center">
                  {permission.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="td">
                  <div style={{ cursor: "pointer" }} className="center">
                    {user.email}
                  </div>
                </td>
                {permissions?.map((permission) => (
                  <td key={permission.id} className="td center">
                    <div>
                      <input
                        style={{ cursor: "pointer" }}
                        type="checkbox"
                        checked={
                          userPermissions &&
                          userPermissions.some(
                            (uP) =>
                              uP.userId === user.id &&
                              uP.permissionId === permission.id
                          )
                        }
                        onChange={(e) =>
                          handlePermissionChange(user.id, permission.id, e)
                        }
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserComp;
