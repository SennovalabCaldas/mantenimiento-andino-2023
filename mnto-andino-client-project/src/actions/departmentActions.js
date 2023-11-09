import {
  CREATE_DEPARTMENT,
  CREATE_DEPARTMENT_FAILURE,
  GET_ALL_DEPARTMENTS,
  DELETE_DEPARTMENTS_SUCCESS,
  DELETE_DEPARTMENTS_FAILURE,
} from "./types";

import { Auth } from "../api";
import { Departments } from "../api/departments";

const authController = new Auth();
const departmentController = new Departments();

export const createDepartment = (departmentNames) => {
  return async (dispatch, getState) => {
    try {
      const departments = await departmentController.createDepartments(
        departmentNames
      );
      dispatch(createDepartmentSuccess(departments));
    } catch (error) {
      console.error(error);
      dispatch(
        createDepartmentFailure(
          "Error al crear los departamentos. Inténtalo de nuevo más tarde."
        )
      );
    }
  };
};

export const getAllDepartments = () => {
  return async (dispatch, getState) => {
    try {
      const departments = await departmentController.getAllDepartments();
      dispatch(getAllDepartmentsSuccess(departments));
    } catch (error) {
      console.error(error);
      dispatch(
        getAllDepartmentsFailure(
          "Error al obtener los departamentos. Inténtalo de nuevo más tarde."
        )
      );
    }
  };
};

export const deleteManyDepartments = (departmentIds) => {
  // Verificar si departmentIds es un array
  if (!Array.isArray(departmentIds)) {
    // Manejar el caso en que departmentIds no sea un array
    return Promise.reject(new Error("Los IDs de departamentos no son válidos"));
  }
  return async (dispatch, getState) => {
    console.log("Action:", departmentIds);
    try {
      await Promise.all(
        departmentIds.map(async (departmentId) => {
          await departmentController.deleteDepartments(departmentId);
        })
      );
      dispatch(deleteDepartmentsSuccess(departmentIds));
    } catch (error) {
      console.error(error);
      dispatch(
        deleteDepartmentsFailure(
          "Error al eliminar los departamentos. Inténtalo de nuevo más tarde."
        )
      );
    }
  };
};

export const createDepartmentSuccess = (departments) => {
  return {
    type: CREATE_DEPARTMENT,
    payload: departments,
  };
};

export const createDepartmentFailure = (error) => {
  return {
    type: CREATE_DEPARTMENT_FAILURE,
    payload: error,
  };
};

export const getAllDepartmentsSuccess = (departments) => {
  return {
    type: GET_ALL_DEPARTMENTS,
    payload: departments,
  };
};

export const deleteDepartmentsSuccess = (departments) => {
  return {
    type: DELETE_DEPARTMENTS_SUCCESS,
    payload: departments,
  };
};

export const deleteDepartmentsFailure = (error) => {
  return {
    type: DELETE_DEPARTMENTS_FAILURE,
    payload: error,
  };
};
