// serviceActions.js
import * as types from "./types";
import { MakinaAndina } from "../api/makinaAndina"; // Ajusta la ruta a la ubicación de tu clase Service


const makinaAndinaController = new MakinaAndina();

export const createService = (makinaAndinaServiceData) => {
  console.log("makinaAndinaServiceData", makinaAndinaServiceData);
  return async (dispatch, getState) => {
    try {
      const newMakinaAndinaService =
        await makinaAndinaController.createMakinaAndinaService(
          makinaAndinaServiceData
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

export const getServices = () => {
  return async (dispatch) => {
    try {
      const makinaAndinaServices = await makinaAndinaController.getServices();
      dispatch({
        type: types.GET_MAKINA_ANDINA_SUCCESS,
        payload: makinaAndinaServices,
      });
    } catch (error) {
      dispatch({
        type: types.GET_MAKINA_ANDINA_FAILURE,
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

export const getMakinaAndinaService = (_id) => {
  return async (dispatch) => {
    try {
      const makinaAndinaService =
        await makinaAndinaController.getMakinaAndinaService(_id);
      dispatch({
        type: types.GET_SERVICE_MAKINA_ANDINA_SUCCESS,
        payload: makinaAndinaService,
      });
    } catch (error) {
      dispatch({
        type: types.GET_SERVICE_MAKINA_ANDINA_FAILURE,
        payload: error.message,
      });
    }
  };
};
