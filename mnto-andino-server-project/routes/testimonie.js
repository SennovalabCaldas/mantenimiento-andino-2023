const express = require("express");
const TestimonieController = require("../controllers/testimonie");
const multiparty = require("connect-multiparty");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/testimonies" });
const api = express.Router();

api.post(
  "/new-testimonie",
  [md_auth.ensureAuth, md_upload],
  TestimonieController.createTestimonie
);

api.get("/:id", TestimonieController.getTestimonieById);

api.get("/", TestimonieController.getAllTestimonies);

api.delete(
  "/:id",
  md_auth.ensureAuth,
  TestimonieController.deleteTestimonieById
);

api.patch(
  "/:id",
  [md_auth.ensureAuth],
  TestimonieController.updateTestimonieById
);

module.exports = api;
