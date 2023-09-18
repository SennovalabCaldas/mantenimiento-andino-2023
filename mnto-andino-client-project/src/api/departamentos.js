import axios from "axios";

class DepartamentosApi {
  // Variable estática para almacenar los departamentos en caché
  static departamentos = null;
  // Variable estática para almacenar los municipios en caché
  static municipios = {};

  async cargarDepartamentos() {
    try {
      if (DepartamentosApi.departamentos) {
        // Si los departamentos ya están en caché, devuélvelos directamente
        return DepartamentosApi.departamentos;
      } else {
        const response = await axios.get(
          "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        );
        const municipios = response.data.map(
          (municipio) => municipio.departamento
        );
        const departamentos = municipios.filter(
          (departamento, index) => municipios.indexOf(departamento) === index
        );
        DepartamentosApi.departamentos = departamentos; // Almacena los departamentos en caché
        return departamentos;
      }
    } catch (error) {
      console.error("Error al cargar los departamentos:", error);
      throw error;
    }
  }

  async cargarMunicipios(departamento) {
    try {
      if (DepartamentosApi.municipios[departamento]) {
        // Si los municipios del departamento ya están en caché, devuélvelos directamente
        return DepartamentosApi.municipios[departamento];
      } else {
        const response = await axios.get(
          `https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${departamento}`
        );
        const municipios = response.data.map(
          (municipio) => municipio.municipio
        );
        DepartamentosApi.municipios[departamento] = municipios; // Almacena los municipios en caché
        return municipios;
      }
    } catch (error) {
      console.error("Error al cargar los municipios:", error);
      throw error;
    }
  }

  async fetchCoordinates(address_dir) {
    try {
        
        

      const API_KEY = "AIzaSyBU_4Kck6p2b4Iri-bVSGznJqAWUHWWzUU";
      const encode_uri = encodeURIComponent(address_dir);
        
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encode_uri}&key=${API_KEY}`;
        
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encode_uri}&key=${API_KEY}`
      );

        
      if (response.data.results.length > 0) {
        const latitude = response.data.results[0].geometry.location.lat;
        const longitude = response.data.results[0].geometry.location.lng;
          
        return { latitude: latitude, longitude: longitude };
      } else {
        console.log(
          "No se encontraron coordenadas para la dirección proporcionada."
        );
      }
    } catch (error) {
        
      throw error;
    }
  }
}

export default DepartamentosApi;
