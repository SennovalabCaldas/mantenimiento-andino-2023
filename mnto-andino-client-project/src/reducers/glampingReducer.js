import {
  CREATE_GLAMPING_SUCCESS,
  CREATE_GLAMPING_FAILURE,
  UPDATE_GLAMPING_SUCCESS,
  UPDATE_GLAMPING_FAILURE,
  GET_GLAMPING_SUCCESS,
  GET_GLAMPING_FAILURE,
  DELETE_GLAMPING_SUCCESS,
  DELETE_GLAMPING_FAILURE,
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
    case CREATE_GLAMPING_SUCCESS:
      return {
        ...state,
        glamping: action.payload,
      };
    case CREATE_GLAMPING_FAILURE:
      return {
        ...state,
        glamping: {
          _id: null,
          serviceName: null,
          active: false,
          description: null,
          photos: [],
          createdAt: null,
        },
      };
    case UPDATE_GLAMPING_SUCCESS:
      return {
        ...state,
        glamping: action.payload,
      };
    case UPDATE_GLAMPING_FAILURE:
      return {
        ...state,
        glamping: {
          _id: null,
          serviceName: null,
          active: false,
          description: null,
          photos: [],
          createdAt: null,
        },
      };
    case GET_GLAMPING_SUCCESS:
      return {
        ...state,
        glampingServices: action.payload,
      };
    case GET_GLAMPING_FAILURE:
      return {
        ...state,
        glampingServices: [],
      };
    case DELETE_GLAMPING_SUCCESS:
      return {
        ...state,
        glampingServices: state.glampingServices.filter(
          (glamping) => glamping._id !== action.payload
        ),
      };
    case DELETE_GLAMPING_FAILURE:
      return {
        ...state,
        glampingServices: [],
      };
    default:
      return state;
  }
};

export default glampingReducer;