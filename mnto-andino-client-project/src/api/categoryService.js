import { ENV } from "../utils";
import { Auth } from "./auth";

const CATEGORY_ROUTE = ENV.API_ROUTES.CATEGORY_SERVICE;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class CategoryService {
  baseApi = ENV.BASE_API;

  async createCategoryService(data) {
    const url = `${this.baseApi}/${CATEGORY_ROUTE}/new-category`;
    const accessToken = authController.getAccessToken();

    const formData = new FormData();
    if (data.avatar && data.avatar.image instanceof Blob) {
      formData.append("avatar", data.avatar.image);
    } else {
      console.error("Imagen de avatar no válida.");
      return; // Aborta la función si la imagen no es válida
    }
    formData.append("nameCategoryService", data.nameCategoryService);
    formData.append("active", data.active);
    console.log("Estos son los datos de la categoría", formData.get("avatar"));
    const params = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
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
      const response = await fetch(`${this.baseApi}/${CATEGORY_ROUTE}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
