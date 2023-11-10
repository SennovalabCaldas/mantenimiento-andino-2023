import {
  CREATE_PROFILE_SUCCESS,
  SET_ALL_PROFILES,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  DELETE_PROFILE_SUCCESS,
} from "../actions/types";

const initialState = {
  profile: {
    profileName: null,
    feature1: null,
    feature2: null,
    feature3: null,
    feature4: null,
    contact_telephone: null,
    email: null,
    contact_whatsApp: null,
    active: null,
  },
  allProfiles: [],
};

const ProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
        loading: false,
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
        loading: false,
      };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
        loading: false,
      };
    case SET_ALL_PROFILES:
      return {
        ...state,
        allProfiles: action.payload,
        error: null,
        loading: false,
      };
    case DELETE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default ProfileReducer;
