const MakinaAndina = require("../models/makinaAndina"); // Importa el modelo
const baseApi = "http://localhost:3500/";
// const baseApi = "http://mantenimientoandino:3000/";

async function createService(req, res) {
  const serviceData = req.body;
  const photos = Array.isArray(req.files.photos)
    ? req.files.photos.map((file) => file.path)
    : [];
  serviceData.photos = photos;
  const serviceStored = new MakinaAndina(serviceData);

  try {
    await serviceStored.save();
    res.status(201).json({
      _id: serviceStored._id,
      serviceName: serviceStored.serviceName,
      active: serviceStored.active,
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
    const services = await MakinaAndina.find();
    const servicesWithFullImageUrls = services.map((service) => {
      return {
        _id: service._id,
        serviceName: service.serviceName,
        description: service.description,
        active: service.active,
        photos: service.photos.map((photo) => `http://localhost:3500/${photo}`), // Agrega el origen del servidor
        createdAt: service.createdAt,
      };
    });
    console.log(servicesWithFullImageUrls);

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
}

async function deleteServiceById(req, res) {
  try {
    const { id } = req.params;
    const deletedService = await MakinaAndina.findByIdAndDelete(id);
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
    const service = await MakinaAndina.findById(id);
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
    console.log("serviceData", serviceData);
    const photos = Array.isArray(req.files.photos)
      ? req.files.photos.map((file) => file.path)
      : [];
    serviceData.photos = photos;
    const serviceUpdated = await MakinaAndina.findByIdAndUpdate(
      id,
      serviceData,
      {
        new: true,
      }
    );
    if (serviceUpdated) {
      res.json(serviceUpdated);
    } else {
      res.status(404).json({ error: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Servicio" });
  }
}

module.exports = {
  createService,
  getAllServices,
  deleteServiceById,
  getServiceById,
  updateServiceById,
};
