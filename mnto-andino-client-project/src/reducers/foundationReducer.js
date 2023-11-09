import {
  CREATE_FOUNDATION_SUCCESS,
  SET_ALL_FOUNDATIONS_SERVICE,
  GET_FOUNDATION_BY_ID_SUCCESS,
  DELETE_FOUNDATION_SUCCESS,
} from "../actions/types";

const initialState = {
  foundation: {
    _id: null,
    images: [],
    createdAt: null,
  },
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
      console.log("action.payload", action.payload);
      return {
        ...state,
        allFoundations: action.payload,
      };
    case GET_FOUNDATION_BY_ID_SUCCESS:
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
