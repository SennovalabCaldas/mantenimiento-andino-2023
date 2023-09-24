const express = require("express");
const glampingController = require("../controllers/glamping");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/glamping" });
const api = express.Router();

api.post(
  "/new-post",
  [md_auth.ensureAuth, md_upload],
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
