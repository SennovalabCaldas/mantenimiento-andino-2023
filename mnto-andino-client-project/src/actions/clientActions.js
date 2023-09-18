// Importa los tipos de acción relacionados con la categoría
import { Client } from "../api/client";
import {
  CREATE_CLIENT_SUCCESS,
  SET_ALL_CLIENTS,
  GET_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
} from "./types";

const clientController = new Client();

export const createClient = (clientData) => {
    
  return async (dispatch, getState) => {
    try {
      const client = await clientController.createClient(clientData);
      await dispatch(getAllClients());
      dispatch(createClientSuccess(client));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllClients = () => {
  return async (dispatch, getState) => {
    try {
      const clients = await clientController.getClients();
      dispatch(setAllClients(clients));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getClient = (_id) => {
  return async (dispatch, getState) => {
    try {
      const client = await clientController.getClient(_id);
      dispatch(getClientSuccess(client));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateClient = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedClient = await clientController.updateClient(
        _id,
        updatedData
      );
      dispatch(updateClientSuccess(updatedClient));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteClient = (_id) => {
  return async (dispatch, getState) => {
    try {
      await clientController.deleteClient(_id);
      dispatch(deleteClientSuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createClientSuccess = (client) => {
  return {
    type: CREATE_CLIENT_SUCCESS,
    payload: client,
  };
};

export const setAllClients = (categories) => {
  return {
    type: SET_ALL_CLIENTS,
    payload: categories,
  };
};

export const getClientSuccess = (client) => {
  return {
    type: GET_CLIENT_SUCCESS,
    payload: client,
  };
};

export const updateClientSuccess = (updatedClient) => {
    
  return {
    type: UPDATE_CLIENT_SUCCESS,
    payload: updatedClient,
  };
};

export const deleteClientSuccess = (_id) => {
  return {
    type: DELETE_CLIENT_SUCCESS,
    payload: _id,
  };
};
