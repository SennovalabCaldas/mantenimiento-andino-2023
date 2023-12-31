import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,

} from "../actions/types";

const initialState = {
  user: {
    _id: null,
    role: null,
    firstname: null,
    lastname: null,
    avatar: null,
    email: null,
  },
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: {
          _id: null,
          role: null,
          firstname: null,
          lastname: null,
          avatar: null,
          email: null,
        },
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        user: {
          _id: null,
          role: null,
          firstname: null,
          lastname: null,
          avatar: null,
          email: null,
        },
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        user: {
          _id: null,
          role: null,
          firstname: null,
          lastname: null,
          avatar: null,
          email: null,
        },
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
