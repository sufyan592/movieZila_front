import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

export const allUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "ALL_USERS_REQUEST" });

    try {
      const users = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`);

      console.log("All Users Data:", users.data.users);

      // localStorage.setItem("allLoginUsers", JSON.stringify(users.data.users));

      // const users = await response.json();
      // console.log("ALL users from DB:", data.data);
      dispatch({
        type: "ALL_USERS_SUCCESS",
        payload: users.data.users,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "ALL_USERS_FAILURE" });
    }
  };
};
// ================================ Get All Users from DataBase ============================

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "LOGOUT_SUCCESS" });
  } catch (error) {
    dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message });
  }
};
