import { ENV } from "../utils";
import { Auth } from "./auth";
const POST_ROUTE = ENV.API_ROUTES.POST_ROUTE;
const CONTENT_TYPE_JSON = "application/json";
const authController = new Auth();

export class Post {
  baseApi = ENV.BASE_API;

  async getPosts() {
    const url = `${this.baseApi}/${POST_ROUTE}`;
      
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
  }

  async createPost(data) {
      
    const accessToken = authController.getAccessToken();
    
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar.image);
      formData.append("titulo", data.titulo);
      formData.append("subtitulo", data.subtitulo);
      formData.append("descripcion", data.descripcion);
      formData.append("categorias", data.categorias);
      formData.append("creador", data.creador);
      formData.append("active", data.active);
      formData.append("fecha_creacion", data.fecha_creacion);

      console.log("Estos son los datos del post", formData.get("avatar"));
      const url = `${this.baseApi}/${POST_ROUTE}/new-post`;
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

  async updatePost(_id, updatedData) {
      
    const accessToken = authController.getAccessToken();
    try {
      console.log(
        "Esta es la url",
        `${this.baseApi}/${POST_ROUTE}/${_id}`
      );
      const response = await fetch(
        `${this.baseApi}/${POST_ROUTE}/${_id}`,
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
      console.error("Error al actualizar el post:", error);
      throw error;
    }
  }

  async getPostsAssociatedWithCategory(categoryId) {
    const accessToken = authController.getAccessToken();
    try {
      const url = `${this.baseApi}/${POST_ROUTE}/category/${categoryId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updatePostState(_id, data) {
    const accessToken = authController.getAccessToken();
    try {
      const url = `${this.baseApi}/${POST_ROUTE}/edit-state/${_id}`;
        

      // Construir el objeto JSON con la propiedad 'mostrar'
      const requestBody = {
        mostrar: data, // Supongo que 'data' contiene el valor de mostrar
      };

      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json", // Establecer el tipo de contenido a JSON
        },
        body: JSON.stringify(requestBody), // Convertir el objeto en formato JSON
      };
        
      const response = await fetch(url, params);
        

      if (response.status === 200) {
        const result = await response.json();
        return result;
      } else {
        const errorResult = await response.text();
        console.error(errorResult);
        throw new Error("Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deletePost(id) {
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(
        `${this.baseApi}/${POST_ROUTE}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
        
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al eliminar la noticia:", error);
      throw error;
    }
  }

  async getPost(_id) {
      
    const accessToken = authController.getAccessToken();
    try {
      const response = await fetch(`${this.baseApi}/${POST_ROUTE}/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": CONTENT_TYPE_JSON,
          Authorization: `Bearer ${accessToken}`,
        },
      });
        
      const data = await response.json();
        
      return data;
    } catch (error) {
      console.error("Error al obtener la noticia:", error);
      throw error;
    }
  }
}
