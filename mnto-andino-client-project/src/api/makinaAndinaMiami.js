import { Auth } from "./auth";
import { ENV } from "../utils";

const MAKINA_ANDINA_MIAMI = ENV.API_ROUTES.MAKINA_ANDINA_MIAMI;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class MakinaAndinaMiami {
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

      const url = `${this.baseApi}/${MAKINA_ANDINA_MIAMI}/new-post`;
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

  async getMakinaAndinaMiamiServices() {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${MAKINA_ANDINA_MIAMI}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      throw error;
    }
  }

  async getMakinaAndinaService(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${MAKINA_ANDINA_MIAMI}/${_id}`, {
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

      const url = `${this.baseApi}/${MAKINA_ANDINA_MIAMI}/${_id}`;
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
      const response = await fetch(`${this.baseApi}/${MAKINA_ANDINA_MIAMI}/${_id}`, {
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
