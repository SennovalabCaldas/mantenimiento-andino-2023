import {
  CREATE_FOUNDATION_SUCCESS,
  SET_ALL_FOUNDATIONS_SERVICE,
  GET_FOUNDATION_SUCCESS,
  UPDATE_FOUNDATION_SUCCESS,
  DELETE_FOUNDATION_SUCCESS,
} from "../actions/types";

const initialState = {
  foundation: {
    _id: null,
    foundationName: null,
    direccion: {
      country: null,
      departamento: null,
      municipio: null,
      state: null,
      selectedStreet: null,
      selectedLetter1: null,
      numero1: null,
      selectedLetter2: null,
      numero2: null,
      selectedLetter3: null,
      numero3: null,
      selectedComplement: null,
      selectedZone: null,
      barrio: null,
    },
    avatar: [],
  },
  error: null,
  loading: false,
  allFoundations: [],
};

const foundationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_FOUNDATION_SUCCESS:
      return {
        ...state,
        foundation: action.payload,
      };
    case SET_ALL_FOUNDATIONS_SERVICE:
      return {
        ...state,
        allFoundations: action.payload,
      };
    case GET_FOUNDATION_SUCCESS:
      return {
        ...state,
        foundation: action.payload,
      };
    case UPDATE_FOUNDATION_SUCCESS:
      return {
        ...state,
        foundation: action.payload,
      };
    case DELETE_FOUNDATION_SUCCESS:
      return {
        ...state,
        foundation: action.payload,
      };
    default:
      return state;
  }
};

export default foundationReducer;
