// addressReducer.js (Reducer específico para las direcciones)
import {
  CREATE_ADDRESS,
  GET_ALL_ADDRESSES,
  GET_ADDRESS,
} from "../actions/types";

const initialState = {
  addresses: [], // Array de todas las direcciones del usuario
  address: {}, // Dirección seleccionada
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, action.payload],
      };
    case GET_ALL_ADDRESSES:
      return {
        ...state,
        addresses: action.payload,
      };
    case GET_ADDRESS:
      console.log(action.payload);
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};

export default addressReducer;
