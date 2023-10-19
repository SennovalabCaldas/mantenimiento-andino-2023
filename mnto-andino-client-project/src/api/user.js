import { ENV } from "../utils";
import { Auth } from "./auth";

const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class User {
  baseApi = ENV.BASE_API;


  isAuthenticated = () => {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }
    return true;
  };

  // getUser = async () => {
  //   const accessToken = this.getAccessToken();

  //   try {
  //     const url = `${this.baseApi}/${API_ROUTES.GET_USER}`;
  //     const params = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     };

  //     const response = await fetch(url, params);
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // updateUser = async (data) => {
  //   const accessToken = this.getAccessToken();

  //   try {
  //     const url = `${this.baseApi}/${API_ROUTES.UPDATE_ME}`;
  //     const params = {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     };

  //     const response = await fetch(url, params);
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // updatePassword = async (data) => {
  //   const accessToken = this.getAccessToken();

  //   try {
  //     const url = `${this.baseApi}/${API_ROUTES.UPDATE_ME}`;
  //     const params = {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     };

  //     const response = await fetch(url, params);
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // deleteUser = async (idUser) => {
  //   const accessToken = this.getAccessToken();
  //   try {
  //     const url = `${this.baseApi}/${API_ROUTES.USER}/${idUser}`;
  //     const params = {
  //       method: "DELETE",
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     };

  //     const response = await fetch(url, params);
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // getUsersByActiveStatus = async (active) => {
  //   const accessToken = this.getAccessToken();
  //   try {
  //     const response = await fetch(
  //       `${this.baseApi}/admin/users?active=${active}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     );
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // getUsers = async () => {
  //   const accessToken = this.getAccessToken();
  //   try {
  //     const response = await fetch(`${this.baseApi}/admin/users`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  // getUserById = async (idUser) => {
  //   const accessToken = this.getAccessToken();
  //   try {
  //     const response = await fetch(`${this.baseApi}/admin/users/${idUser}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });
  //     const result = await response.json();

  //     if (response.status !== 200) throw result;

  //     return result;
  //   } catch (error) {
  //     throw error;
  //   }
  // };


  async getMe() {
    const accessToken = authController.getAccessToken();
    try {
      const url = `${ENV.BASE_API}/admin/users/get-me`;
      const params = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateMe(userData) {
    const accessToken = authController.getAccessToken();
    try {
      const data = userData;
      if (!data.current_password) {
        delete data.current_password;
      }
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }
      const url = `${ENV.BASE_API}/admin/users/user/edit-profile`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };
      const response = await fetch(url, params);
      const result = await response.json();
      if (response.status !== 200) throw result;
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createUser(data) {
    const accessToken = authController.getAccessToken();
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${this.baseApi}/${ENV.API_ROUTES.USER}`;
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

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUser(_id) {
      
    const accessToken = authController.getAccessToken();
    console.log(accessToken);
    try {
      const response = await fetch(
        `${this.baseApi}/admin/users/get-user/${_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
        
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async updateUser(idUser, userData) {
    const accessToken = authController.getAccessToken();
    try {
      const data = userData;
      if (!data.current_password) {
        delete data.current_password;
      }

      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (data.fileAvatar) {
        formData.append("avatar", data.fileAvatar);
      }

      const url = `${ENV.BASE_API}/admin/users/user/${idUser}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
  async deleteUser(idUser) {
    const accessToken = authController.getAccessToken();
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.USER}/${idUser}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsersByActiveStatus(active) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/admin/users?active=${active}`,
        {
          method: "GET",
          headers: {
            "Content-Type": CONTENT_TYPE_JSON,
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(
          `Error al obtener usuarios ${
            active === "true" ? "activos" : "inactivos"
          }`
        );
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        `Error al obtener usuarios ${
          active === "true" ? "activos" : "inactivos"
        }:`,
        error
      );
      throw error;
    }
  }
}
