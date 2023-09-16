const express = require("express");
const projectController = require("../controllers/project");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/projects" });
const api = express.Router();
// Ruta para crear una nueva categoría
api.post(
  "/new-project",
  [md_auth.ensureAuth, md_upload],
  projectController.createProject
);

// Ruta para obtener todas las categorías
api.get("/", projectController.getAllProjects);

// Ruta para obtener una categoría específica por su ID
api.get("/:id", projectController.getProjectById);

// Ruta para actualizar una categoría por su ID
api.patch(
  "/:id",
  [md_auth.ensureAuth],
  projectController.updateProjectById
);

// Ruta para eliminar una categoría por su ID
api.delete(
  "/:id",
  md_auth.ensureAuth,
  projectController.deleteProjectById
);

module.exports = api;
