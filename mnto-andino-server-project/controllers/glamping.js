const Glamping = require("../models/glamping"); // Importa el modelo

async function createService(req, res) {
  const serviceData = req.body;
  const photos = Array.isArray(req.files.photos)
    ? req.files.photos.map((file) => file.path)
    : [];
  serviceData.photos = photos;
  const serviceStored = new Glamping(serviceData);

  try {
    await serviceStored.save();
    res.status(201).json({
      _id: serviceStored._id,
      serviceName: serviceStored.serviceName,
      description: serviceStored.description,
      photos: serviceStored.photos,
      createdAt: serviceStored.createdAt,
    });

    console.log(serviceStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el Servicio" });
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
    const updatedService = await Glamping.findByIdAndUpdate(
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
