import { ENV } from "../utils";
import { Auth } from "./auth";

const ALLIES = ENV.API_ROUTES.ALLIE;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Ally {
  baseApi = ENV.BASE_API;

  async createAlly(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return; // Aborta la función si la imagen no es válida
      }
      formData.append("allyName", data.allyName);
      formData.append("active", data.active);

      console.log("Estos son los datos del aliado", formData.get("avatar"));
      const url = `${this.baseApi}/${ALLIES}/new-ally`;
      console.log(url);
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      console.log("Estos son los params", params);
      const response = await fetch(url, params);
      console.log(response);
      const result = await response.json();
      if (response.status !== 201) throw result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getAllies() {
    try {
      const response = await fetch(`${this.baseApi}/${ALLIES}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los aliados:", error);
      throw error;
    }
  }

  async getAlly(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${ALLIES}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el aliado:", error);
      throw error;
    }
  }

  async updateAlly(_id, updatedData) {
    console.log("id", _id);
    console.log("Estos son los datos del aliado", updatedData);
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${ALLIES}/${_id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar el aliado:", error);
      throw error;
    }
  }

  async deleteAlly(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${ALLIES}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`${this.baseApi}/${ALLIES}/${_id}`);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error al eliminar el aliado:", error);
      throw error;
    }
  }
}
