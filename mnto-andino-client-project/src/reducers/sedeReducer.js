import {
  CREATE_SEDE,
  UPDATE_SEDE,
  GET_ALL_SEDES,
  GET_SEDE,
  SEARCH_SEDES,
  DELETE_SEDE,
} from "../actions/types";

const initialState = {
  sede: {
    _id: null,
    nombre: null,
    telefono_contacto: null,
    email_contacto: null,
    direccion: {
      _id: null,
      country: null,
      departamento: null,
      municipio: null,
      state: null,
      selectedStreet: null,
      nomenclature: null,
      selectedZone: null,
      barrio: null,
    },
  },
  allSedes: [],
};
const sedeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SEDE:
      return {
        ...state,
        sede: {
          ...state.sede,
          ...action.payload,
        },
      };

    case UPDATE_SEDE:
        
      return {
        ...state,
        sede: {
          ...state.sede,
          ...action.payload,
        },
      };
    case GET_ALL_SEDES:
        
      return {
        ...state,
        allSedes: action.payload,
      };
    case GET_SEDE:
      return {
        ...state,
        sede: {
          ...state.sede,
          ...action.payload,
        },
      };
    case SEARCH_SEDES: // Manejar la acción de búsqueda
      return {
        ...state,
        searchResults: action.payload, // Actualizar el arreglo de resultados de búsqueda
      };
    case DELETE_SEDE:
      return {
        ...state,
        sede: initialState.sede, // Restaurar el objeto sede a su estado inicial
      };
    default:
      return state;
  }
};

export default sedeReducer;
