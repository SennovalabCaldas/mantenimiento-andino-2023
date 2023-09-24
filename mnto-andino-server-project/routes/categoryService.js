const express = require("express");
const categoryServiceController = require("../controllers/categoryService");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/categoryServices" });
const api = express.Router();

api.post(
  "/new-category",
  [md_auth.ensureAuth, md_upload],
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
