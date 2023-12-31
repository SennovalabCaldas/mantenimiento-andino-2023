import { Auth } from "./auth";
import { ENV } from "../utils";

const SERVICE_ROUTE = ENV.API_ROUTES.SERVICE;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Service {
  baseApi = ENV.BASE_API;

  async createService(serviceData) {
    console.log("serviceData =>", serviceData);
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      Object.keys(serviceData).forEach((key) => {
        if (key === "photos") {
          serviceData[key].forEach((photo) => {
            formData.append("photos", photo);
          });
        } else {
          formData.append(key, serviceData[key]);
        }
      });

      const url = `${this.baseApi}/${ENV.API_ROUTES.SERVICE}/new-service`;
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
    const url = `${this.baseApi}/${SERVICE_ROUTE}`;
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

  async getService(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${SERVICE_ROUTE}/${_id}`, {
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

  async updateService(_id, updatedData) {
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

      const url = `${this.baseApi}/${SERVICE_ROUTE}/${_id}`;
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
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      throw error;
    }
  }

  async deleteService(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${SERVICE_ROUTE}/${_id}`, {
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
