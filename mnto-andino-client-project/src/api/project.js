import { ENV } from "../utils";
import { Auth } from "./auth";

const PROJECTS = ENV.API_ROUTES.PROJECTS;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Project {
  baseApi = ENV.BASE_API;

  async createProject(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return; // Aborta la función si la imagen no es válida
      }
      formData.append("projectName", data.projectName);
      formData.append("entity", data.entity);
      formData.append("national", data.national);
      formData.append("client", data.client);
      formData.append("joinDate", data.joinDate);

      console.log("Estos son los datos del proyecto", formData.get("avatar"));
      const url = `${this.baseApi}/${PROJECTS}/new-project`;
      console.log(url);
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      console.log("Estos son los params", params);
      const response = await fetch(url, params);
      console.log(response);
      const result = await response.json();
      if (response.status !== 201) throw result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getProjects() {
    try {
      const response = await fetch(`${this.baseApi}/${PROJECTS}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });
console.log(response);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los proyectos:", error);
      throw error;
    }
  }

  async getProject(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${PROJECTS}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el proyecto:", error);
      throw error;
    }
  }

  async updateProject(_id, updatedData) {
    console.log("id", _id);
    console.log("Estos son los datos del proyecto", updatedData);
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${PROJECTS}/${_id}`, {
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
      console.error("Error al actualizar el proyecto:", error);
      throw error;
    }
  }

  async deleteProject(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${PROJECTS}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(`${this.baseApi}/${PROJECTS}/${_id}`);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error al eliminar el proyecto:", error);
      throw error;
    }
  }
}
