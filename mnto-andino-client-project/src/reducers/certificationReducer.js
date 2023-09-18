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
    entity: null,
    avatar: [],
    joinDate: null,
  },
  error: null,
  loading: false,
  allCertification: [],
};

const certificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CERTIFICATION_SUCCESS:
      return {
        ...state,
        certification: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_CERTIFICATIONS_SERVICE:
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
