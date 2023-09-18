// serviceActions.js
import * as types from "./types";
import { Service } from "../api/service"; // Ajusta la ruta a la ubicación de tu clase Service

const serviceController = new Service();

export const createService = (serviceData) => {
    
  return async (dispatch, getState) => {
    try {
      const newService = await serviceController.createService(serviceData);
      dispatch({
        type: types.CREATE_SERVICE_SUCCESS,
        payload: newService,
      });
    } catch (error) {
      dispatch({
        type: types.CREATE_SERVICE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const updateService = (serviceId, updatedServiceData) => {
    
  return async (dispatch, getState) => {
    try {
      const updatedService = await serviceController.updateService(
        serviceId,
        updatedServiceData
      );
      dispatch({
        type: types.UPDATE_SERVICE_SUCCESS,
        payload: updatedService,
      });
      await dispatch(getServices());
    } catch (error) {
      dispatch({
        type: types.UPDATE_SERVICE_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const getServices = () => {
  return async (dispatch, getState) => {
    try {
      const services = await serviceController.getServices();
        
      dispatch({
        type: types.GET_SERVICES_SUCCESS,
        payload: services,
      });
    } catch (error) {
      // En caso de error, despacha una acción de error
      dispatch({
        type: types.GET_SERVICES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const deleteService = (_id) => async (dispatch) => {
  try {
    await serviceController.deleteService(_id);
    dispatch({
      type: types.DELETE_SERVICE_SUCCESS,
      payload: _id,
    });
  } catch (error) {
    dispatch({
      type: types.DELETE_SERVICE_FAILURE,
      payload: error.message,
    });
  }
};
