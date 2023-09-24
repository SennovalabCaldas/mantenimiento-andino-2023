const express = require("express");
const makinaAndinaController = require("../controllers/makinaAndina");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/makinaAndina" });
const api = express.Router();

api.post(
  "/new-post",
  [md_auth.ensureAuth, md_upload],
  makinaAndinaController.createService
);

api.get("/", makinaAndinaController.getAllServices);

api.get("/:id", makinaAndinaController.getServiceById);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  makinaAndinaController.updateServiceById
);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  makinaAndinaController.deleteServiceById
);

module.exports = api;
