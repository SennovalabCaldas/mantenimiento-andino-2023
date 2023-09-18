import {
  CREATE_PROJECT_SUCCESS,
  SET_ALL_PROJECTS_SERVICE,
  GET_PROJECT_SUCCESS,
  UPDATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
} from "../actions/types";

const initialState = {
  project: {
    _id: null,
    projectName: null,
    entity: null,
    avatar: [],
    national: false,
    client: null,
    joinDate: null,
  },
  allProjects: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_PROJECTS_SERVICE:
      console.log("Datos de todos los proyectos:", action.payload);
      return {
        ...state,
        allProjects: action.payload,
        error: null,
        loading: false,
      };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        project: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;
