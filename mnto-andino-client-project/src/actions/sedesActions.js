import {
  CREATE_SEDE,
  UPDATE_SEDE,
  GET_ALL_SEDES,
  GET_SEDE,
  SEARCH_SEDES,
  DELETE_SEDE,
} from "./types";

import { Auth, Address, Sede } from "../api";

const authController = new Auth();
const sedeController = new Sede();
const addressController = new Address();

export const createSede = (sedeData) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const sede = await sedeController.createSede(sedeData);
        
      dispatch(createSedeSussess(sede));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllSedes = () => {
  return async (dispatch, getState) => {
    try {
      const sedes = await sedeController.getAllSedes();
      dispatch(setAllSedes(sedes));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSede = (_id) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const sede = await sedeController.getSede(_id);
        
      dispatch(getSedeSuccess(sede));
    } catch (error) {
      console.error(error);
    }
  };
};

export const searchSedes = (nombre, departamento, municipio) => {
  return async (dispatch, getState) => {
    try {
      // Puedes obtener el accessToken si es necesario
      const accessToken = authController.getAccessToken();
      const searchResults = await sedeController.searchSedes(
        nombre,
        departamento,
        municipio
      );
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateSede = (_id, data) => {
  return async (dispatch, getState) => {
    try {
      const direccion = data.direccion;
      const updatedAddress = await addressController.updateAddressById(
        direccion._id,
        direccion
      );
        
      const sede = await sedeController.updateSede(_id, data);
        
      dispatch(getUpdateSedeSuccess(sede));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSede = (_id) => {
    
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      // Obtener la sede antes de eliminarla
      const sede = await sedeController.deleteSede(_id);
      dispatch(getDeleteSedeSuccess(null));
    } catch (error) {
      console.error(error);
    }
  };
};

/* ############################################################### */
/* ############################################################### */

export const createSedeSussess = (sedeData) => {
  return {
    type: CREATE_SEDE,
    payload: sedeData,
  };
};

export const setAllSedes = (sedes) => {
  return {
    type: GET_ALL_SEDES,
    payload: sedes,
  };
};

export const getSedeSuccess = (sede) => {
  return {
    type: GET_SEDE,
    payload: sede,
  };
};

export const searchSedesSuccess = (searchResults) => {
  return {
    type: SEARCH_SEDES, // Define el tipo adecuado según tu archivo "types"
    payload: searchResults,
  };
};

export const getUpdateSedeSuccess = (sedeData) => {
    
  return {
    type: UPDATE_SEDE,
    payload: sedeData,
  };
};

export const getDeleteSedeSuccess = (sede) => {
  return {
    type: DELETE_SEDE,
    payload: sede,
  };
};
