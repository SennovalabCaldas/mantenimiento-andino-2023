const mongoose = require("mongoose");
const app = require("./app");
const {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  API_VERSION,
  DB_HOST,
} = require("./constants");
const PORT = process.env.is_prod ||'';
const IP_SERVER_O = process.env.is_prod_hostname || DB_HOST;
const HOST_INIT= process.env.is_host_prod || 'mongodb+srv://';

// console.log(
//   `${HOST_INIT}${DB_USER}:${DB_PASSWORD}@${IP_SERVER_O}${PORT}/${DB_NAME}`
// );
console.log(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`);
mongoose
  .connect(
    // `${HOST_INIT}${DB_USER}:${DB_PASSWORD}@${IP_SERVER_O}${PORT}/${DB_NAME}`,
    `mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER_O}:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
