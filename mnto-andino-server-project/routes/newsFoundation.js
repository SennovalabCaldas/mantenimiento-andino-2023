const express = require("express");
const newsFundationController = require("../controllers/newsFoundation");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/newsFoundation" });
const api = express.Router();

api.post(
  "/new-post",
  [md_auth.ensureAuth, md_upload],
  newsFundationController.createNewFoundation
);

api.get("/", newsFundationController.getAllNewFoundations);

api.get("/:id", newsFundationController.getNewsFoundationById);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  newsFundationController.editNewsFoundation
);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  newsFundationController.deleteNewsFoundation
);

module.exports = api;
