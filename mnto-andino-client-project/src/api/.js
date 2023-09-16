import { useSelector } from "react-redux";
import { ENV } from "../utils";
import { Auth } from "./auth";
import { Address } from "./address";

const CLIENT_ROUTE = ENV.API_ROUTES.CLIENT;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();
const addressController = new Address();

export class Client {
  baseApi = ENV.BASE_API;

  async createClient(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();

      // Verifica si data.avatar.image es un Blob o File válido
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return; // Aborta la función si la imagen no es válida
      }

      // Llama a la función createAddress de la API de dirección
      const addressResult = await addressController.createAddress(
        data.direccion
      );

      console.log(addressResult);

      // Ahora puedes utilizar addressResult._id al crear el cliente
      formData.append("clientName", data.clientName);
      formData.append("direccion", addressResult._id);
      formData.append("active", data.active);
      formData.append("joinDate", data.joinDate);

      console.log("Estos son los datos del cliente", formData.get("avatar"));
      const url = `${this.baseApi}/admin/clients/new-client`;
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

  async getAddressByDireccion(direccion) {
    console.log(direccion);
    try {
      // Llama a la función getAddressAll de la API de dirección para obtener todas las direcciones
      const addresses = await addressController.getAddressAll();
      console.log(addresses);
      // Busca la dirección correspondiente en el array de direcciones
      const matchingAddress = addresses.find(
        (address) => address._id === direccion
      );
      console.log(matchingAddress);
      if (matchingAddress) {
        // Si se encuentra la dirección, devuelve la dirección completa
        console.log('Matching',matchingAddress);
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
