const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { API_VERSION } = require("./constants");
const PORT = process.env.PUERTO || 3000;

// Middleware para verificar si la solicitud es HTTP o HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    // La solicitud es HTTPS
    next();
  } else {
    // La solicitud es HTTP, redirige a HTTPS
    res.redirect(`https://${req.hostname}${req.url}`);
  }
});

console.log(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`);
mongoose
  .connect(`mongodb://prueba2:prueba2@0.0.0.0:27017/mnto-andino-db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexión a la base de datos exitosa");

    app.listen(PORT, () => {
      console.log("######################");
      console.log("###### API REST ######");
      console.log("######################");
      console.log(`http://localhost:${PORT}/api/${API_VERSION}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
