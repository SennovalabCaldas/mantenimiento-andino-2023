const express = require("express");
const CategoryController = require("../controllers/category");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

// Ruta para crear una nueva categoría
api.post(
  "/new-category",
  [md_auth.ensureAuth],
  CategoryController.crearCategoria
);

// Ruta para obtener todas las categorías
api.get("/", CategoryController.obtenerTodasCategorias);

// Ruta para obtener una categoría específica por su ID
api.get("/:idCategory",CategoryController.obtenerCategoriaPorId);

// Ruta para actualizar una categoría por su ID
api.patch(
  "/:id",
  [md_auth.ensureAuth],
  CategoryController.editarCategoria
);

// Ruta para eliminar una categoría por su ID
api.delete(
  "/:id",
  md_auth.ensureAuth,
  CategoryController.eliminarCategoria
);

module.exports = api;
