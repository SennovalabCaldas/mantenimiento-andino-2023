// Importa los tipos de acción relacionados con la proyecto
import {
  CREATE_PROJECT_SUCCESS,
  SET_ALL_PROJECTS_SERVICE,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
} from "./types";

// Importa el controlador de proyecto
import { Project } from "../api/project";
const projectController = new Project();

export const createProject = (data) => {
  console.log("Datos de la nueva proyecto:", data);
  return async (dispatch, getState) => {
    try {
      const project = await projectController.createProject(
        data
      );
      dispatch(createProjectSuccess(project));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllProjects = () => {
  return async (dispatch, getState) => {
    try {
      const projects = await projectController.getProjects();
      dispatch(setAllCategories(projects));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getProject = (_id) => {
  return async (dispatch, getState) => {
    try {
      const project = await projectController.getProject(_id);
      dispatch(getCategorySuccess(project));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProject = (_id, updatedData) => {
  console.log("id", _id);
  console.log("Datos de la proyecto actualizada:", updatedData);
  return async (dispatch, getState) => {
    try {
      const updatedProject = await projectController.updateProject(
        _id,
        updatedData
      );
      dispatch(updateCategorySuccess(updatedProject));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCategoryService = (_id) => {
  return async (dispatch, getState) => {
    try {
      await projectController.deleteProject(_id);
      dispatch(deleteCategorySuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createProjectSuccess = (project) => {
  console.log("Datos de la nueva proyecto:", project);
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: project,
  };
};

export const setAllCategories = (categories) => {
  return {
    type: SET_ALL_PROJECTS_SERVICE,
    payload: categories,
  };
};

export const getCategorySuccess = (project) => {
  return {
    type: GET_PROJECT_SUCCESS,
    payload: project,
  };
};

export const updateCategorySuccess = (updatedCategory) => {
  console.log("Datos de la proyecto actualizada:", updatedCategory);
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: updatedCategory,
  };
};

export const deleteCategorySuccess = (_id) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: _id,
  };
};
