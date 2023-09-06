// const express = require("express");
// const mongoose = require("mongoose");
// const app = express();
// const PORT = process.env.PUERTO || 3000; // Cambia 3000 a 443 para HTTPS

// // Middleware para verificar si la solicitud es HTTP o HTTPS
// app.use((req, res, next) => {
//   if (req.secure) {
//     next();
//   } else {
//     res.redirect(`https://72.167.135.41`);
//   }
// });

// console.log(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`);
// mongoose
//   .connect(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Conexión a la base de datos exitosa");

//     app.listen(PORT, () => {
//       console.log(`Servidor Express en funcionamiento en el puerto 3000`);
//     });
//   })
//   .catch((error) => {
//     console.error("Error conectando a la base de datos:", error);
//   });
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PUERTO || 3000; // Cambia 3000 a 443 para HTTPS

// Middleware para verificar si la solicitud es HTTP o HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
    res.redirect(`https://72.167.135.41`);
  }
});

// Conexión a la base de datos remota
const uri = "mongodb://prueba2:prueba2@72.167.135.41:27017/mnto-andino-db";
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos remota exitosa");

    app.listen(PORT, () => {
      console.log(`Servidor Express en funcionamiento en el puerto 3000`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos remota:", error);
  });
