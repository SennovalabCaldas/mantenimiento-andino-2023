const Service = require("../models/service");

async function createService(req, res) {
  try {
    const { name, description, categoryService } = req.body;
    console.log("categoryService", categoryService);
   
    const photos = Array.isArray(req.files.photos)
      ? req.files.photos.map((file) => file.path)
      : [];
   
    const newService = new Service({
      name,
      description,
      photos,
      categoryService,
    });

    console.log("newService", newService);
    const savedService = await newService.save();
    console.log("savedService", savedService);
    res.status(201).json(savedService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({ message: "Error creating service" });
  }
}

async function getServices(req, res) {
  try {
    const services = await Service.find();
    const servicesWithFullImageURLs = services.map((service) => {
      const updatedPhotos = service.photos.map((photoName) => {
        return photoName;
      });

      return {
        ...service.toObject(),
        photos: updatedPhotos,
      };
    });
    console.log("servicesWithFullImageURLs", servicesWithFullImageURLs);
    res.status(200).send(servicesWithFullImageURLs);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function getServiceById(req, res) {
  console.log("Entró a getServiceById");
  const { id } = req.params;
  console.log("id", id);
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).send({ msg: "Servicio no encontrado" });
    }
    res.status(200).send(service);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function updateService(req, res) {
  console.log("req.files", req.body);
  const photos = Array.isArray(req.files.photos)
    ? req.files.photos.map((file) => file.path)
    : [];
  console.log("photos", photos);
  const { id } = req.params;
  const { name, description, categoryService } = req.body;
  const updatedService = {
    name,
    description,
    photos,
    categoryService,
  };

  console.log("updatedService", updatedService);
  try {
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).send({ msg: "Servicio no encontrado" });
    }
    await Service.findByIdAndUpdate(id, updatedService);
    res.status(200).send({ msg: "Servicio actualizado" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error del servidor" });
  }
}

async function deleteService(req, res) {
  const { id } = req.params;

  try {
    await Service.findByIdAndDelete(id);
    res.status(200).send({ msg: "Servicio eliminado" });
  } catch (error) {
    res.status(400).send({ msg: "Error al eliminar el servicio" });
  }
}

module.exports = {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
};
