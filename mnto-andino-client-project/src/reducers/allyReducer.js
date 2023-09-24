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
    active: undefined,
    avatar: [],
    national: undefined,
  },
  allAllies: [],
};

const allyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
      };
    case SET_ALL_ALLIES_SERVICE:
      console.log("action.payload", action.payload);
      return {
        ...state,
        allAllies: action.payload,
      };
    case GET_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
      };
    case UPDATE_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
      };
    case DELETE_ALLY_SUCCESS:
      return {
        ...state,
        ally: action.payload,
      };
    default:
      return state;
  }
};

export default allyReducer;
