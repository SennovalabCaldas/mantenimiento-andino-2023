// Importa los tipos de acción
import {
  CREATE_CLIENT_SUCCESS,
  SET_ALL_CLIENTS,
  GET_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
} from "../actions/types";

// Estado inicial
const initialState = {
  client: {
    _id: null,
    clientName: null,
    active: undefined,
    avatar: [],
    national: undefined,
  },
  clients: [],
};
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload,
      };
    case SET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload,
      };
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload,
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload,
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        client: action.payload,
      };
    default:
      return state;
  }
  
};

export default clientReducer;
