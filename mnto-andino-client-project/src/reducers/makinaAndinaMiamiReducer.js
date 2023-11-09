import {
  CREATE_MAKINA_ANDINA_MIAMI_FAILURE,
  CREATE_MAKINA_ANDINA_MIAMI_SUCCESS,
  GET_MAKINA_ANDINA_MIAMI_SUCCESS,
  GET_MAKINA_ANDINA_MIAMI_FAILURE,
  DELETE_MAKINA_ANDINA_MIAMI_SUCCESS,
  DELETE_MAKINA_ANDINA_MIAMI_FAILURE,
  GET_SERVICE_MAKINA_ANDINA_MIAMI_SUCCESS,
  GET_SERVICE_MAKINA_ANDINA_MIAMI_FAILURE,
} from "../actions/types";

const initialState = {
  makinaAndinaMiami: {
    _id: null,
    serviceName: null,
    description: null,
    photos: [],
    createdAt: null,
  },
  makinaAndinaMiamiServices: [],
};

const makinaAndinaMiamiReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiami: action.payload,
      };
    case CREATE_MAKINA_ANDINA_MIAMI_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case GET_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiamiServices: action.payload,
      };
    case GET_MAKINA_ANDINA_MIAMI_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case DELETE_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiamiServices: state.makinaAndinaMiamiServices.filter(
          (makinaAndinaMiamiService) => makinaAndinaMiamiService._id !== action.payload
        ),
      };
    case DELETE_MAKINA_ANDINA_MIAMI_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case GET_SERVICE_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiami: action.payload,
      };
    case GET_SERVICE_MAKINA_ANDINA_MIAMI_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default makinaAndinaMiamiReducer;
