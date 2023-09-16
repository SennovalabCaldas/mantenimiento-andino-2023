const express = require("express");
const ClientController = require("../controllers/client");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/clients" });
const api = express.Router();
// Ruta para crear una nueva categoría
api.post(
  "/new-client",
  [md_auth.ensureAuth, md_upload],
  ClientController.createClient
);

// Ruta para obtener todas las categorías
api.get("/", ClientController.getAllClients);

// Ruta para obtener una categoría específica por su ID
api.get("/:id", ClientController.getClientById);

// Ruta para actualizar una categoría por su ID
api.patch(
  "/:id",
  [md_auth.ensureAuth],
  ClientController.updateClientById
);

// Ruta para eliminar una categoría por su ID
api.delete(
  "/:id",
  md_auth.ensureAuth,
  ClientController.deleteClientById
);

module.exports = api;
