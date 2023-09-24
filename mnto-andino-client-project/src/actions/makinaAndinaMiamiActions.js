// serviceActions.js
import * as types from "./types";
import { MakinaAndinaMiami } from "../api/makinaAndinaMiami"; // Ajusta la ruta a la ubicación de tu clase Service

const makinaAndinaMiamiController = new MakinaAndinaMiami();


export const createService = (makinaAndinaData) => {
  return async (dispatch, getState) => {
    try {
      const newMakinaAndinaService =
        await makinaAndinaMiamiController.createMakinaAndinaService(
          makinaAndinaData
        );
      dispatch({
        type: types.CREATE_MAKINA_ANDINA_MIAMI_SUCCESS,
        payload: newMakinaAndinaService,
      });
    } catch (error) {
      dispatch({
        type: types.CREATE_MAKINA_ANDINA_MIAMI_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getServicesMiami = () => {
  return async (dispatch, getState) => {
    try {
      const makinaAndinaMiamiServices =
        await makinaAndinaMiamiController.getMakinaAndinaMiamiServices();
      dispatch({
        type: types.GET_MAKINA_ANDINA_MIAMI_SUCCESS,
        payload: makinaAndinaMiamiServices,
      });
    } catch (error) {
      dispatch({
        type: types.GET_MAKINA_ANDINA_MIAMI_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteService = (serviceId) => {
  return async (dispatch, getState) => {
    try {
      await makinaAndinaMiamiController.deleteMakinaAndinaService(serviceId);
      dispatch({
        type: types.DELETE_MAKINA_ANDINA_MIAMI_SUCCESS,
        payload: serviceId,
      });
    } catch (error) {
      dispatch({
        type: types.DELETE_MAKINA_ANDINA_MIAMI_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateService = (serviceId, makinaAndinaData) => {
  return async (dispatch, getState) => {
    try {
      const updatedMakinaAndinaService =
        await makinaAndinaMiamiController.updateMakinaAndinaService(
          serviceId,
          makinaAndinaData
        );
      dispatch({
        type: types.UPDATE_MAKINA_ANDINA_MIAMI_SUCCESS,
        payload: updatedMakinaAndinaService,
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_MAKINA_ANDINA_MIAMI_FAILURE,
        payload: error.message,
      });
    }
  };
};

