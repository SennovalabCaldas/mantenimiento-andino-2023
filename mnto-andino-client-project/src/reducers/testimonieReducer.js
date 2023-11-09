// Importa los tipos de acción
import {
  CREATE_TESTIMONIE_SUCCESS,
  SET_TESTIMONY,
  SET_ALL_TESTIMONIES,
  UPDATE_TESTIMONIE_SUCCESS,
  DELETE_TESTIMONIE_SUCCESS,
} from "../actions/types";

const initialState = {
  testimonie: {
    client: "",
    role: "",
    avatar: "",
    comment: "",
    evaluation: 0,
    active: true,
  },
  testimonies: [],
};

const testimonieReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TESTIMONIE_SUCCESS:
      return {
        ...state,
      };
    case SET_TESTIMONY:
      console.log("action.payload", action.payload);
      return {
        ...state,
        testimonie: action.payload,
      };
    case SET_ALL_TESTIMONIES:
      console.log("action.payload", action.payload);
      return {
        ...state,
        testimonies: action.payload,
      };
    case UPDATE_TESTIMONIE_SUCCESS:
      console.log(state);
      return {
        ...state,
      };
    case DELETE_TESTIMONIE_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default testimonieReducer;
