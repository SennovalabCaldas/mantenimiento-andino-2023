import {
  UPDATE_ADMIN,
  SET_ALL_USERS,
  UPDATE_USER_SUCCESS,
  GET_USER,
} from "../actions/types";

const initialState = {
  user: {
    user_id: null,
    role: null,
    active: null,
    sede: null,
    firstname: null,
    lastname: null,
    avatar: null,
  },
  error: null,
  isAuthenticated: false,
  loading: false,
  allUsers: [], // Agrega un nuevo estado para almacenar todos los usuarios
};
const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ADMIN:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload, // Actualiza el estado de todos los usuarios con los datos proporcionados
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
export default adminReducer;
