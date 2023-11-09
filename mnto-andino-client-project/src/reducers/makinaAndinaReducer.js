import {
  CREATE_MAKINA_ANDINA_FAILURE,
  CREATE_MAKINA_ANDINA_SUCCESS,
  GET_MAKINA_ANDINA_SUCCESS,
  GET_MAKINA_ANDINA_FAILURE,
  DELETE_MAKINA_ANDINA_SUCCESS,
  DELETE_MAKINA_ANDINA_FAILURE,
  GET_SERVICE_MAKINA_ANDINA_SUCCESS,
  GET_SERVICE_MAKINA_ANDINA_FAILURE,
} from "../actions/types";

const initialState = {
  makinaAndina: {
    _id: null,
    serviceName: null,
    description: null,
    photos: [],
    createdAt: null,
  },
  makinaAndinaServices: [],
};

const makinaAndinaReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MAKINA_ANDINA_SUCCESS:
      return {
        ...state,
        makinaAndina: action.payload,
      };
    case CREATE_MAKINA_ANDINA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_MAKINA_ANDINA_SUCCESS:
      return {
        ...state,
        makinaAndinaServices: action.payload,
      };
    case GET_MAKINA_ANDINA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MAKINA_ANDINA_SUCCESS:
      return {
        ...state,
        makinaAndinaServices: state.makinaAndinaServices.filter(
          (makinaAndinaService) => makinaAndinaService._id !== action.payload
        ),
      };
    case DELETE_MAKINA_ANDINA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SERVICE_MAKINA_ANDINA_SUCCESS:
      return {
        ...state,
        makinaAndina: action.payload,
      };
    case GET_SERVICE_MAKINA_ANDINA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default makinaAndinaReducer;
