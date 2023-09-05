const mongoose = require("mongoose");
const app = require("./app");
const { API_VERSION, DB_HOST } = require("./constants");
const IP_SERVER_O = process.env.is_prod_hostname || DB_HOST;

// console.log(
//   `${HOST_INIT}${DB_USER}:${DB_PASSWORD}@${IP_SERVER_O}${PORT}/${DB_NAME}`
// );
console.log(`mongodb://prueba2:prueba2@localhost:27017/mnto-andino-db`);
mongoose
  .connect(`mongodb://prueba2:prueba2@localhost:27017/mnto-andino-db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    const server = app.listen(() => {
      const address = server.address();
      const port = address.port;
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER_O}:${port}/api/${API_VERSION}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
