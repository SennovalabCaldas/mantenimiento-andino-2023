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
    const url = `${this.baseApi}/${API_ROUTES.SEDE}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(params);
    //console.log(`Creando sede ${data}`);
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
    console.log(url);
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      console.log(response);
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
    console.log(url);
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  filterSedesPerMunicipio = async (parametro) => {
    console.log("Filtrando por municipio");
    /* http://localhost:3200/api/v1/sedes/municipio?municipio= */
    const url = `${this.baseApi}/${API_ROUTES.SEDESPERDPTO}${parametro}`;
    console.log(url);
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
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  searchSedes = async (nombre, departamento, municipio) => {
    const url = `${this.baseApi}/${API_ROUTES.SEARCH_SEDES}?nombre=${nombre}&departamento=${departamento}&municipio=${municipio}`;
    console.log(url);
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
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  updateSede = async (_id, data) => {
    console.log("Entre en updateSede");
    const accessToken = authController.getAccessToken();
    const direccion = data.direccion;
    const id_direccion = data.direccion._id;
    console.log("id_direccion de sede.js", _id);
    const url = `${this.baseApi}/${API_ROUTES.SEDES}/${_id}`;
    try {
      const updatedAddress = await addressController.updateAddressById(
        id_direccion,
        direccion
      );
      console.log(url);
      const params = {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${accessToken}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      console.log("Response", response);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  deleteSede = async (idSede) => {
    console.log(
      "Entre en deleteSede",
      `${this.baseApi}/${ENV.API_ROUTES.SEDES}/${idSede}`
    );
    try {
      const response = await fetch(
        `${this.baseApi}/${ENV.API_ROUTES.SEDES}/${idSede}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar la sede:", error);
      throw error;
    }
  };
}
