const Foundation = require("../models/foundation");

async function createFoundation(req, res) {
  const foundationData = req.body;
  if (!req.files || !req.files.avatar) {
    return res.status(400).json({ msg: "Error al subir la imagen" });
  } else {
    const imagePath = req.files.avatar.path;
    console.log("imagePath", imagePath);
    foundationData.avatar = imagePath;
  }
  const foundationStored = new Foundation(foundationData);
  try {
    await foundationStored.save();

    res.status(201).json({
      _id: foundationStored._id,
      activityName: foundationStored.activityName,
      avatar: foundationStored.avatar,
      active: foundationStored.active,
      createdAt: foundationStored.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear la Fundación" });
  }
}

async function getAllFoundations(req, res) {
  try {
    const foundations = await Foundation.find();
    res.json(foundations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las Fundaciones" });
  }
}

async function deleteFoundationById(req, res) {
  try {
    const { id } = req.params;
    const deletedFoundation = await Foundation.findByIdAndDelete(id);
    if (deletedFoundation) {
      res.json({ message: "Fundación eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Fundación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la Fundación" });
  }
}

async function updateFoundationById(req, res) {
  try {
    const { id } = req.params;
    const foundationData = req.body;
    if (req.file) {
      // Si se adjunta una imagen, actualízala
      foundationData.avatar = req.file.path;
    }
    const updatedFoundation = await Foundation.findByIdAndUpdate(id, foundationData, { new: true });
    if (updatedFoundation) {
      res.json(updatedFoundation);
    } else {
      res.status(404).json({ error: "Fundación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la Fundación" });
  }
}

async function getFoundationById(req, res) {
  try {
    const { id } = req.params;
    const foundation = await Foundation.findById(id);
    if (foundation) {
      res.json(foundation);
    } else {
      res.status(404).json({ error: "Fundación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la Fundación" });
  }
}

module.exports = {
  createFoundation,
  getAllFoundations,
  updateFoundationById,
  deleteFoundationById,
  getFoundationById,
};
