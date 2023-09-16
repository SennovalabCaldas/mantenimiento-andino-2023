const express = require("express");
const fundationController = require("../controllers/foundation");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/foundations" });
const api = express.Router();

api.post(
  "/new-foundation",
  [md_auth.ensureAuth, md_upload],
  fundationController.createFoundation
);

api.get("/", fundationController.getAllFoundations);

api.get("/:id", fundationController.getFoundationById);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  fundationController.updateFoundationById
);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  fundationController.deleteFoundationById
);

module.exports = api;
