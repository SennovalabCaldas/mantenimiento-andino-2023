// index.js
const express = require("express");
const mongoose = require("mongoose");
const { app, printRoutes } = require("./app");  // Importa la configuración de Express desde app.js
const PORT = process.env.PUERTO || 3000; 

// Conexión a la base de datos remota
const uri = "mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos remota exitosa");
    printRoutes(app._router.stack);
    app.listen(PORT, () => {
      console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos remota:", error);
  });
