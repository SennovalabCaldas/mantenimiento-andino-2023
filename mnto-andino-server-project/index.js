const express = require("express");
const mongoose = require("mongoose");
const { app, printRoutes } = require("./app"); // Importa la configuración de Express desde app.js
let PORT = process.env.PUERTO || 3000;

// Dirección de conexión a la base de datos remota
const uri = "mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db";
// const users = UserController.getUsers();

// Función para buscar un puerto disponible
const encontrarPuertoDisponible = (puerto, maxIntentos) => {
  return new Promise((resolve, reject) => {
    let intentos = 0;

    const intentarPuerto = () => {
      const servidor = app.listen(puerto, () => {
        servidor.close(() => {
          resolve(puerto);
        });
      });

      servidor.on("error", (error) => {
        servidor.close(() => {
          intentos++;
          if (intentos >= maxIntentos) {
            reject("No se encontró un puerto disponible");
          } else {
            intentarPuerto();
          }
        });
      });
    };

    intentarPuerto();
  });
};

// Uso de la función para encontrar un puerto disponible
encontrarPuertoDisponible(PORT, 10)
  .then((puertoDisponible) => {
    PORT = puertoDisponible;
    console.log(`Usando el puerto ${PORT}`);
    mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Conexión a la base de datos remota exitosa");
        printRoutes(app._router.stack);
        app.listen(PORT, () => {
          console.log(
            `Servidor Express en funcionamiento en el puerto ${PORT}`
          );
        });
      })
      .catch((error) => {
        console.error("Error conectando a la base de datos remota:", error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
