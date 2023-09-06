import { ENV } from "../utils";
import { Auth } from "./auth";

const UPDATE_ME_ROUTE = ENV.API_ROUTES.UPDATE_ME;
const USER_ROUTE = ENV.API_ROUTES.USER;
const GET_USER_ROUTE = ENV.API_ROUTES.GET_USER;
const USERS_ROUTE = ENV.API_ROUTES.USERS;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class User {
  baseApi = ENV.BASE_API;

  async getMe() {
    const accessToken = authController.getAccessToken();
    if (!accessToken) {
      throw new Error("Usuario no ha iniciado sesión"); // Lanza un error si no hay token de acceso
    }
    try {
      const response = await fetch(`${this.baseApi}/admin/users/get-me`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateMe(userData) {
    const accessToken = authController.getAccessToken();
    try {
      const data = userData;
      if (!data.current_password) {
        delete data.current_password;
      }
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }
      const url = `${ENV.BASE_API}/admin/users/user/edit-profile`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUser(_id) {
    console.log('Entre en getUser de api ', _id);
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/admin/users/get-user/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('response getUser',response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async updateUser(idUser, userData) {
    const accessToken = authController.getAccessToken();
    try {
      const data = userData;
      if (!data.current_password) {
        delete data.current_password;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${ENV.BASE_API}/admin/users/user/${idUser}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(idUser) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/admin/users/get-user/${idUser}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }

  async getUsers(active = undefined) {
    const accessToken = authController.getAccessToken();
    try {
      let url = `${this.baseApi}/${USERS_ROUTE}`;
      if (active !== undefined) {
        url += `?active=${active}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
