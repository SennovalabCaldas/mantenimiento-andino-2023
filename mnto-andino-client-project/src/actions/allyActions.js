// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_ALLY_SUCCESS,
  SET_ALL_ALLIES_SERVICE,
  GET_ALLY_SUCCESS,
  UPDATE_ALLY_SUCCESS,
  DELETE_ALLY_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Ally } from "../api/ally";
const allyController = new Ally();

export const createAlly = (data) => {
    
  return async (dispatch, getState) => {
    try {
      const ally = await allyController.createAlly(data);
      dispatch(createAllySuccess(ally));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllAllies = () => {
  return async (dispatch, getState) => {
    try {
      const allies = await allyController.getAllies();
      dispatch(setAllAllies(allies));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAlly = (_id) => {
  return async (dispatch, getState) => {
    try {
      const ally = await allyController.getAlly(_id);
      dispatch(getAllySuccess(ally));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateAlly = (_id, updatedData) => {
    
    
  return async (dispatch, getState) => {
    try {
      const updatedAlly = await allyController.updateAlly(
        _id,
        updatedData
      );
      dispatch(updateAllySuccess(updatedAlly));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteAlly = (_id) => {
  return async (dispatch, getState) => {
    try {
      await allyController.deleteAlly(_id);
      dispatch(deleteAllySuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createAllySuccess = (ally) => {
    
  return {
    type: CREATE_ALLY_SUCCESS,
    payload: ally,
  };
};

export const setAllAllies = (allies) => {
  console.log("allies", allies);
  return {
    type: SET_ALL_ALLIES_SERVICE,
    payload: allies,
  };
};

export const getAllySuccess = (ally) => {
  return {
    type: GET_ALLY_SUCCESS,
    payload: ally,
  };
};

export const updateAllySuccess = (updatedAlly) => {
    
  return {
    type: UPDATE_ALLY_SUCCESS,
    payload: updatedAlly,
  };
};

export const deleteAllySuccess = (_id) => {
  return {
    type: DELETE_ALLY_SUCCESS,
    payload: _id,
  };
};
