const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();

/* Cargar rutas */
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const sedeRoutes = require("./routes/sede");
const addressRoutes = require("./routes/address");
const categoryRoutes = require("./routes/category");
const postRoutes = require("./routes/post");
const serviceRoutes = require("./routes/service");
const clientRoutes = require("./routes/client");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// Configurar encabezados CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Cambia esto a tu URL de la aplicación cliente
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  ); // Agrega los métodos permitidos
  next();
});

app.use(`https://mantenimientoandino.co/api/v1/admin/auth`, authRoutes);
app.use(`https://mantenimientoandino.co/api/v1`, userRoutes);
app.use(`https://mantenimientoandino.co/api/v1/admin/addresses`, addressRoutes);
app.use(`https://mantenimientoandino.co/api/v1/admin/sedes`, sedeRoutes);
app.use(`https://mantenimientoandino.co/api/v1/admin/posts`, postRoutes);
app.use(`https://mantenimientoandino.co/api/v1/admin/categories`, categoryRoutes);
app.use(`https://mantenimientoandino.co/api/v1/admin/services`, serviceRoutes);
app.use(`https://mantenimientoandino.co/api/v1/admin/clients`, clientRoutes);

app.use((req, res, next) => {
  // Imprime la ruta total en la consola
  console.log(req.originalUrl);
  next();
  });
  
  

module.exports = app;
