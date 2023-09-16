import { ENV } from "../utils";
import { Auth } from "./auth";
import { Address } from "./address";

const SUPPLIER = ENV.API_ROUTES.SUPPLIER;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();
const addressController = new Address();

export class Supplier {
  baseApi = ENV.BASE_API;

  async createSupplier(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      if (data.avatar && data.avatar.image instanceof Blob) {
        formData.append("avatar", data.avatar.image);
      } else {
        console.error("Imagen de avatar no válida.");
        return; 
      }
      const addressResult = await addressController.createAddress(
        data.direccion
      );
      console.log(addressResult);
      formData.append("supplierName", data.clientName);
      formData.append("direccion", addressResult._id);
      formData.append("active", data.active);

      console.log("Estos son los datos del proveedor", formData.get("avatar"));
      const url = `${this.baseApi}/${SUPPLIER}/new-supplier`;
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

  async getSuppliers() {
    try {
      const response = await fetch(`${this.baseApi}/${SUPPLIER}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
        },
      });

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error al obtener los proveedores:", error);
      throw error;
    }
  }

  async getSupplier(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${SUPPLIER}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el proveedor:", error);
      throw error;
    }
  }

  async updateSupplier(_id, updatedData) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${SUPPLIER}/${_id}`,
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
      console.error("Error al actualizar el proveedor:", error);
      throw error;
    }
  }

  async deleteSupplier(_id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${SUPPLIER}/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(`${this.baseApi}/${SUPPLIER}/${_id}`);
      const data = await response.json();
      console.log("data", data);
      return data;
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
      throw error;
    }
  }
}
