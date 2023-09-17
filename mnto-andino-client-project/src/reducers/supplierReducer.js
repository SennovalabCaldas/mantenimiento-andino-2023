import {
  CREATE_PROVIDER_SUCCESS,
  SET_ALL_PROVIDERS_SERVICE,
  GET_PROVIDER_SUCCESS,
  UPDATE_PROVIDER_SUCCESS,
  DELETE_PROVIDER_SUCCESS,
} from "../actions/types";

const initialState = {
  supplier: {
    _id: null,
    supplierName: null,
    active: null,
    avatar: [],
  },
  error: null,
  loading: false,
  allSuppliers: [],
};

const supplierReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROVIDER_SUCCESS:
      return {
        ...state,
        supplier: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_PROVIDERS_SERVICE:
      return {
        ...state,
        allSuppliers: action.payload,
        error: null,
        loading: false,
      };
    case GET_PROVIDER_SUCCESS:
      return {
        ...state,
        supplier: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_PROVIDER_SUCCESS:
      return {
        ...state,
        supplier: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_PROVIDER_SUCCESS:
      return {
        ...state,
        supplier: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default supplierReducer;
