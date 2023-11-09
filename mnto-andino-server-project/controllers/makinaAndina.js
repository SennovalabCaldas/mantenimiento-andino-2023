const MakinaAndina = require("../models/makinaAndina");
const fs = require("fs");

async function createService(req, res) {
  console.log("req.files", req.files);
  try {
    const { serviceName, description, createdAt } = req.body;
    const photos = req.files.map((file) => file.filename);
    console.log("photos", photos);
    const newService = new MakinaAndina({
      serviceName,
      description,
      photos,
      createdAt,
    });
    const savedService = await newService.save();
    res.status(201).json({
      _id: savedService._id,
      serviceName: savedService.serviceName,
      description: savedService.description,
      photos: savedService.photos,
      createdAt: savedService.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el Servicio" });
  }
}

async function getAllServices(req, res) {
  try {
    const services = await MakinaAndina.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
}

async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    const service = await MakinaAndina.findById(id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ error: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el servicio" });
  }
}

async function deleteServiceById(req, res) {
  try {
    const { id } = req.params;
    const deletedTestimonie = await MakinaAndina.findByIdAndDelete(id);
    if (deletedTestimonie) {
      res.json({ message: "Testimonie eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Testimonie no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el servicio" });
  }
}

module.exports = {
  createService,
  getAllServices,
  deleteServiceById,
  getServiceById,
};
