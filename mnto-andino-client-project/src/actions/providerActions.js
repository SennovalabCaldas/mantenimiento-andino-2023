// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_PROVIDER_SUCCESS,
  SET_ALL_PROVIDERS_SERVICE,
  GET_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Provider } from "../api/provider";
const providerController = new Provider();

export const createSupplier = (data) => {
  return async (dispatch, getState) => {
    try {
      const supplier = await providerController.createSupplier(
        data
      );
      dispatch(createSupplierSuccess(supplier));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllSuppliers = () => {
  return async (dispatch, getState) => {
    try {
      const suppliers = await providerController.getSuppliers();
      dispatch(setAllSuppliers(suppliers));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSupplier = (_id) => {
  return async (dispatch, getState) => {
    try {
      const supplier = await providerController.getSupplier(_id);
      dispatch(getSupplierSuccess(supplier));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateSupplier = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedSupplier = await providerController.updateSupplier(
        _id,
        updatedData
      );
      dispatch(updateSupplierSuccess(updatedSupplier));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSupplier = (_id) => {
  return async (dispatch, getState) => {
    try {
      await providerController.deleteSupplier(_id);
      dispatch(deleteSupplierSuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createSupplierSuccess = (supplier) => {
    
  return {
    type: CREATE_PROVIDER_SUCCESS,
    payload: supplier,
  };
};

export const setAllSuppliers = (suppliers) => {
  return {
    type: SET_ALL_PROVIDERS_SERVICE,
    payload: suppliers,
  };
};

export const getSupplierSuccess = (supplier) => {
  return {
    type: GET_PROVIDER_SUCCESS,
    payload: supplier,
  };
};

export const updateSupplierSuccess = (updateSupplier) => {
    
  return {
    type: UPDATE_PROVIDER_SUCCESS,
    payload: updateSupplier,
  };
};

export const deleteSupplierSuccess = (_id) => {
  return {
    type: DELETE_PROVIDER_SUCCESS,
    payload: _id,
  };
};
