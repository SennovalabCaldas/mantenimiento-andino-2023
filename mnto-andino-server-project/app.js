// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
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
app.use(cors()); // Esto permitirá solicitudes desde cualquier origen, puedes ajustarlo según tus necesidades

// Definir rutas API con IP o dominio personalizado
app.use(`ns1.mantenimientoandino.co/api/v1/admin/auth`, authRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1`, userRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1/admin/addresses`, addressRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1/admin/sedes`, sedeRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1/admin/posts`, postRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1/admin/categories`, categoryRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1/admin/services`, serviceRoutes);
app.use(`ns1.mantenimientoandino.co/api/v1/admin/clients`, clientRoutes);

function printRoutes(stack, parentPath = "") {
  stack.forEach((layer) => {
    if (layer.route) {
      // Si es una ruta, imprime su método y ruta
      console.log(
        `Ruta: [${layer.route.stack[0].method}] ${parentPath}${layer.route.path}`
      );
    } else if (layer.name === "router" && layer.handle.stack) {
      // Si es un enrutador anidado, llama a la función recursivamente
      printRoutes(layer.handle.stack, `${parentPath}${layer.regexp.source}`);
    }
  });
}

module.exports = app;
