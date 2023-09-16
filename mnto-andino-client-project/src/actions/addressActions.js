import {
  CREATE_ADDRESS,
  GET_ALL_ADDRESSES,
  GET_ADDRESS,
} from "./types";

import { Auth, Address } from "../api";

const authController = new Auth();
const addressController = new Address();

export const createAddress = (addressData) => {
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const address = await addressController.createAddress(addressData);
      console.log("Dirección creada >>>>>>>>>>", address);
      dispatch(createAddressSuccess(address));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllAddress = () => {
  return async (dispatch, getState) => {
    try {
      console.log("Entre al getAlladdresss del actions");
      const addresses = await addressController.getAllAddress();
      console.log("addresses del actions >", addresses);
      dispatch(setAllAddresses(addresses));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAddress = (_id) => {
  console.log(_id);
  return async (dispatch, getState) => {
    try {
      const accessToken = authController.getAccessToken();
      const address = await addressController.getAddressById(_id);
      console.log("address >>>>>>>>>>", address);
      dispatch(getAddressSuccess(address));
    } catch (error) {
      console.error(error);
    }
  };
};
/* ############################################################### */
/* ############################################################### */

export const createAddressSuccess = (addressData) => {
  return {
    type: CREATE_ADDRESS,
    payload: addressData,
  };
};

export const setAllAddresses = (addresses) => {
  return {
    type: GET_ALL_ADDRESSES,
    payload: addresses,
  };
};

export const getAddressSuccess = (address) => {
  return {
    type: GET_ADDRESS,
    payload: address,
  };
};
