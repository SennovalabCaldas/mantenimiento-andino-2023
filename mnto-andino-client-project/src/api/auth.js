import { ENV } from "../utils";

const { BASE_API, API_ROUTES } = ENV;
export class Auth {
  baseApi = BASE_API;

  register = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.REGISTER}`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
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

  login = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.LOGIN}`;
    const params = {
      method: "POST",
      body: JSON.stringify(data),
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
      if (result && result.access) {
        this.setAccessToken(result.access);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  logout = async() => {
    localStorage.clear();
    // this.props.history.push("/");
  };

  resetPassword = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.RESET_PASSWORD}`;

    const params = {
      method: "POST",
      body: JSON.stringify(data),
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

  passwordRecovery = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.PASSWORD_RECOVERY}`;

    const params = {
      method: "POST",
      body: JSON.stringify(data),
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

  refreshAccessToken = async (refreshToken) => {
    const url = `${this.baseApi}/${API_ROUTES.REFRESH_TOKEN}`;

    const params = {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
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

      // Verificar si se recibió un nuevo token de acceso en la respuesta
      if (result && result.accessToken) {
        // Actualizar el token de acceso en el almacenamiento local
        this.setAccessToken(result.accessToken);
      }

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  setAccessToken = (accessToken) => {
    localStorage.setItem("access", accessToken);
  };

  getAccessToken = () => {
    return localStorage.getItem("access");
  };

  setRefreshToken = (refreshToken) => {
    localStorage.setItem("refresh", refreshToken);
  };

  getRefreshToken = () => {
    return localStorage.getItem("refresh");
  };
}
