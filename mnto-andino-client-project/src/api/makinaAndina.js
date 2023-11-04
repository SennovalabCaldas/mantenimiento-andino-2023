import { Auth } from "./auth";
import { ENV } from "../utils";

const MAKINA_ANDINA = ENV.API_ROUTES.MAKINA_ANDINA;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class MakinaAndina {
  baseApi = ENV.BASE_API;
  baseOutApi = ENV.BASE_PATH;

  async createMakinaAndinaService(makinaAndinaServiceData) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      Object.keys(makinaAndinaServiceData).forEach((key) => {
        if (key === "photos") {
          makinaAndinaServiceData[key].forEach((photo) => {
            formData.append("photos", photo);
          });
        } else {
          formData.append(key, makinaAndinaServiceData[key]);
        }
      });

      const url = `${this.baseApi}/${MAKINA_ANDINA}/new-post`;
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

  async getServices() {
    const url = `${this.baseApi}/${MAKINA_ANDINA}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
    };
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(
          "Error al obtener los servicios: " + errorResponse.message
        );
      }

      const serviceData = await response.json();

      return serviceData;
    } catch (error) {
      throw error; // Re-lanzamos el error para manejarlo en un nivel superior
    }
  }
  async getMakinaAndinaService(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${MAKINA_ANDINA}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el servicio:", error);
      throw error;
    }
  }

  async updateMakinaAndinaService(_id, updatedData) {
    console.log("updatedData", updatedData);
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      Object.keys(updatedData).forEach((key) => {
        if (key === "photos") {
          updatedData[key].forEach((photo) => {
            formData.append("photos", photo);
          });
        } else {
          formData.append(key, updatedData[key]);
        }
      });

      const url = `${this.baseApi}/${MAKINA_ANDINA}/${_id}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      console.log("url", url);
      console.log("params", params);
      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      // Actualizar la URL completa de las imágenes en la respuesta
      const updatedServiceWithFullImageUrls = {
        ...result,
        photos: result.photos.map((photo) => `${this.baseOutApi}/${photo}`), // Agrega el origen del servidor
      };

      return updatedServiceWithFullImageUrls;
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      throw error;
    }
  }

  async deleteMakinaAndinaService(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${MAKINA_ANDINA}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      throw error;
    }
  }
}
