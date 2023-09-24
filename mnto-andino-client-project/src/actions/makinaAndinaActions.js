// serviceActions.js
import * as types from "./types";
import { MakinaAndina } from "../api/makinaAndina"; // Ajusta la ruta a la ubicación de tu clase Service

const makinaAndinaController = new MakinaAndina();

export const createService = (makinaAndinaData) => {
  return async (dispatch, getState) => {
    try {
      const newMakinaAndinaService =
        await makinaAndinaController.createMakinaAndinaService(
          makinaAndinaData
        );
      dispatch({
        type: types.CREATE_MAKINA_ANDINA_SUCCESS,
        payload: newMakinaAndinaService,
      });
    } catch (error) {
      dispatch({
        type: types.CREATE_MAKINA_ANDINA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateService = (serviceId, updatedServiceData) => {
  console.log("serviceId", serviceId);
  console.log("updatedServiceData", updatedServiceData);
  return async (dispatch, getState) => {
    try {
      const updatedMakinaAndinaService =
        await makinaAndinaController.updateMakinaAndinaService(
          serviceId,
          updatedServiceData
        );
      console.log("updatedMakinaAndinaService", updatedMakinaAndinaService);
      dispatch({
        type: types.UPDATE_MAKINA_ANDINA_SUCCESS,
        payload: updatedMakinaAndinaService,
      });
    } catch (error) {
      dispatch({
        type: types.UPDATE_MAKINA_ANDINA_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getServices = () => {
  return async (dispatch, getState) => {
    try {
      const services = await makinaAndinaController.getMakinaAndinaServices();

      dispatch({
        type: types.GET_MAKINA_ANDINAS_SUCCESS,
        payload: services,
      });
    } catch (error) {
      // En caso de error, despacha una acción de error
      dispatch({
        type: types.GET_MAKINA_ANDINAS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteService = (_id) => async (dispatch) => {
  try {
    await makinaAndinaController.deleteMakinaAndinaService(_id);
    dispatch({
      type: types.DELETE_MAKINA_ANDINA_SUCCESS,
      payload: _id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_MAKINA_ANDINA_FAILURE,
      payload: error.message,
    });
  }
};
