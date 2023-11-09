import {
  CREATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  GET_CATEGORY_SUCCESS,
  SET_ALL_CATEGORIES,
  DELETE_CATEGORY_SUCCESS,
} from "../actions/types";

const initialState = {
  category: {
    _id: null,
    nombre: null,
    active: null,
  },
  allCategories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        error: null,
        loading: false,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default categoryReducer;
