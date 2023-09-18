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
      dispatch(setAllProjects(projects));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getProject = (_id) => {
  return async (dispatch, getState) => {
    try {
      const project = await projectController.getProject(_id);
      dispatch(getProjectSuccess(project));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProject = (_id, updatedData) => {
    
    
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
    
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: project,
  };
};

export const setAllProjects = (categories) => {
  return {
    type: SET_ALL_PROJECTS_SERVICE,
    payload: categories,
  };
};

export const getProjectSuccess = (project) => {
  return {
    type: GET_PROJECT_SUCCESS,
    payload: project,
  };
};

export const updateCategorySuccess = (updatedCategory) => {
    
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
