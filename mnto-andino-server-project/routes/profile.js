const express = require("express");
const ProfileController = require("../controllers/profile");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();
api.post("/new-profile", [md_auth.ensureAuth], ProfileController.createNew);
api.get("/", ProfileController.getAll);
api.delete("/:id", [md_auth.ensureAuth], ProfileController.deleteById);
api.get("/:id", ProfileController.getById);
api.patch("/:id", [md_auth.ensureAuth], ProfileController.updateById);

module.exports = api;
