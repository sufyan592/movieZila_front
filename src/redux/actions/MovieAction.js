import axios from "axios";

const loginUser = JSON.parse(localStorage.getItem("loginUser")) || null;

// =================================== New Movie ================================

export const addMovie = (data) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_MOVIE_REQUEST" });

    try {
      await axios.post("http://localhost:8002/api/v1/movie", data);

      dispatch({
        type: "NEW_MOVIE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      console.error("Error creating blog data:", error.message);
      dispatch({
        type: "NEW_MOVIE_FAILURE",
        payload: error.message,
      });
    }
  };
};

// =================================== All Movies ================================

export const allMovies = (page = 1, pageSize = 8) => {
  return async (dispatch) => {
    dispatch({ type: "MOVIE_DATA_REQUEST" });
    try {
      const response = await axios.get(
        `http://localhost:8002/api/v1/movie?page=${page}&pageSize=${pageSize}`
      );

      dispatch({
        type: "MOVIE_DATA_SUCCESS",
        payload: {
          data: response.data.data,
          count: response.data.count,
          currentPage: page, // Ensure currentPage is included
        },
      });
    } catch (error) {
      console.error("Error fetching movie data:", error.message);
      dispatch({
        type: "MOVIE_DATA_FAILURE",
        payload: error.message,
      });
    }
  };
};

// =================================== All Fav Movies ================================

export const allFavirouteMovies = (page = 1, pageSize = 8, userId, token) => {
  return async (dispatch) => {
    dispatch({ type: "FAVIROUTE_MOVIE_DATA_REQUEST" });
    try {
      const response = await axios.get(
        `http://localhost:8002/api/v1/movie/favMovies/${userId}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "FAVIROUTE_MOVIE_DATA_SUCCESS",
        payload: {
          data: response.data.data,
          count: response.data.count,
          currentPage: page,
        },
      });
    } catch (error) {
      console.error("Error fetching movie data:", error.message);
      dispatch({
        type: "FAVIROUTE_MOVIE_DATA_FAILURE",
        payload: error.message,
      });
    }
  };
};

// =================================== Edit Movie ================================

export const editMovie = (id, data, token) => {
  return async (dispatch) => {
    dispatch({ type: "EDIT_MOVIE_DATA_REQUEST" });

    try {
      const response = await axios.patch(
        `http://localhost:8001/api/v1/blog/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "EDIT_MOVIE_DATA",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error updating blog data:", error.message);
      dispatch({
        type: "EDIT_MOVIE_FAILURE",
        payload: error.message,
      });
    }
  };
};
// =================================== Faviroute toogle ================================

export const toggleFavorite = (userId, movieId, token) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "TOGGLE_FAVORITE_REQUEST" });

      const response = await axios.patch(
        `http://localhost:8002/api/v1/movie/add-to-favorites`,
        {
          userId,
          movieId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "TOGGLE_FAVORITE_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error.message);
      dispatch({
        type: "TOGGLE_FAVORITE_FAILURE",
        payload: error.message,
      });
    }
  };
};
