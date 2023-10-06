import {
  CREATE_MAKINA_ANDINA_MIAMI_SUCCESS,
  UPDATE_MAKINA_ANDINA_MIAMI_SUCCESS,
  GET_MAKINA_ANDINA_MIAMI_SUCCESS,
  DELETE_MAKINA_ANDINA_MIAMI_SUCCESS,
} from "../actions/types";

const initialState = {
  makinaAndinaMiami: {
    _id: null,
    serviceName: null,
    active: false,
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
        makinaAndinaMiami: {
          ...state.makinaAndinaMiami,
          ...action.payload,
        },
      };

    case UPDATE_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiami: {
          ...state.makinaAndinaMiami,
          ...action.payload,
        },
      };
    case GET_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiamiServices: action.payload,
      };
    case DELETE_MAKINA_ANDINA_MIAMI_SUCCESS:
      return {
        ...state,
        makinaAndinaMiami: {
          ...state.makinaAndinaMiami,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default makinaAndinaMiamiReducer;
