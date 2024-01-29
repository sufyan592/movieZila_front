import axios from "axios";

const loginUser = JSON.parse(localStorage.getItem("loginUser")) || null;

// =================================== New Movie ================================

export const addMovie = (data, token) => {
  return async (dispatch) => {
    dispatch({ type: "NEW_MOVIE_REQUEST" });

    try {
      const movie = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/movie`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "NEW_MOVIE_SUCCESS",
        payload: movie,
      });
    } catch (error) {
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
        `${process.env.REACT_APP_BASE_URL}/movie`
      );
      console.log("All Res:", response);

      dispatch({
        type: "MOVIE_DATA_SUCCESS",
        payload: {
          data: response?.data?.data,
          count: response?.data?.count,
          currentPage: page,
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
        `${process.env.REACT_APP_BASE_URL}/movie/favMovies/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("FAV DATA::::", response);

      dispatch({
        type: "FAVIROUTE_MOVIE_DATA_SUCCESS",
        payload: {
          data: response?.data?.data,
          count: response?.data?.count,
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

// =================================== User Favirote Movie ================================

export const userFaviroteMovies = (userId, token) => {
  return async (dispatch) => {
    dispatch({ type: "USER_MOVIE_FAVIROUTE_REQUEST" });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/favMovies/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.data}`,
          },
        }
      );

      console.log("User Faviroute::::", response);

      dispatch({
        type: "USER_MOVIE_FAVIROUTE_SUCCESS",
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch({
        type: "USER_MOVIE_FAVIROUTE_FAILURE",
        payload: error.message,
      });
    }
  };
};
// =================================== Single Movie ================================

export const singleMovie = (movieId, data, token) => {
  return async (dispatch) => {
    dispatch({ type: "SINGLE_MOVIE_REQUEST" });

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "SINGLE_MOVIE_SUCCESS",
        payload: response?.data?.data,
      });
    } catch (error) {
      dispatch({
        type: "SINGLE_MOVIE_FAILURE",
        payload: error.message,
      });
    }
  };
};
// =================================== Edit Movie ================================

export const editMovie = (movieId, data, token) => {
  return async (dispatch) => {
    dispatch({ type: "EDIT_MOVIE_REQUEST" });

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: "EDIT_MOVIE_SUCCESS",
        payload: response?.data,
      });
    } catch (error) {
      dispatch({
        type: "EDIT_MOVIE_FAILURE",
        payload: error.message,
      });
    }
  };
};
// =================================== Delete Movie ================================

export const deleteSingleMovie = (movieId, token) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_MOVIE_REQUEST" });

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/movie/${movieId}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User Data::", response);

      dispatch({
        type: "DELETE_MOVIE_SUCCESS",
        payload: movieId,
      });
    } catch (error) {
      dispatch({
        type: "DELETE_MOVIE_FAILURE",
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
        `${process.env.REACT_APP_BASE_URL}/movie/add-to-favorites`,
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
        payload: response?.data,
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
