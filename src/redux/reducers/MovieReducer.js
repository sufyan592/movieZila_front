// movieReducer.js

const initialState = {
  movies: {
    data: [],
    count: 0,
  },
  favoriteMovies: [],
  currentPage: 1,
  isLoading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MOVIE_REQUEST":
    case "MOVIE_DATA_REQUEST":
    case "EDIT_MOVIE_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case "NEW_MOVIE_SUCCESS":
      return {
        ...state,
        movies: [...state.movies, action.payload],
        isLoading: false,
      };

    case "MOVIE_DATA_SUCCESS":
      return {
        ...state,
        movies: {
          data: action.payload.data,
          count: action.payload.count,
        },
        isLoading: false,
        currentPage: action.payload.currentPage,
      };
    case "FAV_MOVIE_DATA":
      return {
        ...state,
        favMovies: action.payload,
        isLoading: false,
      };

    case "EDIT_MOVIE_DATA_SUCCESS":
      // Assuming the response from the server contains the updated movie data
      // You might need to update the movies array accordingly based on your API response
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        ),
        isLoading: false,
      };

    case "NEW_MOVIE_FAILURE":
    case "MOVIE_DATA_FAILURE":
    case "EDIT_MOVIE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "TOGGLE_FAVORITE_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "TOGGLE_FAVORITE_SUCCESS":
      return {
        ...state,
        favoriteMovies: action.payload,
        isLoading: false,
      };
    case "TOGGLE_FAVORITE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
