const express = require("express");
const allyController = require("../controllers/ally");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/allys" });
const api = express.Router();
// Ruta para crear una nueva categoría
api.post(
  "/new-ally",
  [md_auth.ensureAuth, md_upload],
  allyController.createAlly
);

// Ruta para obtener todas las categorías
api.get("/", allyController.getAllAllyes);

// Ruta para obtener una categoría específica por su ID
api.get("/:id", allyController.getAllyById);

// Ruta para actualizar una categoría por su ID
api.patch(
  "/:id",
  [md_auth.ensureAuth],
  allyController.updateAllyById
);

// Ruta para eliminar una categoría por su ID
api.delete(
  "/:id",
  md_auth.ensureAuth,
  allyController.deleteAllyById
);

module.exports = api;
