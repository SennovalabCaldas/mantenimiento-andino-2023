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
    nombre_contacto: null,
    telefono_contacto: null,
    email_contacto: null,
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
  },
  error: null,
  isAuthenticated: false,
  loading: false,
  allSedes: [],
  searchResults: [],
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
