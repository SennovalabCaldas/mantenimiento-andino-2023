const express = require("express");
const SupplierController = require("../controllers/supplier");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/suppliers" });
const api = express.Router();
// Ruta para crear una nueva categoría
api.post(
  "/new-supplier",
  [md_auth.ensureAuth, md_upload],
  SupplierController.createSupplier
);

// Ruta para obtener todas las categorías
api.get("/", SupplierController.getAllSuppliers);

// Ruta para obtener una categoría específica por su ID
api.get("/:idSupplier", SupplierController.getSupplierById);

// Ruta para actualizar una categoría por su ID
api.patch(
  "/:id",
  [md_auth.ensureAuth],
  SupplierController.updateSupplierById
);

// Ruta para eliminar una categoría por su ID
api.delete(
  "/:id",
  md_auth.ensureAuth,
  SupplierController.deleteSupplierById
);

module.exports = api;
