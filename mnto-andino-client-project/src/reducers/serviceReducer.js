import {
  CREATE_SERVICE_SUCCESS,
  GET_SERVICES_FAILURE,
  GET_SERVICE_FAILURE,
  UPDATE_SERVICE_FAILURE,
  DELETE_SERVICE_FAILURE,
  UPDATE_SERVICE_SUCCESS,
  GET_SERVICES_SUCCESS,
  GET_SERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
} from "../actions/types";

const initialState = {
  service: {
    _id: null,
    name: null,
    description: null,
    photos: [],
    creationDate: null,
  },
  error: null,
  loading: false,
  selectedService: null,
  error: null,
  services: [],
};

const serviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SERVICE_SUCCESS:
      return {
        ...state,
        services: [...state.services, action.payload],
        error: null,
      };
    case CREATE_SERVICE_SUCCESS:
    case GET_SERVICES_FAILURE:
    case GET_SERVICE_FAILURE:
    case UPDATE_SERVICE_FAILURE:
    case DELETE_SERVICE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SERVICES_SUCCESS:
      return {
        ...state,
        services: action.payload,
        error: null,
      };
    case GET_SERVICE_SUCCESS:
      return {
        ...state,
        selectedService: action.payload,
        error: null,
      };
    case UPDATE_SERVICE_SUCCESS:
      const updatedServices = state.services.map((service) =>
        service._id === action.payload._id ? action.payload : service
      );
      return {
        ...state,
        services: updatedServices,
        selectedService: action.payload,
        error: null,
      };
    case DELETE_SERVICE_SUCCESS:
      const filteredServices = state.services.filter(
        (service) => service._id !== action.payload
      );
      return {
        ...state,
        services: filteredServices,
        selectedService: null,
        error: null,
      };
    default:
      return state;
  }
};

export default serviceReducer;
