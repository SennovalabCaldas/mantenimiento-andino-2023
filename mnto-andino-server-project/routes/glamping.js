const express = require("express");
const glampingController = require("../controllers/glamping");
const md_auth = require("../middlewares/authenticated");
const multer = require("multer");
const path = require("path");

// Configura el almacenamiento y el nombre del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/glamping"); // Especifica el directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único al archivo
  },
});

// Configura el middleware multer
const upload = multer({ storage: storage });

const api = express.Router();

api.post(
  "/new-service",
  [md_auth.ensureAuth, upload.array("images")],
  glampingController.createService
);

api.get("/", glampingController.getAllServices);

api.get("/:id", glampingController.getServiceById);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  glampingController.updateServiceById
);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  glampingController.deleteServiceById
);

module.exports = api;
