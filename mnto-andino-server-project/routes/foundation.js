const express = require("express");
const foundationController = require("../controllers/foundation");
const md_auth = require("../middlewares/authenticated");
const multer = require("multer");
const path = require("path");

// Configura el almacenamiento y el nombre del archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/foundations"); // Especifica el directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único al archivo
  },
});

// Configura el middleware multer
const upload = multer({ storage: storage });

const api = express.Router();

api.post(
  "/new-fundation",
  [md_auth.ensureAuth, upload.array("images")],
  foundationController.createFoundation
);

api.get("/", foundationController.getAllFoundations);

api.get("/:id", foundationController.getFoundationById);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  foundationController.deleteFoundationById
);

module.exports = api;
