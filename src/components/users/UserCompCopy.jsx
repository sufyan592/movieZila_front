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
  updatePermissions,
} from "../../redux/actions/UserAction";

const UserCompCopy = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const dispatch = useDispatch();

  const { users, permissions, userPermissions, isLoading } = useSelector(
    (user) => user.userReducer
  );

  useEffect(() => {
    dispatch(allUsers(loginUser.data));
    dispatch(allPermissions());
    dispatch(usersPermissions());
  }, []);

  const handleChange = async (userId, permissionId, e) => {
    // console.log(userId, permissionId);
    const exist = userPermissions.findIndex((up) => {
      return up.userId === userId && up.permissionId === permissionId;
    });
    console.log("Exist:", exist);
    // const response = await axios.patch(
    //   `http://localhost:8002/api/v1/user/permissions`,
    //   { userId, permissionId }
    // );

    // console.log(response);
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
              {permissions.map((permission) => {
                return (
                  <>
                    <th className="th center">{permission?.name}</th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="td">
                    <div style={{ cursor: "pointer" }} className="center">
                      {user.email}
                    </div>
                  </td>
                  {permissions.map((permission) => (
                    <td key={permission.id} className="td center">
                      <div>
                        <input
                          type="checkbox"
                          checked={
                            userPermissions &&
                            userPermissions.some(
                              (uP) =>
                                uP.userId === user.id &&
                                uP.permissionId === permission.id
                            )
                          }
                          onChange={() => handleChange(user.id, permission.id)}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCompCopy;
