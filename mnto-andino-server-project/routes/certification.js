const express = require("express");
const certificationController = require("../controllers/certification");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/certifications" });
const api = express.Router();
// Ruta para crear una nueva categoría
api.post(
  "/new-certification",
  [md_auth.ensureAuth, md_upload],
  certificationController.createCertification
);

// Ruta para obtener todas las categorías
api.get("/", certificationController.getAllCertifications);

// Ruta para obtener una categoría específica por su ID
api.get("/:id", certificationController.getCertificationById);

// Ruta para actualizar una categoría por su ID
api.patch(
  "/:id",
  [md_auth.ensureAuth],
  certificationController.updateCertificationById
);

// Ruta para eliminar una categoría por su ID
api.delete(
  "/:id",
  md_auth.ensureAuth,
  certificationController.deleteCertificationById
);

module.exports = api;
