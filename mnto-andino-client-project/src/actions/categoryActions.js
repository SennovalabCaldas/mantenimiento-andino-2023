// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_CATEGORY_SUCCESS,
  SET_ALL_CATEGORIES,
  GET_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Category } from "../api/category";
import { updatePostState } from "./postActions";
import { Post } from "../api";

const categoryController = new Category();
const postController = new Post();

export const createCategory = (categoryData) => {
  return async (dispatch, getState) => {
    try {
      const category = await categoryController.createCategory(categoryData);
      dispatch(createCategorySuccess(category));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCategories = () => {
  return async (dispatch, getState) => {
    try {
      const categories = await categoryController.getCategories();
      dispatch(setAllCategories(categories));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCategory = (_id) => {
  return async (dispatch, getState) => {
    try {
      const category = await categoryController.getCategory(_id);
      dispatch(getCategorySuccess(category));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCategory = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedCategory = await categoryController.updateCategory(
        _id,
        updatedData
      );
      dispatch(updateCategorySuccess(updatedCategory));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCategory = (_id) => {
  return async (dispatch, getState) => {
    try {
      await categoryController.deleteCategory(_id);
      dispatch(deleteCategorySuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createCategorySuccess = (category) => {
  return {
    type: CREATE_CATEGORY_SUCCESS,
    payload: category,
  };
};

export const setAllCategories = (categories) => {
  return {
    type: SET_ALL_CATEGORIES,
    payload: categories,
  };
};

export const getCategorySuccess = (category) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload: category,
  };
};

export const updateCategorySuccess = (updatedCategory) => {
  console.log("Datos de la categoría actualizada:", updatedCategory);
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    payload: updatedCategory,
  };
};

export const deleteCategorySuccess = (_id) => {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    payload: _id,
  };
};
