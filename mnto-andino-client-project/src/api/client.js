import { useSelector } from "react-redux";
import { ENV } from "../utils";
import { Auth } from "./auth";

const CLIENT_ROUTE = ENV.API_ROUTES.CLIENT;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Client {
  baseApi = ENV.BASE_API;

  async createClient(data) {
    const url = `${this.baseApi}/${CLIENT_ROUTE}/new-client`;
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

  async getClients() {
    try {
      const response = await fetch(`${this.baseApi}/${CLIENT_ROUTE}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los clientes:", error);
      throw error;
    }
  }

  async getClient(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CLIENT_ROUTE}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el cliente:", error);
      throw error;
    }
  }

  async updateClient(_id, updatedData) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${CLIENT_ROUTE}/edit/${_id}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedData),
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al actualizar el cliente:", error);
      throw error;
    }
  }

  async deleteClient(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${CLIENT_ROUTE}/delete/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(`${this.baseApi}/${CLIENT_ROUTE}/delete/${_id}`);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      throw error;
    }
  }
}
