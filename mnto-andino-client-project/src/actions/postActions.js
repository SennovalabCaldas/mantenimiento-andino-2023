// Importa los tipos de acción relacionados con las publicaciones
import {
  CREATE_POST_SUCCESS,
  SET_ALL_POSTS,
  GET_POST_SUCCESS,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_STATE_SUCCESS,
  DELETE_POST_SUCCESS,
  
} from "./types";

// Importa el controlador de publicaciones (post)
import { Auth, Post } from "../api";

const postController = new Post();
const authController = new Auth();

export const createPost = (formData) => {
  console.log(formData);
  return async (dispatch, getState) => {
    try {
      const post = await postController.createPost(formData);
      dispatch(createPostSuccess(post));
    } catch (error) {
      console.error(error);
    }
  };
};


export const getAllPosts = () => {
  // console.log('Entre al getAllPosts de actions');
  return async (dispatch, getState) => {
    try {
      const posts = await postController.getPosts();
      // console.log('Posts consultados',posts);
      dispatch(setAllPosts(posts));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPost = (_id) => {
  console.log(_id);
  return async (dispatch, getState) => {
    try {
      const post = await postController.getPost(_id);
      dispatch(getPostSuccess(post));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePost = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedPost = await postController.updatePost(_id, updatedData);
      dispatch(updatePostSuccess(updatedPost));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updatePostState = (_id, mostrar) => {
  console.log("Datos del post a actualizar state:", _id, mostrar);
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const updatePost = await postController.updatePostState(_id, { mostrar });
      dispatch(updatePostStateSuccess(updatePost));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deletePost = (_id) => {
  return async (dispatch, getState) => {
    try {
      await postController.deletePost(_id);
      dispatch(deletePostSuccess(_id));
    } catch (error) {
      console.error(error);
    }
  };
};

/* Acciones */

export const createPostSuccess = (post) => {
  return {
    type: CREATE_POST_SUCCESS,
    payload: post,
  };
};

export const setAllPosts = (posts) => {
  // console.log('Se dispacho el SET_ALL_POSTS');
  // console.log(posts);
  return {
    type: SET_ALL_POSTS,
    payload: posts,
  };
};

export const getPostSuccess = (post) => {
  console.log("Datos del post consultado:", post);
  return {
    type: GET_POST_SUCCESS,
    payload: post,
  };
};

export const updatePostStateSuccess = (post) => {
  console.log("Datos del post actualizado state:", post);
  return {
    type: UPDATE_POST_STATE_SUCCESS, // Define este tipo de acción según tus necesidades
    payload: post,
  };
};

export const updatePostSuccess = (updatedData) => {
  return {
    type: UPDATE_POST_SUCCESS,
    payload: updatedData,
  };
};


export const deletePostSuccess = (_id) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: _id,
  };
};
