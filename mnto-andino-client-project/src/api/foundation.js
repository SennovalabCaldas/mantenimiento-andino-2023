import { ENV } from "../utils";
import { Auth } from "./auth";
import { Service } from "./service";

const FOUNDATION = ENV.API_ROUTES.FOUNDATION;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Foundation {
  baseApi = ENV.BASE_API;

  async createFoundation(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return; // Aborta la función si la imagen no es válida
      }
      formData.append("foundationName", data.foundationName);
      formData.append("active", data.active);

      console.log("Estos son los datos de la fundación", formData.get("avatar"));
      const url = `${this.baseApi}/${FOUNDATION}/new-foundation`;
        
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

  async getFoundations() {
    try {
      const response = await fetch(`${this.baseApi}/${FOUNDATION}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });

      const data = await response.json();
        
      return data;
    } catch (error) {
      console.error("Error al obtener las fundaciones:", error);
      throw error;
    }
  }

  async getFoundation(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${FOUNDATION}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener la fundación:", error);
      throw error;
    }
  }

  async updateFoundaion(_id, updatedData) {
      
      
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${FOUNDATION}/${_id}`, {
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
      console.error("Error al actualizar la fundaciń:", error);
      throw error;
    }
  }

  async deleteFoundation(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${FOUNDATION}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
        
      const data = await response.json();
        
      return data;
    } catch (error) {
      console.error("Error al eliminar la fundación:", error);
      throw error;
    }
  }
}
