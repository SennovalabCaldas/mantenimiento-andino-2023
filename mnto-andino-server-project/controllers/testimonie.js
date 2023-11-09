// clientController.js

const Testimonie = require("../models/testimonie");

async function createTestimonie(req, res) {
  try {
    const testimonieData = req.body;

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      const imagePath = req.files.avatar.path;
      console.log("imagePath", imagePath);
      testimonieData.avatar = imagePath;
    }
    const testimonieStored = new Testimonie(testimonieData);
    await testimonieStored.save();
    res.status(201).json({
      _id: testimonieStored._id,
      client: testimonieStored.client,
      avatar: testimonieStored.avatar,
      role: testimonieStored.role,
      evaluation: testimonieStored.evaluation,
      comment: testimonieStored.comment,
      active: testimonieStored.active,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el cliente" });
  }
}

async function getTestimonieById(req, res) {
  const { id } = req.params;
  try {
    const testimonie = await Testimonie.findById(id);
    if (testimonie) {
      res.json(testimonie);
    } else {
      res.status(404).json({ error: "Testimonie no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el testimonie" });
  }
}

async function getAllTestimonies(req, res) {
  console.log("Entró a getAllTestimonies");
  try {
    const testimonies = await Testimonie.find();

    res.json(testimonies);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los testimonies" });
  }
}

async function deleteTestimonieById(req, res) {
  try {
    const { id } = req.params;
    const deletedTestimonie = await Testimonie.findByIdAndDelete(id);
    if (deletedTestimonie) {
      res.json({ message: "Testimonie eliminado exitosamente" });
    } else {
      res.status(404).json({ error: "Testimonie no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el testimonie" });
  }
}

async function updateTestimonieById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const testimonieData = req.body;
    console.log("testimonieData", testimonieData);
    const updatedTestimonie = await Testimonie.findByIdAndUpdate(
      id,
      testimonieData
    );
    if (updatedTestimonie) {
      res.json({ message: "Testimonie actualizado exitosamente" });
    } else {
      res.status(404).json({ error: "Testimonie no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el testimonie" });
  }
}

module.exports = {
  createTestimonie,
  getAllTestimonies,
  deleteTestimonieById,
  updateTestimonieById,
  getTestimonieById,
};
