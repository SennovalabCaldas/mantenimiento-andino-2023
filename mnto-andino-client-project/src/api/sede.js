import { ENV } from "../utils";
import { Address } from "./address";
import { Auth } from "./auth";

const { BASE_API, API_ROUTES } = ENV;
const authController = new Auth();
const addressController = new Address();

export class Sede {
  baseApi = BASE_API;

  createSede = async (data) => {
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/admin/sedes/new-sede`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    //
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getAllSedes = async () => {
    const url = `${this.baseApi}/admin/sedes`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, params);

      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  getSede = async (_id) => {
    const url = `${this.baseApi}/${API_ROUTES.SEDES}/${_id}`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  filterSedesPerMunicipio = async (parametro) => {
    /* http://localhost:3200/api/v1/sedes/municipio?municipio= */
    const url = `${this.baseApi}/${API_ROUTES.SEDESPERDPTO}${parametro}`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  searchSedes = async (nombre, departamento, municipio) => {
    const url = `${this.baseApi}/${API_ROUTES.SEARCH_SEDES}?nombre=${nombre}&departamento=${departamento}&municipio=${municipio}`;

    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  updateSede = async (_id, data) => {
    console.log(data);
    const accessToken = authController.getAccessToken();
    const url = `${this.baseApi}/${API_ROUTES.SEDES}/${_id}`;
    const params = {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  deleteSede = async (idSede) => {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${ENV.API_ROUTES.SEDES}/${idSede}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
      throw error;
    }
  };
}
