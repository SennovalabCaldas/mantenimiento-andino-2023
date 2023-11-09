// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_CERTIFICATION_SUCCESS,
  SET_ALL_CERTIFICATIONS_SERVICE,
  GET_CERTIFICATION_SUCCESS,
  UPDATE_CERTIFICATION_SUCCESS,
  DELETE_CERTIFICATION_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Certification } from "../api/certification";
const certificationController = new Certification();

export const createCertification = (data) => {  
  console.log("data", data);
  return async (dispatch, getState) => {
    try {
      const certification = await certificationController.createCertification(
        data
      );
      dispatch(createCertificationSuccess(certification));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCertifications = () => {
  return async (dispatch, getState) => {
    try {
      const certifications = await certificationController.getCertifications();
      dispatch(setAllCertifications(certifications));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getCertification = (_id) => {
  return async (dispatch, getState) => {
    try {
      const certification = await certificationController.getCertification(_id);
      dispatch(getCertificationSuccess(certification));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateCertification = (_id, updatedData) => {  
  return async (dispatch, getState) => {
    try {
      const updatedCertification = await certificationController.updateCertification(
        _id,
        updatedData
      );
      dispatch(updateCertificationSuccess(updatedCertification));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCertification = (_id) => {
  return async (dispatch, getState) => {
    try {
      await certificationController.deleteCertification(_id);
      dispatch(deleteCertificationSuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createCertificationSuccess = (certification) => {
    
  return {
    type: CREATE_CERTIFICATION_SUCCESS,
    payload: certification,
  };
};

export const setAllCertifications = (certifications) => {
  return {
    type: SET_ALL_CERTIFICATIONS_SERVICE,
    payload: certifications,
  };
};

export const getCertificationSuccess = (certification) => {
  return {
    type: GET_CERTIFICATION_SUCCESS,
    payload: certification,
  };
};

export const updateCertificationSuccess = (updateCertification) => {
    
  return {
    type: UPDATE_CERTIFICATION_SUCCESS,
    payload: updateCertification,
  };
};

export const deleteCertificationSuccess = (_id) => {
  return {
    type: DELETE_CERTIFICATION_SUCCESS,
    payload: _id,
  };
};
