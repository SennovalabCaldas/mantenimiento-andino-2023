const express = require("express");
const multiparty = require("connect-multiparty");
const UserController = require("../controllers/user");
const md_auth = require("../middlewares/authenticated");

const md_upload = multiparty({ uploadDir: "./uploads/avatar" });
const api = express.Router();

api.get("/get-me", [md_auth.ensureAuth], UserController.getMe);
api.patch(
  "/user/edit-profile",
  [md_auth.ensureAuth, md_upload],
  UserController.updateMe
);
api.get("/", UserController.getUsers);
api.post("/user", [md_auth.ensureAuth, md_upload], UserController.createUser);
api.get("/get-user/:id", [md_auth.ensureAuth], UserController.getUser);
api.patch(
  "/user/:id",
  [md_auth.ensureAuth, md_upload],
  UserController.updateUser
);
api.delete("/user/:id", [md_auth.ensureAuth], UserController.deleteUser);

module.exports = api;
