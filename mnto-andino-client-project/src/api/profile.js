import { ENV } from "../utils";
import { Auth } from "./auth";

const PROFILE = ENV.API_ROUTES.PROFILE;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Profile {
  baseApi = ENV.BASE_API;

  async createProfile(data) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${PROFILE}/new-profile`;
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

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfiles() {
    try {
      const response = await fetch(`${this.baseApi}/${PROFILE}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al obtener los perfiles:", error);
      throw error;
    }
  }

  async getProfile(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${PROFILE}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      throw error;
    }
  }

  async updateProfile(_id, updatedData) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${PROFILE}/${_id}`;
    const params = {
      method: "PATCH",
      body: JSON.stringify(updatedData),
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

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteProfile(_id) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${PROFILE}/${_id}`;
    const params = {
      method: "DELETE",
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

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getProfileByUser(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${PROFILE}/user/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el perfil:", error);
      throw error;
    }
  }
}
