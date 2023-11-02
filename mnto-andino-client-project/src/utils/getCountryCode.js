const axios = require('axios');

const getCountryCode = async () => {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    const data = response.data;
  return data.country;
  } catch (error) {
    console.error('Error al obtener información de ubicación:', error);
   return 'CO';
  }
};

export default getCountryCode;
