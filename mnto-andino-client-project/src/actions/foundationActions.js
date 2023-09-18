// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_FOUNDATION_SUCCESS,
  SET_ALL_FOUNDATIONS_SERVICE,
  GET_FOUNDATION_SUCCESS,
  UPDATE_FOUNDATION_SUCCESS,
  DELETE_FOUNDATION_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Foundation } from "../api/foundation";
const foundationController = new Foundation();

export const createFoundation = (data) => {
    
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.createFoundation(data);
      dispatch(createFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllFoundations = () => {
  return async (dispatch, getState) => {
    try {
      const foundations = await foundationController.getFoundations();
      dispatch(setAllFoundations(foundations));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFoundation = (_id) => {
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.getFoundation(_id);
      dispatch(getFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFoundation = (_id, updatedData) => {
    
    
  return async (dispatch, getState) => {
    try {
      const updatedFoundation = await foundationController.updateFoundation(
        _id,
        updatedData
      );
      dispatch(updateFoundationSuccess(updatedFoundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCategoryService = (_id) => {
  return async (dispatch, getState) => {
    try {
      await foundationController.deleteCategory(_id);
      dispatch(deleteFoundationSuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createFoundationSuccess = (foundation) => {
    
  return {
    type: CREATE_FOUNDATION_SUCCESS,
    payload: foundation,
  };
};

export const setAllFoundations = (foundations) => {
  return {
    type: SET_ALL_FOUNDATIONS_SERVICE,
    payload: foundations,
  };
};

export const getFoundationSuccess = (foundation) => {
  return {
    type: GET_FOUNDATION_SUCCESS,
    payload: foundation,
  };
};

export const updateFoundationSuccess = (updateFoundation) => {
    
  return {
    type: UPDATE_FOUNDATION_SUCCESS,
    payload: updateFoundation,
  };
};

export const deleteFoundationSuccess = (_id) => {
  return {
    type: DELETE_FOUNDATION_SUCCESS,
    payload: _id,
  };
};
