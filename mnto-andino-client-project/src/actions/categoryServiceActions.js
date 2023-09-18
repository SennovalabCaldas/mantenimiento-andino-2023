// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_CATEGORY_SERVICE_SUCCESS,
  SET_ALL_CATEGORIES_SERVICE,
  GET_CATEGORY_SERVICE_SUCCESS,
  UPDATE_CATEGORY_SERVICE_SUCCESS,
  DELETE_CATEGORY_SERVICE_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { CategoryService } from "../api/categoryService";
const categoryServiceController = new CategoryService();

export const createCategoryService = (data) => {
    
  return async (dispatch, getState) => {
    try {
      const categoryService = await categoryServiceController.createCategoryService(
        data
      );
      dispatch(createCategoryServiceSuccess(categoryService));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCategoriesService = () => {
  return async (dispatch, getState) => {
    try {
      const categories = await categoryServiceController.getCategories();
      dispatch(setAllCategoriesServices(categories));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCategoryService = (_id) => {
  return async (dispatch, getState) => {
    try {
      const categoryService = await categoryServiceController.getCategory(_id);
      dispatch(getCategoryServiceSuccess(categoryService));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCategoryService = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedCategoryService = await categoryServiceController.updateCategory(
        _id,
        updatedData
      );
      dispatch(updateCategoryServiceSuccess(updatedCategoryService));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCategoryService = (_id) => {
  return async (dispatch, getState) => {
    try {
      await categoryServiceController.deleteCategory(_id);
      dispatch(deleteCategoryServiceSuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createCategoryServiceSuccess = (categoryService) => {
    
  return {
    type: CREATE_CATEGORY_SERVICE_SUCCESS,
    payload: categoryService,
  };
};

export const setAllCategoriesServices = (categories) => {
  return {
    type: SET_ALL_CATEGORIES_SERVICE,
    payload: categories,
  };
};

export const getCategoryServiceSuccess = (categoryService) => {
  return {
    type: GET_CATEGORY_SERVICE_SUCCESS,
    payload: categoryService,
  };
};

export const updateCategoryServiceSuccess = (updatedCategory) => {
    
  return {
    type: UPDATE_CATEGORY_SERVICE_SUCCESS,
    payload: updatedCategory,
  };
};

export const deleteCategoryServiceSuccess = (_id) => {
  return {
    type: DELETE_CATEGORY_SERVICE_SUCCESS,
    payload: _id,
  };
};
