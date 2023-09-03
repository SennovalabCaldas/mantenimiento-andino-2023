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
      console.log("Sede creada >>>>>>>>>>", sede);
      dispatch(createSedeSuccess(sede));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllSedes = () => {
  return async (dispatch, getState) => {
    try {
      console.log("Entre al getAllSedes del actions");
      const sedes = await sedeController.getAllSedes();
      console.log("Sedes del actions >", sedes);
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
      console.log("Sede >>>>>>>>>>", sede);
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
      console.log("Resultados de búsqueda de sedes >>>>>>>>>>", searchResults);
      // Aquí puedes despachar una acción para manejar los resultados de la búsqueda
      // por ejemplo: dispatch(searchSedesSuccess(searchResults));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateSede = (sedeData) => {
  return async (dispatch, getState) => {
    try {
      console.log('Sede data en actions', sedeData);
      if (sedeData && sedeData._id && sedeData.direccion) {
        const direccion = sedeData.direccion;
        console.log('Direccion en actions', direccion);
        const accessToken = authController.getAccessToken();
        const updatedAddress = await addressController.updateAddressById(direccion._id, direccion); // Actualizar la dirección primero
        const sede = await sedeController.updateSede(sedeData);
        console.log("Sede >>>>>>>>>>", sede);
        dispatch(getUpdateSedeSuccess(sede));
      } else {
        console.error(
          "El objeto sedeData o la propiedad _id no están definidos."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSedeA = (_id) => {
  console.log("id", _id);
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

export const createSedeSuccess = (sedeData) => {
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
