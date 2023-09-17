import {
  CREATE_ALLY_SUCCESS,
  SET_ALL_ALLIES_SERVICE,
  GET_ALLY_SUCCESS,
  UPDATE_ALLY_SUCCESS,
  DELETE_ALLY_SUCCESS,
} from "../actions/types";

const initialState = {
  ally: {
    _id: null,
    allyName: null,
    active: null,
    avatar: [],
  },
  error: null,
  loading: false,
  allAllies: [],
};

const allyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_ALLIES_SERVICE:
      return {
        ...state,
        allAllies: action.payload,
        error: null,
        loading: false,
      };
    case GET_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default allyReducer;
