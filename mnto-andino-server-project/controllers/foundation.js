const Foundation = require("../models/foundation");

async function createFoundation(req, res) {
  try {
    const foundationData = req.body; // Obtiene los datos del allye incluyendo la dirección como objeto JSON
    console.log("foundationData", foundationData);

    if (!req.files || !req.files.avatar) {
      return res.status(400).json({ msg: "Error al subir la imagen" });
    } else {
      const imagePath = req.files.avatar.path;
      console.log("imagePath", imagePath);
      foundationData.avatar = imagePath;
    }
    const foundationStored = new Foundation(foundationData);
    await foundationStored.save();

    res.status(201).json({
      _id: foundationStored._id,
      projectName: foundationStored.foundationName,
      avatar: foundationStored.avatar,
      entity: foundationStored.direccion,
    });

    console.log(foundationStored);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: "Error al crear el Fundación" });
  }
}

async function getAllFoundations(req, res) {
  try {
    const foundations = await Foundation.find();
    res.json(foundations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las Fundacións" });
  }
}

async function deleteFoundationById(req, res) {
  try {
    const { id } = req.params;
    const deletedFoundation = await Foundation.findByIdAndDelete(id);
    if (deletedFoundation) {
      res.json({ message: "Fundación eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Fundación no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la Fundación" });
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
    res.status(500).json({ error: "Error al obtener el Fundación" });
  }
}

// Actualizar un cliente por ID
async function updateFoundationById(req, res) {
  try {
    const { id } = req.params;
    console.log("id", id);
    const foundationData = req.body;
    const updatedFoundation = await Foundation.findByIdAndUpdate(
      id,
      foundationData,
      {
        new: true,
      }
    );
    if (updatedFoundation) {
      res.json(updatedFoundation);
    } else {
      res.status(404).json({ error: "Fundación no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el Fundación" });
  }
}

module.exports = {
  createFoundation,
  getAllFoundations,
  deleteFoundationById,
  getFoundationById,
  updateFoundationById,
};
