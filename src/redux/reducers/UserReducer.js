const initialState = {
  users: [],
  user: {},
  isLoading: false,
  error: null,
  islogin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_REQUEST":
    case "LOGIN_USER_REQUEST":
    case "ALL_USERS_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
        islogin: false,
      };
    case "ALL_USERS_SUCCESS":
      return {
        ...state,
        users: action.payload,
        isLoading: true,
        error: null,
      };
    case "SIGNUP_USER_SUCCESS":
    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        islogin: true,
      };

    case "SIGNUP_USER_FAILURE":
    case "LOGIN_USER_FAILURE":
    case "ALL_USERS_FAILURE":
      return {
        ...state,
        isLoading: false,
        islogin: false,
        users: null,
        user: null,
        error: action.payload,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: null,
        islogin: false,
        users: null,
        loginUser: null,
      };
    case "LOGOUT_FAIL":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        islogin: false,
        users: null,
        loginUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
