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
    const formData = new FormData();
    try {
      const imagesArray = Array.isArray(makinaAndinaServiceData.photos)
        ? makinaAndinaServiceData.photos
        : [makinaAndinaServiceData.photos];

      imagesArray.forEach((photo) => {
        formData.append("photos", photo.image || photo);
      });
      Object.keys(makinaAndinaServiceData).forEach((key) => {
        if (key !== "photos") {
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
      console.log("result =>", result);
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
        throw errorResponse;
      }
      const data = await response.json();
      const servicesWithFullImageUrls = data.map((service) => ({
        ...service,
        photos: service.photos.map(
          (photo) => `${this.baseOutApi}/uploads/makinaAndina/${photo}`
        ), // Agrega el origen del servidor
      }));
      return servicesWithFullImageUrls;
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      throw error;
    }
  }

  async getMakinaAndinaService(_id) {
    const url = `${this.baseApi}/${MAKINA_ANDINA}/${_id}`;
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
        throw errorResponse;
      }
      const result = await response.json();
      const serviceWithFullImageUrls = {
        ...result,
        photos: result.photos.map(
          (photo) => `${this.baseOutApi}/uploads/makinaAndina/${photo}`
        ), // Agrega el origen del servidor
      };
      return serviceWithFullImageUrls;
    } catch (error) {
      console.error("Error al obtener el servicio:", error);
      throw error;
    }
  }

  async deleteMakinaAndinaService(_id) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${MAKINA_ANDINA}/${_id}`;
    console.log("url", url);
    const params = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse;
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      throw error;
    }
  }
}
