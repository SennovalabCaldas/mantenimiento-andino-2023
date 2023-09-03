import {
  CREATE_MENU,
  UPDATE_MENU,
  GET_ALL_MENUS,
  DELETE_MENU,
} from "../actions/types";

const initialState = {
  menu: {
    _id: null,
    title: null,
    path: null,
    order: null,
    active: null,
  },
  error: null,
  isAuthenticated: false,
  loading: false,
  allMenus: [],
};
const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_MENU:
      return {
        ...state,
        menu: {
          ...state.menu,
          ...action.payload,
        },
      };

    case UPDATE_MENU:
      console.log("Recibiendo datos de menus en el reducer:", action.payload);
      return {
        ...state,
        menu: {
          ...state.menu,
          ...action.payload,
        },
      };
    case GET_ALL_MENUS:
      console.log("Recibiendo datos de menus en el reducer:", action.payload);
      return {
        ...state,
        allMenus: action.payload,
      };
    case DELETE_MENU:
      return {
        ...state,
        menu: initialState.menu, // Restaurar el objeto menu a su estado inicial
      };
    default:
      return state;
  }
};

export default menuReducer;
