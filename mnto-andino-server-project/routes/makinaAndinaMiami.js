const express = require("express");
const makinaAndinaMiamiController = require("../controllers/makinaAndinaMiami");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/makinaAndinaMiami" });
const api = express.Router();

api.post(
  "/new-post",
  [md_auth.ensureAuth, md_upload],
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
