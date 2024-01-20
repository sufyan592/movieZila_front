import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./users.css"; // Make sure to import your CSS file

const UserComp = () => {
  const [permissions, setPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [backUsers, setBackUsers] = useState([]);

  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  useEffect(() => {
    async function getData() {
      try {
        const usersResponse = await axios.get(
          `http://localhost:8002/api/v1/user`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${loginUser.data}`,
            },
          }
        );
        const permissionsResponse = await axios.get(
          `http://localhost:8002/api/v1/user/permissions`
        );
        const userPermissionsResponse = await axios.get(
          `http://localhost:8002/api/v1/user/allUserpermissions`
        );

        setBackUsers(usersResponse.data.data);
        setPermissions(permissionsResponse.data.data);
        setUserPermissions(userPermissionsResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, []);

  const notify = (text, type) => {
    toast[type](text, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1500,
    });
  };

  const handlePermissionChange = async (userId, perId, e) => {
    try {
      const response = await axios.patch(
        `http://localhost:8002/api/v1/user/permissions`,
        { userId, perId }
      );

      if (response.status === 200) {
        notify(response.data.message, "success");

        const existingUserPermissionIndex = userPermissions.findIndex(
          (uP) => uP.userId === userId && uP.perId === perId
        );

        if (existingUserPermissionIndex !== -1) {
          const updatedUserPermissions = [...userPermissions];
          updatedUserPermissions.splice(existingUserPermissionIndex, 1);
          setUserPermissions(updatedUserPermissions);
        } else {
          const newUserPermission = { userId, perId };
          setUserPermissions([...userPermissions, newUserPermission]);
        }
      } else {
        notify(response.data.message, "error");
      }
    } catch (error) {
      console.error("Error handling permission change:", error);
    }
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
              {permissions.map((permission) => (
                <th key={permission.id} className="th center">
                  {permission.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {backUsers.map((user) => (
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
                        style={{ cursor: "pointer" }}
                        type="checkbox"
                        checked={
                          userPermissions &&
                          userPermissions.some(
                            (uP) =>
                              uP.userId === user.id &&
                              uP.perId === permission.id
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
