import {
  CREATE_GLAMPING_SERVICE_SUCCESS,
  SET_ALL_GLAMPING_SERVICES_SERVICE,
  GET_GLAMPING_SERVICE_BY_ID_SUCCESS,
  DELETE_GLAMPING_SERVICE_SUCCESS,
} from "./types";
import { Glamping } from "../api/glamping"; // Ajusta la ruta a la ubicación de tu clase Service

const glampingController = new Glamping();

export const createService = (glampingData) => {
  return async (dispatch, getState) => {
    try {
      const glampingService = await glampingController.createGlamping(
        glampingData
      );
      dispatch(createGlampingSuccess(glampingService));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllGlampingServices = () => {
  return async (dispatch, getState) => {
    try {
      const glampingServices =
        await glampingController.getAllGlampingServices();
      dispatch(setAllGlampingServices(glampingServices));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getGlampingServiceById = (glampingServiceId) => {
  return async (dispatch, getState) => {
    try {
      const glampingService = await glampingController.getGlampingServiceById(
        glampingServiceId
      );
      dispatch(getGlampingServiceSuccess(glampingService));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteGlampingService = (glampingServiceId) => {
  return async (dispatch, getState) => {
    try {
      const glampingService = await glampingController.deleteGlampingService(
        glampingServiceId
      );
      dispatch(deleteGlampingServiceSuccess(glampingService));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createGlampingSuccess = (glampingService) => {
  return {
    type: CREATE_GLAMPING_SERVICE_SUCCESS,
    payload: glampingService,
  };
};

export const setAllGlampingServices = (glampingServices) => {
  return {
    type: SET_ALL_GLAMPING_SERVICES_SERVICE,
    payload: glampingServices,
  };
};

export const getGlampingServiceSuccess = (glampingService) => {
  return {
    type: GET_GLAMPING_SERVICE_BY_ID_SUCCESS,
    payload: glampingService,
  };
};

export const deleteGlampingServiceSuccess = (glampingService) => {
  return {
    type: DELETE_GLAMPING_SERVICE_SUCCESS,
    payload: glampingService,
  };
};
