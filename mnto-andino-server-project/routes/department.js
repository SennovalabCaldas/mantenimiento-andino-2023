const express = require("express");
const departmentController = require("../controllers/departament");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post(
  "/new-department",
  [md_auth.ensureAuth],
  departmentController.createDepartments
);

api.get("/", departmentController.getAllDepartments);

api.delete("/", [md_auth.ensureAuth], departmentController.deleteDepartments);


module.exports = api;
