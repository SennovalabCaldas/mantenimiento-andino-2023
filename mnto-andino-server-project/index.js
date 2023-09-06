const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PUERTO || 3000; // Cambia 3000 a 443 para HTTPS


// Middleware para verificar si la solicitud es HTTP o HTTPS
app.use((req, res, next) => {
  if (req.secure) {
    next();
  } else {
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
      console.log(`https://${req.hostname}${req.url}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
