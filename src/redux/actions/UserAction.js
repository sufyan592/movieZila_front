import axios from "axios";
import { toast } from "react-toastify";

// ================================ Sign up ============================

export const addUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_USERS" });
    try {
      const response = await axios.post(
        "http://localhost:8002/api/v1/user/signup",
        data
      );
      console.log("Signup User:", response);
      dispatch({
        type: "ADD_USER",
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USERS_FAILURE_ERROR" });
    }
  };
};

// ================================ login ============================

export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_USERS" });
    try {
      const res = await axios.post(
        "http://localhost:8002/api/v1/user/login",
        data
      );

      console.log("login User:", res.data);
      localStorage.setItem("loginUser", JSON.stringify(res.data));
      dispatch({
        type: "LOGIN_USER",
        payload: data,
      });

      // Display success message when user is found
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      dispatch({ type: "USERS_FAILURE_ERROR" });

      // Check if the error is due to the user not being found
      if (error.response && error.response.status === 404) {
        toast.error("User not found. Please check your credentials.");
      } else {
        toast.error("An error occurred during login. Please try again.");
      }
    }
  };
};

// ================================ Get All Users from DataBase ============================

export const allUsers = () => {
  return async (dispatch) => {
    dispatch({ type: "REQUEST_USERS" });
    try {
      const users = await axios.get("http://localhost:8001/api/v1/user");

      console.log("All Users Data:", users.data.users);

      localStorage.setItem("allLoginUsers", JSON.stringify(users.data.users));

      // const users = await response.json();
      // console.log("ALL users from DB:", data.data);
      dispatch({
        type: "ALL_USERS",
        payload: users,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: "USERS_FAILURE_ERROR" });
    }
  };
};

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
      const response = await fetch(`http://localhost:8001/api/v1/user/${id}`, {
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
