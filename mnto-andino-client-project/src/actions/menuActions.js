import { CREATE_MENU, UPDATE_MENU, GET_ALL_MENUS, DELETE_MENU } from "./types";

import { Auth, Menu } from "../api";

const authController = new Auth();
const menuController = new Menu();

export const createMenu = (menuData) => {
  return async (dispatch, getState) => {
    try {
      const menu = await menuController.createMenu(menuData);
        
      dispatch(createMenuSussess(menu));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllMenus = (menuActive) => {
  return async (dispatch, getState) => {
    try {
      const menus = await menuController.getAllMenus(menuActive); // Pasa el valor de 'active'
        
      dispatch(setAllMenus(menus));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateMenu = (_id, data) => {
    
  return async (dispatch, getState) => {
    try {
      const menu = await menuController.updateMenuById(_id, data); // Pasa el objeto de actualización 'data'
      dispatch(getUpdateMenuSuccess(menu));
    } catch (error) {
      console.error(error);
    }
  };
};



export const deleteMenuA = (_id) => {
    
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      // Obtener la menu antes de eliminarla
      const menu = await menuController.deleteMenu(_id);
      dispatch(getDeleteMenuSuccess(null));
    } catch (error) {
      console.error(error);
    }
  };
};

/* ############################################################### */
/* ############################################################### */

export const createMenuSussess = (menuData) => {
  return {
    type: CREATE_MENU,
    payload: menuData,
  };
};

export const setAllMenus = (menus) => {
    
  return {
    type: GET_ALL_MENUS,
    payload: menus,
  };
};

export const getUpdateMenuSuccess = (menuData) => {
  return {
    type: UPDATE_MENU,
    payload: menuData,
  };
};

export const getDeleteMenuSuccess = (menu) => {
  return {
    type: DELETE_MENU,
    payload: menu,
  };
};
