const express = require("express");
const certificationController = require("../controllers/certification");
const multer = require("multer");
const path = require("path");
const md_auth = require("../middlewares/authenticated");

// Configura el almacenamiento y el nombre del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/certifications"); // Especifica el directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único al archivo
  },
});

// Configura el middleware multer
const upload = multer({ storage: storage });

const api = express.Router();

api.post(
  "/new-certification",
  [md_auth.ensureAuth, upload.array("photos")],
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
