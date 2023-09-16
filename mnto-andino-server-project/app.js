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
const categoryServiceRoutes = require("./routes/categoryService");
const serviceRoutes = require("./routes/service");
const clientRoutes = require("./routes/client");
const supplierRoutes = require("./routes/supplier");
const alliesRoutes = require("./routes/ally");
const certificationsRoutes = require("./routes/certification");
const projectRoutes = require("./routes/project");
const foundationRoutes = require("./routes/foundation");
const newsFoundationRoutes = require("./routes/newsFoundation");

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static folder
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));

// const corsOptions = {
//   origin: [
//     "https://mantenimientoandino.co",
//     "http://mantenimientoandino.co",
//     "https://mantenimientoandino.co:3000",
//     "http://mantenimientoandino.co:3000",
//   ],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type,Authorization",
//   exposedHeaders: "api/v1/admin",
// };

// app.use(cors(corsOptions));

// Definir rutas API con IP o dominio personalizado
app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/admin/users`, userRoutes);
app.use(`/api/v1/admin/addresses`, addressRoutes);
app.use(`/api/v1/admin/sedes`, sedeRoutes);
app.use(`/api/v1/admin/categories`, categoryRoutes);
app.use(`/api/v1/admin/posts`, postRoutes);
app.use(`/api/v1/admin/category-services`, categoryServiceRoutes);
app.use(`/api/v1/admin/services`, serviceRoutes);
app.use(`/api/v1/admin/clients`, clientRoutes);
app.use(`/api/v1/admin/suppliers`, supplierRoutes);
app.use(`/api/v1/admin/allies`, alliesRoutes);
app.use(`/api/v1/admin/certifications`, certificationsRoutes);
app.use(`/api/v1/admin/projects`, projectRoutes);
app.use(`/api/v1/admin/foundations`, foundationRoutes);
app.use(`/api/v1/admin/newsFoundation`, newsFoundationRoutes);

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

module.exports = { app, printRoutes };
