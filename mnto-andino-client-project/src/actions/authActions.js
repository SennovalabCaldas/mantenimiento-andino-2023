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
  console.log("authenticateUser");
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const userData = await userController.getMe(accessToken);
      log
      dispatch(loginSuccess(userData));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      await authController.logout(accessToken);
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
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
