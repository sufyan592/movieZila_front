const initialState = {
  movies: [],
  movie: {},
  favoriteMovies: [],
  allFavirouteMovies: [],
  currentPage: 8,
  isLoading: false,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "NEW_MOVIE_REQUEST":
    case "MOVIE_DATA_REQUEST":
    case "EDIT_MOVIE_REQUEST":
    case "USER_MOVIE_FAVIROUTE_REQUEST":
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
      console.log("ALL MOVIES DELETE::", state.movies);
      return {
        ...state,
        movies: action.payload?.data,
        isLoading: false,
        currentPage: action.payload.currentPage,
      };
    case "FAV_MOVIE_DATA":
      return {
        ...state,
        favMovies: action.payload,
        isLoading: false,
      };

    case "USER_MOVIE_FAVIROUTE_SUCCESS":
      return {
        ...state,
        faviroteMovies: action.payload,
        isLoading: false,
        error: null,
      };
    case "SINGLE_MOVIE_SUCCESS":
      return {
        ...state,
        movie: action.payload,
        isLoading: false,
        error: null,
      };
    case "EDIT_MOVIE_SUCCESS":
      const updatedMovie = action.payload;
      const updatedMovies = state.movies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );

      return {
        ...state,
        movies: updatedMovies,
        isLoading: false,
      };

    case "DELETE_MOVIE_SUCCESS":
      return {
        ...state,
        movies: state?.movies?.filter((movie) => movie.id !== action.payload),
        isLoading: false,
      };
    case "NEW_MOVIE_FAILURE":
    case "MOVIE_DATA_FAILURE":
    case "EDIT_MOVIE_FAILURE":
    case "DELETE_MOVIE_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case "FAVIROUTE_MOVIE_DATA_SUCCESS":
      return {
        ...state,
        allFavirouteMovies: action.payload,
        isLoading: false,
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
