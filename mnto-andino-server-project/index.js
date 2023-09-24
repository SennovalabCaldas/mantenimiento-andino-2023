const mongoose = require("mongoose");
const { app } = require("./app");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require("./constants");
let PORT = 3300;

// Dirección de conexión a la base de datos remota
// let uri =
//   process.env.MONGODB_URI;
let uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
// let uri = `mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db`;

// Conexión a la base de datos
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mnto-andino-db",
  })
  .then(() => {
    console.log(`Conectado a la base de datos ${uri}`);
    // Imprime las rutas de la aplicación
    // printRoutes(app._router.stack);
    // Inicia el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));
