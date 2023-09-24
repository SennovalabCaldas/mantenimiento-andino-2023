import { ENV } from "../utils";
import { Auth } from "./auth";

const CERTIFICATION = ENV.API_ROUTES.CERTIFICATION;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Certification {
  baseApi = ENV.BASE_API;

  async createCertification(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return; // Aborta la función si la imagen no es válida
      }
      formData.append("certificationName", data.certificationName);
      formData.append("national", data.national);
      formData.append("joinDate", data.joinDate);

      console.log("Estos son los datos del proyecto", formData.get("avatar"));
      const url = `${this.baseApi}/${CERTIFICATION}/new-certification`;

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
