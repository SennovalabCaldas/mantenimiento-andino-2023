const mongoose = require("mongoose");
const app = require("./app");
const { API_VERSION, DB_HOST } = require("./constants");

// console.log(
//   `${HOST_INIT}${DB_USER}:${DB_PASSWORD}@${IP_SERVER_O}${PORT}/${DB_NAME}`
// );
console.log(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`);
mongoose
  .connect(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    const server = app.listen(() => {
      const address = server.address();
      const port = address.port;
      const serverAddress = address.address;
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`${serverAddress}:${port}/api/${API_VERSION}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
