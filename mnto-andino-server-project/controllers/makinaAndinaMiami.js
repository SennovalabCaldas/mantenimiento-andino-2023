const MakinaAndinaMiami = require("../models/makinaAndinaMiami"); // Importa el modelo

async function createService(req, res) {
  console.log("req.files", req.files);
  try {
    const { serviceName, description, createdAt } = req.body;
    const photos = req.files.map((file) => file.filename);
    console.log("photos", photos);
    const newService = new MakinaAndinaMiami({
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
    const services = await MakinaAndinaMiami.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
}

async function deleteServiceById(req, res) {
  try {
    const { id } = req.params;
    const deletedService = await MakinaAndinaMiami.findByIdAndDelete(id);
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
    const service = await MakinaAndinaMiami.findById(id);
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
    const updatedService = await MakinaAndinaMiami.findByIdAndUpdate(
      id,
      serviceData,
      {
        new: true,
      }
    );
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
