import { ENV } from "../utils";
import { Auth } from "./auth";

const TESTIMONIES_ROUTE = ENV.API_ROUTES.TESTIMONIE;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Testimonies {
  baseApi = ENV.BASE_API;

  async createTestimonie(data) {
    const url = `${this.baseApi}/${TESTIMONIES_ROUTE}/new-testimonie`;
    console.log("URL:", url);
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      formData.append("client", data.client);
      formData.append("role", data.role);
      formData.append("comment", data.comment);
      formData.append("evaluation", data.evaluation);
      formData.append("active", data.active);
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return;
      }

      console.log("Form data:", formData);
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTestimonieById(id) {
    const url = `${this.baseApi}/${TESTIMONIES_ROUTE}/${id}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
    };
    try {
      const response = await fetch(url, params);
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error al obtener el testimonio:", error);
      throw error;
    }
  }

  async getTestimonies() {
    const url = `${this.baseApi}/${TESTIMONIES_ROUTE}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
    };
    try {
      const response = await fetch(url, params);
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error al obtener los testimonios:", error);
      throw error;
    }
  }

  async updateTestimonie(_id, testimonieData) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${TESTIMONIES_ROUTE}/${_id}`, {
        method: "PATCH",
        body: JSON.stringify(testimonieData),
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw error;
    }
  }


  async deleteTestimonie(id) {
    const url = `${this.baseApi}/${TESTIMONIES_ROUTE}/${id}`;
    const accessToken = authController.getAccessToken();
    try {
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
