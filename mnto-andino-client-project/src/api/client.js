import { ENV } from "../utils";
import { Auth } from "./auth";
import { Address } from "./address";

const CLIENT_ROUTE = ENV.API_ROUTES.CLIENT;
const CLIENTS_ROUTE = ENV.API_ROUTES.CLIENTS;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();
const addressController = new Address();

export class Client {
  baseApi = ENV.BASE_API;

  async createClient(data) {
    const url = `${this.baseApi}/${CLIENTS_ROUTE}/new-client`;
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      formData.append("clientName", data.clientName);
      formData.append("active", data.active);
      formData.append("national", data.national);
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return;
      }
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

  async getClients() {
    const url = `${this.baseApi}/${CLIENTS_ROUTE}`;
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
      console.error("Error al obtener los aliados:", error);
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

  async getAddressByDireccion(direccion) {
    try {
      const addresses = await addressController.getAddressAll();

      // Busca la dirección correspondiente en el array de direcciones
      const matchingAddress = addresses.find(
        (address) => address._id === direccion
      );

      if (matchingAddress) {
        // Si se encuentra la dirección, devuelve la dirección completa

        return matchingAddress;
      } else {
        // Si no se encuentra la dirección, devuelve un mensaje de error o null
        console.error("La dirección no se encontró:", direccion);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      throw error;
    }
  }

  async updateClient(_id, updatedData) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CLIENTS_ROUTE}/${_id}`, {
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
      console.error("Error al actualizar el cliente:", error);
      throw error;
    }
  }

  async deleteClient(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${CLIENTS_ROUTE}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      throw error;
    }
  }
}
