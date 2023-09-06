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

app.use((req, res, next) => {
  console.log("Hostname:", req.hostname);
  console.log("URL:", req.url);
  next(); // Llama a next() para continuar con el flujo de la solicitud
});

app.get("/", (req, res) => {
  res.send("Hola, mundo!");
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
      console.log(`Servidor Express en funcionamiento en el puerto 3000`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a la base de datos:", error);
  });
