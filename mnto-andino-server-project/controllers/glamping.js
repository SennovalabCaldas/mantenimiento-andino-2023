const Glamping = require("../models/glamping"); // Importa el modelo

async function createService(req, res) {
  console.log("req.files", req.files);

  try {
    const images = req.files.map((file) => file.path);
    const glampingData = {
      images: images,
      serviceName: req.body.serviceName,
      description: req.body.description,
    };

    const glamping = new Glamping(glampingData);
    await glamping.save();

    res.status(201).json({
      _id: glamping._id,
      images: glamping.images,
      serviceName: glamping.serviceName,
      description: glamping.description,
      createdAt: glamping.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la fundación" });
  }
}

async function getAllServices(req, res) {
  try {
    const services = await Glamping.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
}

async function deleteServiceById(req, res) {
  try {
    const { id } = req.params;
    const deletedService = await Glamping.findByIdAndDelete(id);
    if (deletedService) {
      res.json({ message: "Servicio eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la Servicio" });
  }
}

async function getServiceById(req, res) {
  try {
    const { id } = req.params;
    const service = await Glamping.findById(id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ error: "Fundación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el Fundación" });
  }
}

// Actualizar un cliente por ID
async function updateServiceById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const serviceData = req.body;
    const updatedService = await Glamping.findByIdAndUpdate(id, serviceData, {
      new: true,
    });
    if (updatedService) {
      res.json(updatedService);
    } else {
      res.status(404).json({ error: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el servicio" });
  }
}

module.exports = {
  createService,
  getAllServices,
  deleteServiceById,
  getServiceById,
  updateServiceById,
};
