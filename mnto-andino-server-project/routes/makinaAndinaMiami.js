const express = require("express");
const makinaAndinaMiamiController = require("../controllers/makinaAndinaMiami");
const md_auth = require("../middlewares/authenticated");

const multer = require("multer");
const path = require("path");
const api = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/makinaAndinaMiami"); // Especifica el directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Asigna un nombre único al archivo
  },
});
const upload = multer({ storage: storage });

api.post(
  "/new-post",
  [md_auth.ensureAuth, upload.array("photos")],
  makinaAndinaMiamiController.createService
);
api.get("/", makinaAndinaMiamiController.getAllServices);

api.get("/:id", makinaAndinaMiamiController.getServiceById);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  makinaAndinaMiamiController.updateServiceById
);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  makinaAndinaMiamiController.deleteServiceById
);

module.exports = api;
