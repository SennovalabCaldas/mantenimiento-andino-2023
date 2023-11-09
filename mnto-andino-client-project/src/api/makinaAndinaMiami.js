import { Auth } from "./auth";
import { ENV } from "../utils";

const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();
const MAKINA_ANDINA_MIAMI = ENV.API_ROUTES.MAKINA_ANDINA_MIAMI;
export class MakinaAndinaMiami {
  baseApi = ENV.BASE_API;
  baseOutApi = ENV.BASE_PATH;

  async createMakinaAndinaMiamiService(makinaAndinaMiamiServiceData) {
    console.log("makinaAndinaMiamiServiceData", makinaAndinaMiamiServiceData);
    const accessToken = authController.getAccessToken();
    const formData = new FormData();
    try {
      const imagesArray = Array.isArray(makinaAndinaMiamiServiceData.photos)
        ? makinaAndinaMiamiServiceData.photos
        : [makinaAndinaMiamiServiceData.photos];

      imagesArray.forEach((photo) => {
        formData.append("photos", photo.image || photo);
      });
      Object.keys(makinaAndinaMiamiServiceData).forEach((key) => {
        if (key !== "photos") {
          formData.append(key, makinaAndinaMiamiServiceData[key]);
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
      console.log("result =>", result);
      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getServicesMiami() {
    const url = `${this.baseApi}/${MAKINA_ANDINA_MIAMI}`;
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
          (photo) => `${this.baseOutApi}/uploads/makinaAndinaMiami/${photo}`
        ),
      }));
      return servicesWithFullImageUrls;
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      throw error;
    }
  }

  async getMakinaAndinaServiceMiami(_id) {
    const url = `${this.baseApi}/${MAKINA_ANDINA_MIAMI}/${_id}`;
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
          (photo) => `${this.baseOutApi}/uploads/makinaAndinaMiami/${photo}`
        ),
      };
      return serviceWithFullImageUrls;
    } catch (error) {
      console.error("Error al obtener el servicio:", error);
      throw error;
    }
  }

  async deleteMakinaAndinaServiceMiami(_id) {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${MAKINA_ANDINA_MIAMI}/${_id}`;
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
