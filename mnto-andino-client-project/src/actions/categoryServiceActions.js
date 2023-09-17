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
  console.log("Datos de la nueva categoría:", data);
  return async (dispatch, getState) => {
    try {
      const category = await categoryServiceController.createCategoryService(
        data
      );
      dispatch(createCategorySuccess(category));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCategoriesService = () => {
  return async (dispatch, getState) => {
    try {
      const categories = await categoryServiceController.getCategories();
      dispatch(setAllCategories(categories));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCategoryService = (_id) => {
  return async (dispatch, getState) => {
    try {
      const category = await categoryServiceController.getCategory(_id);
      dispatch(getCategorySuccess(category));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCategoryService = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedCategory = await categoryServiceController.updateCategory(
        _id,
        updatedData
      );
      dispatch(updateCategorySuccess(updatedCategory));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCategoryService = (_id) => {
  return async (dispatch, getState) => {
    try {
      await categoryServiceController.deleteCategory(_id);
      dispatch(deleteCategorySuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createCategorySuccess = (category) => {
  console.log("Datos de la nueva categoría:", category);
  return {
    type: CREATE_CATEGORY_SERVICE_SUCCESS,
    payload: category,
  };
};

export const setAllCategories = (categories) => {
  return {
    type: SET_ALL_CATEGORIES_SERVICE,
    payload: categories,
  };
};

export const getCategorySuccess = (category) => {
  return {
    type: GET_CATEGORY_SERVICE_SUCCESS,
    payload: category,
  };
};

export const updateCategorySuccess = (updatedCategory) => {
  console.log("Datos de la categoría actualizada:", updatedCategory);
  return {
    type: UPDATE_CATEGORY_SERVICE_SUCCESS,
    payload: updatedCategory,
  };
};

export const deleteCategorySuccess = (_id) => {
  return {
    type: DELETE_CATEGORY_SERVICE_SUCCESS,
    payload: _id,
  };
};
