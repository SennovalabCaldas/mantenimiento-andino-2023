import { ENV } from "../utils";
import { Auth } from "./auth";

const CATEGORY_ROUTE = ENV.API_ROUTES.CATEGORY_ROUTE;
const GET_CATEGORY_ROUTE = ENV.API_ROUTES.GET_CATEGORY;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Category {
  baseApi = ENV.BASE_API;

  async createCategory(data) {
    const url = `${this.baseApi}/${CATEGORY_ROUTE}/new-category`;
    const accessToken = authController.getAccessToken();
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();

      if (response.status !== 201) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${this.baseApi}/${CATEGORY_ROUTE}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      throw error;
    }
  }

  async getCategory(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${GET_CATEGORY_ROUTE}/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la categoría:", error);
      throw error;
    }
  }

  async updateCategory(_id, updatedData) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CATEGORY_ROUTE}/${_id}`, {
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
      console.error("Error al actualizar la categoría:", error);
      throw error;
    }
  }

  async updatePostsEstadoMostrar(_id, mostrar) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${CATEGORY_ROUTE}/update-posts-show/${_id}`,
        {
          // Cambia la URL de acuerdo a tu estructura de rutas
          method: "PATCH",
          body: JSON.stringify({ mostrar: mostrar }),
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.error(
        "Error al actualizar el estado mostrar de los posts:",
        error
      );
      throw error;
    }
  }

  async deleteCategory(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CATEGORY_ROUTE}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      throw error;
    }
  }
}
