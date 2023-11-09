import { ENV } from "../utils";
import { Auth } from "./auth";

const CERTIFICATION = ENV.API_ROUTES.CERTIFICATION;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Certification {
  baseApi = ENV.BASE_API;
  async createCertification(data) {
    console.log("data", data);
    const accessToken = authController.getAccessToken();
    const formData = new FormData();

    try {
      // Asegúrate de que 'photos' sea siempre un array
      const photosArray = Array.isArray(data.photos)
        ? data.photos
        : [data.photos];

      photosArray.forEach((photo) => {
        formData.append("photos", photo.image || photo);
      });
      Object.keys(data).forEach((key) => {
        if (key !== "photos") {
          formData.append(key, data[key]);
        }
      }
      );

      const url = `${this.baseApi}/${CERTIFICATION}/new-certification`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);

      if (response.status !== 201) {
        const errorData = await response.json();
        console.error("Error al crear la certificación:", errorData);
        throw new Error("Error al crear la certificación");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al crear la certificación:", error);
      throw error;
    }
  }

  async getCertifications() {
    const url = `${this.baseApi}/${CERTIFICATION}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": CONTENT_TYPE_JSON,
      },
    };
    try {
      const response = await fetch(url, params);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener las certificaciones:", error);
      throw error;
    }
  }

  async getCertification(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CERTIFICATION}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la certificación:", error);
      throw error;
    }
  }

  async updateCertification(_id, updatedData) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CERTIFICATION}/${_id}`, {
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
      console.error("Error al actualizar la certificación:", error);
      throw error;
    }
  }

  async deleteCertification(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CERTIFICATION}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar la certificación:", error);
      throw error;
    }
  }
}
