const express = require("express");
const mongoose = require("mongoose");
const { app, printRoutes } = require("./app"); // Importa la configuración de Express desde app.js
let PORT = process.env.PUERTO || 3000;

// Dirección de conexión a la base de datos remota
const uri = "mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db";

// Conexión a la base de datos
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "mnto-andino-db",
  })
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito...");

    // Imprime las rutas de la aplicación
    printRoutes(app._router.stack);

    // Inicia el servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}...`);
    });
  })
  .catch((err) => console.log(err));