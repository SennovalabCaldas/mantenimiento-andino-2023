// Importa los tipos de acción relacionados con el usuario
import {
  UPDATE_USER,
  SET_ALL_USERS,
  UPDATE_USER_SUCCESS,
  GET_USER
} from "./types";

// Importa los controladores de usuario y autenticación
import { Auth, User } from "../api";
import { loginSuccess } from "./authActions";
const userController = new User();
const authController = new Auth();


export const updateAdmin = (userData) => {
  console.log("entre al updateAdmin", userData);
  return async (dispatch, getState) => {
    try {
      const { avatar } = await userController.updateMe(userData);
      /* resultData es todo lo que habia en userData pero sin avatar */
      const { avatar: avatarTemp, ...resultData } = userData;
      /* ...(avatar && {avatar}) reemplaza avatar: avatar ? avatar : undefined*/
      /* los parentesis (avatar && {avatar}) son para retornar */
      dispatch(loginSuccess({ ...resultData, ...(avatar && {avatar}) }));
    } catch (error) {
      console.log("error", error);
    }
  };
};


export const getAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const users = await userController.getUsers();
      dispatch(setAllUsers(users));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getUser = (_id) =>{
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const user = await userController.getUser(_id);
      dispatch(getUserSuccess(user));
    } catch (error) {
      console.error(error);
    }
  };
}

export const updateUser = (_id) =>{
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const updateUser = await userController.updateUser(_id);
      dispatch(updateUserSussess(updateUser));
    } catch (error) {
      console.error(error);
    }
  };
}

/* ############################################################### */
/* ############################################################### */

export const updateAdminUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};

export const setAllUsers = (users) => {
  return {
    type: SET_ALL_USERS,
    payload: users,
  };
};

export const updateUserSussess =(updateUser)=>{
  return{
    type: UPDATE_USER_SUCCESS,
    payload: updateUser
  }
}

export const getUserSuccess = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};