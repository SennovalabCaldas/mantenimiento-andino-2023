
import { MakinaAndinaMiami } from "../api/makinaAndinaMiami"; 
import * as types from "./types";
const makinaAndinaMiamiController = new MakinaAndinaMiami();

export const createServiceMakinaMiami = (makinaAndinaMiamiServiceData) => {
  console.log("makinaAndinaMiamiServiceData", makinaAndinaMiamiServiceData);
  return async (dispatch, getState) => {
    try {
      const newMakinaAndinaService =
        await makinaAndinaMiamiController.createMakinaAndinaMiamiService(
          makinaAndinaMiamiServiceData
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

export const getServicesMakinaMiami = () => {
  return async (dispatch) => {
    try {
      const makinaAndinaServices = await makinaAndinaMiamiController.getServicesMiami();
      dispatch({
        type: types.GET_MAKINA_ANDINA_MIAMI_SUCCESS,
        payload: makinaAndinaServices,
      });
    } catch (error) {
      dispatch({
        type: types.GET_MAKINA_ANDINA_MIAMI_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteServiceMakinaMiami = (_id) => async (dispatch) => {
  try {
    await makinaAndinaMiamiController.deleteMakinaAndinaServiceMiami(_id);
    dispatch({
      type: types.DELETE_MAKINA_ANDINA_MIAMI_SUCCESS,
      payload: _id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_MAKINA_ANDINA_MIAMI_FAILURE,
      payload: error.message,
    });
  }
};

export const getMakinaMiami = (_id) => {
  return async (dispatch) => {
    try {
      const makinaAndinaService =
        await makinaAndinaMiamiController.getMakinaAndinaServiceMiami(_id);
      dispatch({
        type: types.GET_SERVICE_MAKINA_ANDINA_MIAMI_SUCCESS,
        payload: makinaAndinaService,
      });
    } catch (error) {
      dispatch({
        type: types.GET_SERVICE_MAKINA_ANDINA_MIAMI_FAILURE,
        payload: error.message,
      });
    }
  };
};
