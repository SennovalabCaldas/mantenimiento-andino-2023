import {
  CREATE_GLAMPING_SERVICE_SUCCESS,
  SET_ALL_GLAMPING_SERVICES_SERVICE,
  GET_GLAMPING_SERVICE_BY_ID_SUCCESS,
  DELETE_GLAMPING_SERVICE_SUCCESS,
} from "../actions/types";

const initialState = {
  glamping: {
    _id: null,
    serviceName: null,
    active: false,
    description: null,
    photos: [],
    createdAt: null,
  },
  glampingServices: [],
};

const glampingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GLAMPING_SERVICE_SUCCESS:
      return {
        ...state,
        glamping: action.payload,
      };
    case SET_ALL_GLAMPING_SERVICES_SERVICE:
      return {
        ...state,
        glampingServices: action.payload,
      };
    case GET_GLAMPING_SERVICE_BY_ID_SUCCESS:
      return {
        ...state,
        glamping: action.payload,
      };
    case DELETE_GLAMPING_SERVICE_SUCCESS:
      return {
        ...state,
        glamping: action.payload,
      };
    default:
      return state;
  }
};

export default glampingReducer;