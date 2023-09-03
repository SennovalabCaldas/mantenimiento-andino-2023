// serviceActions.js
import * as types from "./types";
import { Service } from "../api/service"; // Ajusta la ruta a la ubicación de tu clase Service

const serviceController = new Service();

export const createService = (serviceData) => {
  console.log("serviceData", serviceData);
  return async (dispatch, getState) => {
    try {
      const newService = await serviceController.createService(serviceData);
      console.log("newService", newService);
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

export const getServices = () => async (dispatch) => {
  try {
    const services = await serviceController.getServices();
    dispatch({
      type: types.GET_SERVICES_SUCCESS,
      payload: services,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SERVICES_FAILURE,
      payload: error.message,
    });
  }
};

export const getService = (_id) => async (dispatch) => {
  try {
    const service = await serviceController.getService(_id);
    dispatch({
      type: types.GET_SERVICE_SUCCESS,
      payload: service,
    });
  } catch (error) {
    dispatch({
      type: types.GET_SERVICE_FAILURE,
      payload: error.message,
    });
  }
};

export const updateService = (_id, updatedData) => async (dispatch) => {
  try {
    const updatedService = await serviceController.updateService(
      _id,
      updatedData
    );
    console.log("updatedService en actions", updatedService);
    dispatch({
      type: types.UPDATE_SERVICE_SUCCESS,
      payload: updatedService,
    });
  } catch (error) {
    dispatch({
      type: types.UPDATE_SERVICE_FAILURE,
      payload: error.message,
    });
  }
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
