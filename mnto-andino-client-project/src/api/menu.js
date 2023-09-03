import axios from "axios";
import { ENV } from "../utils";
import { Auth } from "./auth";

const MENU = ENV.API_ROUTES.MENU;
const authController = new Auth();

export class Menu {
  baseApi = ENV.BASE_API;

  async createMenu(data) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${MENU}/menu`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllMenus(active = undefined) {
    console.log(this.baseApi);
    try {
      let url = `${this.baseApi}/${MENU}`;
      if (active !== undefined) {
        url += `?active=${active}`;
      }
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateMenuById(_id, data) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${MENU}/menu/${_id}`;
    console.log(url);
    const params = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteMenuById(_id) {
    const url = `${this.baseApi}/${MENU}/${_id}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("delete address by id", _id);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
