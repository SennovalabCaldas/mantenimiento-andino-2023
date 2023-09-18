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
  error: null,
  loading: false,
  allCategories: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SUCCESS:
        
      return {
        ...state,
        category: {
          ...state.category,
          ...action.payload,
        },
      };

    case UPDATE_CATEGORY_SUCCESS:
      console.log(action.payload)
      const updatedCategory = action.payload;
      const updatedCategories = state.allCategories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      );
      return {
        ...state,
        allCategories: updatedCategories,
      };
    case SET_ALL_CATEGORIES:
      return {
        ...state,
        allCategories: action.payload,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        category: {
          ...state.category,
          ...action.payload,
        },
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        category: initialState.category, // Restaurar el objeto category a su estado inicial
      };
    default:
      return state;
  }
};

export default categoryReducer;
