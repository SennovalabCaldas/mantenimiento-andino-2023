const mongoose = require("mongoose");
const { app } = require("./app");
require('dotenv').config()
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  API_VERSION,
  IP_SERVER,
} = require("./constants");


let PORT = process.env.NODE_ENV === "production" ? 3000: 3500;
let uri = process.env.NODE_ENV === "production"
? `mongodb://${DB_USER}:${DB_PASSWORD}@72.167.135.41:27017/mnto-andino-db`
: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

console.log('uri :>> ', uri);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mnto-andino-db",
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`);

    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
