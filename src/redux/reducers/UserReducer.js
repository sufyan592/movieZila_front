const initialState = {
  users: [],
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_USERS":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
      };
    case "LOGIN_USER":
      return {
        ...state,
        // You might want to store user login state or token in the state
        // For example: loggedInUser: action.payload
        isLoading: false,
      };
    case "USERS_FAILURE_ERROR":
      return {
        ...state,
        isLoading: false,
        error: "An error occurred while processing the request.",
      };
    default:
      return state;
  }
};

export default userReducer;
