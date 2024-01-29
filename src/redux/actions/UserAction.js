import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// ================================ Sign up ============================

export const addUser = (data, navigate) => {
  return async (dispatch) => {
    dispatch({ type: "SIGNUP_USER_REQUEST" });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/signup`,
        data
      );
      console.log("Response:", response);

      dispatch({
        type: "SIGNUP_USER_SUCCESS",
        payload: response.data,
      });

      // if (response.data.success) {
      //   toast.success("Signup successful!");
      //   navigate("/signin");
      // }
    } catch (error) {
      dispatch({
        type: "SIGNUP_USER_FAILURE",
        payload: error.response,
      });
    }
  };
};

// ================================ login ============================

export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch({ type: "LOGIN_USER_REQUEST" });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/login`,
        data
      );

      console.log("login User:", res.data);
      localStorage.setItem("loginUser", JSON.stringify(res.data));
      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_USER_FAILURE", payload: error.response });
    }
  };
};

// ================================ Get All Users from DataBase ============================

export const deleteUser = (id) => {
  return async (dispatch) => {
    // console.log(id);
    dispatch({
      type: "DELETE_USER",
      payload: id,
    });
  };
};

export const loginUserData = (id, token) => {
  return async (dispatch) => {
    dispatch({ type: "BLOG_DATA_REQUEST" });
    try {
      const response = await fetch(`http://localhost:8001/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("USER LOGINNN:::", data);

      localStorage.setItem("userLoginPer", JSON.stringify(data));

      dispatch({
        type: "GET_All_USERS_LOGIN_DATA",
        payload: data,
      });
    } catch (error) {
      console.error("Error updating blog data:", error.message);
      dispatch({
        type: "FAILED_TO_GET_All_USERS_LOGIN_DATA",
        payload: error.message,
      });
    }
  };
};

// ================================ Get All Users from DataBase ============================

export const allUsers = (token) => {
  return async (dispatch) => {
    dispatch({ type: "ALL_USERS_REQUEST" });

    try {
      const users = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("ALL USERS:", users?.data?.data);

      dispatch({
        type: "ALL_USERS_SUCCESS",
        payload: users?.data?.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ALL_USERS_FAILURE" });
    }
  };
};
// ================================ Get All Permissions ============================

export const allPermissions = (token) => {
  return async (dispatch) => {
    dispatch({ type: "PERMISSIONS_REQUEST" });

    try {
      const users = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/permissions`
      );
      console.log("USERS PER::", users?.data?.data);

      dispatch({
        type: "PERMISSIONS_SUCCESS",
        payload: users?.data?.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "PERMISSIONS_FAILURE" });
    }
  };
};

// ================================ User Permissions ============================

export const usersPermissions = (token) => {
  return async (dispatch) => {
    dispatch({ type: "UESRS_PERMISSIONS_REQUEST" });

    try {
      const users = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/user/allUserpermissions`
      );
      dispatch({
        type: "USERS_PERMISSIONS_SUCCESS",
        payload: users?.data?.data,
      });
    } catch (error) {
      dispatch({ type: "USERS_PERMISSIONS_FAILURE" });
    }
  };
};
// // ================================ Update User Permissions ============================

// export const updatePermissions = (
//   userId,
//   permissionId,
//   userPermissions,
//   token
// ) => {
//   return async (dispatch) => {
//     dispatch({ type: "UPDATE_UESRS_PERMISSIONS_REQUEST" });

//     try {
//       const hasPermission = userPermissions.some(
//         (uP) => uP.userId === userId && uP.permissionId === permissionId
//       );
//       const users = await axios.patch(
//         `${process.env.REACT_APP_BASE_URL}/user/permissions`,
//         { userId, permissionId }
//       );
//       dispatch({
//         type: "UPDATE_USERS_PERMISSIONS_SUCCESS",
//         payload: users?.data?.data,
//       });
//     } catch (error) {
//       dispatch({ type: "UPDATE_USERS_PERMISSIONS_FAILURE" });
//     }
//   };
// };

// ================================ Update User Permissions ============================

export const changePermission = (
  userId,
  permissionId,
  userPermissions,
  token
) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CHANGE_PERMISSIONS_REQUEST" });
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/user/permissions`,
        { userId: userId, permissionId: permissionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        const existingUserPermissionIndex = userPermissions.findIndex(
          (uP) => uP.userId === userId && uP.permissionId === permissionId
        );

        if (existingUserPermissionIndex !== -1) {
          const updatedUserPermissions = [...userPermissions];
          updatedUserPermissions.splice(existingUserPermissionIndex, 1);
          dispatch({
            type: "CHANGE_PERMISSIONS_SUCCESS",
            payload: updatedUserPermissions,
          });
        } else {
          const newUserPermission = {
            userId: userId,
            permissionId: permissionId,
          };
          const updatedUserPermissions = [
            ...userPermissions,
            newUserPermission,
          ];
          dispatch({
            type: "CHANGE_PERMISSIONS_SUCCESS",
            payload: updatedUserPermissions,
          });
        }
      } else {
        toast.error(response.data.message);
        dispatch({
          type: "CHANGE_PERMISSIONS_FAILURE",
          payload: { error: response.data.message },
        });
      }
    } catch (error) {
      console.log(error);
      // showToast('Error handling permission change:', 'error');
    }
  };
};

// ================================ Logout User============================

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
};
