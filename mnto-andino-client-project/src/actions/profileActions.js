// Importa los tipos de acción relacionados con la categoría
import {
  CREATE_PROFILE_SUCCESS,
  SET_ALL_PROFILES,
  GET_PROFILE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  DELETE_PROFILE_SUCCESS,
} from "./types";

// Importa el controlador de categoría
import { Profile } from "../api/profile";

const profileController = new Profile();

export const createProfile = (profileData) => {
  return async (dispatch, getState) => {
    try {
      const profile = await profileController.createProfile(profileData);
      dispatch(createProfileSuccess(profile));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllProfiles = () => {
  return async (dispatch, getState) => {
    try {
      const profiles = await profileController.getProfiles();
      dispatch(setAllProfiles(profiles));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getProfile = (_id) => {
  return async (dispatch, getState) => {
    try {
      const profile = await profileController.getProfile(_id);
      dispatch(getProfileSuccess(profile));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateProfile = (_id, updatedData) => {
  return async (dispatch, getState) => {
    try {
      const updatedProfile = await profileController.updateProfile(
        _id,
        updatedData
      );
      dispatch(updateProfileSuccess(updatedProfile));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteProfile = (_id) => {
  return async (dispatch, getState) => {
    try {
      const deletedProfile = await profileController.deleteProfile(_id);
      dispatch(deleteProfileSuccess(deletedProfile));
    } catch (error) {
      console.error(error);
    }
  };
};

// Acciones
const createProfileSuccess = (profile) => ({
  type: CREATE_PROFILE_SUCCESS,
  payload: profile,
});

const setAllProfiles = (profiles) => ({
  type: SET_ALL_PROFILES,
  payload: profiles,
});

const getProfileSuccess = (profile) => ({
  type: GET_PROFILE_SUCCESS,
  payload: profile,
});

const updateProfileSuccess = (profile) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: profile,
});

const deleteProfileSuccess = (profile) => ({
  type: DELETE_PROFILE_SUCCESS,
  payload: profile,
});
