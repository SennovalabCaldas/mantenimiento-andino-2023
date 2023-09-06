const mongoose = require("mongoose");
const app = require("./app");
const { API_VERSION } = require("./constants");
const PORT = process.env.PUERTO || 3000;


console.log(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`);
mongoose
  .connect(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      // const address = server.address();
      // const port = address.port;
      // const serverAddress = address.address;
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://localhost:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
