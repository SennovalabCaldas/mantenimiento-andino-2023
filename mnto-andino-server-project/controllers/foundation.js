const Foundation = require("../models/foundation");
const fs = require("fs");

async function createFoundation(req, res) {
  try {
    const images = req.files.map((file) => file.path);
    const foundationData = {
      images: images,
    };

    const foundation = new Foundation(foundationData);
    await foundation.save();

    res.status(201).json({
      _id: foundation._id,
      images: foundation.images,
      createdAt: foundation.createdAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la fundación" });
  }
}

async function getAllFoundations(req, res) {
  try {
    const foundations = await Foundation.find();
    res.json(foundations);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las fundaciones" });
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
    res.status(500).json({ error: "Error al obtener la fundación" });
  }
}

async function deleteFoundationById(req, res) {
  try {
    const { id } = req.params;
    const foundation = await Foundation.findById(id);
    if (!foundation) {
      return res.status(404).json({ error: "Fundación no encontrada" });
    }

    foundation.images.forEach((imagePath) => {
      try {
        fs.unlinkSync(imagePath);
      } catch (error) {
        console.error(`Error al eliminar imagen: ${imagePath}`, error);
      }
    });

    const deletedFoundation = await Foundation.findByIdAndDelete(id);
    if (deletedFoundation) {
      res.json({ message: "Fundación eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Fundación no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al eliminar la fundación y sus archivos" });
  }
}

module.exports = {
  createFoundation,
  getAllFoundations,
  deleteFoundationById,
  getFoundationById,
};
