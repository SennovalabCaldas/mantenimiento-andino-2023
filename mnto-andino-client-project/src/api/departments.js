import { ENV } from "../utils";
import { Auth } from "./auth";

const { BASE_API } = ENV;
const DEPARTMENTS = ENV.API_ROUTES.DEPARTMENTS;
const authController = new Auth();

export class Departments {
  async createDepartments(departmentNames) {
    const accessToken = authController.getAccessToken();
    const url = `${BASE_API}/${DEPARTMENTS}/new-department`;
    console.log(departmentNames);
    const params = {
      method: "POST",
      body: JSON.stringify({ departmentNames }), // Enviar como objeto con la propiedad departmentNames
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(url, params);
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error de validación al crear departamento"
          );
        }

        throw new Error(
          result.message || "Error desconocido al crear departamento"
        );
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAllDepartments() {
    const accessToken = authController.getAccessToken();
    const url = `${BASE_API}/${DEPARTMENTS}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await fetch(url, params);
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error de validación al obtener departamentos"
          );
        }

        throw new Error(
          result.message || "Error desconocido al obtener departamentos"
        );
      }
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteDepartments(departmentIds) {
    const accessToken = authController.getAccessToken();
    const url = `${BASE_API}/${DEPARTMENTS}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ departmentIds }), // Enviar la lista de IDs en el cuerpo de la solicitud
    };
    console.log(departmentIds);
    try {
      const response = await fetch(url, params);

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Error de validación al eliminar departamentos"
          );
        }

        throw new Error("Error desconocido al eliminar departamentos");
      }

      return departmentIds; // Devuelve la lista de IDs de los departamentos eliminados
    } catch (error) {
      throw error;
    }
  }
}
