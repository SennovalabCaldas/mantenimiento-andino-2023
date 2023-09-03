import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
 
} from "./types";
import { Auth, User } from "../api";
import jwt from "jwt-decode";

const userController = new User();
const authController = new Auth();

export const loginUser = (data) => {
  return async (dispatch, getState) => {
    const currentState = getState();
    try {
      const response = await authController.login(data);
      const { user_id } = jwt(response.access);
      const user = await userController.getMe(response.access);
      dispatch(loginSuccess({ ...user, user_id }));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const authenticateUser = () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const userData = await userController.getMe(accessToken);
      dispatch(loginSuccess(userData));
    } catch (error) {
      dispatch(loginFailure(error.message)); // Despacha la acción de fallo de inicio de sesión con el mensaje de error
    }
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    try {
      // Realiza las tareas necesarias para cerrar sesión, como limpiar el token de acceso
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");

      // Despacha la acción de logout exitoso
      dispatch(logoutSuccess());
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante el proceso de logout
      dispatch(logoutFailure(error));
    }
  };
};

export const getMe = () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const user = await userController.getMe(accessToken);
      dispatch(loginSuccess(user));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

/* ############################################################### */
/* ############################################################### */


export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const logoutFailure = (error) => {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
};


