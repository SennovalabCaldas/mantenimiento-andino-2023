import { Testimonies } from "../api/";
import {
  CREATE_TESTIMONIE_SUCCESS,
  SET_TESTIMONY,
  SET_ALL_TESTIMONIES,
  UPDATE_TESTIMONIE_SUCCESS,
  DELETE_TESTIMONIE_SUCCESS,
} from "./types";

const testimonieController = new Testimonies();

export const createTestimonie = (testimonieData) => {
  return async (dispatch) => {
    try {
      await testimonieController.createTestimonie(testimonieData);
      dispatch({ type: CREATE_TESTIMONIE_SUCCESS });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const getTestimonieById = (testimonieId) => {
  return async (dispatch) => {
    try {
      const testimonie = await testimonieController.getTestimonieById(
        testimonieId
      );
      dispatch({ type: SET_TESTIMONY, payload: testimonie });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const getAllTestimonies = () => {
  return async (dispatch) => {
    try {
      const testimonies = await testimonieController.getTestimonies();
      dispatch({ type: SET_ALL_TESTIMONIES, payload: testimonies });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const updateTestimonie = (testimonieId, testimonieData) => {
  return async (dispatch, getState) => {
    try {
      const updatedTestimonie = await testimonieController.updateTestimonie(
        testimonieId,
        testimonieData
      );
      dispatch(updateTestimonieSuccess(updatedTestimonie));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTestimonie = (testimonieId) => {
  return async (dispatch) => {
    try {
      await testimonieController.deleteTestimonie(testimonieId);
      dispatch({ type: DELETE_TESTIMONIE_SUCCESS });
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};

export const createTestimonieSuccess = (testimonieData) => {
  return {
    type: CREATE_TESTIMONIE_SUCCESS,
    payload: testimonieData,
  };
};

export const setAllTestimonies = (testimonies) => {
  return {
    type: SET_ALL_TESTIMONIES,
    payload: testimonies,
  };
};


export const updateTestimonieSuccess = (updatedTestimonie) => {
  return {
    type: UPDATE_TESTIMONIE_SUCCESS,
    payload: updatedTestimonie,
  };
}

export const deleteTestimonieSuccess = (testimonieId) => {
  return {
    type: DELETE_TESTIMONIE_SUCCESS,
    payload: testimonieId,
  };
};

export const setTestimony = (testimony) => {
  return {
    type: SET_TESTIMONY,
    payload: testimony,
  };
};
