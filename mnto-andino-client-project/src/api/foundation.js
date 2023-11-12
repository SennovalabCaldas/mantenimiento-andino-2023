import { ENV } from "../utils";
import { Auth } from "./auth";

const FOUNDATION = ENV.API_ROUTES.FOUNDATION;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Foundation {
  baseApi = ENV.BASE_API;

  async createFoundation(data) {
    console.log("data =>", data);
    const accessToken = authController.getAccessToken();
    const formData = new FormData();
    try {
      const imagesArray = Array.isArray(data.images)
        ? data.images
        : [data.images];

      imagesArray.forEach((photo) => {
        formData.append("images", photo.image || photo);
      });
      Object.keys(data).forEach((key) => {
        if (key !== "images") {
          formData.append(key, data[key]);
        }
      });

      const url = `${this.baseApi}/${FOUNDATION}/new-fundation`;
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

  async getAllFoundations() {
    const url = `${this.baseApi}/${FOUNDATION}`;
    console.log("url =>", url);
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
          "Error al obtener las fundaciones: " + errorResponse.message
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getFoundationById(foundationId) {
    const url = `${this.baseApi}/${FOUNDATION}/${foundationId}`;
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
          "Error al obtener la fundación: " + errorResponse.message
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteFoundation(foundationId) {
    const accessToken = authController.getAccessToken();
    try {
      const url = `${this.baseApi}/${FOUNDATION}/${foundationId}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      if (response.status !== 200) {
        const errorResponse = await response.json();
        throw new Error(
          "Error al eliminar la fundación: " + errorResponse.message
        );
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
