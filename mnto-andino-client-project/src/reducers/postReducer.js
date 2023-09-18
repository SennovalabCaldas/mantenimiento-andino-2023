import {
  CREATE_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  SET_ALL_POSTS,
  GET_POST_SUCCESS,
  DELETE_POST_SUCCESS,
  UPDATE_POST_STATE_SUCCESS,
} from "../actions/types";

const initialState = {
  post: {
    _id: null,
    titulo: null,
    subtitulo: null,
    descripcion: null,
    avatar: [],
    active: null,
    creador: null,
    fecha_creacion: null,
    categorias: [],
  },
  error: null,
  loading: false,
  allPosts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          ...action.payload,
        },
      };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          ...action.payload,
        },
      };
    case UPDATE_POST_STATE_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          ...action.payload,
        },
      };

    case SET_ALL_POSTS:
      //   
      return {
        ...state,
        allPosts: action.payload,
      };
    case GET_POST_SUCCESS:
        
      return {
        ...state,
        post: {
          ...state.post,
          ...action.payload,
        },
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        post: initialState.post, // Restaurar el objeto post a su estado inicial
      };
    default:
      return state;
  }
};

export default postReducer;
