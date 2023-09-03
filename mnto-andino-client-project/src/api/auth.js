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
    console.log("Data de login", data);
    const url = `${this.baseApi}/${API_ROUTES.LOGIN}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(url, params);
      const result = await response.json();
      if (!response.ok) {
        if (result?.msg) {
          throw new Error(result.msg);
        } else {
          throw new Error("Error en la solicitud: " + response.status);
        }
      }
      this.setAccessToken(result.access);
      this.setRefreshToken(result.refresh);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  resetPassword = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.RESET_PASSWORD}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
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
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  passwordRecovery = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.PASSWORD_RECOVERY}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify(data),
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
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  refreshAccessToken = async (refreshToken) => {
    const url = `${this.baseApi}/${API_ROUTES.REFRESH_TOKEN}`;
    console.log(url);
    const params = {
      method: "POST",
      body: JSON.stringify({ token: refreshToken }),
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

  setAccessToken = (token) => {
    localStorage.setItem(ENV.JWT.ACCESS, token);
  };

  setRefreshToken = (token) => {
    localStorage.setItem(ENV.JWT.REFRESH, token);
  };

  getAccessToken = () => {
    return localStorage.getItem(ENV.JWT.ACCESS);
  };

  getRefreshToken = () => {
    return localStorage.getItem(ENV.JWT.REFRESH);
  };

  removeTokens = () => {
    localStorage.removeItem(ENV.JWT.ACCESS);
    localStorage.removeItem(ENV.JWT.REFRESH);
  };
}
