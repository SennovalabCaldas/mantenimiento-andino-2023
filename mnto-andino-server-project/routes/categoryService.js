const express = require("express");
const categoryServiceController = require("../controllers/categoryService");

const md_auth = require("../middlewares/authenticated");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); // Directorio donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre del archivo
  },
});

const upload = multer({ storage: storage });

const api = express.Router();

api.post(
  "/new-category",
  [md_auth.ensureAuth, upload.single("avatar")],
  categoryServiceController.createCategoryService
);

api.get("/", categoryServiceController.getAllCategoryServices);

api.get("/:id", categoryServiceController.getCategoryServiceById);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  categoryServiceController.updateCategoryServiceById
);

api.delete(
  "/:id",
  [md_auth.ensureAuth],
  categoryServiceController.deleteCategoryServiceById
);

module.exports = api;