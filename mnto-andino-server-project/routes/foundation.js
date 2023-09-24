const express = require("express");
const fundationController = require("../controllers/foundation");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/foundations" });
const api = express.Router();

api.post(
  "/new-post",
  [md_auth.ensureAuth, md_upload],
  fundationController.createFoundation
);

api.patch(
  "/:id",
  [md_auth.ensureAuth, md_upload],
  fundationController.updateFoundationById
);

api.get("/", fundationController.getAllFoundations);

api.get("/:id", fundationController.getFoundationById);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  fundationController.deleteFoundationById
);

module.exports = api;
