import {
  CREATE_CERTIFICATION_SUCCESS,
  SET_ALL_CERTIFICATIONS_SERVICE,
  GET_CERTIFICATION_SUCCESS,
  UPDATE_CERTIFICATION_SUCCESS,
  DELETE_CERTIFICATION_SUCCESS,
} from "../actions/types";

const initialState = {
  certification: {
    _id: null,
    certificationName: null,
    national: undefined,
    photos: [],
    joinDate: null,
  },
  allCertification: [],
};

const certificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CERTIFICATION_SUCCESS:
      console.log("action.payload", action.payload);
      return {
        ...state,
        certification: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_CERTIFICATIONS_SERVICE:
      console.log("action.payload", action.payload);
      return {
        ...state,
        allCertification: action.payload,
        error: null,
        loading: false,
      };
    case GET_CERTIFICATION_SUCCESS:
      return {
        ...state,
        certification: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_CERTIFICATION_SUCCESS:
      return {
        ...state,
        certification: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_CERTIFICATION_SUCCESS:
      return {
        ...state,
        certification: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default certificationReducer;
