// const express = require("express");
// const mongoose = require("mongoose");
// const { app, printRoutes } = require("./app"); // Importa la configuración de Express desde app.js
// let PORT = process.env.PUERTO || 3100;

// // Dirección de conexión a la base de datos remota
// const uri = "mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db";
// const client = new MongoClient(uri);

// const nuevoUsuario = "prueba2";
// const nuevaContraseña = "prueba2";
// const nombreBaseDatos = "mnto-andino-db";
// const nombreRol = "prueba2";

// async function crearRol() {
//   try {
//     await client.connect();

//     const adminDb = client.db("admin");

//     const crearRolCommand = {
//       createRole: nombreRol,
//       privileges: [
//         {
//           resource: { db: nombreBaseDatos, collection: "" },
//           actions: ["find", "insert", "update", "remove"],
//         },
//       ],
//       roles: [],
//       writeConcern: { w: "majority" },
//     };
//     const result = await adminDb.command(crearRolCommand);

//     // Crear un nuevo usuario con el rol recién creado
//     const usuariosDb = client.db(nombreBaseDatos);
//     await usuariosDb.createUser({
//       user: nuevoUsuario,
//       pwd: nuevaContraseña,
//       roles: [{ role: nombreRol, db: nombreBaseDatos }],
//     });

//     console.log(`Rol "${nombreRol}" creado exitosamente.`);
//     console.log(`Usuario "${nuevoUsuario}" creado con el rol "${nombreRol}".`);
//   } catch (error) {
//     console.error("Error al crear el rol:", error);
//   } finally {
//     await client.close();
//   }
// }

// async function conectarBaseDatosYLevantarServidor() {
//   try {
//     await mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("Conexión a la base de datos remota exitosa");
//     printRoutes(app._router.stack);
//     app.listen(PORT, () => {
//       console.log(`Servidor Express en funcionamiento en el puerto ${PORT}`);
//     });
//   } catch (error) {
//     console.error(
//       "Error conectando a la base de datos remota o levantando el servidor:",
//       error
//     );
//   }
// }
// crearRol();
// conectarBaseDatosYLevantarServidor();

const express = require("express");
const mongoose = require("mongoose");
const { app, printRoutes } = require("./app"); // Importa la configuración de Express desde app.js
let PORT = process.env.PUERTO || 3000;

// Dirección de conexión a la base de datos remota
const uri = "mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db";

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
