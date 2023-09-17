import {
  CREATE_CATEGORY_SERVICE_SUCCESS,
  SET_ALL_CATEGORIES_SERVICE,
  GET_CATEGORY_SERVICE_SUCCESS,
  UPDATE_CATEGORY_SERVICE_SUCCESS,
  DELETE_CATEGORY_SERVICE_SUCCESS,
} from "../actions/types";

const initialState = {
  categoryService: {
    _id: null,
    nameCategoryService: null,
    active: null,
    avatar: [],
  },
  error: null,
  loading: false,
  allCategoriesService: [],
};

const categoryServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_SERVICE_SUCCESS:
      console.log("Datos de la nueva categoría en el reducer:", action.payload);
      return {
        ...state,
        categoryService: {
          ...state.categoryService,
          ...action.payload,
        },
      };

    case UPDATE_CATEGORY_SERVICE_SUCCESS:
      console.log(action.payload);
      const updatedCategory = action.payload;
      const updatedCategories = state.allCategoriesService.map(
        (categoryService) =>
          categoryService._id === updatedCategory._id
            ? { ...categoryService, ...updatedCategory }
            : categoryService
      );
      return {
        ...state,
        allCategoriesService: updatedCategories,
      };

    case SET_ALL_CATEGORIES_SERVICE:
      return {
        ...state,
        allCategoriesService: action.payload,
      };

    case GET_CATEGORY_SERVICE_SUCCESS:
      return {
        ...state,
        categoryService: {
          ...state.categoryService,
          ...action.payload,
        },
      };

    case DELETE_CATEGORY_SERVICE_SUCCESS:
      return {
        ...state,
        categoryService: {
          ...initialState.categoryService,
        },
      };

    default:
      return state;
  }
};

export default categoryServiceReducer;
