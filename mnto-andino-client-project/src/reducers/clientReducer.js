// Importa los tipos de acción
import {
  CREATE_CLIENT_SUCCESS,
  SET_ALL_CLIENTS,
  GET_CLIENT_SUCCESS,
  UPDATE_CLIENT_SUCCESS,
  DELETE_CLIENT_SUCCESS,
} from "../actions/types";

// Estado inicial
const initialState = {
  client: {
    _id: null,
    clientName: null,
    avatar: null,
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
    joinDate: {
      type: Date,
      default: Date.now,
    },
  },
  clients: [],
};

// Reducer de clientes
// Reducer de clientes
const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: [...state.clients, action.payload],
      };
    case SET_ALL_CLIENTS:
      console.log("Estos son los clientes", action.payload);
      return {
        ...state,
        clients: action.payload,
      };
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        selectedClient: action.payload,
      };
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.map((client) =>
          client._id === action.payload._id ? action.payload : client
        ),
        selectedClient:
          state.selectedClient &&
          state.selectedClient._id === action.payload._id
            ? action.payload
            : state.selectedClient,
      };
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clients: state.clients.filter(
          (client) => client._id !== action.payload
        ),
        selectedClient:
          state.selectedClient && state.selectedClient._id === action.payload
            ? null
            : state.selectedClient,
      };
    default:
      return state;
  }
};

export default clientReducer;
