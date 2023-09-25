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

export const createFoundationNews = (data) => {
    
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.createFoundationNew(data);
      dispatch(createFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateFoundationNews = (_id, data) => {
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.updateFoundationNew(_id, data);
      dispatch(createFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
}

export const getAllFoundationsNews = () => {
  return async (dispatch, getState) => {
    try {
      const foundations = await foundationController.getFoundationsNews();
      dispatch(setAllFoundations(foundations));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFoundationNew = (_id) => {
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.getFoundation(_id);
      dispatch(getFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFoundationNew = (_id) => {
  return async (dispatch, getState) => {
    try {
      await foundationController.deleteFoundationNew(_id);
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

export const updateFoundationSuccess = (foundation) => {
  return {
    type: UPDATE_FOUNDATION_SUCCESS,
    payload: foundation,
  };
}

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


export const deleteFoundationSuccess = (_id) => {
  return {
    type: DELETE_FOUNDATION_SUCCESS,
    payload: _id,
  };
};