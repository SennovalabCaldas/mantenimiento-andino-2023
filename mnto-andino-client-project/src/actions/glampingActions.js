import * as types from "./types";
import { Glamping } from "../api/glamping"; // Ajusta la ruta a la ubicación de tu clase Service

const glampingController = new Glamping();


export const createService = (makinaAndinaData) => {
  return async (dispatch, getState) => {
    try {
      const newGlampingService =
        await glampingController.createGlampingService(
          makinaAndinaData
        );
      dispatch({
        type: types.CREATE_GLAMPING_SUCCESS,
        payload: newGlampingService,
      });
    } catch (error) {
      dispatch({
        type: types.CREATE_GLAMPING_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getServicesMiami = () => {
  return async (dispatch, getState) => {
    try {
      const glampingServices =
        await glampingController.getGlampingServices();
      dispatch({
        type: types.GET_GLAMPING_SUCCESS,
        payload: glampingServices,
      });
    } catch (error) {
      dispatch({
        type: types.GET_GLAMPING_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteService = (serviceId) => {
  return async (dispatch, getState) => {
    try {
      await glampingController.deleteGlampingService(serviceId);
      dispatch({
        type: types.DELETE_GLAMPING_SUCCESS,
        payload: serviceId,
      });
    } catch (error) {
      dispatch({
        type: types.DELETE_GLAMPING_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateService = (serviceId, makinaAndinaData) => {
  return async (dispatch, getState) => {
    try {
      const updatedGlampingService =
        await glampingController.updateGlampingService(
          serviceId,
          makinaAndinaData
        );
      dispatch({
        type: types.UPDATE_GLAMPING_SUCCESS,
        payload: updatedGlampingService,
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_GLAMPING_FAILURE,
        payload: error.message,
      });
    }
  };
};

