const express = require("express");
const SedeController = require("../controllers/sede");
const md_auth = require("../middlewares/authenticated");

const api = express.Router();

api.post("/new-sede", [md_auth.ensureAuth], SedeController.createSede);
api.get("/", SedeController.getAllSedes);
api.get("/:parametro", SedeController.filterSedes);
api.get("/buscar/:nombre/:departamento/:municipio", SedeController.searchSedes); // Agrega la ruta para searchSedes
api.patch("/:id", [md_auth.ensureAuth], SedeController.updateSede);
api.delete("/:id", [md_auth.ensureAuth], SedeController.deleteSede);
api.get("/departamento/:parametro", SedeController.filterSedesPerMunicipio);

module.exports = api;
