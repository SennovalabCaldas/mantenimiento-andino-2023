import { ENV } from "../utils";

const { BASE_API } = ENV;
const ADDRESS = ENV.API_ROUTES.ADDRESS;

export class Address {
  async createAddress(data) {
    const url = `${BASE_API}/${ADDRESS}`;
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
      throw error;
    }
  }

  async getAddressAll() {
    const url = `${BASE_API}/${ADDRESS}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("get address all");
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getAddressById(_id) {
    const url = `${BASE_API}/${ADDRESS}/${_id}`;
    const params = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("get address by id", _id);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }


  async updateAddressById(_id, data) {
    console.log(data);
    console.log('Id update', _id);
    if (!_id || !data ) {
      throw new Error("El objeto 'direccion' o la propiedad '_id' no están definidos.");
    }

    const url = `${BASE_API}/${ADDRESS}/${_id}`;
    console.log(url);
    const params = {
      method: "PUT",
      body: JSON.stringify(data.direccion), // Utiliza data.direccion en lugar de data
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("update address by id", _id);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteAddressById(_id) {
    const url = `${BASE_API}/${ADDRESS}/${_id}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log("delete address by id", _id);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
