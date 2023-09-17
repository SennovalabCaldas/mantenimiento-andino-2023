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
  console.log("Datos de la nueva categoría:", data);
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
      dispatch(setAllCategories(suppliers));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getSupplier = (_id) => {
  return async (dispatch, getState) => {
    try {
      const supplier = await providerController.getSupplier(_id);
      dispatch(getCategorySuccess(supplier));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateSupplier = (_id, updatedData) => {
  console.log("id", _id);
  console.log("Datos de la categoría actualizada:", updatedData);
  return async (dispatch, getState) => {
    try {
      const updatedSupplier = await providerController.updateSupplier(
        _id,
        updatedData
      );
      dispatch(updateCategorySuccess(updatedSupplier));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteSupplier = (_id) => {
  return async (dispatch, getState) => {
    try {
      await providerController.deleteCategory(_id);
      dispatch(deleteCategorySuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createSupplierSuccess = (supplier) => {
  console.log("Datos de la nueva categoría:", supplier);
  return {
    type: CREATE_PROVIDER_SUCCESS,
    payload: supplier,
  };
};

export const setAllCategories = (categories) => {
  return {
    type: SET_ALL_PROVIDERS_SERVICE,
    payload: categories,
  };
};

export const getCategorySuccess = (supplier) => {
  return {
    type: GET_PROVIDER_SUCCESS,
    payload: supplier,
  };
};

export const updateCategorySuccess = (updateSupplier) => {
  console.log("Datos de la categoría actualizada:", updateSupplier);
  return {
    type: UPDATE_PROVIDER_SUCCESS,
    payload: updateSupplier,
  };
};

export const deleteCategorySuccess = (_id) => {
  return {
    type: DELETE_PROVIDER_SUCCESS,
    payload: _id,
  };
};
