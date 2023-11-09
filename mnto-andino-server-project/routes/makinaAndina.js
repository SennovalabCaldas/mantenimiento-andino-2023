const makinaAndinaController = require("../controllers/makinaAndina");
const md_auth = require("../middlewares/authenticated");
const express = require("express");
const multer = require("multer");
const path = require("path");
const api = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/makinaAndina"); // Especifica el directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único al archivo
  },
});
const upload = multer({ storage: storage });

api.post(
  "/new-post",
  [md_auth.ensureAuth, upload.array("photos")],
  makinaAndinaController.createService
);

api.get("/", makinaAndinaController.getAllServices);

api.get("/:id", makinaAndinaController.getServiceById);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  makinaAndinaController.deleteServiceById
);

module.exports = api;
