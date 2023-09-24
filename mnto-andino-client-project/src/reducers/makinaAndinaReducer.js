import {
  CREATE_MAKINA_ANDINA_FAILURE,
  CREATE_MAKINA_ANDINA_SUCCESS,
  UPDATE_MAKINA_ANDINA_SUCCESS,
  UPDATE_MAKINA_ANDINA_FAILURE,
  GET_MAKINA_ANDINAS_SUCCESS,
  GET_MAKINA_ANDINAS_FAILURE,
  DELETE_MAKINA_ANDINA_SUCCESS,
  DELETE_MAKINA_ANDINA_FAILURE,
} from "../actions/types";

const initialState = {
  makinaAndina: {
    _id: null,
    serviceName: null,
    active: false,
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
        makinaAndina: {
          _id: null,
          serviceName: null,
          active: false,
          description: null,
          photos: [],
          createdAt: null,
        },
      };
    case UPDATE_MAKINA_ANDINA_SUCCESS:
      return {
        ...state,
        makinaAndina: action.payload,
      };
    case UPDATE_MAKINA_ANDINA_FAILURE:
      return {
        ...state,
        makinaAndina: {
          _id: null,
          serviceName: null,
          active: false,
          description: null,
          photos: [],
          createdAt: null,
        },
      };
    case GET_MAKINA_ANDINAS_SUCCESS:
      return {
        ...state,
        makinaAndinaServices: action.payload,
      };
    case GET_MAKINA_ANDINAS_FAILURE:
      return {
        ...state,
        makinaAndinaServices: [],
      };
    case DELETE_MAKINA_ANDINA_SUCCESS:
      return {
        ...state,
        makinaAndinaServices: state.makinaAndinaServices.filter(
          (makinaAndina) => makinaAndina._id !== action.payload
        ),
      };
    case DELETE_MAKINA_ANDINA_FAILURE:
      return {
        ...state,
        makinaAndinaServices: [],
      };
    default:
      return state;
  }
}

export default makinaAndinaReducer;
