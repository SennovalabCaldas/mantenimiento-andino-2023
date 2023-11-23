// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_FOUNDATION_SUCCESS,
  SET_ALL_FOUNDATIONS_SERVICE,
  DELETE_FOUNDATION_SUCCESS,
  GET_FOUNDATION_BY_ID_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Foundation } from "../api/foundation";
const foundationController = new Foundation();

export const createFoundationNews = (data) => {
  console.log("data", data);
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.createFoundation(data);
      dispatch(createFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllFoundationsNews = () => {
  return async (dispatch, getState) => {
    try {
      const foundations = await foundationController.getAllFoundations();
      dispatch(setAllFoundations(foundations));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getFoundationById = (foundationId) => {
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.getFoundationById(
        foundationId
      );
      dispatch(getFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteFoundationNews = (foundationId) => {
  return async (dispatch, getState) => {
    try {
      const foundation = await foundationController.deleteFoundation(
        foundationId
      );
      dispatch(deleteFoundationSuccess(foundation));
    } catch (error) {
      console.error(error);
    }
  };
};

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
    type: GET_FOUNDATION_BY_ID_SUCCESS,
    payload: foundation,
  };
};

export const deleteFoundationSuccess = (foundation) => {
  return {
    type: DELETE_FOUNDATION_SUCCESS,
    payload: foundation,
  };
};
